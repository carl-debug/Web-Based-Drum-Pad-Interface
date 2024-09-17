// // Detect button click 
// for (var i=0; i<=document.querySelectorAll(".drum").length;i++){
// document.querySelectorAll(".drum")[i].addEventListener("click",handleClick);

// function handleClick() {
//    var buttonInnerHTML = this.innerHTML;
    
//    switch (buttonInnerHTML) {
//         case "w":
//             var tom1 = new Audio("sounds/tom-1.mp3");
//             tom1.play();
//             break;
//         case "a":
//             var tom2 = new Audio("sounds/tom-2.mp3");
//             tom2.play();
//             break;

//         case "s":
//             var tom3 = new Audio("sounds/tom-3.mp3");
//             tom3.play();
//             break;       

//         case "d":
//             var tom4 = new Audio("sounds/tom-4.mp3");
//             tom4.play();
//             break;    

//         case "j":
//             var crash = new Audio("sounds/crash.mp3");
//             crash.play();
//             break;

//         case "k":
//             var kickbass = new Audio("sounds/kick-bass.mp3");
//             kickbass.play();
//             break;

//         case "l":
//             var snare = new Audio("sounds/snare.mp3");
//             snare.play();
//             break;

//         default:
//             break;
//     }
// }
// }


// Detect button click
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var keyInnerHTML = this.innerHTML;
        playSound(keyInnerHTML);
        buttonPump(keyInnerHTML);
    });
}

// Detect keypress
document.addEventListener("keydown", function(event) {
    playSound(event.key);
    buttonPump(event.key);
});

function playSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "k":
            var kickbass = new Audio("sounds/kick-bass.mp3");
            kickbass.play();
            break;
        case "l":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        default:
            console.log("Key not mapped");
            break;
    }
}
// Function to pump the button
function buttonPump(key) {
    var activeButton = document.querySelector("." + key);
    if (activeButton) {
        activeButton.classList.add("pump");

        // Remove the class after 100 milliseconds to return the button to its original size
        setTimeout(function() {
            activeButton.classList.remove("pump");
        }, 100);
    }
}

// Background animation
const deg = (a) => Math.PI / 180 * a;
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));
const opt = {
  particles: Math.min(Math.max(window.innerWidth * window.innerHeight / 10000, 500), 2000), // Particle count based on screen size
  noiseScale: 0.009,
  angle: Math.PI / 180 * -90,

  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82,
};

const Particles = [];
let time = 0;

/*--------------------
Setup
--------------------*/
function setup() {
  createCanvas(windowWidth, windowHeight); // Responsive canvas size
  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }
  strokeWeight(opt.strokeWeight);
}

/*--------------------
Draw
--------------------*/
function draw() {
  time++;
  background(0, 100 - opt.tail); // Semi-transparent background for trails

  for (let p of Particles) {
    p.update();
    p.render();
  }
}

/*--------------------
Resize
--------------------*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize canvas when window size changes
  opt.particles = Math.min(Math.max(window.innerWidth * window.innerHeight / 10000, 500), 2000); // Recalculate particle count
}

/*--------------------
Particle Class
--------------------*/
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > .5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > .5 ? 3 : 2;
  }

  randomize() {
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > .5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > .5 ? 3 : 2;
  }

  update() {
    this.follow();

    this.vx += this.ax;
    this.vy += this.ay;

    var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    var a = Math.atan2(this.vy, this.vx);
    var m = Math.min(this.maxSpeed, p);
    this.vx = Math.cos(a) * m;
    this.vy = Math.sin(a) * m;

    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    this.edges();
  }

  follow() {
    let angle = (noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + opt.angle;
    this.ax += Math.cos(angle);
    this.ay += Math.sin(angle);
  }

  updatePrev() {
    this.lx = this.x;
    this.ly = this.y;
  }

  edges() {
    if (this.x < 0) {
      this.x = width;
      this.updatePrev();
    }
    if (this.x > width) {
      this.x = 0;
      this.updatePrev();
    }
    if (this.y < 0) {
      this.y = height;
      this.updatePrev();
    }
    if (this.y > height) {
      this.y = 0;
      this.updatePrev();
    }
  }

  render() {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
    line(this.x, this.y, this.lx, this.ly);
    this.updatePrev();
  }
}

/*--------------------
Click Event to Randomize
--------------------*/
document.body.addEventListener('click', () => {
  opt.h1 = rand(0, 360);
  opt.h2 = rand(0, 360);
  opt.s1 = rand(20, 90);
  opt.s2 = rand(20, 90);
  opt.l1 = rand(30, 80);
  opt.l2 = rand(30, 80);
  opt.angle += deg(rand(60, 60)) * (Math.random() > 0.5 ? 1 : -1);

  for (let p of Particles) {
    p.randomize();
  }
});
