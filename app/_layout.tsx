import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/authContext';

// Stack layout function
const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}></Stack>
  );
};

// Root layout with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
