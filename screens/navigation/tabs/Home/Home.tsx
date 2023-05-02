import { Button, Text, View } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text className="text-xl">Home Screen</Text>
      <Button title="Go back" onPress={() => navigation.navigate('Splash')} />
    </View>
  );
}
