
import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, Priority } from '../../store/slices/tasksSlice';

const TaskList = () => {
  const { items: tasks } = useAppSelector((state) => state.tasks);

  // Sort tasks by priority and completion status
  const sortedTasks = useMemo(() => {
    const priorityOrder: Record<Priority, number> = {
      high: 0,
      medium: 1,
      low: 2,
    };

    return [...tasks].sort((a, b) => {
      // Completed tasks at the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority if both are completed or both are not completed
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks]);

  const pendingTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  if (sortedTasks.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6 text-center text-gray-500">
          <p>Your task list is empty. Add a new task to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6">
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Tasks ({pendingTasks.length})</h2>
          {pendingTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Tasks ({completedTasks.length})</h2>
          {completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
