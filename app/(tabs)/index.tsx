import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'
import { useAuth } from '@/context/authContext'

const Home = () => {
  const {user} = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})