const app = require("../app")
const request = require("supertest")

const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const { hashPassword } = require("../helpers/bcrypt")
const { Product } = require("../models")

const newProductData = {

    name: "product 1",
    description: "product 1 description",
    imageUrl: "https://example.com/image.png",
    price: 100,
    usage: "product 1 usage",
}

const user_1 = {
    username: "admin_1",
    email: "test_admin1@mail.com",
    password: "password",
    role: "Admin",
    phoneNumber: "08123456789",
    address: "Indonesia",
};

const user_2 = {
    username: "staff_2",
    email: "test_staff2@mail.com",
    password: "password",
    phoneNumber: "08123456789",
    address: "Indonesia",
};

let access_token_user_1;
let access_token_user_2;

describe("product test", (cb) => {
    describe("GET /products", () => {
        describe("Success", () => {
            test("should return status 200 and array of products", async () => {
                let { status, body } = await request(app)
                    .get("/products")
                    .set("Authorization", `Bearer ${access_token_user_1}`)
                expect(status).toBe(200);
                expect(body).toEqual(expect.any(Array))
                expect(body).not.toHaveLength(0);
                expect(body[0]).toHaveProperty("id", expect.any(Number));
                expect(body[0]).toHaveProperty("name", expect.any(String));
                expect(body[0]).toHaveProperty("description", expect.any(String));
                expect(body[0]).toHaveProperty("imageUrl", expect.any(String));
                expect(body[0]).toHaveProperty("usage", expect.any(String));
                expect(body[0]).toHaveProperty("price", expect.any(Number));
            })
        })

        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .get("/products")

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
            });

            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app).get("/products");

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
            });
        });
    })

    describe("GET /products/:id", () => {
        describe("Success", () => {
            test("should return status 200 and specific product data", async () => {
                let { status, body } = await request(app)
                    .get("/products/1")
                    .set("Authorization", `Bearer ${access_token_user_1}`)
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("description", expect.any(String))
                expect(body).toHaveProperty("imageUrl", expect.any(String))
                expect(body).toHaveProperty("usage", expect.any(String))
                expect(body).toHaveProperty("price", expect.any(Number))
            })
        })

        describe("Failed", () => {
            test("should return status 401 unauthenticated when not logged in", async () => {
                const productId = 1;
                const { status, body } = await request(app).get("/products/" + productId);
        
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
              });

            test("should return status 401 unauthenticated when token is invalid", async () => {
                const productId = 1;
                const { status, body } = await request(app)
                    .get("/products/" + productId)
                    .set("Authorization", "Bearer invalid_token");

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
            });

        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [
        {
            username: user_1.username,
            email: user_1.email,
            password: hashPassword(user_1.password),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: user_2.username,
            email: user_2.email,
            password: hashPassword(user_2.password),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ])

    access_token_user_1 = signToken({ id : 1 })
    access_token_user_2 = signToken({ id: 2 });

    const dataProducts = require("../data/Products.json").map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
    })
    await queryInterface.bulkInsert("Products", dataProducts);

    const dataCarts = require("../data/Cart.json").map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
    })
    await queryInterface.bulkInsert("Carts", dataCarts);

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
    await queryInterface.bulkDelete("Products", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
    await queryInterface.bulkDelete("Carts", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
})