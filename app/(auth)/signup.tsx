import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import api from '@/constants/axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from 'expo-router';


const Page = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)
  const router = useRouter()


  const handleSignup = async () => {
    setPending(true)
    console.log("Handle Singnup called", {name, username, password});

    const response = await api.post("/auth/signup", {
      name,
      username: username.toLowerCase(),
      password: password.toLowerCase()
    })
  
    console.log({response: response.data})

    if (response.data.success) {
      setMessage(response.data.message)
      setPending(false)
      await SecureStore.setItemAsync("token", response.data.token);
      router.replace("/")
    } else{
      setPending(false)
    }

  }
  
  return (
    // <View className='flex items-center justify-center h-screen w-screen gap-10'>
    //   <View className='flex items-center justify-center bg-gray-300 h-1/2 w-3/4 gap-5'>
    //     <Text className='bg-gray-200'>Signup</Text>
    //     <TextInput 
    //     value={name} onChangeText={setName}
    //     className='bg-white h-[15%] w-[90%] rounded' placeholder='Enter Your Name' />
    //     <TextInput
    //     value={username} onChangeText={setUsername}
    //      className='bg-white h-[15%] w-[90%] rounded' placeholder='Enter Your Username' />
    //     <TextInput className='bg-white h-[15%] w-[90%] rounded' placeholder='Enter Your Password' 
    //     value={password} onChangeText={setPassword}
    //     />
    //     <Text className='text-green-500 text-xl font-bold'>{message}!</Text>
    //   <Pressable className='px-6 py-2 bg-green-500 rounded '>
    //     <Text onPress={handleSignup} className='font-bold text-white text-2xl'>Signup</Text>
    //   </Pressable>
    //   </View>
    // </View>

    <View className='flex gap-7 px-5 h-screen w-screen bg-[#2A121F] py-3'>
      <Text className='text-white text-xl font-bold text-center'>Signup</Text>
      <View className='flex gap-1'>
        <Text className='text-white text-2xl font-bold text-center'>Create Account</Text>
        <Text className='text-white font-bold text-center'>Start organizing your day with elegance.</Text>
      </View>
      <View className='flex gap-3'>
        <View className='flex gap-1'>
          <Label className='text-white'>Name</Label>
          <Input
          className='bg-[#422a37] text-[#ff5cb3] font-bold' placeholderTextColor="#863962"
           value={name} onChangeText={setName}  placeholder='Enter Your Username' />
        </View>
        <View className='flex gap-1'>
          <Label className='text-white'>Username</Label>
          <Input className='bg-[#422a37] text-[#ff5cb3] font-bold' placeholderTextColor="#863962" value={username} onChangeText={setUsername} placeholder='Enter Your Name' />
        </View>
        <View className='flex gap-1'>
          <Label className='text-white'>Password</Label>
          <Input className='bg-[#422a37] text-[#ff5cb3] font-bold' placeholderTextColor="#863962" value={password} onChangeText={setPassword}  placeholder='Enter Your Password' />
        </View>
        {
          message && <Text className='text-white text-center'>{message}</Text>
        }
        <Button disabled={pending} onPress={handleSignup} className='bg-[#863962] mt-3'  >
          <Text className='text-white'>Signup</Text>
        </Button>
        <Text className='text-white text-center'>
          Already have an account? {" "}
          <Link href="/(auth)/login" className='font-bold text-[#ff5cb3] text-center'>Login</Link>
          </Text>

      </View>
    </View>
  )
}

export default Page