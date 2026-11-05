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

  const menuItemClass =
    "group flex gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors duration-200 data-[highlighted]:bg-primary/15 data-[highlighted]:text-primary";

  const iconBoxClass =
    "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-data-[highlighted]:bg-primary group-data-[highlighted]:text-primary-foreground";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "h-11 gap-2 rounded-full border border-border/80 bg-card/70 pl-1.5 pr-3 text-foreground",
              "shadow-sm transition-all duration-300",
              "hover:border-primary/50 hover:bg-accent/60 hover:text-foreground hover:shadow-[0_4px_18px_-6px_rgb(153_95_47_/_45%)]",
              "data-[popup-open]:border-primary/60 data-[popup-open]:bg-accent/70",
              className,
            )}
          />
        }
      >
        <Avatar className="size-8 border border-primary/30">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>

        <span className="hidden max-w-28 truncate text-[13px] font-semibold sm:block">
          {user.name.split(" ")[0]}
        </span>

        <ChevronDown className="size-3.5 text-foreground/60 transition-transform duration-200" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className={cn(
          "w-[290px] overflow-hidden rounded-2xl border border-primary/20 p-0",
          "bg-popover shadow-[0_22px_65px_-20px_rgb(51_27_12_/_45%)]",
        )}
      >
        {/* Profile identity */}
        <div className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent px-4 py-5">
          <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <Avatar className="size-12 border-2 border-primary/40 shadow-md">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-popover-foreground">
                {user.name}
              </p>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {user.email}
              </p>

              <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary">
                <Sparkles className="size-3" />
                MEMBER
              </span>
            </div>
          </div>
        </div>

        {/* Workspace menu */}
        <DropdownMenuGroup className="p-2">
          <DropdownMenuLabel className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Your workspace
          </DropdownMenuLabel>

          <DropdownMenuItem
            render={<Link href="/dashboard" />}
            className={menuItemClass}
          >
            <span className={iconBoxClass}>
              <LayoutDashboard className="size-4" />
            </span>
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/add-studio" />}
            className={menuItemClass}
          >
            <span className={iconBoxClass}>
              <ListPlus className="size-4" />
            </span>
            Add New Studio
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/my-listings" />}
            className={menuItemClass}
          >
            <span className={iconBoxClass}>
              <FolderOpen className="size-4" />
            </span>
            My Studio Listings
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/my-bookings" />}
            className={menuItemClass}
          >
            <span className={iconBoxClass}>
              <CalendarCheck className="size-4" />
            </span>
            My Bookings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-0" />

        <div className="p-2">
          <DropdownMenuItem
            variant="destructive"
            onClick={handleLogout}
            className="group flex gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors duration-200 data-[highlighted]:bg-destructive/10"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
              <LogOut className="size-4" />
            </span>
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}