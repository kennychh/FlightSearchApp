
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";


export const HomeScreen = () => {
  const [originText, onChangeOriginText] = React.useState(null);
  const [destinationText, onChangeDestinationTest] = React.useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flights</Text>
      <SafeAreaView style={styles.box}>
        <SwitchSelector
          initial={isRoundTrip ? 0 : 1}
          onPress={() => { setIsRoundTrip(!isRoundTrip) }}
          textColor={'black'} //'#7a44cf'
          selectedColor={'white'}
          buttonColor={'black'}
          hasPadding
          height={40}
          options={[
            { label: "Round Trip", value: true, },
            { label: "One Way", value: false, }
          ]}
          borderWidth={0}
          textStyle={{ fontFamily: 'Poppins-Medium', }}
          selectedTextContainerStyle={{ color: 'white' }}
          selectedTextStyle={{ fontFamily: 'Poppins-Medium', }}
          testID="trip-switch-selector"
          accessibilityLabel="trip-switch-selector"
          style={styles.switcher}
        />
        <TextInput
          style={[styles.input, styles.firstInput]}
          onChangeText={onChangeOriginText}
          value={originText}
          placeholder="Where from?"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeDestinationTest}
          value={destinationText}
          placeholder="Where to?"
        />
        <View style={styles.datePicker}>
          <TextInput
            style={[styles.input, styles.departureInput, isRoundTrip && styles.roundTripInput]}
            value={originText}
            placeholder="Departure"
          />
          {isRoundTrip && <TextInput
            style={[styles.input, styles.returnInput]}
            value={destinationText}
            placeholder="Return"
          />}
        </View>
        <Button title={"Search flights"} styles={styles.buttonStyle} />
      </SafeAreaView>
      <View>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    marginTop: 'auto',
    height: 80,
    alignSelf: 'stretch',
    backgroundColor: 'black',
    borderRadius: 40,
    shadowOffset: {
      height: 8
    },
    shadowOpacity: 0.1,
    shadowRadius: 25
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingBottom: 32,
    paddingTop: 124,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingBottom: 24,
    paddingTop: 32,
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
    borderColor: '#EBEBEB',
    borderRadius: 16,
    padding: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  firstInput: {
    marginTop: 0
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
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  buttonStyle: {
    button: {
      height: 60,
      alignSelf: 'stretch',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
    },
    buttonText: {
      color: 'white',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16
    },
    container: {
      paddingHorizontal: 24,
      paddingBottom: 24,
      paddingTop: 32,
    },
  },
  box: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 40,
    // shadowOffset: {
    //   height: 8
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 25
  }
});
