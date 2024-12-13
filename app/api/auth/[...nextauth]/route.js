import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

//whenever get or post request is made to api/auth, the handler will take over
export { handler as GET, handler as POST };
