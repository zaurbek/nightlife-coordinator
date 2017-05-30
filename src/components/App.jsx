import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Input, Menu, Button, Card, Image } from 'semantic-ui-react';
import ListItem from '../containers/WrappedListItem.jsx';




class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const token = Cookies.get('token');
    if (token && !this.props.auth) {
      this.props.githubLogin(token);
      document.getElementById('input').value=localStorage.getItem("nightlifeToken");
      this.startSearch();
    } else {
      localStorage.setItem("nightlifeToken","");
    }
  }
  startSearch() {
    this.props.Loader();
    this.props.searchLocation(localStorage.getItem("nightlifeToken"))
  }
  onInput(e) {
    localStorage.setItem("nightlifeToken",e.target.value);
    this.props.Loader();
    this.props.searchLocation(e.target.value);
  }
  render() {
    return (
      <div>
        <Menu inverted>
        <Menu.Item><i className="fa fa-glass" aria-hidden="true"></i> Nightlifer</Menu.Item>
        <Menu.Item>
          <Input id='input' loading={this.props.isLoading} onChange={(e)=>this.onInput(e)}icon="search" placeholder="Search places for night..." />
        </Menu.Item>
        <Menu.Menu position="right">
          {this.props.auth ? <Menu.Item><img className="profile_img" src={this.props.user.avatar_url} />{this.props.user.name}</Menu.Item> : null}
          {this.props.auth ? <Menu.Item name="logout" onClick={() => this.props.githubLogout()} /> : <Menu.Item><a href="http://github.com/login/oauth/authorize?client_id=9874bab59bd9072fffe8&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth%2Fgithub&scope=user">Login with Github</a></Menu.Item>}
        </Menu.Menu>
      </Menu>
        <div className="cards">
        <Card.Group>

        {this.props.search.map(item => (
          <ListItem data={item} key={item.id}/>
        ))}
      </Card.Group>
      </div>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  search: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  githubLogin: PropTypes.func.isRequired,
  githubLogout: PropTypes.func.isRequired,
  searchLocation: PropTypes.func.isRequired,
  Loader: PropTypes.func.isRequired,
};

export default App;