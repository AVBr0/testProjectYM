import { StyleSheet, Text, View, Button } from 'react-native';
import { OBJECTS } from './data/objects';
import React from 'react';

export const DetailsScreen = React.memo(({ route, navigation }) => {
    let idS = route.params.id;
    let data = {};
  
    for (let i = 0; i < OBJECTS.length; i++) {
      if (OBJECTS[i].id === idS) {
        data.title = OBJECTS[i].title
        data.city = OBJECTS[i].city
        data.adress = OBJECTS[i].address
      }
    }
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>Title: {data.title}</Text>
            <Text style={styles.text}>City: {data.city}</Text>
            <Text style={styles.text}>Adress: {data.adress}</Text>       
            <Button 
            style={styles.button}
            hoverStyle={[ styles.button_hover, styles.button ]}
            activeStyle={[ styles.button_active, styles.button_hover, styles.button ]}
            title="На главный экран" onPress={() => navigation.navigate('Главный экран')} />
      </View>
    );
  })

  const styles = StyleSheet.create({
    text: {
      margin: 7,
    },
  });


