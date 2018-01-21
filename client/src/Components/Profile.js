import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <div>Profile page</div>;
  }
}

export default Profile;
