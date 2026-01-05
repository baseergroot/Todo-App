import { FlatList, ListRenderItemInfo, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Text } from '../ui/text'
import { EllipsisVertical, Pen, Trash } from 'lucide-react-native'
import AddTodo from '../addTodo'
import DeleteTodo from '../deleteTodo'
import { TodosContext } from '@/lib/todosContext'
import { AxiosError } from 'axios'
import { TodosResponse } from '../allTodos'
import api from '@/constants/axios'
import * as SecureStore from 'expo-secure-store';
import Logout from './logout'


const Authenticated = ({ name = "Quest", username = "bsnm" }) => {
  const { todos, setTodos } = useContext(TodosContext);
  // console.log({todos})
  const logo = name.slice(0, 1)
  useEffect(() => {
    // setTodos({
    //   // "success": true,
    //   "todos": [
    //     [
    //       6,
    //       "Hi"
    //     ],
    //     [
    //       8,
    //       "string"
    //     ],
    //     [
    //       9,
    //       "string"
    //     ],
    //     [
    //       10,
    //       "string"
    //     ],
    //     [
    //       12,
    //       "stringdfgh"
    //     ]
    //   ]
    // })
    (
      async () => {
        try {
          const token = await SecureStore.getItemAsync("token");
          console.log({ token, todos });

          const response: TodosResponse = await api.get(`/todos/${token}`)
          console.log({ responseTodos: response.data });
          // setTodosData(response.data.todos)
          setTodos(response.data.todos)
          
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

    console.log({todosContext:todos})
  }, [])

  return (
    <View className='flex h-screen w-screen gap-5 bg-[#2A121F] px-5 overflow-scroll'>

      {/* Navbar */}
      <View className=' flex flex-row items-center justify-between h-1/10'>
        <View className='flex flex-row gap-2 items-center h-full'>
          <View className='bg-[#36262f] w-10 h-10 rounded-full flex items-center justify-center'>
            <Text className='text-white'>{logo}</Text>
          </View>

          <Text className='font-bold text-white'>{name}</Text>

        </View>
        <Logout />
      </View>

      <View className='flex gap-2 h-9/10 over'>
        {/* Header */}
        <View className=' h-1/10 justify-center'>
          <Text className='text-2xl font-bold text-white'>Today{"'"}s Tasks</Text>
          <Text className='text-white'>October 24, 2023</Text>
        </View>

        {/* Todos */}
        {/* {
        todos?.map((todo) => (
          <View key={todo[0]} className='flex w-50 flex-row justify-between'>
            <Text >{todo[1]}</Text>
            <DeleteTodo todoId={todo[0].toString()} />
          </View>
        ))
      } */}

        <FlatList
          className='mb-20'
          ItemSeparatorComponent={() => <View className='h-2' />}
          data={todos} renderItem={(todo) => (
            <View className='flex flex-row items-center justify-between h-[10vh] bg-[#36262f] rounded px-2 gap-2 py-1'>
              <Text className='text-lg font-bold text-white'>{todo.item[1]}</Text>
              <View className='flex flex-row gap-3'>
                {/* <Pen color={'white'} /> */}
                {/* <Trash color={'white'} /> */}
                <DeleteTodo todoId={todo.item[0].toString()} />
              </View>
            </View>
          )
          }
          keyExtractor={(todo, i) => todo[0].toString()}
        />

      </View>
      <AddTodo />
    </View>
  )
}

export default Authenticated