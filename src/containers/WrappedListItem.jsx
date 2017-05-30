import React from 'react';
import { connect } from 'react-redux';

import ListItem from '../components/ListItem.jsx';


const WrappedListItem = connect(
    state=>({
        auth: state.auth.value,
        user: state.auth.user.id
    }),null
)(ListItem);

export default WrappedListItem;