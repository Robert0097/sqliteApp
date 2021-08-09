import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import axios from 'axios'

const Todo = ({ children, item, onPress, onLongPress }) => {
  return(
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.todo}>
      {item.completed
        ?<Text style={styles.todoCompleted}>{children}</Text>
        :<Text style={styles.todoUncompleted}>{children}</Text>
      }
    </TouchableOpacity>
  )
}

const Button = ({children, onPress}) => {
  return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}


export default function App() {
  const [todos, settodos] = useState([
    {todo: 'terminar la aplicacion', completed: false},
    {todo: 'cargar los todos' ,completed: false},
    {todo: 'ir a la Luna a recoger los mandados', completed: false},
    {todo: 'buscar el eslabon perdido', completed: false}
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
    console.log(existsTodo)
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
          renderItem={({item})=>
            <Todo onPress={() => toggleTodo(item.todo)} 
              onLongPress={()=>deleteTodo(item.todo)} 
              item={item}>{item.todo}
            </Todo>
          } 
          keyExtractor={item=> (item.todo)}
          style={styles.todoList}
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
  todo: {
    paddingVertical: 20,
    marginVertical: 5,
    elevation: 5,
    borderRadius: 5,
    shadowColor: '#3333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  todoCompleted: {
    fontSize: 20,
    paddingHorizontal: 10,
    textDecorationLine: 'line-through'
  },
  todoUncompleted: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 50,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 5,
    height: 40,
    backgroundColor: 'rgb(107, 118, 188)',
    marginBottom: 50,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    paddingTop: 8,
  }
});
