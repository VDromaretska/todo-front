import axios from "axios";
import "../main.css";
import { JsonTask } from "./Todo";

interface CompletedTaskListProps {
  completedTasks: JsonTask[];
  apiBaseURL: string;
}

export function CompletedTaskList({
  completedTasks,
  apiBaseURL,
}: CompletedTaskListProps): JSX.Element {
  async function handleDelete(task: JsonTask) {
    axios.delete(apiBaseURL, { data: task });
  }
  return (
    <>
      <h2>Here's tasks you completed</h2>
      <ul>
        {completedTasks.map((task) => (
          <div key={task.t_id}>
            <li>{`${task.description} added by ${task.added_by} due ${task.date}`}</li>
            <button className="btn-d" onClick={() => handleDelete(task)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}
