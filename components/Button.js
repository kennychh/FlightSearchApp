import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

export const Button = ({ title, styles, isDisabled = false, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={isDisabled}
                onPress={() => onPress?.()}
                style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
