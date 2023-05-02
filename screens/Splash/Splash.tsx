import { BrandLogo, Google } from '@icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function Splash({ navigation }: Props): JSX.Element {
  return (
    <View className="h-full bg-white px-6">
      <BrandLogo className="mx-auto mb-3 mt-36" width={150} height={150} />
      <Text className="mb-40 text-center text-base">
        We make splitting the bills easy
      </Text>
      <View className="gap-5">
        <View className="overflow-hidden rounded-md border-b-2 border-b-stone-400 bg-emerald-600">
          <Pressable android_ripple={{ color: '#ffffffc0' }}>
            <Text className="p-3 text-center text-base font-semibold text-white">
              Sign up
            </Text>
          </Pressable>
        </View>
        <View className="overflow-hidden rounded-md border-x border-b-2 border-t border-x-stone-200 border-b-stone-400 border-t-stone-200">
          <Pressable
            onPress={() => navigation.navigate('Login')}
            android_ripple={{ color: '#b3b3b3b0' }}
          >
            <Text className="p-3 text-center text-base font-semibold text-stone-700">
              Log in
            </Text>
          </Pressable>
        </View>
        <View className="overflow-hidden rounded-md border-x border-b-2 border-t border-x-stone-200 border-b-stone-400 border-t-stone-200">
          <Pressable
            className="flex flex-row items-center justify-center"
            android_ripple={{ color: '#b3b3b3b0' }}
          >
            <Google width={25} height={25} />
            <Text className="p-3 text-center text-base font-semibold text-stone-700">
              Sign in with Google
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
