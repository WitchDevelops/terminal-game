# What is it

It's a game you play in a terminal. You have a field with holes "O" and you need to find your hat "^". User character is represented as "*". You move by pressing U to go up, D to go down, L to go left and R to go right.
You loose when you fall down a hole or exit the field.
You win when you find your hat.

# Demo

![Preview](https://content.codecademy.com/PRO/independent-practice-projects/find-your-hat/find-your-hat-demo.gif)

# How to run it

You need to have node.js installed with `prompt-sync` module.
To install node.js - [Windows](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/), [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04), [one more guide](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac).

Once you have node.js installed, you need to install `prompt-sync` module.
 ```
 npm install prompt-sync
 ```
Then to run the game
```
node game.js
```
And that's it.

# Motivation

I wrote this as a part of FrontEnd Engineer career path on CodeCademy.