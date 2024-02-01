"use server";

import prisma from "@/lib/db"

import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { getStripeSession } from "../stripe";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe"


export async function getUserSubscriptionPlan(userId: string) {
  try {
    const data = await prisma.subscription.findUnique({
      where: { userId: userId },
      select: {
        status: true,
        user: { select: { stripeCustomerId: true } }
      }
    })


    revalidatePath("dashboard/billing")
    return data
  } catch (error) {
    handleError(error)
  }
}

export async function createSubscriptionPlan(userId: string) {

  const dataUser = await prisma.user.findUnique({
    where: { id: userId as string },
    select: { stripeCustomerId: true }
  })

  if (!dataUser?.stripeCustomerId) throw new Error("Unable to get customer id")

  const subscriptionUrl = await getStripeSession({
    customerId: dataUser.stripeCustomerId,
    domainUrl: `https://todo-saas.vercel.app`,
    priceId: process.env.STRIPE_PRICE_ID!
  })


  return redirect(subscriptionUrl)
}

export async function createCustomerPortal(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "https://todo-saas.vercel.app/dashboard"
  })

  return redirect(session.url)
}