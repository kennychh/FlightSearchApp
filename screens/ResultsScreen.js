import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  useColorScheme,
  Animated,
  FlatList,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";
import { STATUSBAR_HEIGHT } from "../constants/constants";
import { themes } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

function minutes_to_hhmm(numberOfMinutes) {
  //create duration object from moment.duration
  var duration = moment.duration(numberOfMinutes, "minutes");

  //calculate hours
  var hh =
    duration.years() * (365 * 24) +
    duration.months() * (30 * 24) +
    duration.days() * 24 +
    duration.hours();

  //get minutes
  var mm = duration.minutes();

  //return total time in hh:mm format
  return hh + "h " + mm;
}

export const ResultsScreen = ({
  route,
  navigation,
  fadeIn,
  fadeOut,
  headerTitleFadeAnim,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const { data, stickyHeaderTitle, headerTitle, date } = route.params;

  const [pos, setPos] = useState(0);
  const [isFadeIn, setIsFadeIn] = useState(false);

  const parseData = () => {
    const buckets = data.data.buckets;
    const best = buckets[0].items;
    const fastest = buckets[1].items;
    const cheapest = buckets[2].items;
    return buckets;
  };
  const buckets = parseData();

  const [bucket, setBucket] = useState(0);

  const parseItem = (bucketItem) => {
    const deeplink = bucketItem.deeplink;
    const price = bucketItem.price;
    const legs = bucketItem.legs;
    return { deeplink, price, legs };
  };

  const parseLeg = (leg) => {
    const origin = leg.origin;
    const destination = leg.destination;
    const durationInMinutes = leg.durationInMinutes;
    const stopCount = leg.stopCount;
    const departure = leg.departure;
    const arrival = leg.arrival;
    const timeDeltaInDays = leg.timeDeltaInDays;
    const segments = leg.segments;
    let origins = [];
    let destinations = [];
    let carriers = [];
    let departures = [];
    let arrivals = [];
    let durations = [];
    let flightNumbers = [];

    segments.map((segment) => {
      origins.push(segment.origin);
      destinations.push(segment.destination);
      carriers.push(segment.marketingCarrier);
      departures.push(segment.departure);
      arrivals.push(segment.arrival);
      durations.push(segment.durationInMinutes);
      flightNumbers.push(segment.flightNumber);
    });
    return {
      origin,
      destination,
      durationInMinutes,
      stopCount,
      departure,
      arrival,
      timeDeltaInDays,
      segments,
    };
  };

  useEffect(() => {
    if (pos > 100 && !isFadeIn) {
      fadeIn(headerTitleFadeAnim);
      setIsFadeIn(true);
    } else if (pos <= 100 && isFadeIn) {
      fadeOut(headerTitleFadeAnim);
      setIsFadeIn(false);
    }
  }, [pos]);

  const Item = ({ item }) => {
    const { deeplink, price, legs } = parseItem(item);
    const flightInfo = legs.map((leg) => {
      const {
        origin,
        destination,
        durationInMinutes,
        stopCount,
        departure,
        arrival,
        timeDeltaInDays,
        segments,
      } = parseLeg(leg);
      const connectingFlights = segments.map((segment, index) => {
        if (
          index < segments.length - 1 &&
          segment.destination.flightPlaceId !==
            segments[index + 1].origin.flightPlaceId
        ) {
          return `${segment.origin.flightPlaceId}, ${segment.destination.flightPlaceId}`;
        }
        if (index == segments.length - 1) {
          return "";
        }
        return segment.destination.flightPlaceId;
      });

      const connectingFlightsItem = connectingFlights.map((item, index) => {
        let seperator = "";
        if (index < connectingFlights.length - 2) {
          seperator = ", ";
        }
        return <Text style={styles.subtitle}>{`${item}${seperator}`}</Text>;
      });

      const departureTime = moment(departure).format("LT");
      const arrivalTime = moment(arrival).format("LT");
      const stopsText = `${
        connectingFlights.length - 1 == 0
          ? "Direct"
          : `${connectingFlights.length - 1} stop${
              connectingFlights.length > 2 ? "s" : ""
            } `
      }`;

      return (
        <View>
          <Text style={styles.subtitle}>{departureTime}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{origin.id}</Text>
            <Text style={styles.subtitle}>{stopsText}</Text>
            {connectingFlightsItem}
            <Text style={styles.title}>{destination.id}</Text>
          </View>
          <Text style={styles.subtitle}>{arrivalTime}</Text>
          <Text style={styles.subtitle}>
            {minutes_to_hhmm(durationInMinutes)}
          </Text>
        </View>
      );
    });
    return <View style={styles.item}>{flightInfo}</View>;
  };

  const renderItem = ({ item }) => <Item item={item} />;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: stickyHeaderTitle,
    });
  }, [navigation, headerTitle]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingHorizontal: 24 }}
        scrollEventThrottle={16}
        onScroll={(e) => setPos(e.nativeEvent.contentOffset.y)}
      >
        <Text style={styles.title}>{headerTitle}</Text>
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.subtitle}>Economy</Text>
        <SwitchSelector
          initial={0}
          onPress={(value) => {
            setBucket(value);
          }}
          textColor={theme.switch.textColor}
          selectedColor={theme.switch.selectedColor}
          buttonColor={theme.switch.buttonColor}
          borderWidth={0}
          hasPadding
          height={42}
          options={[
            { label: "Best", value: 0 },
            { label: "Fastest", value: 1 },
            { label: "Cheapest", value: 2 },
          ]}
          buttonMargin={8}
          backgroundColor={theme.switch.backgroundColor}
          textStyle={{ fontFamily: "Poppins-Medium" }}
          selectedTextContainerStyle={{ color: "white" }}
          selectedTextStyle={{ fontFamily: "Poppins-Medium" }}
          testID="trip-switch-selector"
          accessibilityLabel="trip-switch-selector"
          style={styles.switcher}
        />
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          data={buckets[bucket].items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={{ marginBottom: 24 }} />
      </ScrollView>
    </View>
  );
};

const style = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      height: 500,
    },
    title: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 32,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginTop: 8,
      color: theme.primary.text.color,
    },
    switcher: {
      paddingTop: 48,
    },
    subtitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      fontWeight: "700",
      alignSelf: "flex-start",
      marginTop: 8,
      color: theme.secondary.text.color,
    },
    resultContainer: {
      marginTop: 24,
      borderRadius: 40,
      height: 245,
      alignSelf: "stretch",
      backgroundColor: theme.onBackgroundColor,
    },
  });
