import React from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { Button, ListGroup, ListGroupItem, InputGroup, InputGroupAddon, Input } from 'reactstrap';

const ButtonItems = props =>
  props.items.map((item) =>
    <ListGroupItem tag="button"
      id={item.done ? "Done-button" : "Todo-button"}
      action
      onClick={(e) => item.onToggleItem(e.target.value)}
      value={item.name}
      key={item.name}
    >
      {item.name}
    </ListGroupItem>
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
        { name: "test1", done: false, onToggleItem: this.handleDone },
        { name: "test2", done: false, onToggleItem: this.handleDone }
      ],
      doneItems: [
        { name: "test3", done: true, onToggleItem: this.handleTodo },
        { name: "test4", done: true, onToggleItem: this.handleTodo }
      ]
    };
  }

  handleDone(e) {
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
        <div className="container">
          <InputGroup className="Input">
            <Input placeholder="Add new item..."
              maxLength="40"
              name="newItem"
              value={this.state.item}
              onChange={this.handleItemChange}
              onKeyPress={this.handleKeyPress}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleAdd}>Add</Button>
            </InputGroupAddon>
          </InputGroup>
          <ListGroup className="Todo-items">
            <ButtonItems items={this.state.todoItems} />
          </ListGroup>
          <ListGroup className="Done-items">
            <ButtonItems items={this.state.doneItems} />
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default App;
