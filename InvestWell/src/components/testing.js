import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestingPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is a testing page!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default TestingPage;