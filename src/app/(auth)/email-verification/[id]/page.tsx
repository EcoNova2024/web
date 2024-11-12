import { Metadata } from "next"
import EmailVerificationPage from "@/components/pages/auth/email-verification/EmailVerificationPage"

export const metadata: Metadata = {
  title: "Eposta Doğrulama",
}

const Page = ({ params }: { params: { id: string } }) => {
  return <EmailVerificationPage userId={params.id} />
}

export default Page
