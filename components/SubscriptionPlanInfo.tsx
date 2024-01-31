import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { StripePortal } from "./SubmitButton";

export default function SubscriptionPlanInfo({ stripeCustomerPortal }: { stripeCustomerPortal: () => void }) {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Subscription</h1>
          <p className="text-lg text-muted-foreground">Settings reagding your subscription</p>
        </div>
      </div>
      <Card className="w-full lg:w-2/3">
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button bellow, this will give you the opportunity to
            change your payment details and view your statement at the same time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={stripeCustomerPortal}>
            <StripePortal />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
