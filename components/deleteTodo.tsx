import React, { useContext } from 'react'
import api from '@/constants/axios'
import { Text } from './ui/text'
import { useRouter } from 'expo-router'
import { Trash } from 'lucide-react-native'
import { Pressable } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { TodosContext } from '@/lib/todosContext'

const DeleteTodo = ({todoId}: {todoId: string}) => {
  const router = useRouter()
  const { todos, setTodos } = useContext(TodosContext);
  const handleDelete = async () => {
    console.log(todoId);
    
    try {
      const response = await api.delete('/todos/delete', {
        data: {
          todo_id: Number(todoId),
          token: await SecureStore.getItemAsync("token")
        }
      })
      console.log({response: response.data})
      setTodos(response.data.updated_todos)

    } catch (error) {
      console.log({deleteError: error})
    }
  }
  
  return (
    <Pressable onPress={handleDelete}><Trash color={'white'} /></Pressable>
  )
}

export default DeleteTodo