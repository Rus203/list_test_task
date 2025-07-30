import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Input, Task } from "./components";

import "./App.scss";
import type { TaskType } from "./types";
import { useTasks, useUpdateTask } from "./api";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading } = useTasks({ page, searchText });

  const updateTaskMutation = useUpdateTask();

  useEffect(() => {
    if (data) {
      setTasks((prevTasks) => {
        const combined = [...prevTasks, ...data.data];
        const uniqueTasks = Array.from(
          new Map(combined.map((task) => [task.id, task])).values()
        );

        const r =
          searchText !== ""
            ? uniqueTasks.filter((task) => {
                return task.content
                  .toString()
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              })
            : uniqueTasks;

        return r;
      });
    }
  }, [data, searchText]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChangeStatusTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, isChecked: !task.isChecked };
          updateTaskMutation.mutate({ taskId: id, ...updatedTask });
          return updatedTask;
        }

        return task;
      })
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex((t) => t.id === active.id);
      const newIndex = prevTasks.findIndex((t) => t.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prevTasks;

      const newTasks = arrayMove(prevTasks, oldIndex, newIndex);

      const maxSort = prevTasks[0].sort!;
      const step = 1;

      const updatedTasks = newTasks.map((task, index) => {
        const desiredSort = maxSort - index * step;
        if (task.sort !== desiredSort) {
          updateTaskMutation.mutate({
            taskId: task.id,
            ...task,
            sort: desiredSort,
          });
          return { ...task, sort: desiredSort };
        }
        return task;
      });

      return updatedTasks;
    });
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const threshold = 100;

    if (isLoading) return;

    if (scrollTop + clientHeight >= scrollHeight - threshold && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSetSearchText = (input: string) => {
    setPage(1);
    setSearchText(input);
  };

  return (
    <div className="App">
      <h1>My List</h1>
      <div className="search-bar">
        <h3>🔎</h3>
        <Input handleSearch={handleSetSearchText} />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="column" onScroll={onScroll}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  handleChangeStatusTask={handleChangeStatusTask}
                  task={task}
                />
              ))
            ) : (
              <p>There are no tasks</p>
            )}
          </SortableContext>
          {/* )} */}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
