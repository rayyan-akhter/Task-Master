
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  weather?: {
    temp: number;
    condition: string;
    icon: string;
  } | null;
  createdAt: number;
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

// Function to fetch weather data for a task
export const fetchWeatherForTask = createAsyncThunk(
  'tasks/fetchWeather',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { tasks: TasksState };
      const task = state.tasks.items.find(task => task.id === taskId);
      
      if (!task) {
        return rejectWithValue('Task not found');
      }
      
      // Simulate an API call to a weather service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock weather data (in a real app, this would be from an API)
      const weather = {
        temp: Math.floor(Math.random() * 30) + 5, // Random temperature between 5-35°C
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
        icon: ['sun', 'cloud', 'cloud-rain', 'wind'][Math.floor(Math.random() * 4)],
      };
      
      return { taskId, weather };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; priority: Priority }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority,
        weather: null,
        createdAt: Date.now(),
      };
      state.items.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updatePriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherForTask.fulfilled, (state, action) => {
        state.loading = false;
        const { taskId, weather } = action.payload;
        const task = state.items.find(task => task.id === taskId);
        if (task) {
          task.weather = weather;
        }
      })
      .addCase(fetchWeatherForTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTask, deleteTask, toggleComplete, updatePriority } = tasksSlice.actions;
export default tasksSlice.reducer;
