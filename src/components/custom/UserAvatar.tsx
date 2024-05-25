import { useNavigationStore } from "@/stores/NavigationStore";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
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
            <AvatarFallback className="bg-primary text-white">
              {firstName[0].toLocaleUpperCase() +
                lastName[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-56 bg-white dark:bg-black dark:text-white ml-2 ">
        <DropdownMenuLabel className="font-normal ">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {firstName + " " + lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-muted dark:bg-muted" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setCurrentTab("profile"), navigate("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-muted dark:bg-black" />
        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
