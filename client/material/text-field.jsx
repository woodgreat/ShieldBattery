import React from 'react'
import classnames from 'classnames'
import uniqueId from '../dom/unique-id'
import styles from './text-field.css'

import InputError from './input-error.jsx'
import InputUnderline from './input-underline.jsx'

// A single-line Material text field, supporting with and without floating labels
class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.id = uniqueId()
    this.state = {
      hasValue: !!(this.props.value || this.props.defaultValue)
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasNewDefault = nextProps.defaultValue !== this.props.defaultValue
    const hasValueProp = nextProps.hasOwnProperty('value')

    if (hasValueProp) {
      this.setState({ hasValue: !!nextProps.value })
    } else if (hasNewDefault) {
      this.setState({ hasValue: !!nextProps.defaultValue })
    }
  }

  render() {
    const classes = classnames(styles.textField, this.props.className, {
      [styles.isError]: !!this.props.errorText,
      [styles.floatingLabel]: this.props.floatingLabel,
      [styles.hasValue]: this.state.hasValue,
      [styles.disabled]: this.props.disabled,
      [styles.focused]: this.state.isFocused,
    })

    const label = this.props.label ?
        <label className={styles.label} htmlFor={this.id}>{this.props.label}</label> : null

    const inputProps = {
      ref: 'input',
      id: this.id,
      onBlur: e => this._onInputBlur(e),
      onChange: e => this._onInputChange(e),
      onFocus: e => this._onInputFocus(e),
      onKeyDown: e => this._onKeyDown(e),
      type: this.props.type,
      className: styles.input,
    }

    return (
      <div className={classes}>
        {label}
        <input {...this.props} {...inputProps} />
        <InputUnderline focused={this.state.isFocused} error={!!this.props.errorText}
            disabled={this.props.disabled} />
        {this.props.allowErrors ? <InputError error={this.props.errorText} /> : null}
      </div>
    )
  }

  blur() {
    this.refs.input.blur()
  }

  focus() {
    this.refs.input.focus()
  }

  clearValue() {
    this.setValue('')
  }

  getValue() {
    return this.refs.input.value
  }

  setValue(value) {
    this.refs.input.value = value
    this.setState({ hasValue: !!value })
  }

  _onInputBlur(e) {
    this.setState({ isFocused: false })
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  _onInputFocus(e) {
    this.setState({ isFocused: true })
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  _onInputChange(e) {
    this.setState({ hasValue: !!e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  _onKeyDown(e) {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(e)
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e)
    }
  }
}

TextField.propTypes = {
  allowErrors: React.PropTypes.bool,
  errorText: React.PropTypes.string,
  floatingLabel: React.PropTypes.bool,
  label: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onEnterKeyDown: React.PropTypes.func,
  type: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
}

TextField.defaultProps = {
  type: 'text',
  allowErrors: true,
  floatingLabel: false,
}

export default TextField
