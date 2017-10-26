import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Text, FloatActionButton } from '../components';
import { Constants, Colors } from '../configs';
import { Icons } from '../assets';

class DetailList extends Component {
    renderHeader = () => {
        const { params, navigation } = this.props;

        const left = <Icon
            size={Constants.font.h2}
            name={Icons.all}
            onPress={() => navigation.goBack()} />;

        const center = <Text align={'center'}
            text={params.name}
            fontSize={Constants.font.dialog}
            color={Colors.access}
        />;

        const right = <Icon
            size={Constants.font.h2}
            name={Icons.more} />;

        return <Header
            left={left}
            center={center}
            right={right}
        />;
    }

    render() {
        return (
            <View
                style={styles.containers}
            >
                {this.renderHeader()}
                <FloatActionButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});
const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, ownProps, {
        ...ownProps.navigation.state.params
    });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailList);
