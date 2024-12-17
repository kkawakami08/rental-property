"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const getUnreadMessageCount = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is Required");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    read: false,
    recipient: userId,
  });
  return { count };
};

export default getUnreadMessageCount;
