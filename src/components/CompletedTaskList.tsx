interface CompletedTaskListProps {
  completedTasks: string[];
}

export function CompletedTaskList({
  completedTasks,
}: CompletedTaskListProps): JSX.Element {
  return (
    <>
      <h2>Here's tasks you completed</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </>
  );
}
