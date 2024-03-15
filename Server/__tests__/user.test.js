const app = require("../app")
const request = require("supertest");
const {hashPassword} = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt")
const {sequelize} = require("../models")
const {queryInterface} = sequelize

const new_user = {
    username: "staff1",
    email: "staff1@mail.com",
    password: "password",
}

const new_user_2 = {
    username: "admin1",
    email: "admin1@mail.com",
    password: "password",
}

const new_user_3 = {
    username: "staff2",
    email: "staff2@mail.com",
    password: "password",
}

let access_token;

describe("POST /register", ()=> {
    describe("Success",()=>{
        test("should return status 201 and object of new user", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                .send(new_user)
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("email", new_user.email)
        })
    })

    describe("Failed", ()=>{
        test("should return status 400 when email is required", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                
                .send({
                    username: new_user.username, 
                    password: new_user.password, 
                    
                })
            
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required")
        })

        test("should return status 400 when password is required", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                
                .send({
                    username: new_user.username, 
                    email: new_user.email,
                    
                })
            
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required")
        })

        test("should return status 400 when email is not empty string", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                
                .send({
                    username: new_user.username,
                    email: "",
                    password: new_user.password, 
                    
                })
            
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required")
        })

        test("should return status 400 when password is not empty string", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                
                .send({
                    username: new_user.username,
                    email: new_user.email,
                    password: "",
                   
                })
            
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required")
        })

        test("should return status 400 when email is already registered", async ()=>{
            let {status, body} = await request(app)
                .post("/register")
                .send({
                    username: new_user_3.username, 
                    email: new_user.email, 
                    password: new_user.password,
                })
            
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email must be unique")
        })


    })
})

describe("POST /login", ()=>{
    describe("Success", ()=> {
        test("should return status 200 and object of access_token", async()=>{
            let {status, body} = await request(app)
            .post("/login")
            .send({
                email: new_user_2.email,
                password: new_user_2.password
            });

            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String))
        })
    })

    describe("Failed", ()=>{
        test("should return status 400 when email is required", async ()=>{
            let {status,body} = await request(app)
            .post("/login")
            .send({
                password: new_user_2.password
            })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required")
        })

        test("should return status 400 when password is required", async ()=>{
            let {status,body} = await request(app)
            .post("/login")
            .send({
                email: new_user_2.email
            })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required")
        })

        test("should return status 400 when invalid email format", async ()=>{
            let {status,body} = await request(app)
            .post("/login")
            .send({
                email: !new_user_2.email,
                password: new_user_2.password
            })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required")
        })

        test("should return status 400 when password not match", async ()=>{
            let {status,body} = await request(app)
            .post("/login")
            .send({
                email: new_user_2.email,
                password: !new_user_2.password
            })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required")
        })
    })
})

beforeAll(async ()=>{
    try {
        await queryInterface.bulkInsert("Users", [
            { 
                username: new_user_2.username,
                email: new_user_2.email,
                password: hashPassword(new_user_2.password),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])

        access_token = signToken({id: 1})
    } catch (error) {
        console.log(error, "user");
    }
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})