import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import Button from './components/Button';
import Todo from './components/Todo';

export default function App() {
  const [todos, settodos] = useState([
    {todo: 'Example of Todo', completed: false},
    {todo: 'Press for complete' ,completed: false},
    {todo: 'Long press for delete', completed: false},
  ])
  const [text, settext] = useState('')
  // Traer datos de una API jsonplacerholder
  // const fetchData = async() => {
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  //   const res = await response.data
  //   setdata(res)
  //   setloading(false)
  // }
  const changeText = (val) =>{
    settext(val)
  }
  const addTodo = (todo) => {
    const existsTodo = todos.find(x => x.todo === todo)
    if(!existsTodo){
      settodos(todos.concat({todo: todo, completed:false}))  
    }else {
      alert('This todo is already exists')
      return
    }
  }
  const toggleTodo = (id) => {
    const modifiedTodos = todos.map( x => x.todo === id ? {...x, completed: !x.completed } : x) 
    settodos(modifiedTodos)
  }
  const deleteTodo = (id) => {
    const deletedTodos = todos.filter( x => x.todo !== id )
    settodos(deletedTodos)
  }
 
  return (
    <TouchableOpacity style={styles.container}>
      <FlatList data={todos} 
          keyExtractor={item=> (item.todo)}
          style={styles.todoList}
          renderItem={({item})=>
            <Todo onPress={() => toggleTodo(item.todo)} 
              onLongPress={()=>deleteTodo(item.todo)} 
              item={item}>{item.todo}
            </Todo>
          } 
        />
      <TextInput placeholder='Type New Todo...' style={styles.input} onChangeText={changeText}/>
      <Button onPress={()=>addTodo(text)}>Add Todo</Button>
      <StatusBar style="auto" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  todoList: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 50,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
});
