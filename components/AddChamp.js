import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {Input} from 'react-native-elements';

import {add_Champ} from '../queries/Query';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Main = ({navigation}) => {
  const [addChamp] = useMutation(add_Champ);
  const [name, setName] = useState('');
  const [damagetype, setDamagetype] = useState('');
  const [id, setId] = useState('');
  const [lane, setLane] = useState('');
  const [playstyle, setPlaystyle] = useState('');
  const [champimage, setChampimage] = useState('');
  console.log(name);
  const handleName = (e) => {
    setName(e);
  };
  const handleDamagetype = (e) => {
    setDamagetype(e);
  };
  const handleId = (e) => {
    setId(e);
  };
  const handleLane = (e) => {
    setLane(e);
  };
  const handlePlaystyle = (e) => {
    setPlaystyle(e);
  };
  const handleChampimage = (e) => {
    setChampimage(e);
  };
  const handleAddchamp = () => {
    addChamp({
      variables: {
        name: name,
        id: id,
        damagetype: damagetype,
        lane: lane,
        playstyle: playstyle,
        champimage: champimage,
      },
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.oval}></View>
          <Text style={styles.title}>NIKE BOOTS SHOP</Text>
          <View style={styles.inputview}>
            <Input
              value={name}
              onChangeText={handleName}
              style={styles.input}
              placeholder="Name"></Input>
            <Input
              value={damagetype}
              onChangeText={handleDamagetype}
              style={styles.input}
              placeholder="Price"></Input>
            {/* <Input
              value={id}
              onChangeText={handleId}
              style={styles.input}
              placeholder="Id"></Input>
            <Input
              value={lane}
              onChangeText={handleLane}
              style={styles.input}
              placeholder="Lane"></Input>
            <Input
              value={playstyle}
              onChangeText={handlePlaystyle}
              style={styles.input}
              placeholder="PlayStyle"></Input>*/}
            <Input
              value={champimage}
              onChangeText={handleChampimage}
              style={styles.input}
              placeholder="Item Image Link"></Input>
          </View>
          <TouchableOpacity onPress={handleAddchamp}>
            <Text style={styles.button}>ADD ITEM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfbfb',
    minHeight: height,
    width: width,
  },
  title: {
    marginTop: 50,
    fontFamily: 'serif',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'white',
    textShadowRadius: 8,
  },
  inputview: {
    margin: 20,
    marginTop: 120,
  },
  input: {
    margin: 10,

    borderRadius: 10,
    width: width - 50,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    textAlign: 'center',
    width: width - 130,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    color: 'white',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  oval: {
    position: 'absolute',
    width: width + width / 2,
    height: width + width / 2,
    borderRadius: width + width / 2,
    top: -width * 1,
    backgroundColor: '#000000',
    alignSelf: 'center',
  },
});

export default Main;
