import React, { Component } from 'react';

import AppButton from '../AppButton';
import { Card, Text } from 'react-native-elements';
import RestaurantRating from './RestaurantRating';

export default class Restaurant extends Component {
    render(){
        const {editRestaurant, goHome, restaurant } = this.props;
        return (
            <Card
              title={restaurant.name}
              image={require('../../../assets/checklist-on-a-paper-with-a-pencil.png')}
            >
                <RestaurantRating restaurantId={restaurant.id} />
                <Text style={{marginBottom: 10, marginTop: 10}}>
                    {restaurant.description}
                </Text>
                <AppButton
                        bgColor="rgba(255,38, 74, 0.6)"
                        title="Editar restaurante"
                        action={editRestaurant}
                        iconName="pencil"
                        iconSize={30}
                        iconColor='#fff'
                />
                <AppButton
                        bgColor="rgba(28,25, 31, 0.7)"
                        title="Volver"
                        action={goHome}
                        iconName="arrow-left"
                        iconSize={30}
                        iconColor='#fff'
                />
            </Card>
        )
    }
}