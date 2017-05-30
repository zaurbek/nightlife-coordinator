import axios from 'axios';
import Cookies from 'js-cookie';


// /////////GITHUB LOGIN//////////////

function githubFetch(token) {
  return axios.get(`https://api.github.com/user?access_token=${token}`);
}

export const USER_DATA = 'USER_DATA';

function githubPlace(userData) {
  return {
      type: USER_DATA,
      payload: userData,
    };
}


export function githubLogin(token) {
  return (dispatch) => githubFetch(token).then((res) => res.data).then((data)=>{
            console.log(data);
            return dispatch(githubPlace(data));
        });
}

// /////////////      LOGOUT     /////////////////////
export const USER_LOGOUT = 'USER_LOGOUT';

export function githubLogout() {
  Cookies.remove('token');
  return {
      type: USER_LOGOUT,
    };
}

// /////////// SEARCH LOCATION //////////////////////
export const SEARCH_LOCATION = 'SEARCH_LOCATION';

function fetchLocation(location) {
  console.log(location);
  return axios.get(`http://127.0.0.1:8080/api/yelp?location=${location}`);
}

function yelpPlace(searchData) {
  return {
      type: SEARCH_LOCATION,
      payload: searchData,
    };
}

export function searchLocation(location) {
  return (dispatch) => fetchLocation(location).then((res)=> res.data).then((data)=>{
            console.log(data);
            return dispatch(yelpPlace(data));
        });
}

// //////////////////////////////////////////////////////////////////////
export const LOADING = 'LOADING';

export function Loader() {
  return {type: LOADING}
}
// //////////////////////////////////////////////////////////////////////



