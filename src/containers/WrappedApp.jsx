import React, { Component } from 'react';
import { connect } from 'react-redux';
import { githubLogin, githubLogout, searchLocation, Loader } from '../actions/actions';
import App from '../components/App.jsx';



const WrappedApp = connect(
  state => ({
    auth: state.auth.value,
    user: state.auth.user,
    search: state.search.data,
    isLoading: state.search.isLoading
  }),
  dispatch => ({
    githubLogin: token => dispatch(githubLogin(token)),
    githubLogout: () => dispatch(githubLogout()),
    searchLocation: location => dispatch(searchLocation(location)),
    Loader: ()=>dispatch(Loader()),
  }))(App);

export default WrappedApp;
