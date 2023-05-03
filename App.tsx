import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, MainContainer, Splash } from '@screens';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import useAuth from './hooks/useAuth';
import type { RootStackParamList } from './types/RootStackParamsList';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Main(): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="MainContainer" component={MainContainer} />
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
