
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { deleteTask, toggleComplete, updatePriority, fetchWeatherForTask, Priority, Task } from '../../store/slices/tasksSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Check, CloudRain, Sun, Cloud, Wind } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: Task;
}

const weatherIcons: Record<string, React.ReactNode> = {
  'sun': <Sun className="h-5 w-5 text-yellow-500" />,
  'cloud': <Cloud className="h-5 w-5 text-gray-500" />,
  'cloud-rain': <CloudRain className="h-5 w-5 text-blue-500" />,
  'wind': <Wind className="h-5 w-5 text-gray-400" />,
};

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-800 hover:bg-red-200',
  medium: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  low: 'bg-green-100 text-green-800 hover:bg-green-200',
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handlePriorityChange = (value: string) => {
    dispatch(updatePriority({ id: task.id, priority: value as Priority }));
  };

  const handleWeatherFetch = () => {
    dispatch(fetchWeatherForTask(task.id));
  };

  return (
    <Card className={cn("mb-3 shadow-sm transition-all", 
      task.completed ? "opacity-70" : "")}>
      <CardContent className="p-4">
        <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
          <div className="flex items-start gap-3 flex-grow">
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className="mt-1"
            />
            <div className="flex-grow">
              <label 
                htmlFor={`task-${task.id}`}
                className={cn("text-md font-medium cursor-pointer", 
                  task.completed && "line-through text-gray-500")}
              >
                {task.text}
              </label>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline" className={priorityColors[task.priority]}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                {task.weather ? (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {weatherIcons[task.weather.icon]}
                    <span>{task.weather.temp}°C, {task.weather.condition}</span>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleWeatherFetch} 
                    className="text-xs h-6 px-2"
                  >
                    Get Weather
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select
              value={task.priority}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="destructive" size="icon" onClick={handleDeleteTask} className="h-9 w-9">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
