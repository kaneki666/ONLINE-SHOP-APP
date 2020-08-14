import React, {useCallback, useMemo} from 'react';
import {
  StatusBar,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import {useSafeArea} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

const HorizontalGesture = ({route, navigation}) => {
  const {item} = route.params;
  const data: PaperOnboardingItemType[] = [
    {
      title: 'Hotels',
      description: 'All hotels and hostels are sorted by hospitality rating',
      backgroundColor: '#000',
      content: () => (
        <Image
          style={{width: width, minHeight: 550}}
          source={{uri: `${item.productimages[0].url}`}}
        />
      ),
    },
    {
      title: 'Banks',
      description: 'We carefully verify all banks before add them into the app',
      backgroundColor: '#fff',
      content: () => (
        <Image
          style={{width: width, minHeight: 550}}
          source={{uri: `${item.productimages[1].url}`}}
        />
      ),
    },
    {
      title: 'Stores',
      description: 'All local stores are categorized for your convenience',
      backgroundColor: '#000',
      content: () => (
        <Image
          style={{width: width, minHeight: 550}}
          source={{uri: `${item.productimages[2].url}`}}
        />
      ),
    },
    {
      title: 'Stores',
      description: 'All local stores are categorized for your convenience',
      backgroundColor: '#fff',
      content: () => (
        <Image
          style={{width: width, minHeight: 550}}
          source={{uri: `${item.productimages[3].url}`}}
        />
      ),
    },
  ];

  // hooks
  const {goBack} = useNavigation();
  const safeInsets = useSafeArea();

  // variable
  const insets = useMemo(
    () => ({
      top: Math.max(safeInsets.top, 20),
      bottom: Math.max(safeInsets.bottom, 20),
      left: Math.max(safeInsets.left, 20),
      right: Math.max(safeInsets.right, 20),
    }),
    [safeInsets],
  );

  // callbacks
  const handleOnClosePress = useCallback(() => goBack(), [goBack]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PaperOnboarding
        data={data}
        closeButton={() => (
          <TouchableOpacity onPress={handleOnClosePress}>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
              }}>
              X
            </Text>
          </TouchableOpacity>
        )}
        safeInsets={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
        }}
      />
    </>
  );
};

export default HorizontalGesture;
