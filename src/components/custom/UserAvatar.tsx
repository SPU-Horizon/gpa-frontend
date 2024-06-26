import { useNavigationStore } from "@/stores/NavigationStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import useAuthStore from "@/stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores";

export function UserAvatar() {
  const { signOut, email } = useAuthStore();
  const { setCurrentTab } = useNavigationStore();
  const navigate = useNavigate();
  let { firstName, lastName } = useUserStore();

  if (!firstName || !lastName) {
    firstName = "First";
    lastName = "Last";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={""} alt="@shadcn" />
            <AvatarFallback className="bg-black-base text-white-light">
              {firstName[0].toLocaleUpperCase() +
                lastName[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 dark:bg-white-base bg-black-base text-white-light ml-2 border-none "
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {firstName + " " + lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-black-base" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setCurrentTab("profile"), navigate("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-black-base" />
        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
