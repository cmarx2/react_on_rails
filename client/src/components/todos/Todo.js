import React from 'react';
import { Checkbox, Button, Icon } from 'semantic-ui-react';

const styles = {
  complete: {
    textDecoration: 'line-through', 
    color: 'grey'
  }
}

const Todo = ({ id, name, complete, update, deleteTodo }) => (
 
    <div>
      <Checkbox 
        defaultChecked={complete}
        onClick={() => update(id)}
      />
    <div style={complete ? styles.complete : {} }>
      <h1>{name}</h1>
      </div>
      <Button
        icon
        color='red'
        onClick={() => deleteTodo(id)}
      >
      <Icon name='trash' />
      </Button>
  </div>
)

export default Todo;