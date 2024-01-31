import { TrashDeleteNote } from "@/components/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteNote, getAllNotes } from "@/lib/actions/note.action";
import { auth } from "@clerk/nextjs";
import { Edit, File } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const { sessionClaims, userId } = auth()
  // const userIds = await sessionClaims?.userId as string
  if (!userId) {
    console.log("User is not found")
  }

  const data = await getAllNotes(userId as string)

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">Here you can see and create new notes</p>
        </div>
        {data?.Subscription?.status === "active" ? (
          <Link href="/dashboard/new" className={buttonVariants({})}>Create a new Note</Link>
        ) : (
          <Link href="/dashboard/billing" className={buttonVariants({})}>Create a new Note</Link>
        )}
      </div>
      {data?.Notes.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-primary/10">
            <File className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">You have any notes created</h2>
          <p className="max-w-sm mx-auto mt-2 mb-8 text-sm text-center text-muted-foreground leading-6">
            You currently dont have any notes. Please create some so that you
            can see them right here.
          </p>
          {data?.Subscription?.status === "active" ? (
            <Link href="/dashboard/new" className={buttonVariants({})}>Create a new Note</Link>
          ) : (
            <Link href="/dashboard/billing" className={buttonVariants({})}>Create a new Note</Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.Notes.map((item: any) => (
            <Card key={item.id} className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(item.createdAt))}
                </p>
              </div>
              <div className="flex gap-x-4">
                <Link href={`dashboard/new/${item.id}`}
                  className={buttonVariants({ variant: "outline", size: "icon" })}
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="noteid" value={item.id} />
                  <TrashDeleteNote />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
