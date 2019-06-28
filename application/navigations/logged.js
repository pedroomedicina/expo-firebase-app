import React from 'react';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant';
import LogoutScreen from '../screens/Logout';
import DetailRestaurantScreen from '../screens/Restaurants/DetailRestaurant';
import EditRestaurantScreen from '../screens/Restaurants/EditRestaurant';

import ProfileScreen from '../screens/Profile';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true;

const navigationOptions = {
    navigationOptions:{
        headerStyle: {
            backgroundColor: 'rgba(200, 38, 74, 1)',
        },
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold'
        }
    }
}

const leftIcon = ( navigation, icon ) => <Icon
    name = {icon}
    style = {{marginLeft: 20}}
    size = {20}
    color = 'white'
    onPress = {() => navigation.openDrawer()}
/>;

const rightIcon = ( navigation, icon )  => <Icon
    name = {icon}
    style = {{marginLeft: 20}}
    size = {30}
    color = 'white'
    onPress = {() => navigation.navigate('ListRestaurants')}
/>;

const restaurantsScreenStack = createStackNavigator(
    {
        ListRestaurants: {
            screen: RestaurantsScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Restaurantes',
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddRestaurant: {
            screen: AddRestaurantScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Agregar Restaurante',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars') 
            })
        },
        DetailRestaurant: {
            screen: DetailRestaurantScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Detalle del Restaurante',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        EditRestaurant: {
            screen: EditRestaurantScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Editar restaurante',
                headerRight: rightIcon(navigation, 'home')
            })
        }

    },
    navigationOptions
);

const profileScreenStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Perfil',
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
);

const logoutScreenStack = createStackNavigator(
    {
        LogoutScreen: {
            screen: LogoutScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Cerrar Sesion',
            })
        }
    }
);

export default createDrawerNavigator(
    {
        RestaurantsScreen: {
            screen: restaurantsScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Restaurantes',
                drawerIcon: ({tintColor}) => (<Icon name='home' size={30} style={{ color: tintColor}} />), 
            }),
        },
        ProfileScreen:{
            screen: profileScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Perfil',
                drawerIcon: ({tintColor}) => (<Icon name='user' size={30} style={{ color: tintColor}} />), 
            }),
        },
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Cerrar sSesion',
                drawerIcon: ({tintColor}) => (<Icon name='sign-out' size={30} style={{ color: tintColor}} />), 
            }),
        }
    },
    {
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle: {
                marginVertical: 0,
            }
        }
    }

)