// backend/src/controllers/authController.ts
import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (c: Context) => {
  const { name, email, password } = await c.req.json();
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });
  return c.json({ message: "User created", user });
};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ message: "Invalid credentials" }, 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return c.json({ message: "Invalid credentials" }, 401);

  const token = signToken({ id: user.id, email: user.email });
  return c.json({ token, user });
};
