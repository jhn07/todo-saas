import SubmitButton from "@/components/SubmitButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUserData, updateUserData } from "@/lib/actions/user.action"
import { auth } from "@clerk/nextjs"

const themeColors = [
  { title: "Green", name: "theme-green" },
  { title: "Blue", name: "theme-blue" },
  { title: "Violet", name: "theme-violet" },
  { title: "Yellow", name: "theme-yellow" },
  { title: "Orange", name: "theme-orange" },
  { title: "Red", name: "theme-red" },
  { title: "Rose", name: "theme-rose" },
]


export default async function SettingsPage() {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const userData = await getUserData(userId as string)
  const postDataWithId = updateUserData.bind(null, userId)
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your profile</p>
        </div>
      </div>
      <Card>
        <form action={postDataWithId}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>Please provide general information about yourself.Please dont forget save</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="your name"
                  defaultValue={userData?.name ?? ""}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="your email"
                  defaultValue={userData?.email ?? ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color"
                  defaultValue={userData?.colorScheme ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      {themeColors.map((them) => (
                        <SelectItem key={them.name} value={them.name}>{them.title}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
