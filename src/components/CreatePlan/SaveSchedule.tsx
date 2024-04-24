import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import ReactFlow, {
  Background,
  MiniMap,
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import { toPng } from "html-to-image";
import { mockSchedules } from "@/constants/MockScheduleData";
import LegendPopover from "../custom/LegendPopover";
import CustomEndpoint from "./CustomEndpoint";
import SaveSchedulePagination from "./SaveSchedulePagination";

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  markerEnd: "edge-circle",
};

type VisualizeSequenceProps = {
  nodes: any[];
  edges?: any[];
};

const downloadImage = (dataUrl: any) => {
  const a = document.createElement("a");

  a.setAttribute("download", "gpa_course_sequence_[name].png");
  a.setAttribute("href", dataUrl);
  a.click();
};

export const VisualizeSequence = ({ nodes, edges }: VisualizeSequenceProps) => {
  const imageWidth = 1024;
  const imageHeight = 768;
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const nodeBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodeBounds,
      imageWidth,
      imageHeight,
      0.2,
      2
    );

    const elem = document.querySelector(".react-flow__viewport");

    if (elem instanceof HTMLElement) {
      toPng(elem, {
        backgroundColor: "#fff",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(downloadImage);
    }
  };

  const [n, setNodes] = useState(nodes);
  const [e, setEdges] = useState<Edge<any>[]>(edges || []);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div className="w-full h-full font-avenir">
      <ReactFlow
        nodes={n}
        edges={e}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        minZoom={0.2}
      >
        <Background />
        <LegendPopover />
        <MiniMap />
        <div className="text-center font-avenir font-semibold">
          Course Sequence
        </div>
        <Panel position="top-left">
          <div className="flex gap-2">
            <Button
              className="bg-transparent p-0 hover:bg-transparent  text-black-base"
              onClick={onClick}
            >
              PNG Download
            </Button>
          </div>
        </Panel>
        <CustomEndpoint />
      </ReactFlow>
    </div>
  );
};

const SaveSchedule: React.FC = () => {
  // We will import the saved schedules from the plans store, we will remove this useState once that piece of work is done.

  return (
    <div className="flex flex-grow  min-h-[500px] m-12 pb-4 md:my-4 md:mx-8 ">
      <div className="flex flex-col justify-between w-full rounded overflow-hidden bg-white-light dark:bg-transparent  ">
        <h3 className="font-bold text-xl mt-4">My Schedules</h3>
        <SaveSchedulePagination schedules={mockSchedules} />
        {/* Display the selected schedule */}
      </div>
    </div>
  );
};

export default SaveSchedule;
