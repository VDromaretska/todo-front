import axios from "axios";
import "../main.css";
import { JsonTask } from "./Todo";

interface CompletedTaskListProps {
  completedTasks: string[];
  apiBaseURL: string;
}

export function CompletedTaskList({
  completedTasks,
  apiBaseURL,
}: CompletedTaskListProps): JSX.Element {
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
      <h2>Here's tasks you completed</h2>
      <ul>
        {completedTasks.map((task) => (
          <div key={task}>
            <li>{task}</li>
            <button className="btn-d" onClick={() => handleDelete(task)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}
