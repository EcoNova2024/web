import PasswordForgottenForm from "@/components/pages/auth/password-forgotten/PasswordForgottenForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
}

const Page = () => {
  return <PasswordForgottenForm />
}

export default Page
