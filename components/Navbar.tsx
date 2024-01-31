import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import UserNav from "./UserNav";



export default async function Navbar() {

  return (
    <header className="h-[10vh] flex items-center border-b bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">Dvv<span className="text-primary">Saas</span></h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <SignedOut>
            <div className="flex items-center gap-x-3">
              <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>Login</Link>
              <Link href="/sign-up" className={buttonVariants({ variant: "secondary" })}>Sign Up</Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-x-3">
              <ThemeToggle />
              <UserNav />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
