# HNG Stage 2 Usage Guide

This documentation will walk you through the setup, running, and usage of the API. The API allows you to create, read, update, and delete person records.

## Task Objective

The objective of this task is to build a simple REST API capable of performing CRUD (Create, Read, Update, Delete) operations on a "person" resource, interfacing with a database of your choice. This API should dynamically handle parameters such as adding or retrieving a person. Accompany the development with UML diagrams to represent your system's design and database structure. Host the entire project on GitHub and provide well-structured documentation in the repository that outlines request/response formats, setup instructions, and sample API usage.

## Table of Contents

1. [UML Sequence Diagram](#sequence)
2. [Prerequisites](#prerequisites)
3. [Set up Database ](#set-up-database)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the API](#running-the-api)
7. [API Endpoints](#api-endpoints)
   - [Create a Person](#create-a-person)
   - [Get a Person](#get-a-person)
   - [Update a Person](#update-a-person)
   - [Delete a Person](#delete-a-person)
8. [Sample Usage](#sample-usage)
   - [Create a Person](#create-a-person-example)
   - [Get a Person](#get-a-person-example)
   - [Update a Person](#update-a-person-example)
   - [Delete a Person](#delete-a-person-example)
9. [Limitations and Assumptions](#limitations-and-assumptions)
10. [Local Setup and Deployment](#local-setup-and-deployment)

---

## 1. UML Sequence Diagram <a name="sequence"></a>

Follow this link to view the the sequence diagram: https://github.com/oluwasemilorebadejo/hng-stage-2/blob/main/assets/uml-sequence-diagram.png

## 2. Prerequisites <a name="prerequisites"></a>

Before setting up and running the API, ensure that you have the following prerequisites installed on your system:

- Node.js (v12 or higher)
- MongoDB (v4 or higher)

## 3. Set up Database <a name="set-up-database"></a>

To create and set up a MongoDB cluster on Atlas, kindly follow the official documentation: https://www.mongodb.com/docs/atlas/getting-started/

## 4. Installation <a name="installation"></a>

To install the API and its dependencies, follow these steps:

1. Clone the repository:

   `git clone https://github.com/oluwasemilorebadejo/hng-stage-2.git`

2. Change to the project directory:

   `cd <hng-stage-2>`

3. Install the Node.js dependencies:

   `npm install`

## 5. Configuration <a name="configuration"></a>

You may need to configure environment variables to customize the API's behavior. Create a `config.env` file in the project root and specify the following variables:

```
NODE_ENV=development # Set to "production" for production environment
PORT=3000 # Port on which the API will run
DATABASE= # MongoDB connection URL
DATABASE_PASSWORD= # MongoDB cluster password
```

Ensure that you replace `DATABASE` with the correct MongoDB connection URL.

## 6. Running the API <a name="running-the-api"></a>

To start the API, run the following command:

`npm start`

This command will start the API in development mode if you set `NODE_ENV=development` in the `.env` file. For production deployment, set run `npm run start:prod`.

## 7. Endpoints

### Create a Person

- **Endpoint:** `/api`
- **HTTP Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Response (Success):**

  ```json
  {
    "status": "success",
    "data": {
      "person": {
        "name": "John Doe",
        "_id": "64ff7262cd4777be531c6da9"
      }
    }
  }
  ```

- **Response (Error):**
  - HTTP Status Code: 409 Conflict if a person with the same name already exists.
  - HTTP Status Code: 400 Bad Request if the request body isn't a string.

### Get a Person

- **Endpoint:** `/api/:id`
- **HTTP Method:** `GET`
- **Response (Success):**
  ```json
  {
    "status": "success",
    "data": {
      "person": {
        "_id": "64ff7262cd4777be531c6da9",
        "name": "John Doe"
      }
    }
  }
  ```
- **Response (Error):**
  - HTTP Status Code: 404 Not Found if no person with the provided `id` exists.

### Update a Person

- **Endpoint:** `/api/:id`
- **HTTP Method:** `PATCH`
- **Request Body:**
  ```json
  {
    "name": "Jo Doe"
  }
  ```
- **Response (Success):**

  ```json
  {
    "status": "success",
    "data": {
      "person": {
        "_id": "64ff7262cd4777be531c6da9",
        "name": "Jo Doe"
      }
    }
  }
  ```

- **Response (Error):**
  - HTTP Status Code: 404 Not Found if no person with the provided `id` exists.
  - HTTP Status Code: 400 Bad Request if the request body isn't a string.

### Delete a Person

- **Endpoint:** `/api/:id`
- **HTTP Method:** `DELETE`
- **Response (Success):**

  ```json

  ```

- **Response (Error):**
  - HTTP Status Code: 404 Not Found if no person with the provided `id` exists.

## 8. Sample Usage

### Create a Person (Example)

**Request:**

```json
POST /api
Content-Type: application/json

{
    "name": "John Doe"
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "data": {
    "person": {
      "name": "John Doe",
      "_id": "64ff7262cd4777be531c6da9"
    }
  }
}
```

**Response (409 Conflict - Name Already Exists):**

```json
{
  "status": "fail",
  "message": "Name already exists. Kindly use a different name"
}
```

### Get a Person (Example)

**Request:**

`GET /api/id`

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "person": {
      "_id": "64ff7262cd4777be531c6da9",
      "name": "John Doe"
    }
  }
}
```

**Response (404 Not Found):**

```json
{
  "status": "fail",
  "message": "There is no person with the id that you provided"
}
```

### Update a Person (Example)

**Request:**

```json
PATCH /api/id
Content-Type: application/json

{
"name": "Jo Doe"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "person": {
      "_id": "64ff7262cd4777be531c6da9",
      "name": "Jo Doe"
    }
  }
}
```

**Response (404 Not Found):**

```json
{
  "status": "fail",
  "message": "There is no person with the id that you provided"
}
```

### Delete a Person (Example)

**Request:**

`DELETE /api/id`

**Response (204 No Content):**

```

```

**Response (404 Not Found):**

```json
{
  "status": "fail",
  "message": "There is no person with the id that you provided"
}
```

## 9. Limitations and Assumptions

- The API assumes that each person is identified by a unique `id` generated by MongoDB.
- It assumes that the request and response bodies are in JSON format.
- Error responses are generally returned with appropriate HTTP status codes and error messages.
- The API does not include pagination or sorting for listing multiple persons. It returns all records at once, which may not be efficient for large datasets.

## 10. Local Setup and Deployment

To set up and deploy the API locally or on a server, follow these steps:

1. Clone the GitHub repository containing the code.
2. Install Node.js and npm if not already installed.
3. Run `npm install` to install the required dependencies.
4. Set up a MongoDB database and configure the connection in `server.js` by specifying the database URL.
5. Start the API by running `npm start`.
6. The API will be accessible at `http://localhost:3000`.

Ensure that you have MongoDB running and accessible for the API to work correctly. Make sure to set environment variables, such as `NODE_ENV`, for different deployment environments (e.g., development, production) as needed.
