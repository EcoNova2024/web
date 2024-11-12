"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Phone, ShoppingBasket } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import UserAvatarMenu from "./user-avatar"
import { ModeToggle } from "./theme-button"

const navItems = [
  { name: "Anasayfa", href: "/home/", icon: Home },
  { name: "Market", href: "/home/market", icon: ShoppingBasket },
  { name: "Hakkımızda", href: "/home/about", icon: Info },
  { name: "İletişim", href: "/home/contact", icon: Phone },
]

export default function ResponsiveNavigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Navigation for larger screens */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2 rounded-full overflow-hidden"
              />
              <span className="text-xl font-bold">RENOVA</span>
            </Link>
          </div>
          <ul className="flex justify-end items-center h-16 space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <UserAvatarMenu />
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>

      {/* Bottom Navigation for mobile */}
      <nav
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border transition-all duration-300 ease-in-out z-50",
          isScrolled ? "translate-y-full" : "translate-y-0"
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="fixed top-0 left-0 p-2">
        <UserAvatarMenu />
      </div>
    </>
  )
}
