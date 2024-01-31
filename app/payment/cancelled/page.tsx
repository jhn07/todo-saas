import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CancelledRoute() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XIcon className="h-12 w-12 rounded-full bg-red-500/30 text-red-600 p-2" />
          </div>
          <div className="w-full mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium">Payment failed</h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground font-semibold">No worries, you wont be charged. Please try again</p>
            </div>
          </div>
          <div className="w-full mt-5 sm:mt-6">
            <Link href="/dashboard" className={buttonVariants({ variant: "outline", className: "w-full" })}>
              Go back to Dashboard
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
