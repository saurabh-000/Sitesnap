import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Theme/Colors';
import { Text, View } from 'react-native';
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
            tabBarShowLabel:false,
            tabBarIcon:({ focused, color, size })=>(
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <Icon
                        name="home"
                        size={22}
                        style={{justifyContent: 'center'}}
                        color={focused ? Colors.primary : "#B4B4B4"}
                    />
                    <Text style={{fontSize:11,color:focused ? Colors.primary : "#B4B4B4"}}>Home</Text>
            </View>
            )
        }} 
    />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
            tabBarShowLabel:false,
            tabBarIcon:({ focused, color, size })=>(
                <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                    <Icon
                        name="user"
                        size={22}
                        style={{justifyContent: 'center'}}
                        color={focused ? Colors.primary : "#B4B4B4"}
                    />
                    <Text style={{fontSize:11,color:focused ? Colors.primary : "#B4B4B4"}}>Profile</Text>
            </View>
            )
        }} 
        />
    </Tab.Navigator>
  );
}
export default BottomNavigation