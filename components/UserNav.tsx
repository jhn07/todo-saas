"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Home, Settings, CreditCard, DoorClosed } from "lucide-react"
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
]

export default function UserNav() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.firstName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, idx) => (
            <DropdownMenuItem key={idx}>
              <Link href={item.href} className="w-full flex items-center justify-between">
                {item.name}
                <span>
                  <item.icon className="h-4 w-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full flex items-center justify-between">
          <SignOutButton signOutCallback={() => router.push("/")}>
            <div>
              Logout{" "}
              <span>
                <DoorClosed className="h-4 w-4" />
              </span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
