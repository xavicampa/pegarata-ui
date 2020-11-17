import React from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
// import SketchExample from './components/sketch'

const ButtonItems = props =>
  props.items.map((item) =>
    <a
      className={item.done ? "badge badge-pill badge-secondary" : "badge badge-pill badge-primary"}
      href="#"
      key={item.name}
      id={item.done ? "Done-button" : "Todo-button"}
      onClick={(e) => {
        e.preventDefault();
        item.onToggleItem(e.target.name);
      }}
      name={item.name}>
      {item.name}
    </a >
  )

ButtonItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact(
      {
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        onToggleItem: PropTypes.func.isRequired
      }
    )
  ).isRequired
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleTodo = this.handleTodo.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      item: "",
      todoItems: [
        { name: "Meat 🥩", done: false, onToggleItem: this.handleDone },
        { name: "Apples 🍎", done: false, onToggleItem: this.handleDone },
        { name: "Oranges 🍊", done: false, onToggleItem: this.handleDone },
        { name: "Bananas 🍌", done: false, onToggleItem: this.handleDone },
        { name: "Tomato sauce 🥫", done: false, onToggleItem: this.handleDone },
        { name: "Potatos 🥔", done: false, onToggleItem: this.handleDone }
      ],
      doneItems: [
        { name: "Milk 🥛", done: true, onToggleItem: this.handleTodo },
        { name: "Eggs 🥚", done: true, onToggleItem: this.handleTodo }
      ]
    };
  }

  handleDone(e) {
    console.log(e)
    let item = this.state.todoItems.find(item => item.name.toLowerCase() === e.toLowerCase())

    item.done = true
    item.onToggleItem = this.handleTodo
    this.setState({
      todoItems: this.state.todoItems.filter(item => item.name.toLowerCase() !== e.toLowerCase()),
      doneItems: [item].concat(this.state.doneItems)
    })
  }

  handleTodo(e) {
    let item = this.state.doneItems.find(item => item.name.toLowerCase() === e.toLowerCase())

    item.done = false;
    item.onToggleItem = this.handleDone
    this.setState({
      doneItems: this.state.doneItems.filter(item => item.name.toLowerCase() !== e.toLowerCase()),
      todoItems: this.state.todoItems.concat(item)
    })
  }

  handleAdd() {
    if (this.state.doneItems.find(item => item.name.toLowerCase() === this.state.item.toLowerCase())) {
      this.handleTodo(this.state.item)
    } else if (!this.state.todoItems.find(item => item.name.toLowerCase() === this.state.item.toLowerCase())) {
      let item = { name: this.state.item, done: false, onToggleItem: this.handleDone }
      this.state.todoItems.push()
      this.setState({
        todoItems: [item].concat(this.state.todoItems)
      })
    }
    this.setState({ item: "" })
  }

  handleItemChange(e) {
    this.setState({ item: e.target.value })
  }

  handleKeyPress(target) {
    if (target.key === 'Enter') {
      this.handleAdd()
    }
  }

  render() {
    return (
      <div className="App" >
        <div className="App-header">
          Pegarata
        </div>

        <div className="container-fluid" id="todo-container">
          <ButtonItems items={this.state.todoItems} />
        </div>

        <div className="container-fluid" style={{ bottom: "10px", position: "fixed" }}>
          <div className="container-fluid" id="done-container">
            <ButtonItems items={this.state.doneItems} />
          </div>
          <InputGroup className="Input" size="lg">
            <Input placeholder="Add new item..."
              maxLength="40"
              name="newItem"
              value={this.state.item}
              onChange={this.handleItemChange}
              onKeyPress={this.handleKeyPress}
            />

            <InputGroupAddon addonType="append">
              {/*  */}
              {/* <Button color="primary" id="colorpickerbutton" onClick={this.handleAdd}>
                <SketchExample />
              </Button> */}
              {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Color
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div> */}
              <Button color="primary" id="addbutton" onClick={this.handleAdd}>Add</Button>
            </InputGroupAddon>

          </InputGroup>
          {/* <form>
            <input
              value={this.state.item}
              onChange={this.handleItemChange}
              onKeyPress={this.handleKeyPress}
              className="form-control"
              id="itemInput"
              placeholder="Add item..." />
            <Button color="primary" id="addbutton" onClick={this.handleAdd}>Add</Button>
          </form> */}
        </div>
      </div>

    )
  }
}

export default App;
