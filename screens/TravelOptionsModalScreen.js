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
  SafeAreaView
} from "react-native";
import { DisplayIcon, IncrementCounter, Button } from "../components";
import {
  MapsArrowDiagonal,
  PinAlt,
  NavArrowDown,
  NavArrowUp,
  Check,
} from "iconoir-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KEY } from "../constants/constants";
import { themes } from "../constants/theme";

export const TravelOptionsModalScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const defaultResults = [
    { country: "Current location", iata_code: null, name: "Toronto" },
  ];
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [value, setValue] = useState("economy");
  const [items, setItems] = useState([
    { label: "Economy", value: "economy" },
    { label: "Premium Economy", value: "premiumeconomy" },
    { label: "Business", value: "business" },
    { label: "First", value: "first" },
  ]);
  const [childrenCounters, setChildrenCounters] = useState(0);
  const [childrenAges, setChildrenAges] = useState([0, 0, 0, 0, 0, 0, 0, 0]);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.modalContainer}>
        <View style={styles.pill} />
        <View style={styles.dropDownPickerContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropDownPicker}
            textStyle={styles.dropDownPickerText}
            dropDownContainerStyle={styles.dropDownContainer}
            theme="DARK"
            dropDownDirection="BOTTOM"
            ArrowUpIconComponent={() => (
              <NavArrowUp
                color={theme.displayIcon.iconColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            )}
            ArrowDownIconComponent={() => (
              <NavArrowDown
                color={theme.displayIcon.iconColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            )}
            TickIconComponent={() => (
              <Check
                color={theme.displayIcon.iconColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            )}
          />
        </View>
        <View style={styles.travellerContainer}>
          <View style={styles.travellerInfo}>
            <Text style={styles.travellerText}>Adults</Text>
            <Text style={styles.ageLimitText}>{'> 15 years'}</Text>
          </View>
          <View style={styles.incrementCounterContainer}>
            <IncrementCounter
              counter={counter}
              minCount={1}
              setCounter={setCounter}
            />
          </View>
        </View>
        <View style={[styles.travellerContainer, {marginTop: 24, marginBottom: 48}]}>
          <View style={styles.travellerInfo}>
            <Text style={styles.travellerText}>Children</Text>
            <Text style={styles.ageLimitText}>{'< 16 years'}</Text>
          </View>
          <View style={styles.incrementCounterContainer}>
            <IncrementCounter
              counter={childrenCounters}
              setCounter={setChildrenCounters}
            />
          </View>
        </View>
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
        <Button
          title={"Done"}
          styles={styles.buttonStyle}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const style = (theme) =>
  StyleSheet.create({
    dropDownPicker: {
      height: 60,
      borderWidth: 2,
      borderColor: theme.input.color,
      borderRadius: 16,
      backgroundColor: theme.onBackgroundColor,
    },
    dropDownPickerText: {
      paddingHorizontal: 8,
      marginLeft: 0,
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
    dropDownPickerContainer: {
      marginTop: 32,
      marginHorizontal: 24,
      marginBottom: 32,
      zIndex: 100,
    },
    dropDownContainer: {
      backgroundColor: theme.onBackgroundColor,
      borderWidth: 2,
      borderTopWidth: 1,
      borderColor: theme.input.color,
      borderRadius: 16,
      paddingVertical: 6,
    },
    modalContainer: {
      marginTop: 32,
      alignContent: "center",
      alignSelf: "stretch",
      height: "100%",
      backgroundColor: theme.onBackgroundColor,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },
    scrollView: {
      paddingHorizontal: 24,
    },
    pill: {
      alignSelf: "center",
      width: 48,
      height: 4,
      borderRadius: 8,
      backgroundColor: theme.icon.inactive.color,
      marginTop: 12,
    },
    incrementCounterContainer: {
      width: 128,
      alignSelf: 'center'
    },
    travellerContainer: {
      flexDirection:'row',
      justifyContent: 'space-between',
      height: 48,
      paddingHorizontal: 24,
    },
    travellerInfo: {
      justifyContent: 'space-between'
    },
    travellerText: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
    ageLimitText: {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: theme.secondary.text.color,
    },
    buttonStyle: {
      button: {
        height: 60,
        alignSelf: "stretch",
        backgroundColor: theme.secondary.button.color,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
      },
      buttonText: {
        color: theme.secondary.button.text.color,
        fontFamily: "Poppins-Medium",
        fontSize: 16,
      },
      container: {
        marginBottom: 24,
        marginHorizontal: 24,
      },
    },
  });
