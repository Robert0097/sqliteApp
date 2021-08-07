import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import axios from 'axios'

export default function App() {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const fetchData = async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const res = await response.data
    setdata(res)
    setloading(false)
  }
  
  return (
    <View style={styles.container}>
      {loading
        ?<Text>Cargando....</Text>
        :<FlatList data={data} 
          renderItem={({item})=><Text>{item.title}</Text>} 
          keyExtractor={item=> String(item.id)}
        />
      }
      <Button title='Tocar' onPress={fetchData}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
