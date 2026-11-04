"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "cn";
import {
  CalendarCheck,
  ChevronDown,
  FolderOpen,
  LayoutDashboard,
  ListPlus,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ProfileDropdown({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("You have been logged out.");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2 rounded-full pl-1 pr-2.5 hover:bg-muted/60",
              className
            )}
          />
        }
      >
        <Avatar size="sm" className="size-8">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name}
          />
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>

        <span className="hidden max-w-28 truncate font-medium sm:block">
          {user.name.split(" ")[0]}
        </span>

        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-0">
        {/* User identity header */}
        <div className="flex items-center gap-3 p-3">
          <Avatar className="size-11">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name}
            />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-accent-foreground">
              <Sparkles className="size-3" />
              Member
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="mx-0" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wider">
            Workspace
          </DropdownMenuLabel>

          <DropdownMenuItem
            render={<Link href="/dashboard" />}
            className="rounded-md px-2.5 py-1.5"
          >
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/add-studio" />}
            className="rounded-md px-2.5 py-1.5"
          >
            <ListPlus />
            Add New Studio
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/my-listings" />}
            className="rounded-md px-2.5 py-1.5"
          >
            <FolderOpen />
            My Studio Listings
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/my-bookings" />}
            className="rounded-md px-2.5 py-1.5"
          >
            <CalendarCheck />
            My Bookings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-0" />

        <div className="p-1">
          <DropdownMenuItem
            variant="destructive"
            className="rounded-md px-2.5 py-1.5"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}