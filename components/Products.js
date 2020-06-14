import React, {useState} from 'react';

import {useQuery} from '@apollo/react-hooks';
import Svg, {Path, Circle} from 'react-native-svg';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Card,
  List,
  StyleService,
  Text,
  useStyleSheet,
  IconElement,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import Animated, {Easing} from 'react-native-reanimated';
import {timing} from 'react-native-redash';

import {get_Products} from '../queries/Query';
import {addBasket} from '../actions/addAction';
import ArcProgress from './ArcProgress';

const {Clock} = Animated;
const width = Dimensions.get('window').width;

const Champs = ({navigation}) => {
  const dispatch = useDispatch();

  const {loading, error, data} = useQuery(get_Products, {
    variables: {name: ''},
  });

  const clock = new Clock();
  const config = {
    duration: 30 * 1000,
    toValue: 1,
    easing: Easing.linear,
  };
  const styles = useStyleSheet(themedStyles);

  if (data) {
    return (
      <List
        contentContainerStyle={styles.productList}
        data={data.products}
        numColumns={2}
        renderItem={(item) => (
          <Card
            style={styles.productItem}
            header={() => (
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Details', {
                    item: item.item,
                  });
                }}>
                <ImageBackground
                  style={styles.itemHeader}
                  source={{uri: `${item.item.productimages[0].url}`}}
                />
              </TouchableOpacity>
            )}
            footer={() => (
              <View style={styles.itemFooter}>
                <Text category="s1">${item.item.price}</Text>
                <Button
                  style={styles.iconButton}
                  size="small"
                  onPress={() => dispatch(addBasket(item.item))}>
                  <Icon name="shopping-cart" size={20} color="#fff" />
                </Button>
              </View>
            )}>
            <Text category="s1">{item.item.name}</Text>
            <Text appearance="hint" category="c1">
              {item.item.reviews}
            </Text>
          </Card>
        )}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <ArcProgress progress={timing(0, config)} />
      </View>
    );
  }
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  iconButton: {
    paddingHorizontal: 0,
    margin: 10,
  },
});

export default Champs;
