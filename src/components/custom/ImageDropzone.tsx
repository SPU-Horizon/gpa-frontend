import { Group, Text, rem } from "@mantine/core";
import { Upload, Image, X } from "lucide-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export type customProps = {
  header: string;
  subheader: string;
  maxFiles: number;
  icon: React.ReactNode;
};

export default function FileDropdown(
  props: Partial<DropzoneProps> & customProps
) {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>{props.icon}</Dropzone.Accept>
        <Dropzone.Reject>
          <X
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Image
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {props.header}
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            {props.subheader}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
