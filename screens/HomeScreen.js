import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";
import { STATUSBAR_HEIGHT } from "../constants/constants";
import { themes } from "../constants/theme";

export const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const [originText, onChangeOriginText] = React.useState(null);
  const [destinationText, onChangeDestinationText] = React.useState(null);
  const [departureDate, onChangeDepartureDate] = React.useState(null);
  const [returnDate, onChangeReturnDate] = React.useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const styles = style(theme);

  const isButtonDisabled =
    !originText ||
    !destinationText ||
    !departureDate ||
    (isRoundTrip && !returnDate);

  const key =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDc0YzBkN2U0MThmNzQwZmVlN2UwZjFkN2ZmZTAzMDVmYjMxZWNkYWQ1OTZlMmE4NTEyZTkzNDNmOWRmNzEyN2YzN2YzYTE0YmU4N2RhNTYiLCJpYXQiOjE2NjUzNTUxODEsIm5iZiI6MTY2NTM1NTE4MSwiZXhwIjoxNjk2ODkxMTgxLCJzdWIiOiIxNDc0NCIsInNjb3BlcyI6W119.c4-Lr5o2P81-6CnBj2htVE_caCb00c6eur0g-T_wMr7Ts4AKzm580eifC1-jziiymagidu_FMM9VzXPXkmrL4Q";
  const fetchFlights = async () => {
    navigation.navigate("Results", {
      data: [],
      headerTitle: "Toronto - Tokyo",
    });
    setIsLoading(true);
    // await fetch(
    //   `https://app.goflightlabs.com/search-best-flights?access_key=${key}&adults=1&origin=${originText}&destination=${destinationText}&departureDate=${departureDate}${
    //     isRoundTrip ? `&returnDate=${returnDate}` : ``
    //   }`
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if(json["data"]["error"]){
    //       console.log(json["data"]["message"])
    //     }
    //     else {
    //       navigation.navigate("Results", { data: json })
    //     }

    //   })
    //   .catch((error) => console.error(error));
    // setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flights</Text>
      <SafeAreaView style={styles.box}>
        <SwitchSelector
          initial={isRoundTrip ? 0 : 1}
          onPress={() => {
            setIsRoundTrip(!isRoundTrip);
          }}
          textColor={theme.switch.textColor}
          selectedColor={theme.switch.selectedColor}
          buttonColor={theme.switch.buttonColor}
          borderWidth={0}
          hasPadding
          height={42}
          options={[
            { label: "Round Trip", value: true },
            { label: "One Way", value: false },
          ]}
          buttonMargin={0}
          backgroundColor={theme.switch.backgroundColor}
          textStyle={{ fontFamily: "Poppins-Medium" }}
          selectedTextContainerStyle={{ color: "white" }}
          selectedTextStyle={{ fontFamily: "Poppins-Medium" }}
          testID="trip-switch-selector"
          accessibilityLabel="trip-switch-selector"
          style={styles.switcher}
        />
        <TextInput
          style={[styles.input, styles.firstInput]}
          onChangeText={onChangeOriginText}
          value={originText}
          placeholder="Where from?"
          placeholderTextColor={theme.input.color}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeDestinationText}
          value={destinationText}
          placeholder="Where to?"
          placeholderTextColor={theme.input.color}
        />
        <View style={styles.datePicker}>
          <TextInput
            style={[
              styles.input,
              styles.departureInput,
              isRoundTrip && styles.roundTripInput,
            ]}
            value={departureDate}
            onChangeText={onChangeDepartureDate}
            placeholder="Departure"
            placeholderTextColor={theme.input.color}
          />
          {isRoundTrip && (
            <TextInput
              style={[styles.input, styles.returnInput]}
              onChangeText={onChangeReturnDate}
              value={returnDate}
              placeholder="Return"
              placeholderTextColor={theme.input.color}
            />
          )}
        </View>
        <Button
          title={"Search flights"}
          styles={isButtonDisabled ? styles.buttonStyle : styles.buttonStyle}
          onPress={() => fetchFlights()}
          isDisabled={isButtonDisabled}
          isLoading={isLoading}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
      </View>
    </View>
  );
};

const style = (theme) =>
  StyleSheet.create({
    title: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 32,
      fontWeight: "700",
      alignSelf: "flex-start",
      paddingBottom: 32,
      marginTop: STATUSBAR_HEIGHT + 80,
      color: theme.primary.text.color,
    },
    sectionTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 24,
      fontWeight: "700",
      alignSelf: "flex-start",
      paddingBottom: 24,
      paddingTop: 32,
      color: theme.primary.text.color,
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    switcher: {
      padding: 24,
    },
    input: {
      height: 60,
      marginHorizontal: 24,
      marginTop: 12,
      borderWidth: 2,
      borderColor: theme.input.color,
      borderRadius: 16,
      padding: 16,
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
    firstInput: {
      marginTop: 0,
    },
    departureInput: {
      flex: 1,
    },
    roundTripInput: {
      marginRight: 0,
    },
    returnInput: {
      flex: 1,
      marginLeft: 12,
      marginRight: 24,
    },
    datePicker: {
      flexDirection: "row",
      alignSelf: "stretch",
    },
    buttonStyle: {
      button: {
        height: 60,
        alignSelf: "stretch",
        backgroundColor: theme.primary.button.color,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
      },
      buttonText: {
        color: theme.primary.button.text.color,
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
      },
      container: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 32,
      },
    },
    box: {
      alignSelf: "stretch",
      backgroundColor: theme.onBackgroundColor,
      borderRadius: 40,
      // shadowOffset: {
      //   height: 8
      // },
      // shadowOpacity: 0.1,
      // shadowRadius: 25
    },
  });
