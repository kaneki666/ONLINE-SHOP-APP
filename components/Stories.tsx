import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Platform,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StickyItemFlatList from '@gorhom/sticky-item';
import {useQuery} from '@apollo/react-hooks';
import DummyItem from './Dummy-item';
import FacebookStickyStory from './Basic-sticky';
import {get_Products} from '../queries/Query';

export const STORY_WIDTH = 90;
export const STORY_HEIGHT = 150;
const STICKY_ITEM_WIDTH = 36;
const STICKY_ITEM_HEIGHT = 36;
const SEPARATOR_SIZE = 8;
const BORDER_RADIUS = 10;

const FacebookStoriesStyled = ({navigation}) => {
  console.log(navigation);
  const {loading, error, data} = useQuery(get_Products, {
    variables: {name: ''},
  });

  // styles
  const containerStyle = {
    paddingVertical: SEPARATOR_SIZE * 3,
    backgroundColor: '#f7f8fa',
  };

  // methods
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');

  // render
  const renderItem = ({index}: ListRenderItemInfo<{}>) => (
    <TouchableOpacity onPress={() => Alert.alert(`Item ${index} Pressed`)}>
      <DummyItem
        index={index}
        borderRadius={BORDER_RADIUS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
        backgroundColor={'#fff'}
      />
    </TouchableOpacity>
  );
  return (
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
            <TouchableOpacity onPress={() => navigation.navigate('Story')}>
              <Image
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
  );
};

const styles = StyleSheet.create({
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

export default FacebookStoriesStyled;
