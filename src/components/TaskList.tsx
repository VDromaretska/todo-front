import axios from "axios";
import "../main.css";
import { JsonTask } from "./Todo";

interface TaskListProps {
  tasks: JsonTask[];
  updateComletedTasks: (st: JsonTask[]) => void;
  completedTasks: JsonTask[];
  updateTasks: (st: JsonTask[]) => void;
  apiBaseURL: string;
}

export function TaskList({
  tasks,
  updateComletedTasks,
  completedTasks,
  updateTasks,
  apiBaseURL,
}: TaskListProps): JSX.Element {
  async function handleComplete(task: JsonTask) {
    axios.patch(apiBaseURL, {
      data: {
        description: task.description,
        added_by: task.added_by,
        date: task.date,
        completed: task.completed,
      },
    });
  }

  async function handleDelete(task: JsonTask) {
    axios.delete(apiBaseURL, { data: task });
  }

  return (
    <>
      <div>
        <h2>Here's your to-do list:</h2>
        <ul>
          {tasks.map((task) => (
            <div key={task.t_id}>
              <li>{`${task.description} added by ${task.added_by} due ${task.date}`}</li>
              <button className="btn-d" onClick={() => handleDelete(task)}>
                Delete
              </button>
              <button className="btn" onClick={() => handleComplete(task)}>
                Complete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
