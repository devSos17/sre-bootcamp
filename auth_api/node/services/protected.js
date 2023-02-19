import jwt from "jsonwebtoken";

export const protectFunction = (authorization) => {
    const secret = process.env.SECRET;
    // get the token
    // const payload =
    jwt.verify(authorization, secret); // errors should be handled on router
    return "You are under protected data";
};
