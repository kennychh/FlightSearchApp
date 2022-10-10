import { StatusBar, Platform  } from "react-native";

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight