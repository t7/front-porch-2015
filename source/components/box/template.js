// Dependencies.
import React from 'react'

// CSS.
import style from './t7-box.css'

// Utility methods.
import fake from '../../fake'
import utils from '../../utils'

// Define class.
class Box extends React.Component {
  constructor (props) {
    // Pass `props` into scope.
    super(props)

    // Get default state.
    this.defaultState()
  }

  // Apply to `state`, because we
  // don't want to mutate `props`.
  defaultState () {
    const state = {
      hidden: false
    }

    // If state exists, reset it.
    if (typeof this.state === 'object') {
      this.setState(state)

    // Otherwise, create state.
    } else {
      this.state = state
    }
  }

  // Close "X" event.
  handleClick (e) {
    const keyPress = e.keyCode
    const keyEnter = keyPress === 13

    // Exit, if not "Enter" key.
    if (keyPress && !keyEnter) {
      return
    }

    const el = e.target
    const box = el.parentNode
    const id = box.id
    const handleClick = this.props.handleClick

    this.setState({
      hidden: true
    })

    if (typeof handleClick !== 'function') {
      return
    }

    handleClick(e, id)
  }

  // Render method.
  render () {
    const children = this.props.children
    const close = this.props.close
    const icon = this.props.icon
    const id = this.props.id || utils.unique()
    const mode = this.props.mode
    const hidden = this.state.hidden

    // Used in conditional.
    var ariaHidden
    var styleDisplay

    // Hidden?
    if (hidden) {
      ariaHidden = true
      styleDisplay = {display: 'none'}
    }

    // Events.
    const handleClick = this.handleClick.bind(this)

    // Used in conditional.
    var className = style['t7-box']

    // Mode: "info".
    if (mode === 'info') {
      // Use "info" icon?
      className = icon
        ? style['t7-box--info--icon']
        : style['t7-box--info']

    // Mode: "negative".
    } else if (mode === 'negative') {
      // Use "negative" icon?
      className = icon
        ? style['t7-box--negative--icon']
        : style['t7-box--negative']

    // Mode: "positive".
    } else if (mode === 'positive') {
      // Use "positive" icon?
      className = icon
        ? style['t7-box--positive--icon']
        : style['t7-box--positive']

    // Mode: "warn".
    } else if (mode === 'warn') {
      // Use "warn" icon?
      className = icon
        ? style['t7-box--warn--icon']
        : style['t7-box--warn']
    }

    // Used in conditional.
    var closeX

    // Close "X" specified?
    if (close) {
      closeX = (
        <a
          aria-controls={id}
          aria-label='Close'
          title='Close'

          className={style['t7-box__close']}
          tabIndex='0'
          onClick={handleClick}
          onKeyDown={handleClick}
        >Close</a>
      )
    }

    // Assume a `<p>` or other block level
    // children were passed into the box.
    var box = (
      <div
        aria-hidden={ariaHidden}
        className={className}
        id={id}
        style={styleDisplay}
      >
        {this.props.children}
        {closeX}
      </div>
    )

    // Ensure at least a `<p>` exists.
    if (typeof children === 'string') {
      box = (
        <div
          aria-hidden={ariaHidden}
          className={className}
          id={id}
          style={styleDisplay}
        >
          <p>
            {this.props.children}
          </p>
          {closeX}
        </div>
      )
    }

    // Expose the UI.
    return box
  }
}

// Validation.
Box.propTypes = {
  children: React.PropTypes.node,
  icon: React.PropTypes.bool,
  mode: React.PropTypes.string,
  hidden: React.PropTypes.bool
}

// Prop defaults.
Box.defaultProps = {
  children: fake.box(),

  // Events.
  handleClick: function (e, id) {
    utils.log(e, id)
  }
}

// Export.
export default Box
