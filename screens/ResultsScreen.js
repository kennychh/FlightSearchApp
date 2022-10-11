import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, ScrollView, View, useColorScheme } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";
import {STATUSBAR_HEIGHT} from "../constants/constants";
import { themes } from "../constants/theme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  

export const ResultsScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? themes.dark :  themes.light;
  const styles = style(theme)
  const { data, headerTitle } = route.params;
  const insets = useSafeAreaInsets();


  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  


  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation, headerTitle]);

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 24}}>
        <Text style={styles.title}>
            {headerTitle}
        </Text>
        <Text style={styles.subtitle}>
            Fri, Dec 9 - Fri, Dec 23
        </Text>
        <Text style={styles.subtitle}>
            Economy
        </Text>
        <SwitchSelector
          initial={0}
          onPress={() => {
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
        <View style={styles.resultContainer}/>
        <View style={styles.resultContainer}/>
        <View style={[styles.resultContainer, {marginBottom: 24}]}/>
     </ScrollView>
    </View>
  );
};

const style = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 500
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 32,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: 8,
    color: theme.primary.text.color
  },
  switcher: {
    paddingTop: 48
  },
  subtitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: 8,
    color: theme.secondary.text.color
  },
  resultContainer: {
    marginTop: 24,
    borderRadius: 40,
    height: 245,
    alignSelf: "stretch",
    backgroundColor: theme.onBackgroundColor,
  }
});
