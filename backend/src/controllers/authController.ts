import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../types/authSchema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const register = async (c: Context) => {
  try {
    const body = await c.req.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) return c.json({ message: "Email already registered" }, 400);

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, password: hashed },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return c.json({ message: "User created successfully", user }, 201);
  } catch (err) {
    if (err instanceof ZodError)
      return c.json({ message: err.issues[0].message }, 400); // ✅ pakai issues
    console.error(err);
    return c.json({ message: "Registration failed" }, 500);
  }
};

export const login = async (c: Context) => {
  try {
    const body = await c.req.json();
    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return c.json({ message: "Invalid credentials" }, 401);

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return c.json({ message: "Invalid credentials" }, 401);

    const token = signToken({ id: user.id, email: user.email });
    return c.json(
      {
        message: "Login success",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      },
      200
    );
  } catch (err) {
    if (err instanceof ZodError)
      return c.json({ message: err.issues[0].message }, 400); // ✅ pakai issues
    console.error(err);
    return c.json({ message: "Login failed" }, 500);
  }
};
