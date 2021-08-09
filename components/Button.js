import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'


const Button = ({children, onPress}) => {
    return(
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})

export default Button