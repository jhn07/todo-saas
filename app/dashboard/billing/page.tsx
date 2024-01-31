import { StripeSubscriptionCreationButton } from "@/components/SubmitButton"
import SubscriptionPlanInfo from "@/components/SubscriptionPlanInfo"
import { Card, CardContent } from "@/components/ui/card"
import { createCustomerPortal, createSubscriptionPlan, getUserSubscriptionPlan } from "@/lib/actions/subscription.action"
import { auth } from "@clerk/nextjs"
import { CheckCircle2 } from "lucide-react"


const futureItems = [
  { name: "Lorem ipsum somthing" },
  { name: "Lorem ipsum somthing" },
  { name: "Lorem ipsum somthing" },
  { name: "Lorem ipsum somthing" },
  { name: "Lorem ipsum somthing" },
]

export default async function BillingPage() {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const userSubscriptionPlan = await getUserSubscriptionPlan(userId)
  const createSubscription = createSubscriptionPlan.bind(null, userId)
  const stripeCustomerPortal = createCustomerPortal.bind(null, userSubscriptionPlan?.user.stripeCustomerId as string)


  if (userSubscriptionPlan && userSubscriptionPlan.status === "active") {
    return (
      <SubscriptionPlanInfo stripeCustomerPortal={stripeCustomerPortal} />
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            30$ <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">Write as many notes as you want for 30$ Month</p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {futureItems.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-base ml-3">{item.name}</p>
              </li>
            ))}
          </ul>
          <form action={createSubscription} className="w-full">
            <StripeSubscriptionCreationButton />
          </form>
        </div>
      </Card>
    </div>
  )
}
