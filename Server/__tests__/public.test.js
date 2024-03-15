const app = require("../app");
const request = require("supertest");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const user_3 = {
  username: "staff_3",
  email: "dummy_staff3@mail.com",
  password: "password",
};

let acces_token_user_3; //variabel untuk mengisi acces token

describe("GET /public/products", () => {
  describe("Success", () => {
    test("should return status 200 and array of public products", async () => {
      const { status, body } = await request(app).get("/public/products");
      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Object));
      
    });

    test("should return status 200 and the specific public product data", async () => {
      const productId = 1; // Assuming this id exists in the database
      const { status, body } = await request(app).get("/public/products/" + productId);

      expect(status).toBe(200);
      expect(body).toHaveProperty("id", productId);
      
    });
  });

  describe("Failed", () => {
    test("should return status 404 not found when the public product with the specified id does not exist", async () => {
      const invalidProductId = 999; 
      const { status, body } = await request(app).get(
        "/public/products/" + invalidProductId
      );
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Data not found");
    });
  });
});

beforeAll(async () => {
  try {
    
    await queryInterface.bulkInsert("Users", [
      {
        username: user_3.username,
        email: user_3.email,
        password: hashPassword(user_3.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  
    acces_token_user_3 = signToken({ id: 1 });
  
    const dataProducts = require("../data/Products.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Products", dataProducts);
    
    const dataProofs = require("../data/Proof.json").map((el) => {
      el.authorId = 1
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Proofs", dataProofs);

    const dataCarts = require("../data/Cart.json").map((el) => {
      el.userId = 1
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert("Carts", dataCarts);
  } catch (error) {
    console.log(error, "public error");
  }
});
  
afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  
    await queryInterface.bulkDelete("Proofs", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await queryInterface.bulkDelete("Carts", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
});