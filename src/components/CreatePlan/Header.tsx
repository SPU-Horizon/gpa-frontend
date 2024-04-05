import React from "react";
import { Modal, Button, Portal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CreatePlan from "@/components/CreatePlan/CreatePlan";

export default function Header() {
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [portalOpened, setPortalOpened] = React.useState(false);

    // Function to handle the completion of creating a plan
    const handleCreatePlanCompleted = () => {
        closeModal(); // Close the create plan modal
        setPortalOpened(true); // Open the portal with classes
    };

    // Function to close the portal
    const closePortal = () => {
        setPortalOpened(false);
    };

    return (
        <header className="bg-white dark:bg-black-base p-[.88rem] ml-8 mr-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Planner</h1>

            <div className='font-avenir'>
                <Modal
                    opened={modalOpened}
                    onClose={closeModal}
                    title="Create a Plan"
                >
                    <CreatePlan onCompleted={handleCreatePlanCompleted} />
                </Modal>

                {portalOpened && (
                    <Portal>
                        {/* Your portal content here */}
                        <div>
                            {/* Content that will be rendered in the portal, such as your classes selection */}
                            {/* ... */}
                            <Button onClick={closePortal}>Close</Button>
                        </div>
                    </Portal>
                )}

                <Button 
                    className="bg-gold-base hover:bg-gold-light text-white font-bold py-2 px-4 rounded-full" 
                    onClick={openModal}
                >
                    Create a plan
                </Button>
            </div>
        </header>
    );
}
