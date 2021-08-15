import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity as View, Text, FlatList, TextInput, Keyboard } from 'react-native';
import Button from './components/Button';
import Todo from './components/Todo';
import { createTable, deleteTodo, changeTodo } from "./database/Database";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sqliteApp');


export default function App() {
  
  useEffect(() => {
    createTable()
    fetchData()
  }, [])

  const [todos, settodos] = useState([
    {todo: 'Example of Todo', completed: false}
  ])
  const [loading, setLoading] = useState(true)
  const [text, settext] = useState('')

  const changeText = (val) =>{
    settext(val)
  }
  const deleteAll =() => {
    db.transaction((tx)=>{
      tx.executeSql(
        "DELETE * FROM todos",
        [],
        (tx,res)=>{console.log('todo borrado')},
        (err)=>{console.log(err)})
    }),
    err=>{console.log(err)},
    res=>{}
  }
  
  const fetchData = () =>  {
    db.transaction((tx)=>{
      tx.executeSql(
          "SELECT * FROM todos",
          [],
          (tx, res)=>{
              const leng = res.rows.length 
              if(leng < 0){
                  return
              }else{    
                let list =[]
                for(let i=0; i<leng; i++){
                    let item = res.rows.item(i)
                    let completed = false
                    if(item.completed === "0.0" || item.completed ==="0"){
                        completed = false
                    }else if(item.completed === "1"){
                        completed = true
                    }
                    const newTodo = {todo: item.todo, completed: completed} 
                    list.push(newTodo)
                }
                settodos(list)
                setLoading(false)
              }
          },
          (err)=>{console.log(err)}
      )
    },
    err=>{console.log(err)},
    res=>{()=>{
      
    }})
  }

  const añadirTodo=(todo)=>{
    if(!todo){
      alert('You must type a todo')
      return
    }
    if(todos){
      const existsTodo = todos.find(x => x.todo === todo)
      if(existsTodo){
          alert('This todo is already exists')
          return
      }
      let completed = 0
      db.transaction((tx)=>{
          tx.executeSql(
              "INSERT INTO todos (todo,completed) VALUES (?,?)",
              [todo,completed],
              (tx, res)=>{console.log(res)},
              (err)=>{console.log(err)})
          }, 
      err=>{console.log(err)},
      res=>{})
    }
      Keyboard.dismiss()
      settext('')
      fetchData()
    }
  


  const toggleTodo = (item) => {
    let status = " "
    if(item.completed == false){
        status = "1" 
    }else{
        status = "0"
    }
    db.transaction((tx)=>{
        tx.executeSql(
            "UPDATE todos SET completed=? WHERE todo=?;",
            [status,item.todo],
            (tx, res)=>{
                console.log(res)
            },
            (err)=>{console.log(err)}
        )
    },
    err=>{console.log(err)},
    res=>{})
    useEffect(() => {
      fetchData()
    }, [])
  }

  const deleteTodoById = (id) => {
    deleteTodo(id)
    // traerdatos()
  }
 
  return (
    <View style={styles.container}>
      {loading
        ?<Text>Cargando....</Text>
        :<FlatList data={todos} 
        keyExtractor={item=> (item.todo)}
        style={styles.todoList}
        renderItem={({item})=>
          <Todo  
            onPress={()=> changeTodo(item)}
            onLongPress={()=> deleteTodoById(item.todo)}
            item={item}>{item.todo}
          </Todo>
        } 
        />}
      <TextInput placeholder='Type New Todo...' style={styles.input} onChangeText={changeText} value={text}/>
      <Button onPress={()=> añadirTodo(text)}>Add Todo</Button>
      <StatusBar style="auto" />
    </View>
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
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
});
