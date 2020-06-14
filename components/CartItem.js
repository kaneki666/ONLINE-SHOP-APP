import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {deleteBasket} from '../actions/deleteAction';
import {addBasket} from '../actions/addAction';
import {deleteItems} from '../actions/deleteItems';

const CartItem = (props) => {
  const states = useSelector((state) => state.basketState);
  const dispatch = useDispatch();
  let [products, setProducts] = useState(states.products);

  const {
    style,
    product,
    index,
    onProductChange,
    onRemove,
    ...listItemProps
  } = props;

  const [cartupdate, setCartupdate] = useState(false);

  useEffect(
    (e) => {
      setProducts(states.products);
      setCartupdate(false);
    },
    [cartupdate],
  );

  const decrementButtonEnabled = () => {
    return product.qty > 1;
  };

  const onRemoveButtonPress = () => {
    onRemove(product, index);
  };

  return (
    <ListItem {...listItemProps} style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={{uri: `${product.productimages[2].url}`}}
      />
      <View style={styles.detailsContainer}>
        <Text category="s1">{product.name}</Text>
        <Text category="s2">${product.price}</Text>
        <View style={styles.amountContainer}>
          <Button
            status="danger"
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            disabled={!decrementButtonEnabled()}
            onPress={() => {
              if (products !== undefined) {
                products = products.forEach((pro, ind) => {
                  if (index === ind && product.qty > 1) {
                    product.qty = product.qty - 1;
                    dispatch(deleteBasket(product));
                    setCartupdate(true);

                    return pro;
                  }
                });
              }
            }}>
            <Icon name="minus" size={10} color="black" />
          </Button>
          <Text style={styles.amount} category="s2">
            {product.qty}
          </Text>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            onPress={() => dispatch(addBasket(product))}>
            <Icon name="plus" size={10} color="#fff" />
          </Button>
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance="ghost"
        status="basic"
        onPress={() => {
          dispatch(deleteItems(product));
          setCartupdate(true);
        }}>
        <MCIcon name="delete-empty" size={20} color="red" />
      </Button>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    top: 90,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
export default CartItem;
