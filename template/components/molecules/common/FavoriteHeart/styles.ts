import { COLORS } from '@/constants/Colors';
import GLOBAL_STYLES from '@/constants/GlobalStyles';
import { moderateScale } from '@/constants/Metrics';
import { theme } from '@/utils/getTheme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: moderateScale(24),
    height: moderateScale(24),
    backgroundColor: COLORS[theme].Neutral0,
    borderRadius: moderateScale(24) / 2,
    alignSelf: 'flex-end',
    margin: moderateScale(8),
    ...GLOBAL_STYLES.vhCentering,
  },
});

export default styles;
