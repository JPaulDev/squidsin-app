import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function Splash({ navigation }: Props): JSX.Element {
  return (
    <View>
      <Text className="text-xl">Splash Screen</Text>
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
