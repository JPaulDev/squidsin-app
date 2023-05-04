import { Expense } from '@components/modals';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Splash } from '@screens';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { reauthUser } from './app/features/authSlice';
import { store } from './app/store';
import { auth } from './firebase';
import { useAppDispatch } from './hooks/hooks';
import useAuth from './hooks/useAuth';
import type { RootStackParamList } from './types/RootStackParamsList';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Main(): JSX.Element {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(reauthUser({ uid, email, displayName, photoURL }));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'modal',
                animation: 'fade_from_bottom',
              }}
            >
              <Stack.Screen name="Expense" component={Expense} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ animationTypeForReplace: 'pop' }}
            />
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
