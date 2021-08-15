import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const Todo = ({ children, item, onLongPress, onPress }) => {
    return(
        <TouchableOpacity  onPress={onPress} onLongPress={onLongPress} style={styles.todo}>
        {item.completed
            ?<Text style={styles.todoCompleted}>{children}</Text>
            :<Text style={styles.todoUncompleted}>{children}</Text>
        }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
});

export default Todo
