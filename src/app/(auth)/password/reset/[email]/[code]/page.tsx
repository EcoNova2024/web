import { Metadata } from "next"
import ResetPasswordForm from "@/components/pages/auth/reset/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Şifremi Sıfırla",
}

const Page = ({ params }: { params: { email: string, code: string } }) => {
  params.email = decodeURIComponent(params.email)
  return <ResetPasswordForm {...params} />
}

export default Page
