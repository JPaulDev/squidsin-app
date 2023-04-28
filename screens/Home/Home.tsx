import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <View>
      <Text className="text-xl">Home</Text>
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
