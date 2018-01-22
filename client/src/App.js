import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import auth0 from "auth0-js";
import Callback from "./Callback/Callback";
import Main from "./Components/Main";
import Header from "./Components/Header";
import axios from "axios";
import "./App.css";
import Auth from "./Auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("App props: ", this.props);
    this.state = {
      isAuthed: false,
      showOnboarding: false,
      authProfile: null,
      mongoProfile: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setSession = this.setSession.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setProfile = this.setProfile.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: "clean-eating.auth0.com",
    clientID: "IxNMVjAt_9pxnBH4IlE2ASSQFHeTlgd7",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://clean-eating.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // history.replace('/home');
        this.setProfile();
      } else if (err) {
        // history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }
  login() {
    this.auth0.authorize();
  }
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.setState({ authProfile: null, isAuthed: false }, () => {
      this.props.history.push("/");
    });
    // TODO: REdirect to homepage
  }
  setProfile() {
    let accessToken = localStorage.getItem("access_token");
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        const headers = { Authorization: `Bearer ${accessToken}` };
        axios
          .get(`/api/user/${profile.sub}`, { headers })
          .then(res => {
            this.setState(
              { authProfile: profile, mongoProfile: res.data, isAuthed: true },
              () => {
                this.props.history.push("/profile");
              }
            );
          })
          .catch(err => console.log(err));
      }
    });
  }
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  render() {
    return (
      <div className="App">
        <Header
          login={this.login}
          logout={this.logout}
          isAuthed={this.state.isAuthed}
        />
        <Main
          handleAuth={this.handleAuthentication}
          isAuthed={this.state.isAuthed}
          profile={this.state.authProfile}
        />
      </div>
    );
  }
}

export default withRouter(App);
