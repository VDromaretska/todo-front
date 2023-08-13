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
  async function handleComplete(newTaskCompleted: JsonTask) {
    try {
      axios.patch(apiBaseURL, {
        data: newTaskCompleted.description,
      });
      //Updating state
      const newTasks = tasks.filter((t) => t.t_id != newTaskCompleted.t_id);
      const newCompletedTasks = [...completedTasks, newTaskCompleted];
      updateTasks(newTasks);
      updateComletedTasks(newCompletedTasks);
    } catch (error) {
      console.error("Error completing the task:", newTaskCompleted, error);
    }
  }

  async function handleDelete(taskToDelete: JsonTask) {
    try {
      axios.delete(apiBaseURL, {
        data: taskToDelete.description,
      });
      //Updating state
      const newTasks = tasks.filter((t) => t.t_id != taskToDelete.t_id);
      const newCompletedTasks = completedTasks.filter(
        (t) => t.t_id != taskToDelete.t_id
      );
      updateTasks(newTasks);
      updateComletedTasks(newCompletedTasks);
    } catch (error) {
      console.error("Error completing the task:", taskToDelete, error);
    }
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
