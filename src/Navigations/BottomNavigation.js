import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Account/AccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Theme/Colors';
import { StyleSheet, Text, View } from 'react-native';
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
                <View style={styles.container}>
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
        name="Account" 
        component={ProfileScreen}
        options={{
            tabBarShowLabel:false,
            tabBarIcon:({ focused, color, size })=>(
                <View style={styles.container}>
                    <Icon
                        name="user"
                        size={22}
                        style={styles.iconStyle}
                        color={focused ? Colors.primary : "#B4B4B4"}
                    />
                    <Text style={[styles.labelStyle,{color:focused ? Colors.primary : "#B4B4B4"}]}>Account</Text>
            </View>
            )
        }} 
        />
    </Tab.Navigator>
  );
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    iconStyle:{justifyContent: 'center'},
    labelStyle:{fontSize:11}
})
export default BottomNavigation