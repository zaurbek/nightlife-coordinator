import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import axios from 'axios';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      going: 0,
      isLoading: false
    };
  }
  componentDidMount() {
    axios.get(`/api/card?location=${this.props.data.id}`).then((res)=>res.data).then(data=>{
      this.setState({
        going: data.going,
        isLoading: false
      })
    })
  }
  toggleButton(id) {
      this.setState({
        isLoading:true
      },()=>axios.get(`/api/going?location=${this.props.data.id}&id=${id}`).then(()=>{
      axios.get(`/api/card?location=${this.props.data.id}`).then((res)=>res.data).then(data=>{
        this.setState({
          going: data.going,
          isLoading: false
        })
      })  
    }))
      
  }
  render() {
    return (
      <Card>
        <Card.Content>
          <a target="_blank" href={this.props.data.image_url}><Image floated="right" size="tiny" src={this.props.data.image_url} /></a>
          <Card.Header>
            {this.props.data.name}
          </Card.Header>
          <Card.Meta>
           Reviews: {this.props.data.review_count}
          </Card.Meta>
          <Card.Meta>
           Price: {this.props.data.price}
          </Card.Meta>
          <Card.Description>
            Phone number: <strong>{this.props.data.display_phone ? this.props.data.display_phone : 'none'}</strong><br />
            Average review rating: <strong>{this.props.data.rating}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.auth ? <Button loading={this.state.isLoading} onClick={()=>this.toggleButton(this.props.user)}size="tiny" floated="left" primary>{this.state.going} going</Button> : <a href="http://github.com/login/oauth/authorize?client_id=9874bab59bd9072fffe8&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth%2Fgithub&scope=user"><Button loading={this.state.isLoading} size="tiny" floated="left" primary>{this.state.going} going</Button></a> }
          <a target="_blank" href={this.props.data.url}><Image className="yelp-image" floated="right" size="mini" src="https:/dl.dropboxusercontent.com/s/71llfjnmnc34kzj/55555.png?dl=0" /></a>
        </Card.Content>
      </Card>
    );
  }
}


ListItem.propTypes = {
  auth: PropTypes.bool.isRequired,
  user: PropTypes.number.isRequired
};


export default ListItem;
