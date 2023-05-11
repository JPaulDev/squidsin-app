import { ButtonBack, Heading } from '@components/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import type { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'PaidBy'>;

export default function PaidBy({ navigation }: Props): JSX.Element {
  return (
    <View className="h-full bg-white">
      <View className="flex-row items-center">
        <ButtonBack navigation={navigation} />
        <Heading styles="ml-3">Who paid?</Heading>
      </View>
    </View>
  );
}
