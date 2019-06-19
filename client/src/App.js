import React from 'react';
import { Component } from 'react';
import { Container, CommentActions } from 'semantic-ui-react';
import TodoForm from './components/todos/TodoForm';
import axios from 'axios';
import TodoList from './components/todos/TodoList';

class App extends Component {
  state = { todos: [] }

  componentDidMount() {
    axios.get('/api/items')
      .then( res => {
        this.setState({ todos: res.data })
      })
      .catch(err => {
        console.log(err)
      })

  }

  addItem = (name) => {
    axios.post('/api/items', { name } )
    .then( res => {
      const { todos } = this.state
      this.setState({ todos: [...todos, res.data ] })
    })
  }

  updateTodo = (id) => {
    axios.put(`/api/items/${id}`)
    .then(res => {
      const todos = this.state.todos.map( t => {
        if (t.id === id) 
          return res.data
            // json data in controller is what it returns
          return t
      })
      this.setState({ todos })
    })
  }

  deleteTodo = (id) => {
    axios.delete(`/api/items/${id}`)
    .then( res => {
      const { todos } = this.state 
      this.setState({ todos: todos.filter( t => t.id !== id )})
    })
  }

  render() {
    const { todos } = this.state
    return(
        <Container>
          <TodoForm add={this.addItem} />
          <TodoList 
            todos={todos} 
            update={this.updateTodo}
            deleteTodo={this.deleteTodo} 
            />
          {/* passing in Todos from state as a prop to our Todo List so that we can see them all. These are all of the functions we are passing in. First the state, then the update method. Can name the prop whatever we want */}
        </Container>
    )
  }
}


export default App;
