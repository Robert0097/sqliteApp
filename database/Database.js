import * as SQLite from 'expo-sqlite';
import { useEffect ,useState } from 'react';

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

export const deleteTodo = (id) => {
    db.transaction((tx)=>{
      tx.executeSql(
        "DELETE FROM todos WHERE todo=?;",
        [id],
        (tx, res)=>{console.log(res)},
        (err)=>{console.log(err)})
        },
    err=>{console.log(err)},
    res=>{})
}

export const changeTodo = (item) => {
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
}

