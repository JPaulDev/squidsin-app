import { Account, Activity, Friends, Groups } from '@components/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();

export default function Home({ navigation }: Props): JSX.Element {
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
      <Pressable
        className="absolute bottom-16 right-5 rounded-full bg-emerald-600 px-6 py-3"
        onPress={() => navigation.navigate('Expense')}
      >
        <Text className="text-base font-semibold text-white">Add expense</Text>
      </Pressable>
    </>
  );
}
