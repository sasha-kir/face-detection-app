import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/link-form/ImageLinkForm';
import FaceDetection from './components/face-detection/FaceDetection';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import { withAlert } from "react-alert";

const particleOptions = {
  particles: {
    number: { value: 80 },
    shape: { type: "star" },
    size: { value: 4, random: true },
    opacity: { value: 1, random: true },
    line_linked: { enable: false }
  }
}

const initialState = {
    input: "",
    imageUrl: "",
    boundingBoxes: [],
    route: "sign-in",
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
};

class App extends Component {
    
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    onRouteChange = (nextLocation) => {
      this.setState({ route: nextLocation });
      if (nextLocation === "sign-in") {
        this.setState(initialState);
      }
    }

    loadUser = (userData) => {
      this.setState({
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          entries: userData.entries,
          joined: userData.joined
        }
      })
    }

    calculateFaceLocations = (data) => {
      if (Object.keys(data).length !== 0) {
        const faceBoxes = data.regions.map(region => region.region_info.bounding_box);
        const image = document.getElementById("input-image");
        const imageWidth = +image.width;
        const imageHeight = +image.height;

        const faceLocations = faceBoxes.map(box => {
          return ({
            leftCol: box.left_col * imageWidth,
            topRow: box.top_row * imageHeight,
            rightCol: imageWidth - (box.right_col * imageWidth),
            bottomRow: imageHeight - (box.bottom_row * imageHeight)
          });
        });

        this.setState({ boundingBoxes: faceLocations });
      } else {
        this.props.alert.show("There are no faces in the image :(");
      }
    }

    onInputChange = (event) => {
      this.setState({ input: event.target.value });
    }

    onImageSubmit = () => {
      this.setState({ imageUrl: this.state.input, boundingBoxes: [] });
      fetch("http://localhost:3001/detect", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ url: this.state.input })
          })
        .then(response => response.json())
        .then(data => {
          this.calculateFaceLocations(data);
          fetch("http://localhost:3001/new-entry", {
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(response => response.json())
            .then(entries => this.setState({ user: {...this.state.user, entries: entries} }))
            .catch(console.log)
        })
        .catch(error => this.props.alert.error("Something went wrong, try again"))
    }

    routeSwitcher = () => {
        switch (this.state.route) {
          case "sign-in":
            return ( <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> ); 
          case "register":
            return ( <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> );
          default:
            return (
                <div>
                    <Navigation onRouteChange={this.onRouteChange} />
                    <div className="logo-row">
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    </div>
                    <ImageLinkForm onInputChange={this.onInputChange} 
                                   onImageSubmit={this.onImageSubmit} />
                    <FaceDetection boundingBoxes={this.state.boundingBoxes} 
                                     imageToDisplay={this.state.imageUrl} />
                </div>
            );
        };
    }

    render() {
      return (
          <div className="App">
              <Particles className="particles" params={particleOptions} />
              {this.routeSwitcher()}
          </div>
      );
  }
}

export default withAlert()(App);
