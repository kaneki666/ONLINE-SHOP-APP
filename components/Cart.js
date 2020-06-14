import React, {useState} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {useSelector} from 'react-redux';

import CartItem from './CartItem';

const Cart = ({navigation}) => {
  const states = useSelector((state) => state.basketState);
  const styles = useStyleSheet(themedStyle);
  let products = states.products;
  let price;

  const total_price = products.reduce((gettotal, item) => {
    let val = Number(item.price) * item.qty;
    price = val += gettotal;
    return price;
  }, 0);

  const onItemRemove = () => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const onItemChange = () => {
    products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = () => (
    <Layout style={styles.footer}>
      <Text category="h5">Total Cost:</Text>
      <Text category="h5">${total_price}</Text>
    </Layout>
  );

  const renderProductItem = (info) => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  return (
    <Layout style={styles.container} level="2">
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size="giant"
        onPress={() => navigation.navigate('Checkout')}>
        CHECKOUT
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

export default Cart;
