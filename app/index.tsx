import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SentimentScreen from '../src/screens/SentimentScreen';

export default function Home() {
  return (
    <View style={styles.container}>
      <SentimentScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
