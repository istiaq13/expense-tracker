import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'
import { useAuth } from '@/context/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'

const Home = () => {
  const {user} = useAuth();

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      
    </ScreenWrapper> 
  )
}

export default Home

const styles = StyleSheet.create({})