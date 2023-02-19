import "core-js/stable";
import "regenerator-runtime/runtime";

import chaiAsPromised from "chai-as-promised";
import chai, { assert } from "chai";
import { loginFunction } from "../services/login";
import { protectFunction } from "../services/protected";
import { JsonWebTokenError } from "jsonwebtoken";

// Config chai to use promises
chai.use(chaiAsPromised);
const expect = chai.expect;

// Tokens
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI";
const badToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX9123jasdlkj1230JlJADJ1j312_ASdk1/sxlas";

describe("loginFunction()", function () {
    // Happy path
    it("Test Correct login", async function () {
        expect(token).to.be.equal(await loginFunction("admin", "secret"));
    });

    // Un-happy path
    it("Test Incorrect User", async function () {
        await expect(
            loginFunction("administrator", "secret")
        ).to.eventually.be.rejectedWith(Error, "username does not exists");
    });
    it("Test Incorrect Password", async function () {
        await expect(
            loginFunction("admin", "secrets")
        ).to.eventually.be.rejectedWith(Error, "incorrect password");
    });
});

describe("protectFunction()", function () {
    // Happy path
    it("Test protected", function () {
        expect("You are under protected data").to.be.equal(
            protectFunction(token)
        );
    });

    // Un-happy path
    it("Test bad-token", function () {
        expect(() => {
            protectFunction(badToken);
        }).to.throw(JsonWebTokenError, "invalid token");
    });
});
