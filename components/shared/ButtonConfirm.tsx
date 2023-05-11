import { Check, LeftArrow } from '@icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { Pressable } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';

type Props = {
  styles?: string;
  onPress: () => void;
};

export default function ButtonConfirm({ styles, onPress }: Props): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      className={clsx('h-14 w-16 items-center justify-center', styles)}
    >
      <Check className="fill-stone-700" />
    </Pressable>
  );
}
