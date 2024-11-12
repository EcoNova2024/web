import { Metadata } from "next"
import PasswordForgottenEmailVerificationPage from "@/components/pages/auth/password-forgotten-email-verification/PasswordForgottenEmailVerificationPage"

export const metadata: Metadata = {
  title: "Eposta Doğrulama",
}

const Page = ({ params }: { params: { email: string } }) => {
  const decodedEmail = decodeURIComponent(params.email)
  return <PasswordForgottenEmailVerificationPage email={decodedEmail} />
}

export default Page