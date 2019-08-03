# Leap Motion + Multilayer Neural Network + MNIST + NodeJS
<p align="justify">
This is an implementation of a Neural Network working with the MNIST dataset applied to the Leap Motion controller. 
You can draw 1-9 numbers in the air and they will be recognized.<br>
This repository is related to this one: https://github.com/mavaras/Leap_MyMOUSE
</p>

## Getting started
### You need to have
- Python >= **3.6**
- NodeJS
- Leap Motion device
- Leap Motion Javascript API, LeapJS

### Setting up
```
git clone <repo>
npm install
node src/app.js
google-chrome http://localhost:3000/
```

## Usage
<p align="justify">
You can use your mouse or the Leap Motion device. In the second case, you just have to plug the device to your computer and start drawing by pressing <strong>F</strong>, moving your hand, and pressing <strong>F</strong> again to finish the stroke.
</p>
- mouse
<p align="center">
  <img width="607" height="350" src="https://raw.githubusercontent.com/mavaras/Leap_NN_browser/master/readme_files/mouse.gif">
</p>
- Leap
<p align="center">
  <img width="607" height="350" src="https://raw.githubusercontent.com/mavaras/Leap_NN_browser/master/readme_files/leap.gif">
</p>

## TODO
- Pretty hand visualization :) (three.js maybe?)

