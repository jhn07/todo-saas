"use server";

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { handleError } from "../utils";

export async function getAllNotes(userId: string) {
  if (!userId) return

  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        Notes: true,
        Subscription: {
          select: {
            status: true
          }
        }
      }
    })

    return data
  } catch (error) {
    handleError(error)
  }
}

export async function createNote(userId: string, formData: FormData) {

  if (!userId) throw new Error("Not authorized")

  const { title, description } = Object.fromEntries(
    formData.entries()
  ) as { title: string, description: string }

  const note = await prisma.note.create({
    data: {
      userId: userId,
      title: title,
      description: description
    }
  })

  console.log(`Note created ${note.id}`)
  revalidatePath("/dashboard")
  return redirect("/dashboard")
}

export async function getNoteById({ userId, noteId }: { userId: string, noteId: string }) {
  try {
    const data = await prisma.note.findUnique({
      where: { userId: userId, id: noteId, },
      select: { title: true, description: true, id: true }
    })

    return data
  } catch (error) {
    handleError(error)
  }

}

export async function updateNote(noteId: string, userId: string, formData: FormData) {

  if (!userId) return

  const { title, description } = Object.fromEntries(
    formData.entries()
  ) as { title: string, description: string }

  const note = await prisma.note.update({
    where: { id: noteId, userId: userId },
    data: { title: title, description: description }
  })

  console.log(`Updated note ${note.id}`)
  revalidatePath("/dashboard")
  return redirect("/dashboard")
}

export async function deleteNote(formData: FormData) {
  try {
    const noteId = formData.get("noteid") as string

    const delNote = await prisma.note.delete({
      where: { id: noteId }
    })

    if (!delNote) throw new Error("Note note found")

    console.log(`Note Deleted ${delNote.id}`)
    revalidatePath("/dashboard")
  } catch (error) {
    handleError(error)
  }
} 