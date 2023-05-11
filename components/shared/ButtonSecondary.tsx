import { Pressable, View } from 'react-native';

type Props = {
  styles?: string;
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
};

export default function ButtonSecondary({
  styles,
  children,
  onPress,
}: Props): JSX.Element {
  return (
    <View className="overflow-hidden rounded-md border border-x border-b-2 border-t border-x-stone-200 border-b-stone-400 border-t-stone-200">
      <Pressable
        className={styles}
        onPress={onPress}
        android_ripple={{ color: '#b3b3b3b0' }}
      >
        {children}
      </Pressable>
    </View>
  );
}
