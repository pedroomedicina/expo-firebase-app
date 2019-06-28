import React, {Component} from 'react';
import Preloader from '../PreLoader';
import {StyleSheet, FlatList, View} from "react-native";
import {Card, Divider, Text} from "react-native-elements";
import BackgroundImage from '../BackgroundImage';
import CommentEmpty from '../Comment/CommentEmpty';
import Comment from '../Comment/Comment';
import * as firebase from 'firebase';

export default class CommentList extends Component {
    constructor(){
        super();
        this.state = {
            comments: [],
            loaded: false
        }

    }

    componentDidMount(){
        firebase.database().ref(`comments/${this.props.restaurantId}`).on('value', snapshot => {
            let comments = [];
            snapshot.forEach( row => {
                comments.push({
                    id: row.key,
                    rating: row.val().rating,
                    comment: row.val().comment
                });
            });
            this.setState({
                comments,
                loaded: true
            })
        });

    }

    render() {
        const {comments, loaded} = this.state;

        if (!loaded) {
            return <Preloader/>;
        }
        if (! comments.length){
            return (<CommentEmpty />);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Opiniones</Text>
                <Divider style={styles.divider} />
                <Card>
                    <FlatList
                        data={comments}
                        renderItem={(data) => this.renderComment(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                </Card>
            </View>
        )
    }

    renderComment(comment) {
        return(
            <Comment comment={comment} />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    title:{
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    divider:{
        backgroundColor: 'red'
    }
});