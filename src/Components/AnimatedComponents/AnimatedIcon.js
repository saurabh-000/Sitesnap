import React from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../Theme/Colors';
const AnimatedIconComponent = Animated.createAnimatedComponent(Icon);
const AnimatedIcon = ({ name, focused }) => {
  const animatedValue = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(animatedValue, {
        toValue: focused ? 1 : 0,
        duration: 10000,
        useNativeDriver: false,
      }).start();
    }, [focused])
  );

  const size = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 30],
  });

  return (
        <AnimatedIconComponent name={name} size={size} color={focused?Colors.primary:'#B4B4B4'} />
  )
};

export default AnimatedIcon;
