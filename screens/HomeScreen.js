import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";
import { STATUSBAR_HEIGHT, KEY } from "../constants/constants";
import { themes } from "../constants/theme";

export const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const [originText, onChangeOriginText] = React.useState([null, null]);
  const [destinationText, onChangeDestinationText] = React.useState([
    null,
    null,
  ]);
  const [departureDate, onChangeDepartureDate] = React.useState(null);
  const [returnDate, onChangeReturnDate] = React.useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const styles = style(theme);

  const isButtonDisabled =
    !originText[0] ||
    !destinationText[0] ||
    !departureDate ||
    (isRoundTrip && !returnDate);

  const fetchFlights = async () => {
    setIsLoading(true);
    await fetch(
      `https://app.goflightlabs.com/search-best-flights?access_key=${KEY}&adults=1&origin=${
        originText[1]
      }&destination=${destinationText[1]}&departureDate=${departureDate}${
        isRoundTrip ? `&returnDate=${returnDate}` : ``
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json.data) {
          console.log("ERROR: ", json);
        } else if (json.data.error) {
          console.log("API Request Error: ", json);
        } else if (Array.isArray(json.data) && json.data.length == 0) {
          console.log("API Request Error: ", json);
        } else {
          navigation.navigate("Results", { data: json });
        }
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  return (
    <View stlye={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Flights</Text>
        <SafeAreaView style={styles.box}>
          <SwitchSelector
            initial={isRoundTrip ? 0 : 1}
            onPress={(value) => {
              if ((value == 0 && !isRoundTrip) || (value == 1 && isRoundTrip))
                setIsRoundTrip(!isRoundTrip);
            }}
            textColor={theme.switch.textColor}
            selectedColor={theme.switch.selectedColor}
            buttonColor={theme.switch.buttonColor}
            borderWidth={0}
            hasPadding
            height={42}
            options={[
              { label: "Round Trip", value: 0 },
              { label: "One Way", value: 1 },
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
          <TouchableOpacity
            style={[styles.input, styles.firstInput]}
            onPress={() =>
              navigation.navigate("SearchModal", {
                placeholder: "Where from?",
                onChangeText: onChangeOriginText,
              })
            }
          >
            <Text
              numberOfLines={1}
              style={[
                styles.inputText,
                {
                  color: originText[0]
                    ? theme.primary.text.color
                    : theme.input.color,
                },
              ]}
            >
              {originText[0] ? originText[0] : "Where from?"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.input]}
            onPress={() =>
              navigation.navigate("SearchModal", {
                placeholder: "Where to?",
                onChangeText: onChangeDestinationText,
              })
            }
          >
            <Text
              numberOfLines={1}
              style={[
                styles.inputText,
                {
                  color: destinationText[0]
                    ? theme.primary.text.color
                    : theme.input.color,
                },
              ]}
            >
              {destinationText[0] ? destinationText[0] : "Where to?"}
            </Text>
          </TouchableOpacity>
          <View style={styles.datePicker}>
            <TouchableOpacity
              style={[
                styles.input,
                styles.departureInput,
                isRoundTrip && styles.roundTripInput,
              ]}
              onPress={() =>
                navigation.navigate("CalendarModal", {
                  isRoundTrip: isRoundTrip,
                  onChangeDepartureDate: onChangeDepartureDate,
                  onChangeReturnDate: onChangeReturnDate,
                })
              }
            >
              <Text
                style={[
                  styles.inputText,
                  {
                    color: departureDate
                      ? theme.primary.text.color
                      : theme.input.color,
                  },
                ]}
              >
                {departureDate ? departureDate : "Departure"}
              </Text>
            </TouchableOpacity>
            {isRoundTrip && (
              <TouchableOpacity
                style={[styles.input, styles.returnInput]}
                onPress={() =>
                  navigation.navigate("CalendarModal", {
                    isRoundTrip: isRoundTrip,
                    onChangeDepartureDate: onChangeDepartureDate,
                    onChangeReturnDate: onChangeReturnDate,
                  })
                }
              >
                <Text
                  style={[
                    styles.inputText,
                    {
                      color: departureDate
                        ? theme.primary.text.color
                        : theme.input.color,
                    },
                  ]}
                >
                  {returnDate ? returnDate : "Return"}
                </Text>
              </TouchableOpacity>
            )}    
          </View>
          <TouchableOpacity
              style={styles.input}
              onPress={() => navigation.navigate("TravelOptionsModal", {})}
            >
              <Text numberOfLines={1} style={styles.travellerInfoText}>
              1 Adult, Economy
              </Text>
            </TouchableOpacity>
          <Button
            title={"Search flights"}
            styles={
              isButtonDisabled ? styles.disabledButtonStyle : styles.buttonStyle
            }
            onPress={() => fetchFlights()}
            isDisabled={isButtonDisabled}
            isLoading={isLoading}
          />
        </SafeAreaView>
        <View>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
        </View>
        <View style={styles.resultContainer} />
        <View style={styles.resultContainer} />
        <View style={styles.resultContainer} />
      </ScrollView>
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
      marginTop: 8,
      color: theme.primary.text.color,
    },
    sectionTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 24,
      fontWeight: "700",
      alignSelf: "flex-start",
      paddingTop: 32,
      color: theme.primary.text.color,
    },
    container: {
      paddingHorizontal: 24,
      marginBottom: 84,
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
      alignContent: "center",
    },
    inputText: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.input.color,
    },
    travellerInfoText: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color
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
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 32,
      },
    },
    disabledButtonStyle: {
      button: {
        height: 60,
        alignSelf: "stretch",
        backgroundColor: theme.secondary.button.color,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
      },
      buttonText: {
        color: theme.secondary.button.text.disabledColor,
        fontFamily: "Poppins-Medium",
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
    },
    resultContainer: {
      marginTop: 24,
      borderRadius: 40,
      height: 245,
      alignSelf: "stretch",
      backgroundColor: theme.onBackgroundColor,
    },
  });
