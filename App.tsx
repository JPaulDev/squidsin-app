import { StatusBar, Text, View } from 'react-native';

export default function App(): JSX.Element {
  return (
    <View>
      <StatusBar />
      <Text className="text-red-500 bg-black">Hello World</Text>
    </View>
  );
}
