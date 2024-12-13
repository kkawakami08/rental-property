//provider component that will be in layout so that everything in app has access to next-auth session
import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  //can add more providers like github etc in this array
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //makes it so that when you try to login it doesn't automatically choose the last google account that you used
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      //1. connect to DB
      await connectDB();
      //2. check if user exists by looking at email in User model and comparing it to profile.email
      const userExists = await User.findOne({ email: profile.email });
      //3. if not, then create user
      if (!userExists) {
        //truncate username if too long to 20 characters
        const username = profile.name.slice(0, 20);
        //creates user in DB with their email, username, and image
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow sign in
      return true;
    },
    // session callback function that modifies the session object
    async session({ session }) {
      //get user from DB
      const user = await User.findOne({ email: session.user.email });
      //assign user id from the session
      session.user.id = user._id.toString();
      //return the session
      return session;
    },
  },
};
