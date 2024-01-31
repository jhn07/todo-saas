import Stripe from "stripe"

export const stripe = new Stripe(process.env.SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true
})

type GetStripeSession = { priceId: string, domainUrl: string, customerId: string }


export const getStripeSession = async ({ priceId, domainUrl, customerId }: GetStripeSession) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    payment_method_types: ["card"],
    customer_update: {
      name: "auto",
      address: "auto"
    },
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  })

  return session.url as string
}