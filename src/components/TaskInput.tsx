import "../main.css";
import axios from "axios";
import { FullTask } from "./FullTaskInterface";
import { useRef, useState } from "react";
import { fetchTasksAndUpdateStates } from "./TodoMainDisplayer";

interface JsonTaskAddProps {
  description: string;
  added_by: string;
  date: string;
  completed: "Y" | "N";
}

export interface TaskInputProps {
  tasks: FullTask[];
  updateTasks: (st: FullTask[]) => void;
  updateComletedTasks: (st: FullTask[]) => void;
  apiBaseURL: string;
}
export function TaskInput({
  tasks,
  updateTasks,
  updateComletedTasks,
  apiBaseURL,
}: TaskInputProps): JSX.Element {
  const [draft, setDraft] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dateInputRef = useRef(null);
  async function handleAddTask() {
    const newTaskData: JsonTaskAddProps = {
      description: draft,
      added_by: addedBy,
      date: dueDate,
      completed: "N",
    };
    try {
      await axios.post(apiBaseURL, newTaskData);
      setDraft("");
      setAddedBy("");
      setDueDate("");
      await axios.get(apiBaseURL);
      fetchTasksAndUpdateStates(apiBaseURL, updateTasks, updateComletedTasks);
    } catch (error) {
      console.error("Error with adding task: ", error);
    }
  }

  return (
    <div>
      <div>
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          type="text"
          placeholder="Type new task.."
        />
      </div>
      <div>
        <input
          className="input"
          value={addedBy}
          onChange={(e) => setAddedBy(e.target.value)}
          type="text"
          placeholder="Type who added.."
        />
      </div>
      <div>
        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          ref={dateInputRef}
        />
      </div>
      <p>Select Date: {dueDate}</p>
      {dueDate !== "" && addedBy !== "" && draft !== "" && (
        <button className="btn" onClick={handleAddTask}>
          Add
        </button>
      )}
    </div>
  );
}
