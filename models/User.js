import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      //second item in array is what shows up when email that was used already exists
      unique: [true, "Email already exists"],
      //second item shows up when user doesn't input email
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    //references "Property" Schema --> will be array of those types
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
