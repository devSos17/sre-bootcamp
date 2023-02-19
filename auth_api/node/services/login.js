import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const loginFunction = (username, password) => {
    let secret = process.env.SECRET; // Secret for  the jwt
    return User.findByPk(username)
        .then((data) => {
            // Check user exists
            if (!data) throw new Error("username does not exists");
            const user = data.toJSON();
            const saltedPsk = password + user.salt;
            const hash = crypto
                .createHash("sha512")
                .update(saltedPsk, "binary")
                .digest("hex");
            // Check password
            if (hash !== user.password) throw new Error("incorrect password");
            // Create and send jwt
            return jwt.sign({ role: user.role }, secret, {
                noTimestamp: true,
            });
        })
        .catch((err) => {
            throw err;
        });
};
