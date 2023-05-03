import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'types/RootStackParamsList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Home from './tabs/Home/index';
import Groups from './tabs/Groups/index';
import Friends from './tabs/Friends/index';
import Activity from './tabs/Activity/index';
import Profile from './tabs/Profile/index';

//Screen names
const homeName = 'Home';
const groupsName = 'Groups';
const friendsName = 'Friends';
const activityName = 'Activity';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, 'MainContainer'>;

export default function MainContainer({ navigation }: Props): JSX.Element {
  return (
    <Tab.Navigator initialRouteName={homeName}>
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={groupsName} component={Groups} />
      <Tab.Screen name={friendsName} component={Friends} />
      <Tab.Screen name={activityName} component={Activity} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
}
