import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";

export const Button = ({
  title,
  styles,
  isDisabled = false,
  onPress,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => onPress?.()}
        style={styles.button}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
