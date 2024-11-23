import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PANInputScreen from './src/screens/PANInputScreen';
import InvestmentListScreen from './src/screens/InvestmentListScreen';
import theme from './src/theme';

const Stack = createStackNavigator();

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="PAN Input" component={PANInputScreen} />
                    <Stack.Screen name="Investments" component={InvestmentListScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
