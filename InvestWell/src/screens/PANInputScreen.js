import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/PANInputScreenStyle';

const PANInputScreen = ({ navigation }) => {
    const [panNumber, setPanNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!panNumber.trim()) {
            setError("PAN number is required");
            return;
        }
        setError('');
        navigation.navigate('Investments', { panNumber });
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Enter PAN Number"
                value={panNumber}
                onChangeText={setPanNumber}
                style={styles.input}
                mode="outlined"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button mode="contained" onPress={handleSubmit}>
                Fetch Investments
            </Button>
        </View>
    );
};

export default PANInputScreen;
