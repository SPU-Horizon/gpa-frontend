import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { useUserStore } from "@/stores";
import { XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const FieldsDisplay = () => {
  let { fields, removeField } = useUserStore();

  // Mock Data if fields are not available, also can display the removal process

  fields.push({
    name: "Biology",
    type: "major",
    quarter: "fall",
    year: 2021,
  });

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} className="mb-4">
      {fields.map((field, i) => (
        <Paper
          className="dark:bg-black-light dark:border-none shadow-md  transition-all duration-200 ease-in-out"
          withBorder
          p="sm"
          radius="md"
          key={field.name + i}
        >
          <Group justify="space-between">
            <Text size="md" c="dimmed">
              Type: {field.type[0].toUpperCase() + field.type.slice(1)}
            </Text>
            <AlertDialog>
              <AlertDialogTrigger>
                <XCircle
                  strokeWidth={1.5}
                  className=" cursor-pointer"
                  size={20}
                  color="red"
                />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white-light">
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove This Field?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove this Field from your GPA
                    Account? You will need to re-upload your banner page to add
                    it back.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row ml-auto gap-2">
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogCancel
                    className="bg-gold-light hover:bg-black-base hover:text-white-base"
                    onClick={() => removeField(field.name)}
                  >
                    Yes - Remove it.
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Group>

          <Text size="md" c="dimmed">
            Enrollment Date:{" "}
            {field.quarter[0].toUpperCase() + field.quarter.slice(1)}{" "}
            {" " + field.year}
          </Text>

          <Group align="flex-end" gap="xs" mt={20}>
            <p className="text-black-base dark:text-white-base text-xl font-semibold">
              {field.name}
            </p>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
};
