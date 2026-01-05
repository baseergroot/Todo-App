import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import api from '@/constants/axios';
import { Link, useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { AxiosError } from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginResponse {
  data: {
    success: boolean;
    message: string;
    token: string
  } 
  // | string
}

const Page = () => {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleLogin = async () => {
    console.log("Handle Login called", { username, password });

    try {
      const response : LoginResponse = await api.post("/auth/login", {
      username: username.toLowerCase(),
      password: password.toLowerCase()
    })

    console.log({ response: response.data, type: typeof response.data });

    if (response.data.success) {
      setMessage(response.data.message)
      await SecureStore.setItemAsync("token", response.data.token);
      console.log({token: await SecureStore.getItemAsync("token")})
      router.replace("/")
    }
    } catch (error: unknown) {
      if (error instanceof AxiosError){
        console.log({AxiosError: error});
        // setMessage(error.message)
      }
      else {
        console.log({error});
      }
    }
  }

  return (
    <View className='flex gap-7 px-5 h-screen w-screen bg-[#2A121F] py-3'>
      <Text className='text-white text-xl font-bold text-center'>Login</Text>
      <View className='flex gap-1'>
        <Text className='text-white text-2xl font-bold text-center'>Welcome Back</Text>
        <Text className='text-white font-bold text-center'>Log in to manage your tasks efficiently</Text>
      </View>
      <View className='flex gap-3'>
        <View className='flex gap-1'>
          <Label className='text-white'>Username</Label>
          <Input className='bg-[#422a37] text-[#ff5cb3] font-bold' placeholderTextColor="#863962" value={username} onChangeText={setUsername} placeholder='Enter Your Name' />
        </View>
        <View className='flex gap-1'>
          <Label className='text-white'>Password</Label>
          <Input  className='bg-[#422a37] text-[#ff5cb3] font-bold' placeholderTextColor="#863962" value={password} onChangeText={setPassword}  placeholder='Enter Your Password' />
        </View>
        {
          message && <Text className='text-white text-center'>{message}</Text>
        }
        <Button onPress={handleLogin} className='bg-[#863962] mt-3'  >
          <Text className='text-white'>Login</Text>
        </Button>
        <Text className='text-white text-center'>
          Don't have an account? {" "}
          <Link href="/(auth)/signup" className='font-bold text-[#ff5cb3] text-center'>Signup</Link>
          </Text>

      </View>
    </View>
  )
}

export default Page