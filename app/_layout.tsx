import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/authContext';

// Stack layout function
const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}></Stack>
  );
};

// Root layout with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
