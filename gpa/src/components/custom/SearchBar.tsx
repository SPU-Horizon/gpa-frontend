import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
      </form>
    </div>
  );
}
