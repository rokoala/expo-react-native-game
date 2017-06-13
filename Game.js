import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Dimensions, PanResponder } from 'react-native';
import * as Meshes from './src/Utilities/scene';

// can't use the three import
const THREE = require('three');

const THREEView = Expo.createTHREEViewClass(THREE);

// Game based on floatyplane-starter from expo tutorials
// https://github.com/expo/floatyplane-starter/blob/master/Game/index.js
export default class Game extends React.Component {

  state = {
    scoreCount: 0,
    started: false,
  };

  componentWillMount(){
    // Camera
    viewSize = 1000;
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    aspectRatio = screenWidth / screenHeight;
    this.width = aspectRatio * viewSize;
    this.height = viewSize;

    this.camera = new THREE.OrthographicCamera(
      -this.width / 2,
      this.width / 2,
      this.height /2 ,
      -this.height / 2,
      1,
      10000
    );

    this.camera.position.z = 1000;
    // Scene allows you to set up what and where is to be rendered by three.js
    // this is where you plaace objects, lights and cameras
    this.scene = new THREE.Scene();
    this.createGameScene();
  }

  createGameScene=() =>{
    this.animatingIds = [];
    this.setState({ started: false, scoreCount: 0 });
    this.background = Meshes.createBackground(this.width, this.height);
    this.planeMesh = Meshes.createHero(THREEView);
    this.startScreen = Meshes.createStart(THREEView);

    this.scene.add(this.background);
    this.scene.add(this.startScreen);
    this.scene.add(this.planeMesh);
    this.animatingIds.push(this.planeMesh.id);
  }

  startGame = () =>{
    this.setState({started:true});
    this.scene.remove(this.startScreen);
  };

  updateModels=()=>{
    this.animatingIds.forEach((id)=>{
      var obj = this.scene.getObjectById(id);
      obj.frame.updateFrame();
    });
  }

  tick = dt => {
    this.updateModels();
  };

  touch = (_, gesture) =>{
    if(this.state.started){

    }else{
      this.startGame();
    }
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: this.touch,
    onShouldBlockNativeResponder: () => false,
  })

  render(){
    return (
      <View style={{flex:1}}>
        <THREEView
        {...this.viewProps}
        {...this.panResponder.panHandlers}
        scene={this.scene}
        camera={this.camera}
        tick={this.tick}
        style={{flex:1}}
        />
      </View>
    );
  }
}
