import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Button,
  Divider,
  List,
  StyleService,
  Text,
  useStyleSheet,
  ListProp,
} from '@ui-kitten/components';

const Cart = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const {item} = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image
        style={styles.primaryImage}
        source={{uri: `${item.productimages[2].url}`}}
      />
      <Text style={styles.titleLabel} category="h6">
        {item.name}
      </Text>
      {/* <Text style={styles.subtitleLabel} category="p2">
        {product.subtitle}
      </Text>
      <CategoryList style={styles.categoryList} data={product.categories} />
      <RateBar
        style={styles.rateBar}
        value={rating}
        onValueChange={setRating}
      /> */}
      <Divider />

      <Text style={styles.sectionLabel} category="s1">
        About Movie
      </Text>
      <Text style={styles.descriptionLabel} appearance="hint">
        {item.details}
      </Text>
      <Text style={styles.sectionLabel} category="s1">
        Photos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={item.productimages}
        renderItem={(link) => (
          <Image style={styles.imageItem} source={{uri: `${link.item.url}`}} />
        )}
      />
      <Button style={styles.buyButton}>BUY </Button>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  primaryImage: {
    alignSelf: 'center',
    width: 256,
    height: 360,
    borderRadius: 8,
  },
  titleLabel: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 64,
    marginTop: 24,
  },
  subtitleLabel: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  categoryList: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  rateBar: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  detailsList: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  descriptionLabel: {
    margin: 16,
  },
  imagesList: {
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: 'background-basic-color-1',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
  },
  buyButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
});

export default Cart;
