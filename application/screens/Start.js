import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import facebook from '../utils/facebook';

export default class Start extends Component {
    static navigationOptions = {
        headerTitle: 'Expoo App'
      };

    login () {
        const navigateAction = NavigationActions.navigate({
            routeName: "Login"
        });
        this.props.navigation.dispatch(navigateAction);
    }

    register () {
        const navigateAction = NavigationActions.navigate({
            routeName: "Register"
        });
        this.props.navigation.dispatch(navigateAction);
    }

    async facebook () {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            facebook.config.application_id,
            { permissions: facebook.config.permissions }
        )

        if(type === "success"){
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials)
                .catch (error => {
                    Toast.showWithGravity("Error accediendo con Facebook", Toast.LONG, Toast.BOTTOM);
                    console.log(error.message);
                })
        } else if (type === "cancel"){
            Toast.showWithGravity('Inicio de sesion cancelado', Toast.LONG, Toast.BOTTOM)
        } else {
            Toast.showWithGravity('Error desconocido', Toast.LONG, Toast.BOTTOM)
        }

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