# MedShop API Documentation

## Deployed server
- url : [https://medshop.carloshakim.online/](https://medshop.carloshakim.online/)

&nbsp;

## Models :

User
```
- username: string
- email: string,required,unique
- password: string, required
```

Product
```
- name: string, required
- price: integer, required
- description: string, required
- imageUrl: string, required
- usage: string, required
```

Cart
```
- userId: integer, required
- productId: integer, required
- quantity: integer, default: 0
```

Proof
```
- imageUrl: string, required
- userId: integer, required
```

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /public/products`
- `GET /public/products/:id`

Routes below need authentication:

- `GET /products`
- `GET /products/:id`
- `GET /cart`
- `GET /cart/:id`
- `POST /cart`
- `PUT /cart/:id`
- `DELETE /cart/:id`
- `POST /proof`

&nbsp;

## 1. POST /register

Request

-body
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Full Name is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "token": "<token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /public/products

Description:
- Fetch all products in database.

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "imageUrl": "string",
    "description": "string",
    "usage": "string"
  },
]
```

&nbsp;

## 4. GET /public/products/:id

Description:
- Fetch products by id in database.

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "imageUrl": "string",
    "description": "string",
    "usage": "string"
  },
]
```

&nbsp;

## 5. GET /products

Description:
- Fetch all products in logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "imageUrl": "string",
    "description": "string",
    "usage": "string"
  },
]
```

&nbsp;

## 6. GET /products/:id

Description:
- Fetch all products by id in logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "name": "string",
    "price": "integer",
    "imageUrl": "string",
    "description": "string",
    "usage": "string"
  },
]
```

&nbsp;

## 7. GET /cart

Description:
- Fetch all cart in logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "quantity": "integer"
  },
]
```

&nbsp;

## 8. GET /cart/:id

Description:
- Fetch all cart by id to logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "quantity": "integer"
  },
]
```

&nbsp;

## 9. POST /cart

Description:
- Add cart to the logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (201 - OK)_
```json
[
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "quantity": "integer"
  },
]
```

Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 10. PUT /cart/:id

Description:
- Update cart by id to the logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
  "quantity": "integer"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "quantity": "integer"
  },
]
```

Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 11. DELETE /cart/:id

Description:
- Delete cart by id to the logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
[
  {
    "message": "Item has been deleted"
  },
]
```

Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 12. POST /cart

Description:
- Add proof to the logged-in user's.

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (201 - OK)_
```json
[
  {
    "imageUrl": "string"
  },
]
```

Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```