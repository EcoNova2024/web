import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.JWT_SECRET)

const cookieConfig = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 3 * 24 * 60 * 60 * 1000,
}


export async function createSession(token: string) {
  ;(await cookies()).set({
    name: cookieConfig.name,
    value: token,
    httpOnly: true,
    secure: true,
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
  return (sessionCookie)
}

export async function verifyAndGetSession() {
  const sessionCookie = (await cookies()).get(cookieConfig.name)?.value
  console.log("sessionCookie", sessionCookie)
  if (!sessionCookie) return null
  const payload = await (sessionCookie)
  return payload
}
