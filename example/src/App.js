import React, { Component } from 'react'
import Sidenav from 'sidenavjs'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      busy: false,
      touched: false,
    }
    this.sidenavOptions = {
      sidenavClass: 'sidenav',
    }
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open })
  }

  onSetBusy = (busy) => {
    this.setState({ busy })
  }

  onSetTouch = (touched) => {
    this.setState({ touched })
  }

  render() {
    const { busy, touched } = this.state

    return (
      <React.Fragment>
        <Sidenav
          options={this.sidenavOptions}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          onSetBusy={this.onSetBusy}
          onTouch={this.onSetTouch}
          sidenav={
            <React.Fragment>
              <div className="header">
                <i className="material-icons avatar">menu</i>
                <div className="title">Sidenav.js</div>
                <div className="headline">
                  A React library to create sidebars on mobile! No dependencies!
                </div>
              </div>
              <div>
                <ul>
                  <li>
                    <i className="material-icons">account_circle</i>
                    <span>Some menu item</span>
                  </li>
                  <li className="active">
                    <i className="material-icons">android</i>
                    <span>Another menu item</span>
                  </li>
                  <li>
                    <i className="material-icons">face</i>
                    <span>It doesn't necessarily to be a menu</span>
                  </li>
                  <li>
                    <i className="material-icons">room</i>
                    <span>Put anything you want!</span>
                  </li>
                  <li>
                    <i className="material-icons">airplanemode_active</i>
                    <span>Scrolling on sidenav is OK too!</span>
                  </li>
                  <li>
                    <i className="material-icons">remove_red_eye</i>
                    <span>
                      Is sidebar animating:&nbsp;
                      <code>
                        {busy && <strong>TRUE</strong>}
                        {!busy && 'false'}
                      </code>
                    </span>
                  </li>
                  <li>
                    <i className="material-icons">touch_app</i>
                    <span>
                      Is sidebar being touched:&nbsp;
                      <code>
                        {touched && <strong>TRUE</strong>}
                        {!touched && 'false'}
                      </code>
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={() => this.onSetSidebarOpen(false)}
                      className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    >
                      Close the sidebar
                    </button>
                  </li>
                  <li>
                    <i className="material-icons">face</i>
                    <span>I put this menu item</span>
                  </li>
                  <li>
                    <i className="material-icons">lock</i>
                    <span>So that sidenav will be long enough</span>
                  </li>
                  <li>
                    <i className="material-icons">schedule</i>
                    <span>And scroll</span>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          }
        >
          <div className="demo-layout mdl-layout mdl-layout--fixed-header mdl-color--grey-100">
            <header className="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
              <div id="menu-toggle" className="mdl-layout__header-row">
                <i
                  className="material-icons"
                  onClick={() => {
                    this.onSetSidebarOpen(true)
                  }}
                >
                  menu
                </i>

                <span className="mdl-layout-title">Sidenav.js</span>
              </div>
            </header>
            <div className="demo-ribbon" />
            <main className="demo-main mdl-layout__content">
              <div className="demo-container mdl-grid">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
                <div className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                  <h2>Sidenav.js</h2>
                  <p>
                    No dependencies! Only <strong>3K</strong> when minified and
                    gzipped!
                  </p>
                  <p>
                    Sidenav.js is a React component that enables users to add
                    sidebars to their website that behaves like a native side
                    navigation component of a mobile phone application.
                  </p>
                  <p>
                    This library tries to emulate the exact same behavior of
                    Android's sidenav in JavaScript to enable users to create
                    native-like web applications. Open Google Play Store and
                    swipe your finger from the left side of the screen. This
                    library tries to provide the exact same behavior.
                  </p>
                </div>
              </div>
              <div className="demo-container mdl-grid">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
                <div className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                  <h3>Main Features</h3>
                  <h5 className="center">
                    <i className="material-icons">code</i>
                    <span>No dependencies!</span>
                  </h5>
                  <p>
                    This library <i>intentionally</i> has no (non-development)
                    dependencies! You won't be the victim of next&nbsp;
                    <code>event-stream</code> because of this library.
                  </p>
                  <h5 className="center">
                    <i className="material-icons">flash_on</i>
                    <span>Only 3kb!</span>
                  </h5>
                  <p>
                    When minimized and gzipped Sidenav.js is around 3kb. This
                    cost is minimal due to the fact that Sidenav.js only offers
                    essential features. We don't intend to make it feature rich.
                    We care about the file size.
                  </p>
                  <h5 className="center">
                    <i className="material-icons">mobile_friendly</i>
                    <span>Designed for mobile</span>
                  </h5>
                  <p>
                    Sidenav.js uses <i>only</i> Javascript touch events to act.
                    It handles multi-touch gracefully. It won't respond to the
                    mouse. Performance is considered as a key aspect.
                  </p>
                  <h5 className="center">
                    <i className="material-icons">settings</i>
                    <span>Callbacks</span>
                  </h5>
                  <p>
                    Sidenav.js offers callbacks for animation and touch events.
                  </p>
                  <p>
                    Is sidebar animating:&nbsp;
                    <code>
                      {busy && <strong>TRUE</strong>}
                      {!busy && 'false'}
                    </code>
                  </p>
                  <p>
                    Is sidebar being touched:&nbsp;
                    <code>
                      {touched && <strong>TRUE</strong>}
                      {!touched && 'false'}
                    </code>
                  </p>
                  <a
                    href="https://github.com/ubenzer/sidenavjs"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                  >
                    Go read more on Github
                  </a>
                </div>
              </div>
              <footer className="demo-footer mdl-mini-footer">
                <div className="mdl-mini-footer--left-section">
                  <ul className="mdl-mini-footer--link-list">
                    <li>
                      <a href="https://github.com/ubenzer/sidenavjs">
                        Fork me on Github
                      </a>
                    </li>
                    <li>Licensed under MIT</li>
                    <li>
                      <a href="https://benzer.me">Umut Benzer</a>
                    </li>
                  </ul>
                </div>
              </footer>
            </main>
          </div>
        </Sidenav>
      </React.Fragment>
    )
  }
}
