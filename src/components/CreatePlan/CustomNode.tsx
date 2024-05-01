import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";

export type CustomNodeProps = {
  code?: string;
  credits?: number;
  title?: string;
  progress?: "completed" | "in progress" | "registered" | "Planned";
};

function CustomNode({ data }: NodeProps<CustomNodeProps>) {
  if (!data.credits) {
    return (
      <div className="w-60 h-16 shadow-md rounded-md bg-gold-light ">
        <div className="flex justify-center items-center w-full h-full">
          <div className="">
            <div className="text-lg font-bold">{data.title}</div>
          </div>
        </div>
      </div>
    );
  } else if (data.progress === "completed") {
    return (
      <div className="w-60 h-max shadow-md rounded-md bg-white border-[2px] bg-red-200">
        <div className="flex justify-center items-center w-full h-full">
          <div className=" py-2">
            <div className="text-lg font-bold text-center">{data.code}</div>
            <div className="text-lg font-bold text-center">{data.title}</div>
            <div className="text-gray-500 text-center">
              {data.credits} credits
            </div>
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-0 h-0 border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-0 h-0 border-none bg-transparent"
        />
      </div>
    );
  } else if (data.progress === "in progress") {
    return (
      <div className="w-60 h-max shadow-md rounded-md bg-white border-[2px] bg-yellow-200">
        <div className="flex justify-center items-center w-full h-full">
          <div className=" py-2">
            <div className="text-lg font-bold text-center">{data.code}</div>
            <div className="text-lg font-bold text-center">{data.title}</div>
            <div className="text-gray-500 text-center">
              {data.credits} credits
            </div>
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-0 h-0 border-none bg-transparent"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-0 h-0 border-none bg-transparent"
        />
      </div>
    );
  }

  return (
    <div className="w-60 h-max shadow-md rounded-md bg-white border-[2px] border-gold-base">
      <div className="flex justify-center items-center w-full h-full">
        <div className=" py-2">
          <div className="text-lg font-bold text-center">{data.code}</div>
          <div className="text-lg font-bold text-center">{data.title}</div>
          <div className="text-gray-500 text-center">
            {data.credits} credits
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-0 h-0 border-none bg-transparent"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-0 h-0 border-none bg-transparent"
      />
    </div>
  );
}

export default memo(CustomNode);
