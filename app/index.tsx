import { Image, Pressable, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'expo-router'
import axios, { AxiosError } from 'axios'
// import getToken from '@/hooks/use-token'
import api from '@/constants/axios'
import * as SecureStore from 'expo-secure-store';
import AddTodo from '@/components/addTodo'
import AllTodos, { TodosResponse } from '@/components/allTodos'
import { TodosContext } from '@/lib/todosContext'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import NotAuthenticated from '@/components/home/notAuthenticated'
import Authenticated from '@/components/home/authenticated'

interface Session {
  "user": (string | number)[]
}

const Index = () => {
  const myLogo = require('.././assets/images/Homelogo.png');
  const [session, setSession] = useState<Session | null>(null)
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        console.log({ token });

        const response = await api.post('/auth/check', { token: token })
        const todosResponse: TodosResponse = await api.get(`/todos/${token}`)
        setTodos(response.data.todos)
        console.log({ response: response.data });
        setSession(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log({ Error: error.message });
        } else if (error instanceof AxiosError) {
          console.log({ AxiosError: error.cause });
        } else {
          console.log({ error });
        }
      }
    })()
  }, [])

  const handleLogout = async () => {
    console.log("handle logout called");

    const response = await api.post('/auth/logout')
    console.log({ response: response.data });
    setSession(null)
    await SecureStore.deleteItemAsync("token")
  }

  return (
    <>
      {
        session ?
          <Authenticated name={session.user[1]} username={session.user[2]} />
          : 
          <NotAuthenticated homeLogo={myLogo} />

      }
    </>
  )
}

export default Index


