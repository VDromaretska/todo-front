import axios from "axios";
import "../main.css";
import { JsonTask } from "./Todo";

interface TaskListProps {
  tasks: string[];
  updateComletedTasks: (st: string[]) => void;
  completedTasks: string[];
  updateTasks: (st: string[]) => void;
  apiBaseURL: string;
}

export function TaskList({
  tasks,
  updateComletedTasks,
  completedTasks,
  updateTasks,
  apiBaseURL,
}: TaskListProps): JSX.Element {
  async function handleComplete(task: string) {
    const taskArray = task.split(" ");
    const completeTaskData: JsonTask = {
      taskBody: taskArray[0],
      AddedBy: taskArray[3],
      DueDate: taskArray[5],
    };
    axios.patch(apiBaseURL, completeTaskData);
  }

  async function handleDelete(task: string) {
    const taskArray = task.split(" ");
    const deleteTaskData: any = {
      taskBody: taskArray[0],
      AddedBy: taskArray[3],
      DueDate: taskArray[5],
    };
    axios.delete(apiBaseURL, deleteTaskData);
  }

  return (
    <>
      <div>
        <h2>Here's your to-do list:</h2>
        <ul>
          {tasks.map((task) => (
            <div key={task}>
              <li>{task}</li>
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
