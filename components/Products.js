import React, {useState} from 'react';

import {useQuery} from '@apollo/react-hooks';
import Svg, {Path, Circle} from 'react-native-svg';
import {
  Dimensions,
  ImageBackground,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StickyItemFlatList from '@gorhom/sticky-item';
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

import {addBasket} from '../actions/addAction';
import ArcProgress from './ArcProgress';

import FacebookStickyStory from './Basic-sticky';
import {get_Products} from '../queries/Query';

export const STORY_WIDTH = 90;
export const STORY_HEIGHT = 150;
const STICKY_ITEM_WIDTH = 36;
const STICKY_ITEM_HEIGHT = 36;
const SEPARATOR_SIZE = 8;
const BORDER_RADIUS = 10;

const {Clock} = Animated;
const width = Dimensions.get('window').width;

const Champs = ({navigation}) => {
  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 3,
    backgroundColor: '#f7f8fa',
  };
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
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');

  if (data) {
    return (
      <>
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle="light-content" />

          <View style={containerStyle}>
            <StickyItemFlatList
              itemWidth={STORY_WIDTH}
              itemHeight={STORY_HEIGHT}
              separatorSize={SEPARATOR_SIZE}
              borderRadius={BORDER_RADIUS}
              stickyItemWidth={STICKY_ITEM_WIDTH}
              stickyItemHeight={STICKY_ITEM_HEIGHT}
              stickyItemBackgroundColors={['#222', '#000']}
              stickyItemContent={(props) => (
                <FacebookStickyStory {...props} theme="dark" />
              )}
              onStickyItemPress={handleStickyItemPress}
              data={data.products}
              renderItem={(item) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Story', {
                      item: item.item,
                    })
                  }>
                  <Image
                    key={item._id}
                    style={{
                      width: STORY_WIDTH,
                      height: STORY_HEIGHT,
                      borderRadius: BORDER_RADIUS,
                    }}
                    source={{uri: `${item.item.productimages[3].url}`}}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
        <List
          contentContainerStyle={styles.productList}
          data={data.products}
          numColumns={2}
          renderItem={(item) => (
            <Card
              key={item.item._id}
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
      </>
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
    backgroundColor: 'background-basic-color-2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    backgroundColor: 'background-basic-color-2',
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
  root: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    marginHorizontal: SEPARATOR_SIZE * 2,
    marginBottom: SEPARATOR_SIZE,
    fontSize: 43,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    textTransform: 'uppercase',
    color: '#2d88ff',
  },
});

export default Champs;
