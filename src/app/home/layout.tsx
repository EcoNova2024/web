import ResponsiveNavigation from "@/components/navigation"
export const metadata = {
  title: "RENOVA",
  description: "Renova is a repair service for your home appliances.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <ResponsiveNavigation />
      {children}
    </main>
  )
}
