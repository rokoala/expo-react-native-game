
export default class Frame {

  constructor(texture,options){
      options = options || {};
      this.texture = texture;
      this.currentFrame=options.currentFrame || 0;
      this.timeFrame=options.timeFrame || 0;
      this.maximumFrame=options.maximumFrame || 0;
      this.maximumTimeFrame=options.maximumTimeFrame || 10;

      this.texture.repeat.set(1/this.maximumFrame,1);
  }

  // updates the texture offset x based on maximumTimeFrame
  updateFrame(){
    if(this.timeframe < this.maximumTimeFrame){
      this.timeframe++;
    }else{
      if(this.currentFrame+1 >= this.maximumFrame){
        this.currentFrame=0;
      }else{
        this.currentFrame++;
        this.texture.offset.x=this.currentFrame/this.maximumFrame;
      }
      this.timeframe=0;
    }
  }

}
