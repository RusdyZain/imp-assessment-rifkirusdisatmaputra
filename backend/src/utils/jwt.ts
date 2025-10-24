import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: object) =>
  jwt.sign(payload, SECRET, { expiresIn: "2h" });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    throw new Error("Invalid token");
  }
};
