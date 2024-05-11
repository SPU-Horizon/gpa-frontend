import { CustomNodeProps } from "@/components/CreatePlan/CustomNode";
import { MarkerType, Position, Node } from "reactflow";
import { create, StateCreator } from "zustand";

type VisualizeStore = {
  createNodesAndEdges: (selectedScheduleQuarters: Quarter[]) => {
    nodes: Node<CustomNodeProps>[];
    edges: {}[];
  };
  modifyAndVisualize: (selectedSchedule: Schedule) => {
    nodes: Node<CustomNodeProps>[];
    edges: {}[];
  };
};

export type Course = {
  code: string;
  title: string;
  credits: number;
  prerequisites: Course[];
  status?: "registered" | "in progress" | "completed";
  p_id?: number;
  order_id?: number;
};

export type Quarter = {
  id?: number;
  name: string;
  courses: Course[];
  totalCredits: number;
};

export type Schedule = {
  id: string;
  name: string;
  quarters: Quarter[];
  totalCredits: number;
  dateCreated: Date;
  fields: string[];
};

const useVisualizeStoreTemplate: StateCreator<VisualizeStore> = (set) => ({
  createNodesAndEdges: (selectedScheduleQuarters: Quarter[]) => {
    const quarters = selectedScheduleQuarters;

    const allCourses: Course[] =
      quarters?.flatMap((quarter) => quarter.courses) || [];

    let initialNodes: Node<CustomNodeProps>[] = allCourses.map((course, i) => ({
      id: course.code,
      type: "custom",
      data: {
        title: course.title,
        credits: course.credits,
        code: course.code,
        progress: course.status,
      },
      position: { x: 375 * course.p_id!, y: 175 * course.order_id! },
    }));

    const edges = allCourses.flatMap((course) =>
      course.prerequisites.map((prereq) => ({
        id: `${course.code}-${prereq.code}`,
        source: prereq.code,
        target: course.code,
        animated: false,
        type: "custom",
      }))
    );

    const quarterNames = quarters?.map((quarter) => {
      return {
        id: quarter.name,
        data: {
          title: quarter.name,
        },
        type: "custom",
        position: { x: 375 * quarter.id!, y: -150 * 1 },
      };
    });

    quarterNames ? (initialNodes = [...initialNodes, ...quarterNames!]) : [];

    return { nodes: initialNodes, edges: edges };
  },
  modifyAndVisualize: (selectedSchedule) => {
    const quarters = selectedSchedule.quarters;
    // We take the quarters and loop through them, giving them an id based on their order in the array
    // Then we create an inner loop, that goes through each class (c) in a quarter, and give them a parent id (p_id) based on the index of their parent quarter
    // This also adds an order_id to each class, based on their order in the array
    // We use this for mapping the classes to the correct quarter in the visualization
    quarters.map((q, i) => {
      q.id = i;
      q.courses.map((c, j) => {
        c.p_id = i;
        c.order_id = j;
      });
    });

    const { nodes, edges } = useVisualizeStore
      .getState()
      .createNodesAndEdges(quarters);

    return { nodes, edges };
  },
});

const useVisualizeStore = create(useVisualizeStoreTemplate);

export default useVisualizeStore;
