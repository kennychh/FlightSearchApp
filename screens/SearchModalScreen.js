import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { DisplayIcon } from "../components";
import { MapsArrowDiagonal, ClockOutline } from "iconoir-react-native";
import { themes } from "../constants/theme";

export const SearchModalScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const { placeholder, onChangeText } = route.params;
  const [text, setText] = React.useState(null);

  return (
      <View style={{ flex: 1 }}>
        <View style={styles.modalContainer}>
          <View style={styles.pill} />
          <TextInput
            autoFocus={true}
            style={[styles.input]}
            onChangeText={setText}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={theme.input.color}
          />
          <TouchableOpacity
            style={styles.currentLocation}
            onPress={() => {
              onChangeText(text);
              navigation.goBack();
            }}
          >
            <DisplayIcon
              icon={
                <MapsArrowDiagonal
                  color={theme.displayIcon.iconColor}
                  width={24}
                  height={24}
                  strokeWidth={2}
                />
              }
            ></DisplayIcon>
            <Text style={styles.currentLocationText}>Current Location</Text>
          </TouchableOpacity>
          <Text style={styles.recentText}>Recent</Text>
        </View>
      </View>
  );
};

const style = (theme) =>
  StyleSheet.create({
    modalContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      alignContent: "center",
      alignSelf: "stretch",
      height: "100%",
      backgroundColor: theme.onBackgroundColor,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },
    pill: {
      alignSelf: "center",
      width: 48,
      height: 4,
      borderRadius: 8,
      backgroundColor: theme.icon.inactive.color,
      marginTop: 16,
    },
    input: {
      height: 60,
      marginTop: 32,
      borderWidth: 2,
      borderColor: theme.input.color,
      borderRadius: 16,
      padding: 16,
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
    currentLocation: {
      paddingTop: 32,
      flexDirection: "row",
      alignItems: "center",
    },
    currentLocationText: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: theme.primary.text.color,
      paddingLeft: 24,
    },
    recentText: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
      paddingTop: 24,
    },
  });
