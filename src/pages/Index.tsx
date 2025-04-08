
import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import LoginForm from '../components/auth/LoginForm';
import TaskInput from '../components/tasks/TaskInput';
import TaskList from '../components/tasks/TaskList';
import Header from '../components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Add window title
  useEffect(() => {
    document.title = 'TaskMaster | Redux Powered To-Do App';
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
        <TaskInput />
        <TaskList />
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>TaskMaster Redux Powered To-Do App &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
