import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from 'types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props): JSX.Element {
  return (
    <View>
      <Text className="text-xl">Home Screen</Text>
      <Button title="Go back" onPress={() => navigation.navigate('Splash')} />
    </View>
  );
}
