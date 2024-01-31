

import { ThemeProvider } from "@/components/providers/theme-provider";
import { getUserTheme } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";


export default async function ChooseTheme({ children, className }: { children: React.ReactNode, className: string }) {
  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string
  const themChoose = await getUserTheme(userId)

  return (
    <body className={`${className} ${themChoose && themChoose.colorScheme || "theme-violet"}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  )
}