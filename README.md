# Sidenav.js

[![Join the chat at https://gitter.im/ubenzer/sidenavjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ubenzer/sidenavjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![devDependency Status](https://david-dm.org/ubenzer/sidenavjs/dev-status.svg)](https://david-dm.org/ubenzer/sidenavjs#info=devDependencies)
[![Build Status](https://travis-ci.org/ubenzer/sidenavjs.svg?branch=master)](https://travis-ci.org/ubenzer/sidenavjs)
[![Greenkeeper badge](https://badges.greenkeeper.io/ubenzer/sidenavjs.svg)](https://greenkeeper.io/)

Sidenav.js is a React component that enables users add left side navigation to their web site that behaves like a native side navigation component of an Android application. **No dependencies!** Only *3K* when minified and gzipped!
Open Google Play Store and swipe your finger from the left of the screen. This library tries to provide the exact same behaviour.

![Sidenav Screencast Gif](sidenav-preview.gif)
[Hi-res Video](https://www.youtube.com/watch?v=pLeKw-mBVyw&)

## Demo
To see a live demo click [here](https://ubenzer.github.io/sidenavjs/) or scan the barcode at the end of the page. Don't forget to try it on your mobile phone too! Swipe your finger from the left of the screen towards right, just like you Open a sidenav in Android!

## Install

```bash
npm install --save sidenavjs
yarn add sidenavjs
```

## Usage (minimum required variables)

```jsx
import React, { Component } from 'react'

import Sidenav from 'sidenavjs'

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  render () {
    return (
      <Sidenav
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        sidenav={
          <div>sidenav contents</div>
        }
      >
        <div>
          body contents
          <button onClick={() => { this.onSetSidebarOpen(true) }}>
            Click here to open the sidenav
          </button>
        </div>
      </Sidenav>
    )
  }
}
```

## Features
1. Mobile first. Means: The library is small and robust, optimized for fluidity and framerate.
2. Multi-finger handled. Means: We won't confuse your fingers and throw bunch of exceptions if you
touch with more then one finger.
3. You can open/close sidenav programmatically. (By binding it to a button.)
4. You can attach callback to learn if user is touching the sidenav.
5. You can attach callback to learn if an animation in progress or not.
6. Sidenav contains only a minimal CSS bundled with it: You can add your custom classes and styles to make the styling perfect.

## Setting up development environment
0. Discuss the change that you want to introduce. You can open an issue for that.
1. Fork the project.
2. Run `npm i` in project root and in `example` folder.
3. Run `npm start` in project root and in `example` folder in two different consoles. This will start a test app where you can check your changes alongside with the actual component.
4. Browse http://localhost:3000 to see your changes.
5. Develop something.
6. Make a pull request.

## Contributing
Just open a PR or a ticket.

## License

MIT © [ubenzer](https://github.com/ubenzer)

## Your barcode to the demo
![Barcode to Demo](demoqr.png)
