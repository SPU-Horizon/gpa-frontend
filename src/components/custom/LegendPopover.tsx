import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Controls, ControlButton } from "@reactflow/controls";
import { Info } from "lucide-react";
import { SelectSeparator } from "../ui/select";

const LegendPopover = () => {
  return (
    <div>
      <Popover>
        <Controls>
          <PopoverTrigger className="h-full">
            <ControlButton className="text-black-base">
              <Info />
            </ControlButton>
          </PopoverTrigger>
          <PopoverContent className="w-40 h-45 bg-white-light pb-1" side="left">
            <div className="flex flex-col h-full ">
              <h3 className="font-avenir font-semibold">Legend</h3>
              <SelectSeparator />
              <div className="flex flex-col justify-evenly ">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <p className="font-avenir">Completed</p>
                </div>
                <div className="flex items-center gap-3 ">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-avenir">In Progress</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-avenir">Registered</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="font-avenir">To-do</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Controls>
      </Popover>
    </div>
  );
};

export default LegendPopover;
