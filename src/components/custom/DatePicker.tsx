import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePickerInput
      dropdownType="modal"
      placeholder="Ex: 01/2023"
      value={value}
      onChange={setValue}
      clearable
      valueFormat="MM/YYYY"
    />
  );
}
