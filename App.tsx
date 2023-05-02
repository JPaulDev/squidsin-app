import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Splash } from '@screens';
import { StatusBar } from 'react-native';
import { RootStackParamList } from './types/RootStackParamsList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
