import { Image, ImageProps, View } from "react-native";
import { Text } from "../ui/text";
import { Link } from "expo-router";

export default function NotAuthenticated({ homeLogo }: { homeLogo: ImageProps }) {

  return (
    <View className='h-screen bg-[#2A121F] w-screen'>
      <View className=' h-9/20 flex items-center justify-center'>
        <View className='bg-yellow-500 w-7/10 h-7/10 rounded-2xl'>
          <Image
            className='w-full h-full flex-1 bg-red-400 rounded-2xl'
            source={homeLogo}
          />
        </View>
      </View>


      <View className='flex items-center justify-center h-11/20 px-5 gap-5'>
        <Text className='text-white text-3xl font-bold'>Focus</Text>
        <View className='px-10'>
          <Text className='text-gray-200/90 font-bold'>The elegant way to manage your daily tasks and long-term goals.</Text>
        </View>
        <View className='w-full flex gap-2'>

          <Link
            className='bg-[#863962] w-full text-center rounded text-white font-bold py-3'
            href="/(auth)/signup">Create Account</Link>
          <Link
            className='bg-transparent border border-white/40 w-full text-center rounded text-white font-bold py-3'
            href="/(auth)/login">Log In</Link>
        </View>
        <Text className='text-white/60 text-center'>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  )
}