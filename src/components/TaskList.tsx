import { TaskElement } from "./TaksElement";

interface TaskListProps {
  tasks: string[];
  updateComletedTasks: (st: string[]) => void;
  completedTasks: string[];
  updateTasks: (st: string[]) => void;
}

export function TaskList({
  tasks,
  updateComletedTasks,
  completedTasks,
  updateTasks,
}: TaskListProps): JSX.Element {
  const handleDone = (task: string) => {
    updateComletedTasks(
      completedTasks[0].length !== 0 ? [...completedTasks, task] : [task]
    );
    updateTasks(tasks.length > 1 ? tasks.filter((item) => item != task) : [""]);
  };
  return (
    <>
      <div>
        <h2>Here's your to-do list:</h2>
        <ul>
          {tasks.map((task) => (
            <li onClick={() => handleDone(task)} key={task}>
              {task}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
