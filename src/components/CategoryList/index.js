import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Strings } from '../../assets';
import { App, Category } from '../../redux';
import CategoryItem from './CategoryItem';

class MyListCategory extends Component {

    componentWillMount() {
        this.props.fetchCategory();
    }

    renderItem = ({ item, index }) => {
        const { selectEdit } = this.props;
        let isEditView = selectEdit !== undefined && selectEdit === index;
        let isDisable = selectEdit !== undefined;
        return <CategoryItem
            index={index}
            item={item}
            isDisable={isDisable}
            isEditView={isEditView}
            isRoundView={item.isRound !== undefined}
            isAddView={item.isAdd}
            isAllView={item.isAll}
            onUnFocus={this.onUnFocus}
            onPressItem={this.onPressItem}
            onLongPressItem={this.onLongPressItem}
            onRemoveItem={this.onRemoveItem}
        />;
    }

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

    onUnFocus = ({ item, index, text }) => {
        const { addCategory, editCategory, updateSelectEdit } = this.props;
        if (text === '' || item.name === text) {
            updateSelectEdit(undefined);
        } else if (item.isAdd) {
            addCategory(text);
        } else {
            editCategory(item.id, text);
        }
        updateSelectEdit(undefined);
    }

    onPressItem = ({ item, index }) => {
        const { onOpenTask, updateSelectEdit } = this.props;

        if (item.isAdd) {
            updateSelectEdit(index);
        } else {
            onOpenTask && onOpenTask({ item, index });
        }

    }

    onLongPressItem = ({ item, index }) => {
        const { updateSelectEdit } = this.props;
        if (item.isAll) { return; }
        updateSelectEdit(index);
    }

    onRemoveItem = ({ item, index }) => {
        const { deleteCategory } = this.props;
        this.props.showDialog(undefined, Strings.noti_remove_category, [
            {
                title: Strings.ok, onPress: () => {
                    deleteCategory(item.id);
                    this.setState({ selectEdit: undefined });
                    this.props.hideDialog();
                    this.props.showNotify(Strings.remove_success);
                }
            },
            { title: Strings.canner, onPress: () => this.props.hideDialog() }
        ]);
    }
}

const mapStateToProps = ({ category }) => ({
    list: category.list,
    selectEdit: category.selectEdit
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addCategory: (name) => Category.actions.addCategory(dispatch)({ name }),
    fetchCategory: () => Category.actions.fetchCategory(dispatch)(),
    deleteCategory: (id) => Category.actions.deleteCategory(dispatch)({ id }),
    editCategory: (id, name) => Category.actions.editCategory(dispatch)({ id, name }),
    updateSelectEdit: (value) => Category.actions.updateSelectEdit(dispatch)({ value }),
    showNotify: (data) => App.actions.showNotify(dispatch)(data),
    showDialog: (title, message, button) => App.actions.showDialog(dispatch)(title, message, button),
    hideDialog: () => App.actions.hideDialog(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListCategory);
