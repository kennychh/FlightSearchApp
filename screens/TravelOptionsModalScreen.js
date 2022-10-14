import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import { IncrementCounter, Button } from "../components";
import {
  NavArrowDown,
  NavArrowUp,
  Check,
} from "iconoir-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KEY } from "../constants/constants";
import { themes } from "../constants/theme";
import { ScrollView } from "react-native-gesture-handler";

export const TravelOptionsModalScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [value, setValue] = useState("economy");
  const [items, setItems] = useState([
    { label: "Economy", value: "economy" },
    { label: "Premium Economy", value: "premiumeconomy" },
    { label: "Business", value: "business" },
    { label: "First", value: "first" },
  ]);
  const [ageItems, setAgesItems] = useState([
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
  ]);
  const [childrenCounters, setChildrenCounters] = useState(0);
  const [child1Age, setChild1Age] = useState(0);
  const [child2Age, setChild2Age] = useState(0);
  const [child3Age, setChild3Age] = useState(0);
  const [child4Age, setChild4Age] = useState(0);
  const [child5Age, setChild5Age] = useState(0);
  const [child6Age, setChild6Age] = useState(0);
  const [child7Age, setChild7Age] = useState(0);
  const [child8Age, setChild8Age] = useState(0);
  const [openChild1, setOpenChild1] = useState(false);
  const [openChild2, setOpenChild2] = useState(false);
  const [openChild3, setOpenChild3] = useState(false);
  const [openChild4, setOpenChild4] = useState(false);
  const [openChild5, setOpenChild5] = useState(false);
  const [openChild6, setOpenChild6] = useState(false);
  const [openChild7, setOpenChild7] = useState(false);
  const [openChild8, setOpenChild8] = useState(false);
  const childrenAges = [
    {
      id: 0,
      childAge: child1Age,
      setChildAge: setChild1Age,
      open: openChild1,
      setOpen: setOpenChild1,
    },
    {
      id: 1,
      childAge: child2Age,
      setChildAge: setChild2Age,
      open: openChild2,
      setOpen: setOpenChild2,
    },
    {
      id: 2,
      childAge: child3Age,
      setChildAge: setChild3Age,
      open: openChild3,
      setOpen: setOpenChild3,
    },
    {
      id: 3,
      childAge: child4Age,
      setChildAge: setChild4Age,
      open: openChild4,
      setOpen: setOpenChild4,
    },
    {
      id: 4,
      childAge: child5Age,
      setChildAge: setChild5Age,
      open: openChild5,
      setOpen: setOpenChild5,
    },
    {
      id: 5,
      childAge: child6Age,
      setChildAge: setChild6Age,
      open: openChild6,
      setOpen: setOpenChild6,
    },
    {
      id: 6,
      childAge: child7Age,
      setChildAge: setChild7Age,
      open: openChild7,
      setOpen: setOpenChild7,
    },
    {
      id: 7,
      childAge: child8Age,
      setChildAge: setChild8Age,
      open: openChild8,
      setOpen: setOpenChild8,
    },
  ];

  const ChildAgeDropDownPicker = ({ index }) => {
    return (
      <View style={[styles.childAgesContainer, { zIndex: 100 - index }]}>
        <Text style={styles.travellerText}>{`Age of child ${index + 1}`}</Text>
        <View
          style={[styles.childDropDownPickerContainer, { zIndex: 100 - index }]}
        >
          <DropDownPicker
            open={childrenAges[index].open}
            value={childrenAges[index].childAge}
            items={ageItems}
            setOpen={childrenAges[index].setOpen}
            setValue={childrenAges[index].setChildAge}
            setItems={setAgesItems}
            style={styles.dropDownPicker}
            textStyle={styles.dropDownPickerText}
            dropDownContainerStyle={[styles.dropDownContainer]}
            theme="DARK"
            dropDownDirection="BOTTOM"
            scrollViewProps={{ nestedScrollEnabled: true }}
            listMode="SCROLLVIEW"
          />
        </View>
      </View>
    );
  };

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
            <Text style={styles.ageLimitText}>{"> 15 years"}</Text>
          </View>
          <View style={styles.incrementCounterContainer}>
            <IncrementCounter
              counter={counter}
              minCount={1}
              setCounter={setCounter}
            />
          </View>
        </View>
        <View
          style={[
            styles.travellerContainer,
            { marginTop: 24, marginBottom: 48 },
          ]}
        >
          <View style={styles.travellerInfo}>
            <Text style={styles.travellerText}>Children</Text>
            <Text style={styles.ageLimitText}>{"< 16 years"}</Text>
          </View>
          <View style={styles.incrementCounterContainer}>
            <IncrementCounter
              counter={childrenCounters}
              setCounter={setChildrenCounters}
            />
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
          style={{ marginBottom: 24 }}
        >
          {childrenCounters >= 1 && <ChildAgeDropDownPicker index={0} />}
          {childrenCounters >= 2 && <ChildAgeDropDownPicker index={1} />}
          {childrenCounters >= 3 && <ChildAgeDropDownPicker index={2} />}
          {childrenCounters >= 4 && <ChildAgeDropDownPicker index={3} />}
          {childrenCounters >= 5 && <ChildAgeDropDownPicker index={4} />}
          {childrenCounters >= 6 && <ChildAgeDropDownPicker index={5} />}
          {childrenCounters >= 7 && <ChildAgeDropDownPicker index={6} />}
          {childrenCounters >= 8 && <ChildAgeDropDownPicker index={7} />}
          <View style={{ height: 200 }}></View>
        </ScrollView>
        <Button title={"Done"} styles={styles.buttonStyle} onPress={() => {}} />
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
    childAgesContainer: {
      alignContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      marginBottom: 32,
      alignItems: "center",
    },
    childDropDownPickerContainer: {
      zIndex: 100,
      width: 128,
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
      alignSelf: "center",
    },
    travellerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 48,
      paddingHorizontal: 24,
    },
    travellerInfo: {
      justifyContent: "space-between",
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
