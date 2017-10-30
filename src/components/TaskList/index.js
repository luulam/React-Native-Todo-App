import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Strings } from '../../assets';
import { App, Category } from '../../redux';
import CategoryItem from './CategoryItem';

class MyListCategory extends Component {
    render() {
        const { list } = this.props;

        return <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={list}
            extraData={this.props}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
            numColumns={2}
        />;
    }
}

const mapStateToProps = ({ category }) => ({
   
});

const mapDispatchToProps = (dispatch, ownProps) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListCategory);
