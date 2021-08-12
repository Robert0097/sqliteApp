import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, TextInput, Keyboard } from 'react-native';
import Button from './components/Button';
import Todo from './components/Todo';
import { createTable, addTodo, getTodos } from "./database/Database";


export default function App() {

  useEffect(() => {
    createTable()
    fetchTodos()
  }, [])

  const [todos, settodos] = useState([
    {todo: 'Example of Todo', completed: false},
    {todo: 'Press for complete' ,completed: false},
    {todo: 'Long press for delete', completed: false},
  ])
 
  const [text, settext] = useState('')

  const changeText = (val) =>{
    settext(val)
  }
  // const addTodo = (todo) => {
  //   if(!todo){
  //     alert('You must type a todo')
  //     return
  //   }
  //   const existsTodo = todos.find(x => x.todo === todo) //Search todo typed in todo list
  //   if(!existsTodo){
  //     settodos(todos.concat({todo: todo, completed:false})) //If todo exists don't create todo
  //     Keyboard.dismiss() //If todo don't exists, create todo, clear textinput and keyboard down
  //     settext('')
  //   }else {
  //     alert('This todo is already exists')
  //     return
  //   }
  // }
  const fetchTodos = () => {
    getTodos()
    
  }
  const añadirTodo=(todo)=>{
    addTodo(todo)
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
      <TextInput placeholder='Type New Todo...' style={styles.input} onChangeText={changeText} value={text}/>
      <Button onPress={()=> añadirTodo(text)}>Add Todo</Button>
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
