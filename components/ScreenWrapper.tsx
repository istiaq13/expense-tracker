import { SafeAreaView, StatusBar, StyleSheet, View, Platform, Dimensions } from 'react-native';
import React from 'react';
import { ScreenWrapperProps } from '@/types';
import { colors } from '@/constants/theme';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[styles.container, { paddingTop }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral900, // Background matches the theme
  },
  container: {
    flex: 1,
    backgroundColor: colors.neutral900, // Consistent background color
  },
});
