import React, {useState} from 'react';
import {StyleSheet, View, Switch, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
const height = Dimensions.get('window').height;

function ModalScreen({navigation}) {
  const [useLiteCreditCardInput, setInputcard] = useState('');
  const _setUseLiteCreditCardInput = (e) => {
    setInputcard(e);
  };
  const _onChange = (formData) =>
    console.log(JSON.stringify(formData, null, ' '));
  const _onFocus = (field) => console.log('focusing', field);
  return (
    <View style={s.main}>
      <View style={s.container}>
        <Switch
          style={s.switch}
          onValueChange={_setUseLiteCreditCardInput}
          value={useLiteCreditCardInput}
        />

        {useLiteCreditCardInput ? (
          <LiteCreditCardInput
            autoFocus
            inputStyle={s.input}
            validColor={'black'}
            invalidColor={'red'}
            placeholderColor={'darkgray'}
            onFocus={_onFocus}
            onChange={_onChange}
          />
        ) : (
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            requiresPostalCode
            cardScale={1}
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={'black'}
            invalidColor={'red'}
            placeholderColor={'darkgray'}
            onFocus={_onFocus}
            onChange={_onChange}
          />
        )}
      </View>
      <Button
        buttonStyle={s.button}
        onPress={() => navigation.goBack()}
        title="Checkout Now"
      />
    </View>
  );
}
const s = StyleSheet.create({
  main: {
    minHeight: height,
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
    minHeight: height - 200,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  amount: {
    textAlign: 'center',
    fontSize: 16,
    top: 10,
  },
  button: {
    top: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});

export default ModalScreen;
