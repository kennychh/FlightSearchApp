import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  ArrowLeft,
  HomeSimpleDoor,
  BookmarkEmpty,
  ProfileCircled,
} from "iconoir-react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ResultsScreen,
  SearchModalScreen,
  CalendarModalScreen,
  TravelOptionsModalScreen,
} from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { STATUSBAR_HEIGHT } from "./constants/constants";
import { themes } from "./constants/theme";
import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const homeName = "Home";
const savedName = "Saved";
const profileName = "Profile";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? themes.dark : themes.light;
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.backgroundColor,
      border: theme.backgroundColor,
    },
  };
  const resultsHeaderTitle = "Hello";

  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
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

  function MainScreen({ navigation, resultsHeaderTitle }) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            headerBackTitleVisible: false,
            headerTitle: 'Flights',
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            },
            headerTitleStyle: {
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: theme.backgroundColor,
            },
            tabBarItemStyle: {
              paddingTop: 16,
            },
            tabBarStyle: {
              position: "absolute",
              height: 84,
              backgroundColor: theme.backgroundColor,
            },
            tabBarIcon: ({ color, size }) => {
              let rn = route.name;
              let icon;

              if (rn === homeName) {
                icon = (
                  <HomeSimpleDoor
                    color={color}
                    width={size}
                    height={size}
                    strokeWidth={2}
                    style={{ marginLeft: 48 }}
                  />
                );
              } else if (rn === savedName) {
                icon = (
                  <BookmarkEmpty
                    color={color}
                    width={size}
                    height={size}
                    strokeWidth={2}
                  />
                );
              } else if (rn === profileName) {
                icon = (
                  <ProfileCircled
                    color={color}
                    width={size}
                    height={size}
                    strokeWidth={2}
                    style={{ marginRight: 48 }}
                  />
                );
              }
              return icon;
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.icon.color,
            inactiveTintColor: theme.icon.inactive.color,
            style: { height: 24 },
          }}
        >
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={savedName} component={HomeScreen} />
          <Tab.Screen name={profileName} component={HomeScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Main" options={{ headerShown: false }}>
              {(props) => (
                <MainScreen
                  {...props}
                  resultsHeaderTitle={resultsHeaderTitle}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Results"
              component={ResultsScreen}
              options={{
                headerBackImage: () => (
                  <ArrowLeft
                    width={25}
                    height={25}
                    color={theme.icon.color}
                    strokeWidth={2}
                    marginLeft={24}
                  />
                ),
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: theme.backgroundColor,
                },
                headerTitleStyle: {
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 16,
                  color: theme.primary.text.color,
                },
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="SearchModal"
              component={SearchModalScreen}
              options={{
                cardStyle: {
                  backgroundColor: "transparent",
                },
                headerShown: false,
                gestureResponseDistance: 400,
              }}
            />
            <Stack.Screen
              name="CalendarModal"
              component={CalendarModalScreen}
              options={{
                cardStyle: {
                  backgroundColor: "transparent",
                },
                headerShown: false,
                gestureResponseDistance: 600,
              }}
            />
            <Stack.Screen
              name="TravelOptionsModal"
              component={TravelOptionsModalScreen}
              options={{
                cardStyle: {
                  backgroundColor: "transparent",
                },
                headerShown: false,
                gestureResponseDistance: 600,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 0,
  },
  navBar: {
    marginTop: "auto",
    height: 80,
    alignSelf: "stretch",
    backgroundColor: "#F3F3F3",
    shadowOffset: {
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,
  },
});
