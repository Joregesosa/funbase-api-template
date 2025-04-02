import { Users } from "#modules/Users/Model.js";
import config from "#config/index.js";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";


async function login(req, res, next) {
  try {
    const { jwtSecret } = config;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ 
      status: "ok",
      message: "Login successful",
      token, 
    });

  } catch (error) {
    next(error);
  }
} 

async function changePassword(req, res, next) {

  try {
    const { id } = req.auth;
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const validPassword = await compare(oldPassword, user.password);
    if (!validPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    await user.update({ password: newPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }

}

async function register(req, res, next) {
  try {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hash(password, 10);
    await Users.create({ name, lastname, email, password: hashedPassword });

    res.status(201).json({
      status: "ok",
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}


export { login, changePassword, register, logout };