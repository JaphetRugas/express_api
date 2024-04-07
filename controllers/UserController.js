const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Validate if the provided ID is valid
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUser(req, res) {
    try {
      const { email, firstName, lastName } = req.body;

      // Check if any required field is missing
      if (!email || !firstName || !lastName) {
        return res.status(400).json({ error: "Incomplete user information" });
      }

      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllUsers(req, res) {
    try {
      const usersCount = await prisma.user.count();
      if (usersCount === 0) {
        return res.status(200).json({ message: "No users found to delete" });
      }
      await prisma.user.deleteMany();
      res.json({ message: "All users deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteUserById(req, res) {
    try {
      const { id } = req.params;

      // Validate if the provided ID is valid
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Delete the user
      await prisma.user.delete({
        where: {
          id,
        },
      });

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateUserById(req, res) {
    try {
      const { id, email, firstName, lastName } = req.body;

      // Validate if the provided ID is valid
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Check if any required field is missing
      if (!id || !email || !firstName || !lastName) {
        return res.status(400).json({ error: "Incomplete user information" });
      }

      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the email is already in use by another user
      const userWithSameEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: {
              equals: id,
            },
          },
        },
      });

      if (userWithSameEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Update the user
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          firstName,
          lastName,
        },
      });

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
