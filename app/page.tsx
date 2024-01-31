import { buttonVariants } from "@/components/ui/button"
import { SignedIn, SignedOut, auth } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <section className="h-[90vh] flex items-center justify-center bg-background">
      <div className="w-full relative max-w-7xl mx-auto items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">Sort your notes easily</span>
            </span>
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">Create Notes with ease</h1>
            <p className="mt-8 max-w-xl mx-auto text-base text-secondary-foreground lg:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, harum totam! Veritatis voluptatum?
            </p>
          </div>
          <div className="mt-10 max-w-sm mx-auto flex justify-center">
            <SignedOut>
              <Link href="/sign-up" className={buttonVariants({ size: "lg", className: "w-full" })}>
                Sign Up for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "flex items-center" })}>
                dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  )
}
