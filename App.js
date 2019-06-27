import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebaseConfig from './application/utils/firebase';
import Preloader from './application/components/PreLoader';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  async componentDidMount () {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          isLogged: true,
          loaded: true
        })
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        });
      }
    })
  }

  render() {
    const { isLogged, loaded } = this.state;

    if ( ! loaded ) {
      return (<Preloader/>);
    }

    if (isLogged) {
      return (<LoggedNavigation />);
    } else {
      return (
       <GuestNavigation />
      );
    }
  }
  
}
