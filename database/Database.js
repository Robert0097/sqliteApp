import React, {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sqliteApp');


 export const createTable = () => {
    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS todos (todo TEXT PRIMARY KEY, completed INTEGER )", 
            [],
            (tx, res)=>{},
            (err)=>{console.log(err)})
        },
    err=>{console.log(err)}, 
    res=>{})
}

export const addTodo = (todo) => {
    let completed = 0
    db.transaction((tx)=>{
        tx.executeSql(
            "INSERT INTO todos (todo,completed) VALUES (?,?)",
            [todo,completed],
            (tx, res)=>{getTodos()},
            (err)=>{console.log(err)})
        }, 
    err=>{console.log(err)},
    res=>{})
}

export const getTodos = () =>{ ///HAY ALGUN PROBLEMA A LA HORA DE DEVOLVER Y SETEAR LOS DATOS EN EL ESTADO
    const [list, setlist] = useState([])
    const fetchTodos=db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM todos",
            [],
            (tx, res)=>{
                const leng = res.rows.length
                if(leng > 0){
                    const listTodo =[]
                    for(let i=0; i<leng; i++){
                        let item = res.rows.item(i)
                        const todo = {todo: item.todo, completed: item.completed}
                        listTodo.push(todo)
                    }
                setlist(listTodo)
                }
            },
            (err)=>{console.log(err)}
        )
    },
    err=>{console.log(err)},
    res=>{})

    useEffect(() => {
        fetchTodos()
    },[])
    return list
}