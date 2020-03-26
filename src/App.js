import React, {Component} from 'react';
import axios from 'axios';
import {Loading} from './Loading'



class App extends Component {
  constructor(props) {
    super(props)
    // state 
    this.state = {
      users: [],
      loading: false
    }
    // bind 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // api call 
  
  getUsers() {
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
      // .then(response => console.log(response))
      .then(response => this.setState(
        {
          users: [...this.state.users, ...response.data.results],
          loading: false
        }
      ));
  }
  
  componentWillMount() {
    this.getUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('More User loaded');
  }

  
  render() {

    const { loading, users } = this.state;

    return (
      <div className="App" >
        <form onSubmit={this.handleSubmit}>
              <input type="submit" value="load user" />
            </form>
            <hr />
        { !loading ? users.map(user => (
            <div key={user.id.value}>
            <h3 style={{ color: 'red'}}>{user.name.first}  {user.name.last}</h3> 
            <p>{user.email}</p> 
            <hr />
            
            </div>
          )) : (<Loading message="Please wait" />)} 
      </div>
    );
  }
}

export default App;
