import { loginFunction } from "../services/login";

export const login = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let response = {
            data: await loginFunction(username, password),
        };
        res.send(response);
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
    } finally {
        next();
    }
};
