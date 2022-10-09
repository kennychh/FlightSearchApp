
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Button } from "../components/Button.js";


export const HomeScreen = () => {
  const [originText, onChangeOriginText] = React.useState(null);
  const [destinationText, onChangeDestinationText] = React.useState(null);
  const [departureDate, onChangeDepartureDate] = React.useState(null);
  const [returnDate, onChangeReturnDate] = React.useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [data, setData] = useState([]);

  const isButtonDisabled = !originText || !destinationText || !departureDate || (isRoundTrip && !returnDate)


  const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDVhMGQxZTgxZTBiNDk2YWFjZWFjYjExNGJjMzQ0OTNkZTAwYTUwZTZiOTJhYzNiOTQyNjlmNjIwMTI0Y2NiZjJjM2Y2ODhmZGUzNDM3MzgiLCJpYXQiOjE2NjUwMjcyMjgsIm5iZiI6MTY2NTAyNzIyOCwiZXhwIjoxNjk2NTYzMjI4LCJzdWIiOiIxNDQ1NCIsInNjb3BlcyI6W119.x8SrFH2Q8slWAv1by6jvEMgCJL_Ji5qpgDiv15eV3RHTTDRwtXp9IrNNa0bD25tjSEzrqoO36yXcozRu-Px0qA'
  const fetchFlights =  () => {
     fetch(`https://app.goflightlabs.com/search-best-flights?access_key=${key}&adults=1&origin=YTOA&destination=FCO&departureDate=2022-10-14`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }
  console.log(data)
  console.log(isButtonDisabled)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flights</Text>
      <SafeAreaView style={styles.box}>
        <SwitchSelector
          initial={isRoundTrip ? 0 : 1}
          onPress={() => { setIsRoundTrip(!isRoundTrip) }}
          textColor={'black'}
          selectedColor={'white'}
          buttonColor={'black'}
          borderWidth={0}
          hasPadding
          height={42}
          options={[
            { label: "Round Trip", value: true, },
            { label: "One Way", value: false, }
          ]}
          buttonMargin={8}
          backgroundColor={'#F2F2F5'}
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
          onChangeText={onChangeDestinationText}
          value={destinationText}
          placeholder="Where to?"
        />
        <View style={styles.datePicker}>
          <TextInput
            style={[styles.input, styles.departureInput, isRoundTrip && styles.roundTripInput]}
            value={departureDate}
            onChangeText={onChangeDepartureDate}
            placeholder="Departure"
          />
          {isRoundTrip && <TextInput
            style={[styles.input, styles.returnInput]}
            onChangeText={onChangeReturnDate}
            value={returnDate}
            placeholder="Return"
          />}
        </View>
        <Button title={"Search flights"} styles={isButtonDisabled ? styles.buttonStyle : styles.buttonStyle} onPress={() => fetchFlights()} isDisabled={isButtonDisabled}/>
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
    fontSize: 24,
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
