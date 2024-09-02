import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Screens/Account/AccountScreen';
import Colors from '../Theme/Colors';
import { StyleSheet } from 'react-native';
import AnimatedIcon from '../Components/AnimatedComponents/AnimatedIcon';
import { Account, Home, Site } from './StackNavigation';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();

function BottomNavigation() {
    const userData=useSelector(state=>state.user.userData)
  return (
    <Tab.Navigator 
      screenOptions={{tabBarActiveBackgroundColor:Colors.backgroundSecondary}}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon:({ focused, color, size })=>(
                <AnimatedIcon name={"home"} focused={focused} />
            )
        }} 
    />
    {
        userData?.account?.role === 'site engineer' && (
            <Tab.Screen 
                name="Site"         
                component={Site}
                options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarIcon:({ focused, color, size })=>(
                    <AnimatedIcon name={"plus"} focused={focused} />
                    )
                }} 
            />
        )
    }
    
      <Tab.Screen 
        name="Account"         
        component={Account}
        options={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarIcon:({ focused, color, size })=>(
                <AnimatedIcon name={"user"} focused={focused} />
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
    iconStyle:{
        justifyContent: 'center'
    },
    labelStyle:{
        fontSize:11
    }
})
export default BottomNavigation