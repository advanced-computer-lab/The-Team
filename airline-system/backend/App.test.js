const request = require("supertest");
const app = require("./App");
const jestConfig = require("./jest.config");

describe("Test example", () => {
    jest.setTimeout(30000);
    test("GET /", async () => {
        let response = await request(app)
            .get("/users/");

        expect(response.body).toHaveLength(2)
    });

});