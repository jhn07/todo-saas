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

  try {
    if (!userId) throw new Error("Not authorized")

    const { title, description } = Object.fromEntries(
      formData.entries()
    ) as { title: string, description: string }

    await prisma.note.create({
      data: {
        userId: userId,
        title: title,
        description: description
      }
    })

    revalidatePath("/dashboard")
    return redirect("/dashboard")
  } catch (error) {
    handleError(error)
  }
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

export async function updateNote(userId: string, noteId: string, formData: FormData) {

  try {
    if (!userId) throw new Error("Not authorized")

    const { title, description } = Object.fromEntries(
      formData.entries()
    ) as { title: string, description: string }

    await prisma.note.update({
      where: { id: noteId, userId: userId },
      data: {
        title: title,
        description: description
      }
    })

    revalidatePath("/dashboard")
    return redirect("/dashboard")
  } catch (error) {
    handleError(error)
  }
}

export async function deleteNote(formData: FormData) {
  try {
    const noteId = formData.get("noteid") as string

    const delNote = await prisma.note.delete({
      where: { id: noteId }
    })

    if (!delNote) throw new Error("Note note found")

    console.log(`Note ${delNote.id} Deleted`)
    revalidatePath("/dashboard")
  } catch (error) {
    handleError(error)
  }
} 