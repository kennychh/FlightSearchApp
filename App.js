
import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SwitchSelector from "react-native-switch-selector";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [originText, onChangeOriginText] = React.useState(null);
  const [destinationText, onChangeDestinationTest] = React.useState(null);
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [roundTripState, setRoundTripState] = useState(true);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Flights</Text>
      <View style={styles.box}>
        <SwitchSelector
          initial={0}
          onPress={() => { setRoundTripState(!roundTripState) }}
          textColor={'black'} //'#7a44cf'
          selectedColor={'white'}
          buttonColor={'black'}
          hasPadding
          height={40}
          options={[
            { label: "Round Trip", value: true, },
            { label: "One Way", value: false, }
          ]}
          backgroundColor={'#E4E4E4'}
          borderWidth={0}
          buttonMargin={4}
          textStyle={{ fontFamily: 'Poppins-Medium', }}
          selectedTextStyle={{ fontFamily: 'Poppins-Medium', }}
          testID="trip-switch-selector"
          accessibilityLabel="trip-switch-selector"
          style={styles.switcher}
        />
        <SafeAreaView>
          <TextInput
            style={[styles.input, styles.firstInput]}
            onChangeText={onChangeOriginText}
            value={originText}
            placeholder="Where from?"
          />
          {roundTripState && <TextInput
            style={styles.input}
            onChangeText={onChangeDestinationTest}
            value={destinationText}
            placeholder="Where to?"
          />}
        </SafeAreaView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingBottom: 32,
    paddingTop: 124,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  switcher: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  input: {
    height: 60,
    marginHorizontal: 24,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    borderRadius: 16,
    padding: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  firstInput: {
    marginTop: 24,
  },
  box: {
    height: 410,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 40,
    shadowOffset: {
      height: 8
    },
    shadowOpacity: 0.1,
    shadowRadius: 25
  }
});
