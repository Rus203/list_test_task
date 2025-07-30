import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./styles.scss";
import type { TaskType } from "../../types";

type IProp = { task: TaskType; handleChangeStatusTask: (id: string) => void };

export const Task = ({ task, handleChangeStatusTask }: IProp) => {
  const { id, isChecked, content } = task;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <input
        type="checkbox"
        className="checkbox"
        onPointerDown={(e) => e.stopPropagation()}
        checked={!!isChecked}
        onChange={() => handleChangeStatusTask(id)}
      />
      {content}
    </div>
  );
};
