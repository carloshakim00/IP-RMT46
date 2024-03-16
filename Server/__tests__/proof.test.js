const app = require("../app")
const request = require("supertest")

const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const { hashPassword } = require("../helpers/bcrypt")
const { Product } = require("../models")

const newProofData = {
    imageUrl: "https://example.com/image.png",
}

const user_1 = {
    username: "admin_1",
    email: "test_admin1@mail.com",
    password: "password",
};

const user_2 = {
    username: "staff_2",
    email: "test_staff2@mail.com",
    password: "password",
    
};

let access_token_user_1;
let access_token_user_2;

describe("proof test", (cb) => {
    describe("POST /proof", () => {
        describe("Success", () => {
            test("should return status 200 and message success", async () => {
                let { status, body } = await request(app)
                    .post("/proof")
                    .set("Authorization", `Bearer ${access_token_user_1}`)
                    .send(newProofData)
                expect(status).toBe(201)
                expect(body).toHaveProperty("message", "success")
            })
        })
        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .post("/proof")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    .send(newProofData)
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app)
                    .post("/proof")
                    .send(newProofData)
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Unauthenticated")
            })
        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkDelete("Users", [
        {
            username: user_1.username,
            email: user_1.email,
            password: hashPassword(user_1.password),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: user_2.username,
            email: user_2.email,
            password: hashPassword(user_2.password),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
    access_token_user_1 = signToken({ id : 1 });
    access_token_user_2 = signToken({ id : 2 });
    
    const dataProducts = require("../data/Products.json").map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
    })
    await queryInterface.bulkInsert("Products", dataProducts, {});
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", {
       truncate: true,
       restartIdentity: true,
       cascade: true
    });
    await queryInterface.bulkDelete("Products", {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
})