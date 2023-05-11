import {
  ButtonBack,
  ButtonConfirm,
  ButtonSecondary,
  Heading,
} from '@components/shared';
import { Check, FileLines, Sterling } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { Image } from 'expo-image';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { RootStackParamList } from 'types/RootStackParamsList';
import { useGetFriendsQuery } from '../../app/services/friends';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import type { User } from '../../types/User';

type Props = NativeStackScreenProps<RootStackParamList, 'Expense'>;

const CURSOR_COLOR = '#14a582';
const PLACEHOLDER_COLOR = '#7e7e7e';

export default function Expense({ navigation }: Props): JSX.Element {
  const [descriptionFocussed, setDescriptionFocussed] =
    useState<boolean>(false);
  const [amountFocussed, setAmountFocussed] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [friendName, setFriendName] = useState<string>('');
  const [splitWith, setSplitWith] = useState<User[]>([]);

  const { user } = useAuth();
  const { data = [] } = useGetFriendsQuery(user.uid);

  const handleChangeDescriptionFocussed = (value: boolean): void =>
    setDescriptionFocussed(value);
  const handleChangeAmountFocussed = (value: boolean): void =>
    setAmountFocussed(value);

  const handleChangeAmount = (value: string): void => setAmount(value);
  const handleChangeDescription = (value: string): void =>
    setDescription(value);
  const handleChangeFriendName = (value: string): void => setFriendName(value);

  const handleAddSplitWith = (userObj: User): void => {
    setFriendName('');
    setSplitWith([...splitWith, userObj]);
  };
  const handleRemoveSplitWith = (uid: string): void => {
    setSplitWith(splitWith.filter((friend) => friend.uid !== uid));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  const handleAddExpense = async () => {
    navigation.goBack();
  };

  const friends = data.filter((friend) => {
    if (!friendName) return false;

    const fullName = friend.fullName.toLowerCase();
    const splitWithLowerCase = friendName.toLowerCase();
    const isAlreadySplitWith = splitWith.find(
      (splitWithFriend) => splitWithFriend.uid === friend.uid
    );

    return fullName.includes(splitWithLowerCase) && !isAlreadySplitWith;
  });

  return (
    <View className="h-full bg-white">
      <View className="flex-row items-center border-b border-stone-200">
        <ButtonBack navigation={navigation} />
        <Heading styles="ml-3">Add expense</Heading>
        <ButtonConfirm styles="ml-auto" onPress={handleAddExpense} />
      </View>
      <View className="z-50">
        <View className="min-h-[55] justify-center border-b border-stone-200 px-4 py-2">
          <View className="mb-2 flex-row items-center">
            <Text className="mr-1 text-base text-stone-700">
              With <Text className="font-semibold">you</Text> and:
            </Text>
            <TextInput
              className="flex-1 text-base"
              placeholder="Enter names or emails"
              cursorColor={CURSOR_COLOR}
              placeholderTextColor={PLACEHOLDER_COLOR}
              onChangeText={handleChangeFriendName}
              value={friendName}
              autoFocus={true}
            />
          </View>
          <View className="flex-row flex-wrap gap-2">
            {splitWith.map((friend) => (
              <Pressable
                key={friend.uid}
                className="flex-row items-center rounded-full border border-stone-200"
                onPress={() => handleRemoveSplitWith(friend.uid)}
              >
                <Image
                  className="mr-2 h-9 w-9 rounded-full"
                  source={friend.photoURL}
                />
                <Text className="mr-3 text-base">{friend.fullName}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {friends.length > 0 ? (
          <View className="absolute top-full w-full bg-white p-4 shadow-xl shadow-black">
            <Text className="mb-4 font-semibold tracking-wide text-stone-600">
              Friends
            </Text>
            {friends.map((friend) => (
              <Pressable
                key={friend.uid}
                className="mb-4 flex flex-row items-center"
                onPress={() => handleAddSplitWith(friend)}
              >
                <Image
                  source={friend.photoURL}
                  className="mr-3 h-12 w-12 rounded-full"
                />
                <Text className="text-base">{friend.fullName}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
      <View className="px-14 pt-9">
        <View className="mb-4 flex-row items-end">
          <ButtonSecondary
            styles="h-12 w-12 items-center justify-center"
            onPress={noop}
          >
            <FileLines width={30} height={30} className="fill-stone-700" />
          </ButtonSecondary>
          <TextInput
            className={clsx(
              'mb-1 ml-2 flex-1 border-b border-stone-500 pb-1 text-base',
              descriptionFocussed && 'border-color-primary'
            )}
            onFocus={() => handleChangeDescriptionFocussed(true)}
            onBlur={() => handleChangeDescriptionFocussed(false)}
            placeholder="Enter a description"
            cursorColor={CURSOR_COLOR}
            placeholderTextColor={PLACEHOLDER_COLOR}
            accessibilityLabel="Enter a description"
            value={description}
            onChangeText={handleChangeDescription}
          />
        </View>
        <View className="flex-row items-end">
          <ButtonSecondary
            styles="h-12 w-12 items-center justify-center"
            onPress={noop}
          >
            <Sterling width={22} height={22} className="fill-stone-700" />
          </ButtonSecondary>
          <TextInput
            className={clsx(
              'mb-1 ml-2 flex-1 border-b border-stone-500 pb-1 text-2xl font-semibold',
              amountFocussed && 'border-color-primary'
            )}
            onFocus={() => handleChangeAmountFocussed(true)}
            onBlur={() => handleChangeAmountFocussed(false)}
            placeholder="0.00"
            cursorColor={CURSOR_COLOR}
            inputMode="numeric"
            accessibilityLabel="Enter an amount"
            value={amount}
            onChangeText={handleChangeAmount}
          />
        </View>
      </View>
      <View className="mt-8 flex-row items-center justify-evenly px-10">
        <Text className="text-base text-stone-700">Paid by</Text>
        <ButtonSecondary
          styles="px-4 py-2"
          onPress={() => navigation.navigate('PaidBy')}
        >
          <Text className="text-base text-stone-700">you</Text>
        </ButtonSecondary>
        <Text className="text-base text-stone-700">and split</Text>
        <ButtonSecondary styles="px-4 py-2" onPress={noop}>
          <Text className="text-base text-stone-700">equally</Text>
        </ButtonSecondary>
        <Text className="text-base text-stone-700">.</Text>
      </View>
    </View>
  );
}
