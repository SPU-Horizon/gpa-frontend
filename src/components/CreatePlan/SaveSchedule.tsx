import React from 'react';
import { useEffect, useState } from "react";
import { Paper, Modal, Text, Badge, Group, Select, Button, List, Container, SimpleGrid, Grid, Card,Skeleton, rem} from "@mantine/core";

const SaveSchedule: React.FC = () => {
    const [savedSchedules, setSavedSchedules] = useState<string[]>([]);
    return (
        <div className="flex h-screen">
            <Container size="lg" className="flex-grow">  
                <Card withBorder p="lg" className="flex flex-col w-full">
                    <h1 className="text-xl font-bold ml-2 mt-4 ">Save Schedule</h1>
                    
                   
                </Card>
            </Container>
        </div>
    );


};

export default SaveSchedule;
