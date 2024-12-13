"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

//would do this in the layout but dont want to make it a client component, so we make a separate component, make that a client component, that we will then bring into the layout to wrap everything in our app
