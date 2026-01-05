import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { AxiosError } from 'axios';
import api from '@/constants/axios';
import DeleteTodo from './deleteTodo';
import { TodosContext } from '@/lib/todosContext';

export type TodosResponse = {
  data: {
    todos: [number, string][];
  }
}

export type Todos = [number, string][];

const AllTodos = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    (
      async () => {
        try {
          const token = await SecureStore.getItemAsync("token");
          console.log({ token, todos });

          const response: TodosResponse = await api.get(`/todos/${token}`)
          console.log({ responseTodos: response.data });
          // setTodosData(response.data.todos)
          
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log({ Error: error.message });
          } else if (error instanceof AxiosError) {
            console.log({ AxiosError: error.cause });
          } else {
            console.log({ error });
          }
        }
      }
    )()
  }, [])

  return (
    <View className='bg-yellow-400 flex gap-5'>
      <Text>AllTodos</Text>
      {
        todos?.map((todo) => (
          <View key={todo[0]} className='flex w-50 flex-row justify-between'>
            <Text >{todo[1]}</Text>
            <DeleteTodo todoId={todo[0].toString()} />
          </View>
        ))
      }
    </View>
  )
}

export default AllTodos