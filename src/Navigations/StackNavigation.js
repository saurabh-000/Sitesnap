import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import SigninScreen from "../Screens/Auth/SigninScreen";
import OTPScreen from "../Screens/Auth/OTPScreen";
import HomeScreen from "../Screens/Home/HomeScreen";
import BottomNavigation from "./BottomNavigation";
import AccountScreen from "../Screens/Account/AccountScreen";
import AddSiteScreen from "../Screens/AddSite/AddSiteScreen";
import TimelineScreen from "../Screens/Home/TimelineScreen";
import AddActivityScreen from "../Screens/Home/AddActivityScreen";
import TransactionListScreen from "../Screens/Transaction/TransactionListScreen";
import SigninWithGoogleScreen from "../Screens/Auth/SigninWithGoogleScreen";

const Stack = createNativeStackNavigator();
const InitialScreens=()=>{
    return(
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SplashScreen}
        />

        <Stack.Screen
          name="BottomNavigation"
          options={{headerShown: false, tabBarVisible: false}}
          component={BottomNavigation}
        />

        <Stack.Screen
          name="Auth"
          options={{headerShown: false, tabBarVisible: false}}
          component={Auth}
        />
      </Stack.Navigator>
    )
}

const Auth=()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen
          name="SigninWithGoogleScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SigninWithGoogleScreen}
        />
        <Stack.Screen
          name="SigninScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SigninScreen}
        />
        <Stack.Screen
          name="OTPScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={OTPScreen}
        />
        <Stack.Screen
          name="BottomNavigation"
          options={{headerShown: false, tabBarVisible: false}}
          component={BottomNavigation}
        />
    </Stack.Navigator>
    
  )
}

const Home=()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={HomeScreen}
        />
        
        <Stack.Screen
          name="TimelineScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={TimelineScreen}
        />

        <Stack.Screen
          name="AddActivityScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={AddActivityScreen}
        />

        <Stack.Screen
          name="Transaction"
          options={{headerShown: false, tabBarVisible: false}}
          component={Transaction}
        />

    </Stack.Navigator>
  )
}

const Account=()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen
          name="AccountScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={AccountScreen}
        />

    <Stack.Screen
          name="Auth"
          options={{headerShown: false, tabBarVisible: false}}
          component={Auth}
        />
    </Stack.Navigator>
  )
}

const Site=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="AddSiteScreen"
        options={{headerShown:false,tabBarVisible:false}}
        component={AddSiteScreen}
      />

      <Stack.Screen
          name="HomeScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={HomeScreen}
        />
    </Stack.Navigator>
  )
}

const Transaction=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionListScreen"
        options={{headerShown:false,tabBarVisible:false}}
        component={TransactionListScreen}
      />
    </Stack.Navigator>
  )
}


export {InitialScreens, Home, Account, Site, Transaction}