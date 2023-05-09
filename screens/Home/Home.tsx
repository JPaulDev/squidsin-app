import { Account, Activity, Friends, Groups } from '@components/home';
import { Chart, Receipt, User, UserGroup } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';
import useAuth from '../../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TAB_BUTTONS = [
  {
    name: 'Groups',
    Icon: UserGroup,
  },
  {
    name: 'Friends',
    Icon: User,
  },
  {
    name: 'Activity',
    Icon: Chart,
  },
  {
    name: 'Account',
    Icon: Image,
  },
];

export default function Home({ navigation }: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('Groups');
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const { user } = useAuth();

  const handlePress = (): void => {
    setIsPressed(true);
    navigation.navigate('Expense');

    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  const handleChangeActiveTab = (name: string): void => {
    setActiveTab(name);
  };

  return (
    <View className="h-full bg-white">
      <View className="flex-1">
        {activeTab === 'Groups' && <Groups />}
        {activeTab === 'Friends' && <Friends />}
        {activeTab === 'Activity' && <Activity />}
        {activeTab === 'Account' && <Account />}
      </View>
      <View className="flex-row border-t border-stone-200 py-2">
        {TAB_BUTTONS.map(({ name, Icon }) => (
          <Pressable
            key={name}
            className="flex-1"
            android_ripple={{
              color: '#b3b3b3ce',
              radius: 57,
              borderless: true,
            }}
            onPress={() => handleChangeActiveTab(name)}
          >
            <View className="items-center">
              {name === 'Account' ? (
                <Icon
                  source={user.photoURL}
                  className="h-6 w-6 rounded-full border border-white"
                />
              ) : (
                <Icon
                  width={20}
                  height={20}
                  className={clsx(
                    'mb-1 fill-stone-500',
                    activeTab === name && 'fill-color-primary'
                  )}
                />
              )}
              <Text
                className={clsx(
                  'text-xs',
                  activeTab === name && 'text-color-primary'
                )}
              >
                {name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View
        className={clsx(
          'absolute bottom-16 right-4 overflow-hidden rounded-full shadow-md shadow-black',
          isPressed && 'shadow shadow-black'
        )}
      >
        <Pressable
          className="flex-row items-center bg-color-primary px-5 py-3"
          onPress={handlePress}
          android_ripple={{ color: '#ffffff33' }}
        >
          <Receipt className="fill-white" />
          <Text className="ml-3 text-base font-semibold text-white">
            Add expense
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
