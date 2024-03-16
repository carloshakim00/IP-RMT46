const app = require("../app")
const request = require("supertest")

const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const { hashPassword } = require("../helpers/bcrypt")
const { Cart } = require("../models")

const newCartData = {
    userId: 1,
    quantity: 1,
    productId: 1
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

describe("cart test", (cb) => {
    describe("GET /cart", () => {
        describe("Success", () => {
            test("should return status 200 and array of cart", async () => {
                let { status, body } = await request(app)
                    .get("/cart")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    .send(newCartData)
                expect(status).toBe(200);
                expect(body).toEqual(expect.any(Array))
                expect(body).not.toHaveLength(0);
                expect(body[0]).toHaveProperty("id", expect.any(Number));
                expect(body[0]).toHaveProperty("productId", expect.any(Number));
                expect(body[0]).toHaveProperty("userId", expect.any(Number));
            })
        })

        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .get("/cart")
                    .set("Authorization", `Bearer invalid_token`)
                    .send(newCartData)
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app)
                    .get("/cart")
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
        })
    })

    describe("GET /cart/:id", () => {
        describe("Success", () => {
            test("should return status 200 and specific cart data", async () => {
                let { status, body } = await request(app)
                    .get("/cart/1")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    .send(newCartData)
                expect(status).toBe(200);
            })
        })

        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .get("/cart/1")
                    .set("Authorization", `Bearer invalid_token`)
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app)
                    .get("/cart/1")
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
        })
    })

    describe("POST /cart", () => {
        describe("Success", () => {
            test("should return status 201 and created cart", async () => {
                let { status, body } = await request(app)
                    .post("/cart")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    .send(newCartData)
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("productId", expect.any(Number))
                expect(body).toHaveProperty("quantity", expect.any(Number))
                expect(body).toHaveProperty("userId", expect.any(Number))
            })
        })
        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .post("/cart")
                    .set("Authorization", `Bearer invalid_token`)
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app)
                    .post("/cart")
                    .send(newCartData)
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthenticated");
            })
            test("should return status 400 when request body is invalid", async () => {
                let { status, body } = await request(app)
                    .post("/cart")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", expect.any(String));
            })
        })
    })

    describe("DELETE /cart/:id", () => {
        describe("Success", () => {
            test("should return status 200 and deleted cart", async () => {
                let { status, body } = await request(app)
                    .delete("/cart/2")
                    .set("Authorization", `Bearer ${access_token_user_2}`)
                    .send(newCartData)
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", expect.any(String));
            })
        })

        describe("Failed", () => {
            test("should return status 401 unauthenticated when token is invalid", async () => {
                let { status, body } = await request(app)
                    .delete("/cart/1")
                    .set("Authorization", `Bearer invalid_token`)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
            })
            test("should return status 401 unauthenticated when haven't yet logged in", async () => {
                let { status, body } = await request(app)
                    .delete("/cart/1")
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Unauthenticated");
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
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
    await queryInterface.bulkDelete("Products", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
})