---

# ExpressAPI

ExpressAPI is a simple CRUD (Create, Read, Update, Delete) API built using Express.js, Prisma ORM, and MongoDB. It provides endpoints to manage user data stored in a MongoDB database.

## Features

- RESTful API endpoints for managing users
- MongoDB database integration with Prisma ORM
- Error handling for various scenarios, including invalid input and duplicate entries
- Easily extendable and customizable for future enhancements

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies:

```bash
npm install
```

3. Set up Prisma:

```bash
npx prisma generate
```

4. Start the server:

```bash
npm start
```

## Usage

- Use tools like Postman or curl to send HTTP requests to the defined endpoints.
- Documentation for API endpoints:

  - **GET /user**: Retrieves all users from the database.
  - **GET /user/:id**: Retrieves a specific user by their ID.
  - **POST /user**: Creates a new user.
  - **PUT /user**: Updates an existing user's information.
  - **DELETE /user**: Deletes all users from the database.
  - **DELETE /user/:id**: Deletes a specific user by their ID.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any enhancements or fixes.
