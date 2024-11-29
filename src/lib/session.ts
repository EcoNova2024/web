import "server-only"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.JWT_SECRET)

const cookieConfig = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 3 * 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(key)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(token: string) {
  const expires = new Date(Date.now() + cookieConfig.duration)
  ;(await cookies()).set({
    name: cookieConfig.name,
    value: token,
    httpOnly: true,
    secure: true,
    expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  (await cookies()).delete(cookieConfig.name)
}

export async function getJWTPayload() {
  const sessionCookie = (await cookies()).get(cookieConfig.name)?.value
  if (!sessionCookie) return null
  return decrypt(sessionCookie)
}

export async function verifyAndGetSession() {
  const sessionCookie = (await cookies()).get(cookieConfig.name)?.value
  if (!sessionCookie) return null
  const payload = await decrypt(sessionCookie)
  return payload
}
