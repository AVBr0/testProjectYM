import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import { OBJECTS } from './data/objects';
import { SelectList } from 'react-native-dropdown-select-list'

export const HomeScreen = React.memo(({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(OBJECTS);
  const [checkedData, setCheckedData] = useState(OBJECTS);
  const [detailObj, setDetailObj] = useState(OBJECTS[0].id);

  const dataDropDownDyn = (val) => {
    let checkedObjectsData = []
    OBJECTS.forEach((e) => {
      if (e.city === val) checkedObjectsData.push(e)
      if ('Все' === val) checkedObjectsData = [...OBJECTS]
    })
    setFilteredData(checkedObjectsData)
    setCheckedData(checkedObjectsData)
  }

  const createCitiesDropDown = () => {
    const uniqCities = new Set().add('Все');
    OBJECTS.forEach(e => {
      uniqCities.add(e.city)
    })
    const citiesDropDown = Array.from(uniqCities)
    return citiesDropDown;
  }
  

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = filteredData.filter((item) => {
        const itemData = item.title
        ? item.title.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(checkedData);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    setDetailObj(item.id)
    navigation.navigate('Описание объекта', {
      id: item.id
    })
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="К описанию объекта" onPress={() => navigation.navigate('Описание объекта', {
      id: detailObj
    })} />
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Поиск..."
        />
        <SelectList 
        setSelected={(val) => {
          dataDropDownDyn(val)
          setSearch('')
        }}
        data={() => createCitiesDropDown()}
        placeholder="Выберите город..."
        save="value"
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
