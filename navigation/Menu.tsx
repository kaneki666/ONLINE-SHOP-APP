import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabConfig,
  FlashyTabConfig,
} from '@gorhom/animated-tabbar';
import {useSelector} from 'react-redux';

import Products from '../components/Products';
import Cart from '../components/Cart';

import Animated from 'react-native-reanimated';
import Svg, {Path, PathProps, Circle, G, CircleProps} from 'react-native-svg';
import {MainTabsParams} from './types';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path,
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & {style?: any}>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const AnimatedCircle = (Animated.createAnimatedComponent(
  Circle,
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, CircleProps & {style?: any}>
>;

const HomeSVG = ({color, size, badgeCount}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const ProfileSVG = ({color, size}: SVGProps) => {
  const states = useSelector((state) => state.basketState);
  let amount = states.basketNumbers;
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G
          transform="translate(4 3)"
          strokeWidth={2}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round">
          <AnimatedPath
            d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"
            stroke={color}
          />
          <AnimatedCircle cx={8} cy={4} r={4} stroke={color} />
        </G>
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'white',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 10, fontWeight: 'bold'}}>
            {amount}
          </Text>
        </View>
      </Svg>
    </View>
  );
};

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<BubbleTabConfig, MainTabsParams> = {
  Products: {
    labelStyle: {
      color: '#FBAD26',
    },
    icon: {
      component: HomeSVG,
      activeColor: '#FBAD26',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#691EFF',
      inactiveColor: '#996fed',
    },
  },
  Cart: {
    labelStyle: {
      color: '#0c9c11',
    },
    icon: {
      component: ProfileSVG,
      activeColor: '#0c9c11',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: '#ff0000',
      inactiveColor: '#ed8166',
    },
  },
};

const Menu = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar
          style={{backgroundColor: '#0f121b'}}
          iconSize={20}
          tabs={tabs}
          {...props}
        />
      )}>
      <Tab.Screen
        name="Products"
        initialParams={{
          backgroundColor: tabs.Products.labelStyle.color,
          nextScreen: 'Cart',
        }}
        component={Products}
      />
      <Tab.Screen
        name="Cart"
        initialParams={{
          backgroundColor: tabs.Cart.labelStyle.color,
          nextScreen: 'Products',
        }}
        component={Cart}
      />
    </Tab.Navigator>
  );
};

export default Menu;
