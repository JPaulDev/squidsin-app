import { Account, Activity, Friends, Groups } from '@components/home';
import { Receipt } from '@icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();

export default function Home({ navigation }: Props): JSX.Element {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handlePress = (): void => {
    setIsPressed(true);
    navigation.navigate('Expense');

    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Groups" component={Groups} />
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
      <View
        className={clsx(
          'absolute bottom-16 right-4 overflow-hidden rounded-full shadow-md shadow-black',
          isPressed && 'shadow shadow-black'
        )}
      >
        <Pressable
          className="flex-row items-center bg-emerald-600 px-5 py-3"
          onPress={handlePress}
          android_ripple={{ color: '#ffffff33' }}
        >
          <Receipt className="fill-white" />
          <Text className="ml-3 text-base font-semibold text-white">
            Add expense
          </Text>
        </Pressable>
      </View>
    </>
  );
}
