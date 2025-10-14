import { TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from '@/components/atoms';
import styles from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function FavoriteHeart({
  isFavorite,
  onPress,
  customStyle,
}: {
  isFavorite: boolean;
  onPress: () => void;
  customStyle?: ViewStyle;
}) {
  const scaleValue = useSharedValue(1);
  const shakeValue = useSharedValue(0);

  const handlePressFavorite = () => {
    onPress();
    if (!isFavorite) {
      // Scale
      shakeValue.value = 0;
      scaleValue.value = withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      );
    } else {
      // Shake
      scaleValue.value = 1;
      shakeValue.value = withSequence(
        withTiming(-1, { duration: 100 }), // Move left
        withTiming(1, { duration: 100 }), // Move right
        withTiming(0, { duration: 100 }) // Return to center
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }, { translateX: shakeValue.value }],
  }));

  return (
    <TouchableOpacity onPress={handlePressFavorite} style={[styles.container, customStyle]}>
      <Animated.View style={animatedStyle}>
        <Icon name={isFavorite ? 'HeartActiveIcon' : 'HeartDisabledIcon'} />
      </Animated.View>
    </TouchableOpacity>
  );
}
