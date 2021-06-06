import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    
    setTasks([...tasks, data])
  }

  function handleMarkTaskAsDone(id: number) {
    setTasks(oldTask => oldTask
      .map(task => 
        task.id === id && task.done === false 
        ? {...task, done: true} 
        : {...task, done: false}
      )
    )
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}