import React from 'react';
import {StackNavigator} from 'react-navigation';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Login';

export default StackNavigator(
    {
        Start: {
            screen: StartScreen
        },
        Login: {
            screen: LoginScreen
        }
    },
    {
        initialRouteName: 'Start',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold'
            }
        }
    }
)