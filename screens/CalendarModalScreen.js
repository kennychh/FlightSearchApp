import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "../components/Button.js";
import { NavArrowLeft, NavArrowRight, TextAlt } from "iconoir-react-native";
import { themes } from "../constants/theme";

export const CalendarModalScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const windowWidth = Dimensions.get("window").width;
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const {
    isRoundTrip = false,
    onChangeDepartureDate,
    onChangeReturnDate,
  } = route.params;
  const [text, setText] = React.useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const isButtonDisabled = isRoundTrip
    ? !selectedStartDate || !selectedEndDate  
    : !selectedStartDate;

  const minDate = new Date(); // Today
  const maxDate = moment(minDate).add(2, "year").format("YYYY-MM-DD");

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(moment(date).format("YYYY-MM-DD"));
    } else {
      setSelectedStartDate(moment(date).format("YYYY-MM-DD"));
      setSelectedEndDate(null);
    }
  };

  const onPress = () => {
    onChangeDepartureDate(selectedStartDate);
    if (isRoundTrip) {
      onChangeReturnDate(selectedEndDate);
    }
    if (!isButtonDisabled){
        navigation.goBack();
    }
  };

  const customDayHeaderStylesCallback = ({ dayOfWeek, month, year }) => {
    switch (
      dayOfWeek // can also evaluate month, year
    ) {
      default: // Thursday
        return {
          textStyle: {
            fontFamily: "Poppins-Medium",
            color: theme.primary.text.color,
            fontSize: 14,
          },
        };
    }
  };
  console.log(selectedStartDate, selectedEndDate);

  const customDatesStylesCallback = (date) => {
    switch (date.isoWeekday()) {
      default:
        return {
          textStyle: {
            color: theme.primary.text.color,
            fontFamily: "Poppins-Regular",
            fontSize: 14,
          },
        };
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.modalContainer}>
        <View style={styles.pill} />
        <View style={styles.calendarContainer}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={isRoundTrip}
            minDate={minDate}
            maxDate={maxDate}
            restrictMonthNavigation={true}
            todayBackgroundColor={theme.secondary.button.color}
            todayTextStyle={theme.secondary.button.text.color}
            selectedRangeStartTextStyle={{
              color: theme.primary.button.text.color,
            }}
            selectedRangeEndTextStyle={{
              color: theme.primary.button.text.color,
            }}
            selectedDayTextColor={
              isRoundTrip
                ? theme.secondary.button.text.color
                : theme.primary.button.text.color
            }
            selectedDayColor={theme.primary.button.color}
            selectedRangeStartStyle={{
              backgroundColor: theme.primary.button.color,
            }}
            selectedRangeEndStyle={{
              backgroundColor: theme.primary.button.color,
            }}
            selectedRangeStyle={{
              backgroundColor: selectedStartDate === selectedEndDate ? theme.primary.button.color : theme.secondary.button.onBackgroundColor,
            }}
            onDateChange={onDateChange}
            headerWrapperStyle={{}}
            customDayHeaderStyles={customDayHeaderStylesCallback}
            customDatesStyles={customDatesStylesCallback}
            dayLabelsWrapper={{
              borderBottomWidth: 0,
              borderTopWidth: 0,
              width: windowWidth - 48,
            }}
            yearTitleStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              color: theme.primary.text.color,
            }}
            monthTitleStyle={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              color: theme.primary.text.color,
            }}
            disabledDatesTextStyle={{
              color: theme.secondary.text.color,
              fontFamily: "Poppins-Regular",
              fontSize: 14,
            }}
            previousComponent={
              <NavArrowLeft
                color={theme.displayIcon.iconColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            }
            nextComponent={
              <NavArrowRight
                color={theme.displayIcon.iconColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            }
            weekdays={["M", "T", "W", "T", "F", "S", "S"]}
            width={windowWidth - 24}
          />
        </View>
        <Button
          title={"Done"}
          styles={isButtonDisabled ? styles.buttonStyle : styles.buttonStyle}
          onPress={onPress}
          isDisabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

const style = (theme) =>
  StyleSheet.create({
    modalContainer: {
      marginTop: 32,
      alignContent: "center",
      paddingHorizontal: 24,
      justifyContent: "center",
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
      marginTop: 12,
    },
    calendarContainer: {
      justifyContent: "center",
      alignContent: 'center',
      paddingVertical: 32,
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
        paddingBottom: 24,
        paddingTop: 32,
      },
    },
  });
