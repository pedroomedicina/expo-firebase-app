import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import Preloader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty';
import RestaurantAddButton from '../../components/Restaurant/RestaurantAddButton';

export default class Restaurants extends Component {
    constructor() {
        super();
        this.state = {
            restaurants:[],
            loaded: false,
            restaurant_logo: require('../../../assets/checklist-on-a-paper-with-a-pencil.png')
        };

        this.refRestaurants = firebase.database().ref().child("restaurants");
    }

    componentDidMount () {
        
        this.refRestaurants.on('value', snapshot => {
            let restaurants = [];
            snapshot.forEach(row => {
                restaurants.push({
                    id: row.key,
                    name: row.val().name,
                    address: row.val().address,
                    capacity: row.val().capacity,
                    description: row.val().description
                })
            })
            
            this.setState({
                restaurants,
                loaded: true
            });
        })
    }

    addRestaurant() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddRestaurant'
        });

        this.props.navigation.dispatch(navigateAction);
    }

    restaurantDetail(restaurant) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailRestaurant',
            params: {restaurant}
        });

        this.props.navigation.dispatch(navigateAction);
    }

    renderRestaurant(restaurant) {
        return(
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
                leftAvatar={ {source: this.state.restaurant_logo} }
                onPress={() => this.restaurantDetail(restaurant)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        );
    }

    render() {
        const { loaded, restaurants } = this.state;
        
        if (! loaded) {
            return <Preloader />
        };

        if ( !restaurants.length ){
            return (
                <BackgroundImage source={require('../../../assets/images/15505.jpg')}>

                    <RestaurantEmpty text='No hay restaurantes disponibles' />
                    <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}/>
                </BackgroundImage>
            );
        };

        return (
            <BackgroundImage source={require('../../../assets/images/15505.jpg')}>
                <FlatList 
                    data={restaurants}
                    renderItem={(data) => this.renderRestaurant(data.item)}
                />
                <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}/>
            </BackgroundImage>
        );

    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 38, 74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    }
});