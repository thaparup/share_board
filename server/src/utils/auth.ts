export const COOKIE = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: Number(process.env.JWT_EXP),
} as object;

export const COOKIE_NAME = "session";

export const ALG = "HS256";
export const KEY = new TextEncoder().encode(process.env.SECRET_TOKEN);
