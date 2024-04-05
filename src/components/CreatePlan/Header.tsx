import React from "react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreatePlan from "@/components/CreatePlan/CreatePlan";

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <header className="bg-white dark:bg-black-base p-[.88rem] ml-8 mr-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-2xl">
        Planner
      </h1>

      <div className="font-avenir">
        <Modal opened={opened} onClose={close} title="Automated">
          {/* Modal content */}
          <CreatePlan />
        </Modal>
        <Button
          className="bg-gold-base hover:bg-gold-light text-white font-bold py-2 px-4 rounded-full"
          onClick={open}
        >
          Create a plan
        </Button>
      </div>
    </header>
  );
}
