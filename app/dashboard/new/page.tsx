import SubmitButton from "@/components/SubmitButton"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createNote } from "@/lib/actions/note.action"
import { auth } from "@clerk/nextjs"

export default function CreateNotePage() {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  const createNoteWithUserId = createNote.bind(null, userId)

  return (
    <Card>
      <form action={createNoteWithUserId}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>Right here you can now create your new notes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input required
              type="text"
              name="title"
              placeholder="Title for your notes"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea required name="description" placeholder="Describe your notes as you want" />
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
