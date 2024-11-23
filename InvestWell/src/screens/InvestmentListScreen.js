import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import styles from '../styles/InvestmentListScreenStyles';

const InvestmentListScreen = ({ route }) => {
    const { panNumber } = route.params;
    const [investments, setInvestments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/investments/?pan_number=${panNumber}`
                );
                setInvestments(response.data);
            } catch (err) {
                if (err.response?.status === 400) {
                    setError("PAN number is required");
                } else if (err.response?.status === 404) {
                    setError("No investments found for this PAN.");
                } else {
                    setError("Failed to load investments.");
                }
            }
        };

        fetchInvestments();
    }, [panNumber]);

    return (
        <View style={styles.container}>
            {error ? (
                <Text>{error}</Text>
            ) : (
                <FlatList
                    data={investments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Title style={styles.title}>{item.fund_name}</Title>
                                <Paragraph style={styles.subtitle}>
                                    Investment Type: {item.investment_type}
                                </Paragraph>
                                <Paragraph style={styles.subtitle}>
                                    Invested Amount: ₹{item.invested_amount}
                                </Paragraph>
                                <Paragraph style={styles.subtitle}>
                                    Current Value: ₹{item.current_value}
                                </Paragraph>
                                <Paragraph style={styles.subtitle}>
                                    Invested Date: {item.invested_date}
                                </Paragraph>
                                {item.note && (
                                    <Paragraph>Note: {item.note}</Paragraph>
                                )}
                            </Card.Content>
                        </Card>
                    )}
                />
            )}
        </View>
    );
};

export default InvestmentListScreen;
