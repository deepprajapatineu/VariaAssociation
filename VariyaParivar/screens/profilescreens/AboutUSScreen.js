import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AboutUSScreen = () => {
    return (
      <View style={styles.container}>
        <Text>AboutUSScreen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default AboutUSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
