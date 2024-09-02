import React, { useState } from "react"
import { Image, ImageBackground, StatusBar, Text, View } from "react-native"
import Colors from "../../Theme/Colors"
import globalStyles from "../../Styles/GlobalStyles"
import WideButton from "../../Components/Button/WideButton"
import Fonts from "../../Theme/Fonts"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import LottieView from "lottie-react-native"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Toast } from "../../Utils/Toast"
import { STRING_CONSTANTS } from "../../Utils/Constants"
import { POSTAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { useDispatch } from "react-redux"
import { setUserData } from "../../Redux/UserSlice"

const SigninWithGoogleScreen=()=>{
    const dispatch=useDispatch()
    const navigation= useNavigation()
    const [loading,setLoading]=useState(false)
    useFocusEffect(
        React.useCallback(()=>{            
            configureGoogle()
        },[])
    )

      const configureGoogle=()=>{
        GoogleSignin.configure({
            webClientId: '210278871724-d93ng7mgm5k4oojqu66ij7n1bunlr6l3.apps.googleusercontent.com',
          });    
      }
      
    const signinWithGoogleAPI=(token)=>{
        let payload={
            "id_token":token
        }
        POSTAPI(JSON.stringify(payload),AppUrls.GOOGLE_LOGIN,null,false).then(response=>{
            console.log("res",response)
            if(response.success){
                Toast(response.message)
                dispatch(setUserData(response.data.user))
                navigation.navigate("BottomNavigation")       
            }else{
                Toast(response.error.message)
            }
        })
        .catch((error)=>console.log("error",error))
        .finally(()=>setLoading(false))
    }


    const onLogin=async()=>{
        console.log("on login")
        setLoading(true)
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            await GoogleSignin.signOut()
            const { idToken } = await GoogleSignin.signIn();
            console.log("id token",idToken)
            signinWithGoogleAPI(idToken)    
        } catch (error) {
            console.log("error",error)
            setLoading(false)
        }
        
    }
    return(
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle={'dark-content'}
            />
             <View style={globalStyles.authContainer}>
                <Text style={globalStyles.heading}>Welcome to Sitesnap</Text>
                <LottieView source={require('../../Assets/Json/cwelcome.json')} autoPlay loop style={{height:400}}/>
                <WideButton 
                    label={'Conitinue with Google'} 
                    onPress={onLogin}
                    disabled={false} 
                    loading={loading}
                    leadingIcon={!loading && (<Image source={require('../../Assets/Images/google.png')} style={{height:20,width:20,marginHorizontal:5}}/>)} 
                />
                <Text style={{color:Colors.black,fontFamily:Fonts.LatoRegular,fontSize:12,opacity:0.6}}>By continuing, you agree to Sitesnap's <Text style={{textDecorationLine:'underline'}}>Terms and Conditions</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy.</Text></Text>
            </View>
            
                
            
        </>
          
    )
}
export default SigninWithGoogleScreen