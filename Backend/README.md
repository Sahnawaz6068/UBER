# User Registration API

## Endpoint

**POST** `/users/register`

Registers a new user into the system.

---

## Request Headers

- `Content-Type: application/json`

---

## Request Body

| Field                | Type     | Required | Description                                  |
|-----------------------|----------|----------|----------------------------------------------|
| `fullname.firstname` | `string` | Yes      | User’s first name (min 3 characters).        |
| `fullname.lastname`  | `string` | No       | User’s last name (min 3 characters if given).|
| `email`              | `string` | Yes      | Must be a valid email address.               |
| `password`           | `string` | Yes      | Password (min 6 characters).                 |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response 201
``` JSON
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGM2ZjdmZWQ4YTY1YmQxM2JmYzUyZjgiLCJpYXQiOjE3NTc4NzAwNzh9.oMKFSi8ZrvnbL_gAd6jXusOawXo4AMXxNWLacJDrLAc",
  "user": {
    "fullname": {
      "firstname": "Sahnawaz",
      "lastname": "hussain"
    },
    "email": "sahnawaz@gmail.com",
    "password": "$2b$10$ifjnIEmZjmKJ8APBxSIMsOUVfNEJDSDq/xBR5czEE.oDAs1U6Z0Qq",
    "_id": "68c6f7fed8a65bd13bfc52f8",
    "__v": 0
  }
}
```
# Login Endpoint Documentation

## Endpoint
- **URL:** `/users/login`
- **Method:** `POST`

## Description
This endpoint authenticates a user using their email and password. Upon successful authentication, a JSON Web Token (JWT) and user details are returned.

## Request Headers
- **Content-Type:** `application/json`

## Request Body Parameters
- **email** (string, required): The email address of the user.
- **password** (string, required): The user's password.

### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "mySecretPassword"
} 
```


### Example Response Body
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "_id": "62f0c8a4f123abcde4567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "socketId": "optional-socket-id" //Optional
  }
}
```

## Login Endpoint

### URL
`/users/login`

### Method
`POST`

### Description
Authenticates a user using email and password. If the credentials are valid, it returns a JSON Web Token (JWT) and the user details.

### Request Headers
- `Content-Type: application/json`

### Request Body Parameters
- **email** (string, required): User's email address.
- **password** (string, required): User's password.

#### Example Request Body
```json
{
    "email": "user@example.com",
    "password": "mySecretPassword"
}
```
## Captains rouetes
# Captain Registration Endpoint Documentation

## Endpoint

- **URL:** `/captains/register`
- **Method:** `POST`

## Description

This endpoint registers a new captain. It validates the input, hashes the password, creates the captain record, and returns a JSON Web Token (JWT) along with the created captain details.

## Request Headers

- `Content-Type: application/json`

## Request Body Parameters

- **fullname:**
  - **firstname** (string, required): Captain's first name (minimum 3 characters).
  - **lastname** (string, required): Captain's last name.
- **email** (string, required): A valid email address.
- **password** (string, required): A strong password. (The validator checks for a strong password.)
- **vehicle:**
  - **color** (string, required): The color of the vehicle (minimum 3 characters).
  - **plate** (string, required): The vehicle plate number.
  - **capacity** (integer, required): The capacity of the vehicle (must be at least 1).
  - **vehicleType** (string, required): Must be one of the following values: `car`, `motorcycle`, `auto`.

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongP@ssw0rd!",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}

Success Response
HTTP 201 - Created

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "62f0c8a4f123abcde4567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ... any additional fields
  }
}
```
Error Responses
HTTP 400 - Bad Request
 ```
 {
  "success": false,
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
HTTP 500 - Internal Server Error
In case of a server error, you'll receive:
```
{
  "success": false,
  "message": "Server error"
}
```


# Captain Login Endpoint

## Endpoint

- **URL:** `/captains/login`
- **Method:** `POST`

## Description

Authenticates a captain using email and password. Returns a JWT token and captain details if credentials are valid.

## Request Headers

- `Content-Type: application/json`

## Request Body Parameters

| Field     | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| email     | string | Yes      | Captain's email address |
| password  | string | Yes      | Captain's password      |

### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "StrongP@ssw0rd!"
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "62f0c8a4f123abcde4567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

- **400 Bad Request:** Validation errors
- **404 Not Found:** Invalid email or password

---

# Captain Profile Endpoint

## Endpoint

- **URL:** `/captains/profile`
- **Method:** `GET`
- **Authentication:** Required (JWT token in `Authorization` header or cookie)

## Description

Returns the authenticated captain's profile information.

## Request Headers

- `Authorization: Bearer <token>` (or via cookie)

### Example Success Response

```json
{
  "profile": {
    "_id": "62f0c8a4f123abcde4567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

- **401 Unauthorized:** Missing or invalid token

---

# Captain Logout Endpoint

## Endpoint

- **URL:** `/captains/logout`
- **Method:** `GET`
- **Authentication:** Required (JWT token in `Authorization` header or cookie)

## Description

Logs out the authenticated captain by blacklisting the current token and clearing the cookie.

## Request Headers

- `Authorization: Bearer <token>` (or via cookie)

### Example Success Response

```json
{
  "msg": "Hay captain You are logout"
}
```

### Error Responses

- **401 Unauthorized:** Missing or invalid token

---