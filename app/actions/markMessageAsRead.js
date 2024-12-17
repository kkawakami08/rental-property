"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is Required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }

  //verify ownership of message
  if (message.recipient.toString() !== userId) throw new Error("Unauthorized");

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();
  return message.read;
};

export default markMessageAsRead;
