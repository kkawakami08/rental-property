//just this line will protect all routes (have to login to view anything)
export { default } from "next-auth/middleware";

//will only apply to just the listed paths in matcher
export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
