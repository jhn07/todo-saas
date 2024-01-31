"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react"

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">Save now</Button>
      )}
    </>
  )
}

export function StripeSubscriptionCreationButton() {

  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">Create Subscription</Button>
      )}
    </>
  )
}

export function StripePortal() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-fit">View payments details</Button>
      )}
    </>
  )
}

export function TrashDeleteNote() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled variant="destructive">
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" variant="destructive" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}