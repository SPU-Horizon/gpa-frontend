import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type MajorOptionDropdownProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  optionList?: { name: string }[];
};

export default function OptionDropdown({
  value,
  setValue,
  optionList,
  title,
}: MajorOptionDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[50px] justify-between text-gray-900 font-avenir overflow-x-hidden dark:bg-white-light dark:hover:bg-gold-light dark:text-black-base "
        >
          {value ? (
            <p className="text-sm ">{value.toUpperCase()}</p>
          ) : (
            <p className=" text-black-base text-sm">
              Select {title.toString()}
            </p>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 dark:text-black-base " />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 h-60 bg-black-light p-0">
        <Command>
          <CommandInput
            className="text-white-light"
            placeholder="Search Majors"
          />
          <CommandEmpty>No Major found.</CommandEmpty>
          <CommandGroup className="overflow-scroll">
            {optionList?.map((option, i) => (
              <CommandItem
                key={i}
                value={option.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="text-white-light "
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.name
                      ? "opacity-100 bg-white-light"
                      : "opacity-0"
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
