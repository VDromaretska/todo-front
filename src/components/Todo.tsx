import { useState } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import "../main.css";

export function Todo(): JSX.Element {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([""]);
  const [draft, setDraft] = useState("");
  return (
    <div>
      <TaskInput
        tasks={tasks}
        updateTasks={setTasks}
        draft={draft}
        setDraft={setDraft}
      />
      <TaskList
        tasks={tasks}
        updateComletedTasks={setCompletedTasks}
        completedTasks={completedTasks}
        updateTasks={setTasks}
      />
      <CompletedTaskList completedTasks={completedTasks} />
    </div>
  );
}
