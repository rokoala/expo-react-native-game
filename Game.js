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

    // create raycaster to check touch on elements
    this.raycaster = new THREE.Raycaster();
    this.createGameScene();
  }

  createGameScene=()=>{
    this.animatingIds = [];
    this.draggables = [];
    this.selection = null;
    this.setState({ started: false, scoreCount: 0 });
    this.background = Meshes.createBackground(this.width, this.height);
    this.hero = Meshes.createHero(THREEView);
    this.startScreen = Meshes.createStart(THREEView);

    this.scene.add(this.background);
    this.scene.add(this.startScreen);
    this.scene.add(this.hero);
    this.draggables.push(this.hero);

    //Initial touch position to calculate drag and drop distance
    this.dragInitialPosition ={x:0,y:0}
    //Mesh ids that needs to update frames
    this.animatingIds.push(this.hero.id);
  }

  startGame=()=>{
    this.setState({started:true});
    this.scene.remove(this.startScreen);
  };

  updateModels=()=>{
    this.animatingIds.forEach((id)=>{
      var obj = this.scene.getObjectById(id);
      obj.frame.updateFrame();
    });
  }

  tick=dt=>{
    this.updateModels();
  };

  touch=(event, gesture)=>{

    var points = new THREE.Vector2();

    points.x = ( gesture.x0/ Dimensions.get('window').width)*2 -1;
    points.y = -( gesture.y0/ Dimensions.get('window').height)*2 +1;
    this.raycaster.setFromCamera(points,this.camera)
    if(this.state.started){
      var intersects=this.raycaster.intersectObjects(this.draggables);
      if(intersects.length > 0){
        this.selection=intersects[0];
        this.dragInitialPosition.x = this.selection.object.position.x;
        this.dragInitialPosition.y = this.selection.object.position.y;
      }else{
        // Move character
      }
    }else{
      this.startGame();
    }
  }

  touchMove=(event, gesture)=>{
    event.preventDefault();
    if(this.selection){
      if(gesture.dx || gesture.dy){
        this.selection.object.position.x=this.dragInitialPosition.x+gesture.dx;
        this.selection.object.position.y=this.dragInitialPosition.y-gesture.dy;
      }
    }
  }

  touchRelease=(event, gesture)=>{
    this.selection=null;
  }

  panResponder=PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: this.touch.bind(this),
    onPanResponderMove: this.touchMove.bind(this),
    onPanResponderRelease:this.touchRelease.bind(this),
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
