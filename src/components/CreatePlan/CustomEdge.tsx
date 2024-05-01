import {
  getSmartEdge,
  pathfindingJumpPointNoDiagonal,
  svgDrawSmoothLinePath,
} from "@tisoap/react-flow-smart-edge";
import { memo } from "react";
import { BezierEdge, useNodes } from "reactflow";

const CustomEdge = (props: any) => {
  const {
    id,
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    markerStart,
    markerEnd,
  } = props;

  const nodes = useNodes();

  const getSmartEdgeResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    nodes,
    options: {
      drawEdge: svgDrawSmoothLinePath,
      generatePath: pathfindingJumpPointNoDiagonal,
      nodePadding: 8,
      gridRatio: 10,
    },
  });

  // If the value returned is null, it means "getSmartEdge" was unable to find
  // a valid path, and you should do something else instead
  if (getSmartEdgeResponse === null) {
    return <BezierEdge {...props} />;
  }

  const { svgPathString } = getSmartEdgeResponse;

  return (
    <>
      <path
        style={style}
        className="react-flow__edge-path"
        d={svgPathString}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
    </>
  );
};

export default memo(CustomEdge);
