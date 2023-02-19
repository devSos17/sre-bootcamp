import { protectFunction } from "../services/protected";

export const protect = (req, res, next) => {
    // Strip the Bearer string
    let authorization = req.headers.authorization.split(" ")[1];

    try {
        let response = {
            data: protectFunction(authorization),
        };
        res.send(response);
    } catch (error) {
        res.status(401).send(error.message);
    } finally {
        next();
    }
};
