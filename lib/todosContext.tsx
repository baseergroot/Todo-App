import { Todos } from '@/components/allTodos';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

// type Todos = [number, string][];
interface TodosContextType {
  todos: Todos | undefined;
  setTodos: Dispatch<SetStateAction<Todos>>;
}

// create context
export const TodosContext = createContext({} as TodosContextType);

// create provider
export const TodosProvider = ({ children }: {children: React.ReactNode}) => {
  const [todos, setTodos] = useState<Todos>([]) // initialize with an empty array

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider
