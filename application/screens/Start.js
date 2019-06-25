import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';

export default class Start extends Component {
    static navigationOptions = {
        headerTitle: 'Expo App'
      };

    login () {

    }

    register () {

    }

    async facebook () {
    
    }

    render(){
        return(
            <BackgroundImage
                source={require('../../assets/images/74.jpg')}
            >
                <View style={{justifyContent: 'center', flex:1}}>
                    <AppButton
                        bgColor="rgba(50,38, 74, 0.7)"
                        title="Entrar"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor='#fff'
                    />
                    <AppButton
                        bgColor="rgba(111,38, 74, 0.7)"
                        title="Registrarme"
                        action={this.register.bind(this)}
                        iconName="sign-in"
                        iconSize={30}
                        iconColor='#fff'
                    />
                    <AppButton
                        bgColor="rgba(200,38, 74, 0.7)"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="facebook"
                        iconSize={30}
                        iconColor='#fff'
                    />
                </View>
            </BackgroundImage>
        );
    }
}