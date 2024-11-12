import LoginPage from "@/pages/auth/login"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Giriş Yap",
}

const Page = () => {
  return <LoginPage />
}

export default Page
