import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen/SplashScreen";

const Stack = createNativeStackNavigator();
const InitialScreens=()=>{
    return(
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false, tabBarVisible: false}}
          component={SplashScreen}
        />
      </Stack.Navigator>
    )
}
export {InitialScreens}