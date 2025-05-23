# Shop Inventory API

## Description

This project is a RESTful API built with NestJS for managing products and catalogs in a shop inventory system. It allows CRUD operations on products and catalogs, with the ability to assign products to multiple catalogs and remove them as needed. The API is documented with Swagger for easy testing and exploration.

## Technologies Used

- **NestJS** — framework for building efficient, scalable Node.js server-side applications.
- **TypeORM** — ORM for TypeScript and JavaScript, used here with PostgreSQL for database management.
- **PostgreSQL** — relational database for storing products and catalogs data.
- **Swagger** — API documentation and testing interface.
- **@nestjs/throttler** — rate limiting to protect the API from abuse and DDOS attacks.
- **dotenv** — to manage environment variables securely.
- **Git & GitHub** — version control and remote repository hosting.
- **Railway.app** — platform for deploying the application and PostgreSQL database.

## Features

- Create, read, update, and delete products and catalogs.
- Assign products to multiple catalogs and remove them.
- Seed service to pre-populate the database with sample data.
- Rate limiting enabled to avoid excessive requests.
- Swagger UI available at `/api` endpoint for interactive API testing.

## Installation and Setup

1. Clone the repository.
2. Create a `.env` file in the root with your database URL, e.g.:
   DATABASE_URL=postgresql://user:password@host:port/dbname
3. Run `npm install` to install dependencies.
4. Run `npm run start:dev` to start the development server.
5. Open `http://localhost:3000/api` to view Swagger documentation and test endpoints.

---

## Remote Deployment (Railway)

The project is deployed on Railway platform at:

- **API:** `https://inventory-task-production.up.railway.app`
- **Swagger:** `https://inventory-task-production.up.railway.app/api`

---

## Example Endpoints

| Method | Endpoint                            | Description                    |
| ------ | ----------------------------------- | ------------------------------ |
| GET    | `/products`                         | Get all products               |
| POST   | `/products`                         | Create a new product           |
| PUT    | `/products/:id`                     | Update a product               |
| DELETE | `/products/:id`                     | Delete a product (returns 204) |
| POST   | `/products/:id/catalogs/:catalogId` | Assign product to a catalog    |
| DELETE | `/products/:id/catalogs/:catalogId` | Remove product from a catalog  |
| GET    | `/catalogs`                         | Get all catalogs               |

---

## Rate Limiting

The API is protected with a rate limit of 10 requests per 60 seconds per client to prevent overload and potential DDoS attacks.

---

## Deployment

The project is deployed on Railway.app with a connected PostgreSQL database.

### Live API URL

- Base URL: [App on Railway](https://your-railway-app-url.up.railway.app)

### Swagger UI

- Documentation and testing available at: [Swagger](https://your-railway-app-url.up.railway.app/api)

## Author

Kamil Sulgut

---

## Contact

Questions? Reach out at: kamil@gmail.com

---

Thank you for using and testing this API!
"""
