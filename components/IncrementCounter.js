import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { DisplayIcon } from "../components";
import { Minus, Plus } from "iconoir-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KEY } from "../constants/constants";
import { themes } from "../constants/theme";

export const IncrementCounter = ({
  counter,
  setCounter,
  minCount = 0,
  maxCount = 8,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={counter == minCount}
        onPress={() => {
          counter > minCount ? setCounter(counter - 1) : null;
        }}
        style={styles.button}
      >
        <Minus
          color={
            counter == minCount
              ? theme.secondary.button.text.disabledColor
              : theme.displayIcon.iconColor
          }
          width={24}
          height={24}
          strokeWidth={2}
        />
      </TouchableOpacity>
      <Text style={styles.counterText}>{counter}</Text>
      <TouchableOpacity
        disabled={counter == maxCount}
        onPress={() => {
          counter < maxCount ? setCounter(counter + 1) : null;
        }}
        style={styles.button}
      >
        <Plus
          color={
            counter == maxCount
              ? theme.secondary.button.text.disabledColor
              : theme.displayIcon.iconColor
          }
          width={24}
          height={24}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      backgroundColor: theme.secondary.button.color,
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    counterText: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
  });
