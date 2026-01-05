import React from 'react'
import { LogOut } from 'lucide-react-native'
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const Logout = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token')
      console.log("Logged out successfully");
      router.replace('/')
    } catch (error) {
      console.log({logoutError: error})
    }
  }
  return (
    <LogOut color='white' onPress={handleLogout} />
  )
}

export default Logout