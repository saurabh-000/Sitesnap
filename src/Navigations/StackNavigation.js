import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import SigninScreen from "../Screens/Auth/SigninScreen";
import SignupScreen from "../Screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../Screens/Auth/ForgotPasswordScreen";

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
          name="SigninScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SigninScreen}
        />
        <Stack.Screen
          name="SignupScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SignupScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    )
}
export {InitialScreens}