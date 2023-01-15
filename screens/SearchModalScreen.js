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
import { MapsArrowDiagonal, PinAlt } from "iconoir-react-native";
import { KEY } from "../constants/constants";
import { themes } from "../constants/theme";

export const SearchModalScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const styles = style(theme);
  const defaultResults = [
    { country: "Current location", iata_code: null, name: "Toronto" },
  ];
  const [results, setResults] = useState(defaultResults);
  const { placeholder, onChangeText } = route.params;
  const [text, setText] = React.useState(null);

  const fetchResults = useCallback(async () => {
    await fetch(
      `https://app.goflightlabs.com/get-airport-data?access_key=${KEY}&query=${text}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json["data"]) {
          console.log(json);
        } else {
          setResults(json["data"]);
        }
      })
      .catch((error) => console.error(error));
  }, [text]);

  const setToDefaultResaults = useCallback(() => {
    setResults(defaultResults);
  }, [text]);

  useEffect(() => {
    if (text && text.length > 2) {
      const timer = setTimeout(() => {
        fetchResults();
      }, 500);
      return () => clearTimeout(timer);
    } else if (!text) {
      setToDefaultResaults();
    }
  }, [fetchResults, text]);

  const ResultItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onChangeText([item.city, item.iata_code]);
        navigation.goBack();
      }}
      style={styles.resultContainer}
    >
      <DisplayIcon
        icon={
          item.iata_code ? (
            <PinAlt
              color={theme.displayIcon.iconColor}
              width={24}
              height={24}
              strokeWidth={2}
            />
          ) : (
            <MapsArrowDiagonal
              color={theme.displayIcon.iconColor}
              width={24}
              height={24}
              strokeWidth={2}
            />
          )
        }
      ></DisplayIcon>
      <View style={styles.resultInfoContainer}>
        <Text style={styles.resultTitle}>{item.name}</Text>
        <View style={styles.resultSubInfoContainer}>
          <Text style={styles.resultSubInfo}>{item.country}</Text>
          {item.iata_code && (
            <Text style={[styles.resultSubInfo, styles.textDivider]}>·</Text>
          )}
          <Text style={styles.resultSubInfo}>{item.iata_code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <ResultItem item={item} onPress={() => {}} />;
  };

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
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.iata_code}
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
      alignSelf: "stretch",
      height: "100%",
      backgroundColor: theme.onBackgroundColor,
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
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
    input: {
      marginHorizontal: 24,
      height: 60,
      marginTop: 32,
      marginBottom: 32,
      borderWidth: 2,
      borderColor: theme.input.color,
      borderRadius: 16,
      padding: 16,
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: theme.primary.text.color,
    },
    resultContainer: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      flexDirection: "row",
      alignItems: "center",
    },
    resultInfoContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
      height: 48,
    },
    resultSubInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 24,
    },
    resultSubInfo: {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: theme.secondary.text.color,
    },
    textDivider: {
      paddingHorizontal: 8,
    },
    resultTitle: {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
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
