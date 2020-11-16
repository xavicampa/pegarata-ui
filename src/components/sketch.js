import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'

// https://casesandberg.github.io/react-color/
class SketchExample extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose() {
    this.setState({ displayColorPicker: false })
  }

  handleChange(color) {
    this.setState({ color: color.rgb })
    this.handleClose()
  }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          // margin: '2px',
          width: '20px',
          height: '20px',
          borderRadius: '0px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
          boxShadow: '0 0 0 2px white',
        },
        swatch: {
          padding: '0px',
          // background: '#fff',
          borderRadius: '0px',
          boxShadow: '0 0 0 0px rgba(0,0,0,.1)',
          // display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '0',
          background: '#fff',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {
          this.state.displayColorPicker ? <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <CirclePicker color={this.state.color} onChange={this.handleChange} width="96px" />
          </div> : null
        }

      </div >
    )
  }
}

export default SketchExample;