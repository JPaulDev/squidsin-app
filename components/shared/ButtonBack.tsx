import { LeftArrow } from '@icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { RootStackParamList } from 'types/RootStackParamsList';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function ButtonBack({ navigation }: Props): JSX.Element {
  return (
    <Pressable
      className="p-4"
      accessible={true}
      accessibilityLabel="Go back."
      accessibilityHint="Navigate back to the previous screen."
      onPress={() => navigation.goBack()}
    >
      <LeftArrow className="fill-black" />
    </Pressable>
  );
}
