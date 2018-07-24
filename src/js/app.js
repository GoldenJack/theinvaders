class App {
  constructor(obj){
    this.obj = obj;
    this.count = 0;
    this.countActive = 0;
    this.countRed = 0;
    this.countGreen = 0;
    this.addEzBlock = this.obj.querySelector('.ezBtn');
    this.addHardBlock = this.obj.querySelector('.hardBtn');
    this.place = this.obj.querySelector('.content');

    this.addEzBlock.onclick = () => {
      this.init();
      this.updateCount();
    };
    this.addHardBlock.onclick = () => {
      this.init(true);
      this.updateCount();
    }
    console.log(this)
  }
  init(state){
    let block = document.createElement("div");
    block.className = 'col-md-3';
    block.innerHTML =  `<div class="text__block"><div class="close">+</div>
                        <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptate, eaque explicabo pariatur odit fugit assumenda. Voluptatem ut maiores ipsum.</div></div>`
    if(!state) {
      return new EzBlock(this.obj, block);
    }else{
      return new HardBlock(this.obj, block)
    }
  }

  updateCount(){
    let countBlock = this.obj.querySelector('.count__block');
    this.count = this.obj.querySelectorAll('.text__block').length;
    countBlock.innerText = this.count;
  }
  updateActive(){
    let countBlockActive = this.obj.querySelector('.count__block-active');
    this.countActive = this.obj.querySelectorAll('.text__block.active').length;
    countBlockActive.innerText = this.countActive;
  }
  updateRed(){
    let countBlockRed = this.obj.querySelector('.count__block-red');
    this.countRed = this.obj.querySelectorAll('.text__block.active-red').length;
    countBlockRed.innerText = this.countRed;
  }
  updateGreen(){
    let countBlockGreen = this.obj.querySelector('.count__block-green');
    this.countGreen = this.obj.querySelectorAll('.text__block.active-green').length;
    countBlockGreen.innerText = this.countGreen;
  }
}
class EzBlock extends App {
  constructor(obj, block){
    super(obj);
    this.block = block;
    this.close = this.block.querySelector('.close');

    this.render();
    this.close.onclick = () => {
      this.destroy();
    }
    this.block.onclick = () => {
      this.active();
    }
  }
  render(){
    this.place.appendChild(this.block)
  }
  destroy(){
    this.block.remove();
    super.updateCount();
    super.updateGreen();
    super.updateRed();
  }
  active(){
    this.block.querySelector('.text__block').classList.toggle('active');
    super.updateActive();
  }
}
class HardBlock extends EzBlock {
  constructor(obj, block){
    super(obj, block);
    this.block.ondblclick = () => {
      this.hardActive();
    }
  }

  hardActive(){
    let hrBlock = this.block.querySelector('.text__block');
    if(hrBlock.classList.contains('active-red')){
      hrBlock.classList.remove('active-red');
      hrBlock.classList.add('active-green');
    }else if(hrBlock.classList.contains('active-green')){
      hrBlock.classList.remove('active-green');
      hrBlock.classList.add('active-red');
    }else{
      hrBlock.classList.add('active-red');
    }
    super.updateRed();
    super.updateGreen();
  }
}

let appId = document.querySelector('.app');
let app = new App(appId);