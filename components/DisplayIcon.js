import React from "react";
import { View, useColorScheme, StyleSheet } from "react-native";
import { themes } from "../constants/theme";

export const DisplayIcon = ({ icon, moreStyles }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);

  return <View style={[styles.container, moreStyles]}>{icon}</View>;
};

const style = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.displayIcon.backgroundColor,
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  });
