import { ButtonBack } from '@components/shared';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Expense'>;

export default function Expense({ navigation }: Props): JSX.Element {
  return (
    <View className="h-full bg-white">
      <ButtonBack navigation={navigation} />
      <Text className="text-xl">Expense</Text>
    </View>
  );
}
