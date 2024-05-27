import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Controls, ControlButton } from "@reactflow/controls";
import { Info } from "lucide-react";
import { SelectSeparator } from "../ui/select";

const LegendPopover = () => {
  return (
    <div className="bg-white">
      <Popover>
        <Controls className="bg-white"></Controls>
      </Popover>
    </div>
  );
};

export default LegendPopover;
