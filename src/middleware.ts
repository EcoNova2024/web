import { type NextRequest, NextResponse } from "next/server"
import { verifyAndGetSession } from "@/lib/session"

const protectedRoutes = ["/home"]
const publicRoutes = ["/login", "/register", "/password-forgotten", "/reset"]

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  let isProtectedRoute = false
  let isPublicRoute = false

  protectedRoutes.map((route) => {
    if (currentPath.startsWith(route)) {
      isProtectedRoute = true
    }
  })

  publicRoutes.map((route) => {
    if (currentPath.startsWith(route)) {
      isPublicRoute = true
    }
  })

  if (isProtectedRoute || isPublicRoute) {
  const session = await verifyAndGetSession();
  
  console.log("Middleware - Session:", session);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
}


  return NextResponse.next()
}
