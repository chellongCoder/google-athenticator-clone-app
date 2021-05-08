import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { ROUTES } from './config-routes';
import Home from '../screens/home';
import QrScan from '../screens/qrscan';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

export const ScreenOptions: StackNavigationOptions = {
    headerShown: true,
    gestureEnabled: true,
  };
  
const RootStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={({ navigation, route }) => ({
                        ...ScreenOptions,
                        headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: '#007fff',
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.QR_SCAN)}>
                              <Icon name="scan" size={24} color="#fff" />
                            </TouchableOpacity>
                          )
                    })}
                    name={ROUTES.HOME}
                    component={Home}
                />
                <Stack.Screen
                    options={ScreenOptions}
                    name={ROUTES.QR_SCAN}
                    component={QrScan}
                />
            </Stack.Navigator>
        </>
    )
}

export default RootStack

const styles = StyleSheet.create({})
