import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/SubmitButton'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import { getNoteById, updateNote } from '@/lib/actions/note.action'

export default async function NoteId({ params }: { params: { id: string } }) {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string


  const data = await getNoteById({ userId: userId, noteId: params.id })
  const updatedNote = updateNote.bind(null, params.id, userId)

  return (
    <Card>
      <form action={updatedNote}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>Right here you can now edit your note</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input required
              type="text"
              name="title"
              placeholder="Title for your notes"
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea required
              name="description"
              placeholder="Describe your notes as you want"
              defaultValue={data?.description}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard" className={buttonVariants({ variant: "destructive" })}>Cancel</Link>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
