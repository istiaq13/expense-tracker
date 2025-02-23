import { Image, StyleSheet, StatusBar, View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/(auth)/welcome');
    }, 2000); // Redirect to welcome page after 2 seconds
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/images/splashImage.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the image horizontally
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: '20%',
    aspectRatio: 1, // Keep the image square
  },
});
