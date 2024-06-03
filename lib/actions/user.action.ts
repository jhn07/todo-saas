"use server";

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe"

type CreateUserParams = {
  id: string
  name: string
  email: string
}

export async function createNewuser(user: CreateUserParams) {

  const findUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { stripeCustomerId: true }
  })

  if (!findUser) {

    const data = await stripe.customers.create({
      email: user.email
    })

    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        stripeCustomerId: data.id
      }
    })

    console.log(`User Created ${newUser.name}`)
    console.log(`User CustomerId ${newUser.stripeCustomerId}`)
    return newUser
  }


  return findUser
}

export async function updatedUser(userId: string, user: { name: string, email: string }) {
  const findUser = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!findUser) throw new Error("User not found")

  const updateUser = await prisma.user.update({
    where: { id: findUser.id },
    data: {
      name: user.name,
      email: user.email
    }
  })
  return updateUser
}

export async function deletedUser(userId: string) {

  const findUser = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!findUser) throw new Error("User not found")

  const deleteUser = await prisma.user.delete({
    where: { id: findUser.id }
  })

  return deleteUser
}

export async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, colorScheme: true }
  })

  revalidatePath("/dashboard/settings")
  return data
}

export async function updateUserData(userId: string, formData: FormData) {

  const name = formData.get("name") as string
  const colorScheme = formData.get("color") as string

  await prisma.user.update({
    where: { id: userId },
    data: { name: name, colorScheme: colorScheme }
  })

  revalidatePath("/dashboard/settings")
}

export async function getUserTheme(userId: string) {

  if (!userId) return

  const userTheme = await prisma.user.findUnique({
    where: { id: userId },
    select: { colorScheme: true }
  })
  revalidatePath("/", "layout")
  return userTheme
}