import { LeftArrow } from '@icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { Pressable } from 'react-native';
import { RootStackParamList } from 'types/RootStackParamsList';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  style?: string;
};

export default function ButtonBack({ navigation, style }: Props): JSX.Element {
  return (
    <Pressable
      className={clsx('flex h-14 w-16 items-center justify-center', style)}
      accessibilityLabel="Go back"
      accessibilityHint="Navigate back to the previous screen"
      onPress={() => navigation.goBack()}
    >
      <LeftArrow className="fill-black" />
    </Pressable>
  );
}
