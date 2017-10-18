import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Header, MyListCategory } from '../components';
import { constants } from '../configs';

class MyList extends Component {
    render() {
        return (
            <View
                style={styles.containers}
            >
                <Header title={'My Lists'} />
                <MyListCategory />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        paddingTop: constants.statusBarHeight,
        flex: 1
    }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
