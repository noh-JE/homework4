import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Link id="profile-link" to="/profile">profile</Link>
      </div>
    );
  }
}

export default Main;
