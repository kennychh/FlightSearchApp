
import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { IconoirProvider, HomeSimpleDoor, BookmarkEmpty, ProfileCircled } from 'iconoir-react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from "./screens/HomeScreen.js";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const homeName = 'Home'
const savedName = 'Saved'
const profileName = 'Profile'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F2F2F5',
    border: '#F2F2F5'
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <DismissKeyboard>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarItemStyle: {
              paddingTop: 16,
            },
            tabBarStyle: {position: 'absolute', height: 84, backgroundColor: '#F2F2F5'},
            tabBarIcon: ({ color, size }) => {
              let rn = route.name
              let icon

              if (rn === homeName) {
                icon = <HomeSimpleDoor color={color} width={size} height={size} strokeWidth={2} style={{marginLeft: 48}}/>
              }
              else if (rn === savedName) {
                icon = <BookmarkEmpty color={color} width={size} height={size} strokeWidth={2} />
              }
              else if (rn === profileName) {
                icon = <ProfileCircled color={color} width={size} height={size} strokeWidth={2} style={{marginRight: 48}}/>
              }
              return icon
            }
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: '#A6A4A8',
            style: { height: 24},
          }}
        >
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={savedName} component={HomeScreen} />
          <Tab.Screen name={profileName} component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  navBar: {
    marginTop: 'auto',
    height: 80,
    alignSelf: 'stretch',
    backgroundColor: '#F3F3F3',
    shadowOffset: {
      height: 8
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,
  },
});
