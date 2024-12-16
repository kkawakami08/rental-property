"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is Required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found");

  //verify ownership
  if (property.owner.toString() !== userId) throw new Error("Unauthorized");

  //deleting images from cloudinary
  //extract public id from image urls

  //https://res.cloudinary.com/kaori-dev/image/upload/v1734048366/propertypulse/h0kgtbmegmrxqudhjxos.jpg
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    //h0kgtbmegmrxqudhjxos.jpg
    //.at(-1) returns last index of array
    return parts.at(-1).split(".").at(0);
  });

  //delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
