import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { useThemeStore } from "@/stores";

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);
  const { theme } = useThemeStore();
  return (
    <DatePickerInput
      dropdownType="modal"
      placeholder="Ex: 01/2023"
      value={value}
      onChange={setValue}
      clearable
      valueFormat="MM/YYYY"
      styles={{
        input: {
          backgroundColor: theme === "dark" ? "black" : "white",
          border: "1px solid #d9d9d9",
          color: theme === "dark" ? "white" : "black",
        },
      }}
    />
  );
}
