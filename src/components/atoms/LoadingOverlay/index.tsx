import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

type PROPS = {
    message: string;
};

const LoadingOverlay: React.FC<PROPS> = ({message}) => {
    return (
        <View style={styles.rootContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    text: {
        fontSize: 16,
        marginTop: 12,
    },
});
