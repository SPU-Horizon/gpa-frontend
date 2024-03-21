import React from "react";
import { Modal, Button} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import  CreatePlan  from "@/components/CreatePlan/CreatePlan";

export default function Header() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
    <header className="bg-white dark:bg-black-base p-[.88rem] flex justify-between items-center">
        <h1 className="text-xl font-semibold">Plan</h1>

        <div>
        <Modal opened={opened} onClose={close} title="Automated">
        {/* Modal content */}
        <CreatePlan />

        </Modal>
        <Button onClick={open} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Create a plan</Button>
        </div>
    </header>
    );
}