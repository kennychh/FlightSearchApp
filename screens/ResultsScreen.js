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
  Image,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";
import { STATUSBAR_HEIGHT } from "../constants/constants";
import { themes } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User } from "iconoir-react-native";
import { Plane, Airlines } from "../assets/icons";
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
  const {
    data,
    stickyHeaderTitle,
    headerTitle,
    date,
    seatType,
    numTravellers,
  } = route.params;

  const [pos, setPos] = useState(0);
  const [isFadeIn, setIsFadeIn] = useState(false);
  console.log(data);
  const parseData = () => {
    const buckets = data.data.buckets;
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
    const carriers = leg.carriers;

    return {
      origin,
      destination,
      durationInMinutes,
      stopCount,
      departure,
      arrival,
      timeDeltaInDays,
      segments,
      carriers,
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
        carriers,
      } = parseLeg(leg);
      const carrierLogoUrl = carriers.marketing[0].logoUrl;
      const airline =
        carriers.marketing.length > 1
          ? null
          : carrierLogoUrl
              .replace("https://logos.skyscnr.com/images/airlines/favicon/", "")
              .replace(".png", "");
      const airlineLogoUrl = `https://res.cloudinary.com/wego/f_auto,fl_lossy,h_80,w_80,q_auto/flights/airlines_square/${airline}.png`;
      const airlineLogo = (
        airline ? <Image
        style={styles.logo}
        source={{
          uri: airlineLogoUrl,
        }}
      /> : <Airlines fill={theme.icon.inactive.color}/>
      );
      const connectingFlights = segments.map((segment, index) => {
        if (
          index < segments.length - 1 &&
          index > 0 &&
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
        return (
          <Text style={styles.resultSubtitle}>{`${item}${seperator}`}</Text>
        );
      });

      const departureTime = moment(departure).format("LT");
      const arrivalTime = moment(arrival).format("LT");
      const stopsText = (
        <View>
          {connectingFlights.length - 1 == 0 ? (
            <Text
              style={[
                styles.resultSubtitle,
                { color: theme.success.textColor },
              ]}
            >
              Direct
            </Text>
          ) : (
            <Text
              style={[styles.resultSubtitle, { color: theme.error.textColor }]}
            >{`${connectingFlights.length - 1} stop${
              connectingFlights.length > 2 ? "s" : ""
            } `}</Text>
          )}
        </View>
      );

      const stopDots = () => {
        const dots = connectingFlights.map((connecttion, index) => {
          if (connectingFlights.length - 1 == 0) {
            return;
          }
          if (index < connectingFlights.length - 1) {
            return (
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 16,
                  backgroundColor: theme.onBackgroundColor,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginLeft: index == 0 ? 0 : 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: theme.error.textColor,
                  }}
                />
              </View>
            );
          }
        });
        return (
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              justifyContent: "center",
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            {dots}
          </View>
        );
      };

      return (
        <View
          style={{
            paddingBottom: 24,
            alignSelf: "stretch",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {airlineLogo}
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                left: 0,
                right: 0,
                position: "absolute",
              }}
            >
              <Text style={styles.resultSubtitle}>
                {minutes_to_hhmm(durationInMinutes)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
              alignItems: "center",
            }}
          >
            {stopDots()}
            <View>
              <Text style={styles.resultTitle}>{origin.id}</Text>
            </View>
            <View style={styles.line} />
            <Plane fill={theme.icon.inactive.color} style={styles.plane} />
            <View>
              <Text style={[styles.resultTitle, { alignSelf: "flex-end" }]}>
                {destination.id}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.resultSubtitle}>{departureTime}</Text>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                justifyContent: "center",
                left: 0,
                right: 0,
              }}
            >
              {stopsText}
              {connectingFlights.length <= 3 && connectingFlightsItem}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.resultSubtitle}>{arrivalTime}</Text>
              {timeDeltaInDays > 0 && (
                <Text
                  style={[
                    styles.resultSubtitle,
                    { fontSize: 10, lineHeight: 18 },
                  ]}
                >{`+${timeDeltaInDays}`}</Text>
              )}
            </View>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.resultContainer}>
        {flightInfo}
        <Text style={styles.resultTitle}>{price.formatted}</Text>
      </View>
    );
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.subtitle}>{numTravellers}</Text>
          <User
            color={theme.secondary.text.color}
            style={{ marginTop: 8, marginLeft: 4 }}
            width={16}
            height={16}
            strokeWidth={3}
          />
          <Text style={[styles.subtitle, { marginHorizontal: 8 }]}>·</Text>
          <Text style={styles.subtitle}>{seatType}</Text>
        </View>
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
          nestedScrollEnabled
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
    resultTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      fontWeight: "700",
      color: theme.primary.text.color,
    },
    resultSubtitle: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: theme.secondary.text.color,
    },
    resultContainer: {
      marginTop: 24,
      borderRadius: 32,
      padding: 24,
      alignSelf: "stretch",
      backgroundColor: theme.onBackgroundColor,
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
    },
    line: {
      height: 2,
      backgroundColor: theme.secondary.button.color,
      flex: 1,
      marginLeft: 24,
      marginRight: 4,
      borderRadius: 8,
    },
    plane: {
      marginRight: 24,
    },
    logo: {
      width: 20,
      height: 20,
    },
  });
