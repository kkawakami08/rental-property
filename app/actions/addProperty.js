"use server";

//server actions - functions that run on the server
//don't have to use onclick function like in client side components
//can also be used in client component
//CRUD with api routes are good if app is not single app
//actions are more efficient and easier than above becasue don't need api routes and dont need to make extra http requests

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
//once we submit, it will update the cache and listings
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    //when you throw an error, next.js shows an "error" page
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  //access all values from amenities and images
  //getAll("amenities") - "amenities" is the name of the input field you are trying to get the data from
  const amenities = formData.getAll("amenities");
  //first chain will give you array of image objects, but we just want the image name -> filter out any images without a value for name -> return array of image.name
  const images = formData.getAll("images").filter((image) => image.name !== "");
  // .map((image) => image.name);

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    // images,
  };

  const imageUrls = [];

  //need to convert to base64
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert to base64
    const imageBase64 = imageData.toString("base64");

    //make request to cloudinary for it to upload
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        //puts it in propertypulse folder
        folder: "propertypulse",
      }
    );
    //result returns string for src?
    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  //create new property using Property Model
  const newProperty = new Property(propertyData);
  //save it to the DB
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
