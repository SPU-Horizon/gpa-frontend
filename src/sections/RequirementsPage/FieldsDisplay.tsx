import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
  Button,
  Container,
  Loader,
} from "@mantine/core";
import { useCourseStore, useUserStore } from "@/stores";
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
import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@/stores/NavigationStore";
import { toast } from "sonner";

type FieldsDisplayProps = {
  setIsLoading?: (value: boolean) => void;
};

export const FieldsDisplay = ({ setIsLoading }: FieldsDisplayProps) => {
  let { fields, initializeUserInfo, activeField, setActiveField } =
    useUserStore();
  let { dropField } = useCourseStore();
  const navigate = useNavigate();
  const { setCurrentTab } = useNavigationStore();

  const updateFields = async (student_field_id: number) => {
    setIsLoading && setIsLoading(true);

    const res = await dropField(student_field_id);
    if (res.status === 200) {
      if (activeField !== 0) {
        setActiveField(activeField - 1);
      }

      toast.success(res.data);
    } else {
      toast.error("Failed to remove field");
    }
    initializeUserInfo();
    setIsLoading && setIsLoading(false);
    toast.dismiss();
  };

  // Mock Data if fields are not available, also can display the removal process

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} className="mb-4">
      {fields.length ? (
        fields.map((field, i) => (
          <Paper
            className=" dark:bg-muted dark:text-pretty dark:border-none shadow-md transition-all duration-200 ease-in-out hover:cursor-pointer hover:shadow-lg hover:scale-[1.02]"
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
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove This Field?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove this Field from your GPA
                      Account? You will need to re-upload your banner page to
                      add it back.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row ml-auto gap-2">
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogCancel
                      className="  "
                      onClick={() => {
                        setActiveField(activeField - 1);
                        updateFields(field.student_field_id);
                        toast.loading(
                          <div className="flex gap-4 justify-center items-center">
                            <Loader type="bars" color="#eee" size={15} />
                            <p className="text-white-light font-medium">
                              Removing Field...
                            </p>
                          </div>,
                          {
                            description: "Removing Field...",
                          }
                        );
                      }}
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
              <p className="text-black-base dark:text-white text-xl font-semibold">
                {field.name}
              </p>
            </Group>
          </Paper>
        ))
      ) : (
        <div className="col-span-full">
          <Container className="py-[150px]">
            <Title className="text-center font-semibold text-3xl sm:max-w-8 font-avenir">
              No Fields To Display
            </Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className="max-w-[500px] m-auto my-8"
            >
              You'll need to visit the BannerSync page and follow the
              instructions there to add a field to your account. Then
              requirements will be displayed here.
            </Text>
            <Group justify="center">
              <Button
                variant="subtle"
                size="md"
                className="text-primary bg-muted hover:bg-transparent ease-in-out duration-150"
                onClick={() => {
                  navigate("/dashboard/integrate-banner");
                  setCurrentTab("BannerSync");
                }}
              >
                Go to BannerSync
              </Button>
            </Group>
          </Container>
        </div>
      )}
    </SimpleGrid>
  );
};
