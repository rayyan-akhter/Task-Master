
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addTask, Priority } from '../../store/slices/tasksSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text: text.trim(), priority }));
      setText('');
    }
  };

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow"
          />
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as Priority)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!text.trim()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
