import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const requestAnimationFrame = window.requestAnimationFrame
const doc = window.document

export default class Sidenav extends Component {
  static propTypes = {
    sidenav: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onSetOpen: PropTypes.func.isRequired,
    onSetBusy: PropTypes.func,
    onTouch: PropTypes.func,
    options: PropTypes.shape({
      extraClosePixels: PropTypes.number,
      width: PropTypes.number,
      backdropOpacity: PropTypes.number,
      animationDuration: PropTypes.number,
      sidenavClass: PropTypes.string,
      sidenavStyle: PropTypes.object,
      backdropStyle: PropTypes.object,
      contentStyle: PropTypes.object,
      dragStartSensitivity: PropTypes.number,
      swipeSensitivity: PropTypes.number,
      defaultAnimationSensitivity: PropTypes.number
    })
  }
  static defaultOptions = {
    extraClosePixels: 30,
    backdropOpacity: 0.5,
    animationDuration: 300,
    sidenavClass: '',
    sidenavStyle: {},
    backdropStyle: {},
    contentStyle: {},
    dragStartSensitivity: 40,
    swipeSensitivity: 10,
    defaultAnimationSensitivity: 40
  }

  constructor(props) {
    super(props)
    this.options = { ...Sidenav.defaultOptions, ...(props.options || {}) }
    this.state = {
      isTouched: false,
      sidenavStyle: { ...this.options.sidenavStyle },
      backdropStyle: { ...this.options.backdropStyle },
      backdropClass: {
        [styles.backdrop]: true
      },
      contentClass: {
        [styles.content]: true
      },
      transform: 0,
      backdropOpacity: 0
    }
    this.animation = {
      fingerId: null,
      startX: null,
      startY: null,
      draggingStarted: false,
      previousX: null,
      previousY: null,
      wasInSidenavOnce: false,
      lastAnimationId: 0,
      lastSpeed: 0
    }
    this.sidenavRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      if (this.props.open) {
        this.open()
      } else {
        this.close()
      }
    }
  }

  componentDidMount() {
    if (!this.options.width) {
      this.options.width = this.sidenavRef.current.offsetWidth
    }
    this.setState({ transform: -1 * this.options.extraClosePixels })
    this.registerEvents()
  }

  componentWillUnmount() {
    this.deregisterEvents()
  }

  registerEvents() {
    doc.addEventListener('touchstart', this.touchstart, { passive: false })
  }

  deregisterEvents() {
    doc.removeEventListener('touchstart', this.touchstart)
  }

  touchstart = e => {
    const { transform } = this.state
    const { open } = this.props

    if (this.animation.fingerId !== null) {
      // already touching it with another finger :D
      e.preventDefault()
      return
    }

    if (e.touches.length !== 1) {
      // touching with multiple fingers
      return
    }

    // if closed, check if the touch is from the left edge of the screen
    if (!open && e.touches[0].clientX > this.options.dragStartSensitivity) {
      return
    }

    this.animation.fingerId = e.touches[0].identifier
    this.animation.startX = e.touches[0].clientX
    this.animation.startY = e.touches[0].clientY
    this.animation.startTransform = transform
    this.animation.wasInSidenavOnce = false
    this.animation.draggingStarted = false
    this.animation.previousX = -999
    this.animation.previousY = -999

    // bind touchmove and end cancel events
    doc.addEventListener('touchmove', this.touchmove, { passive: true })
    doc.addEventListener('touchcancel', this.touchfinish, { passive: true })
    doc.addEventListener('touchend', this.touchfinish, { passive: true })

    this.setTouchState(true)
  }

  touchmove = e => {
    const pivotTouch = [...e.changedTouches].find(
      t => this.animation.fingerId === t.identifier
    )
    // our finger that starting dragging on screen is not on the screen anymore
    if (!pivotTouch) {
      return
    }

    if (
      Math.abs(pivotTouch.clientX - this.animation.previousX) < 1 &&
      Math.abs(pivotTouch.clientY - this.animation.previousY) < 1
    ) {
      // Do not over invoke move event
      return
    }
    this.animation.lastSpeed = pivotTouch.clientX - this.animation.previousX
    this.animation.previousX = pivotTouch.clientX
    this.animation.previousY = pivotTouch.clientY

    if (this.props.open) {
      if (
        !this.animation.draggingStarted &&
        Math.abs(this.animation.startX - pivotTouch.clientX) <
          Math.abs(this.animation.startY - pivotTouch.clientY)
      ) {
        // we are scrolling on Y axis in the sidenav. we shall not move it.
        this.doTouchFinish(null)
        return
      }
    }

    this.animation.draggingStarted = true

    this.expandTo(
      this.animation.startTransform +
        (pivotTouch.clientX -
          Math.min(this.animation.startX, this.options.width))
    )
  }

  touchfinish = e => {
    const pivotTouch = [...e.changedTouches].find(
      t => this.animation.fingerId === t.identifier
    )
    // our finger that starting dragging on screen is not on the screen anymore
    if (!pivotTouch) {
      return
    }

    if (!this.animation.draggingStarted) {
      return this.doTouchFinish(null)
    }

    let shouldOpen = this.state.transform > this.options.width / 2
    if (this.animation.lastSpeed > this.options.swipeSensitivity) {
      shouldOpen = true
    } else if (this.animation.lastSpeed < -1 * this.options.swipeSensitivity) {
      shouldOpen = false
    }
    this.doTouchFinish(shouldOpen)
  }

  doTouchFinish = shouldOpen => {
    if (shouldOpen === true) {
      this.open()
    } else if (shouldOpen === false) {
      this.close()
    }
    doc.removeEventListener('touchmove', this.touchmove)
    doc.removeEventListener('touchcancel', this.touchfinish)
    doc.removeEventListener('touchend', this.touchstart)
    this.animation.fingerId = null

    this.setTouchState(false)
  }

  expandTo(px) {
    px = Math.min(px, this.options.width)
    const opacity = (this.options.backdropOpacity * px) / this.options.width

    this.setState(prevState => ({
      backdropClass: { ...prevState.backdropClass, [styles.visible]: true },
      transform: px,
      backdropOpacity: opacity
    }))
    doc.body.classList.add(styles.noOverflow)
  }

  getTransformXStyle(px) {
    const { width } = this.options
    return {
      transform: `translate3d(${px - width}px, 0, 0)`
    }
  }

  getOpacityStyle(opacity) {
    return { opacity }
  }

  setBusyState(isBusy) {
    if (this.props.onSetBusy) {
      this.props.onSetBusy(isBusy)
    }
  }

  setTouchState(isTouched) {
    if (this.props.onTouch) {
      this.props.onTouch(isTouched)
    }
  }

  open = () => {
    this.setState(prevState => ({
      backdropClass: { ...prevState.backdropClass, [styles.visible]: true }
    }))

    doc.body.classList.add(styles.noOverflow)

    const {
      transform: startTransform,
      backdropOpacity: startOpacity
    } = this.state

    const {
      animationDuration: fullAnimationDuration,
      width,
      backdropOpacity,
      extraClosePixels
    } = this.options

    let animationDuration =
      ((width - startTransform) * fullAnimationDuration) /
      (width + extraClosePixels)

    // if the speed caused a swipe, we adjust our animation speed to match swipe's momentum
    if (this.animation.lastSpeed > this.options.swipeSensitivity) {
      animationDuration =
        (this.options.defaultAnimationSensitivity * animationDuration) /
        this.animation.lastSpeed
    }

    const transformAnimationFn = currentTime =>
      Sidenav.easeOutQuad(currentTime, startTransform, width, animationDuration)

    const opacityAnimationFn = currentTime =>
      Sidenav.easeOutQuad(
        currentTime,
        startOpacity,
        backdropOpacity,
        animationDuration
      )

    const onAnimationEnd = () => {
      this.setBusyState(false)
      this.props.onSetOpen(true)
    }

    this.animateSidebar(
      animationDuration,
      transformAnimationFn,
      opacityAnimationFn,
      onAnimationEnd
    )
  }

  close = () => {
    const {
      transform: startTransform,
      backdropOpacity: startOpacity
    } = this.state

    const {
      animationDuration: fullAnimationDuration,
      extraClosePixels,
      width
    } = this.options

    let animationDuration =
      ((startTransform + extraClosePixels) * fullAnimationDuration) /
      (width + extraClosePixels)

    // if the speed caused a swipe, we adjust our animation speed to match swipe's momentum
    if (Math.abs(this.animation.lastSpeed) > this.options.swipeSensitivity) {
      animationDuration =
        (this.options.defaultAnimationSensitivity * animationDuration) /
        Math.abs(this.animation.lastSpeed)
    }

    const transformAnimationFn = currentTime =>
      Sidenav.easeOutQuad(
        currentTime,
        startTransform,
        -1 * extraClosePixels,
        animationDuration
      )

    const opacityAnimationFn = currentTime =>
      Sidenav.easeOutQuad(currentTime, startOpacity, 0, animationDuration)

    const onAnimationEnd = () => {
      this.setState(prevState => ({
        backdropClass: { ...prevState.backdropClass, [styles.visible]: false }
      }))
      doc.body.classList.remove(styles.noOverflow)
      this.setBusyState(false)
      this.props.onSetOpen(false)
    }

    this.animateSidebar(
      animationDuration,
      transformAnimationFn,
      opacityAnimationFn,
      onAnimationEnd
    )
  }

  animateSidebar(
    animationDuration,
    transformAnimationFn,
    opacityAnimationFn,
    onAnimationEnd
  ) {
    const { lastAnimationId } = this.animation
    let animationStartTime = null
    let animationId = lastAnimationId + 1
    this.animation.lastAnimationId = animationId
    this.setBusyState(true)

    const animate = time => {
      if (animationId !== this.animation.lastAnimationId) {
        // looks like a new animation triggered while this was in progress... ignore this one.
        return
      }

      if (animationDuration === 0) {
        // nothing to animate, just finish it already
        onAnimationEnd()
        return
      }

      let timePassed = 0
      if (animationStartTime === null) {
        animationStartTime = time
      } else {
        timePassed = Math.min(time - animationStartTime, animationDuration)
      }

      const targetOpacity = opacityAnimationFn(timePassed)
      const targetTransform = transformAnimationFn(timePassed)

      this.setState({
        transform: targetTransform,
        backdropOpacity: targetOpacity
      })

      if (timePassed < animationDuration) {
        requestAnimationFrame(animate)
      } else {
        onAnimationEnd()
      }
    }
    requestAnimationFrame(animate)
  }

  static className(...classNames) {
    const normalizedClassList = classNames.reduce((acc, cn) => {
      if (Array.isArray(cn)) {
        return [...acc, ...cn]
      }

      if (typeof cn === 'string') {
        return [...acc, ...cn.split(' ')]
      }

      if (typeof cn === 'object') {
        return [
          ...acc,
          ...Object.keys(cn).reduce((acc, k) => {
            if (cn[k]) {
              return [...acc, k]
            }
            return acc
          }, [])
        ]
      }

      return acc
    }, [])

    return [...new Set(normalizedClassList)].join(' ')
  }

  static easeOutQuad(currentTime, startValue, endValue, animationDuration) {
    endValue = endValue - startValue
    currentTime /= animationDuration
    return -endValue * currentTime * (currentTime - 2) + startValue
  }

  render() {
    const { sidenav, children, onSetOpen } = this.props
    const {
      sidenavStyle,
      backdropStyle,
      backdropClass,
      contentClass,
      transform,
      backdropOpacity
    } = this.state
    const { sidenavClass: extraSidenavClass, contentStyle } = this.options

    const backdropOpacityStyle = this.getOpacityStyle(backdropOpacity)
    const transformStyle = this.getTransformXStyle(transform)

    return (
      <React.Fragment>
        <div
          className={Sidenav.className(backdropClass)}
          style={{ ...backdropStyle, ...backdropOpacityStyle }}
          onClick={() => onSetOpen(false)}
        />
        <div
          className={Sidenav.className(styles.sidenav, extraSidenavClass)}
          style={{ ...sidenavStyle, ...transformStyle }}
          ref={this.sidenavRef}
        >
          {sidenav}
        </div>
        <div className={Sidenav.className(contentClass)} style={contentStyle}>
          {children}
        </div>
      </React.Fragment>
    )
  }
}
