import { Text } from '@/components/ui/text';
import React, { useContext, useState } from 'react'
import { View } from "react-native";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "@/constants/axios";
import * as SecureStore from 'expo-secure-store';
import { AxiosError } from "axios";
import { Plus } from "lucide-react-native";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TodosContext } from '@/lib/todosContext';


const AddTodo = () => {
  const [todoInput, setTodoInput] = useState<string>()
  const { todos, setTodos } = useContext(TodosContext);

  const handleAddTodo = async () => {
    const token = await SecureStore.getItemAsync("token");

    console.log({ todoInput, token });

    try {
      const response = await api.post("/todos/create", {
        todo: todoInput,
        token
      })

      console.log({ response: response.data });
      setTodos(response.data.newTodos)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log({ AxiosError: error.message });
      }
      else {
        console.log({ error });
      }
    }

  }
  return (
    <>

      <View className='bg-[#53444d] h-10 w-15 rounded-xl flex items-center justify-center absolute bottom-25 right-5'>
        <Dialog>
          <DialogTrigger>
            <Plus color={'white'} />
          </DialogTrigger>
          <DialogContent className=''>
            <DialogHeader>
              <DialogTitle className="mb-5">Add Todo</DialogTitle>
              <DialogDescription className="">
                <View className="w-[75vw] flex gap-3 mx-auto mt-5">
                  <Input
                  value={todoInput} onChangeText={setTodoInput}
                  className='bg-white h-[7vh] w-[90%] rounded' 
                  placeholder='New Todo' />
                  <Button className="bg-[#53444d]" onPress={handleAddTodo}>
                    <Text>Save Todo</Text>
                  </Button>
                </View>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </View>

    </>
  )
}

export default AddTodo