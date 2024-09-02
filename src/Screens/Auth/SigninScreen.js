import React, { useState } from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import WideButton from "../../Components/Button/WideButton"
import FloatingTextInput from "../../Components/Input/FloatingTextInput"
import {  useNavigation } from "@react-navigation/native"
import { POSTAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { Toast } from "../../Utils/Toast"
import globalStyles from "../../Styles/GlobalStyles"
import auth, { firebase } from '@react-native-firebase/auth';
const SigninScreen=()=>{
    const navigation=useNavigation()
    const [mobileNumber,setMobileNumber]=useState('')
    const [errorText,setErrorText]=useState('')
    const [loading,setLoading]=useState(false)

    const onLogin=()=>{
        let payload={
            "mobile_number":mobileNumber
        }
        setLoading(true)
        POSTAPI(JSON.stringify(payload),AppUrls.LOGIN).then(loginResponse=>{
            console.log(loginResponse)
            if(loginResponse.success){
                Toast(loginResponse.message)
                navigation.navigate("OTPScreen",{
                    mobileNumber
                })
            }else{
                Toast(loginResponse.error.message)
            }
        }).catch((e)=>console.log(e))
        .finally(()=>setLoading(false))
        

        
    }

    const validatePayload=()=>{
        if(!mobileNumber || mobileNumber.length<10)
            return true
        else if(!/^\d+$/.test(mobileNumber)){
            //setErrorText("Please enter valid mobile number")
            return true
        }
        else
            return false
    }
    

    return(
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle={'dark-content'}
            />
            <View style={globalStyles.authContainer}>
                <Text style={styles.heading}>Login to Sitesnap</Text>
                <View style={styles.inputContainer}>
                    <FloatingTextInput 
                        label={'Mobile number'} 
                        value={mobileNumber} 
                        onChangeText={setMobileNumber}  
                        maxLength={10}
                        keyboardType='numeric'
                    />
                    <View style={styles.errorContainer}>
                        <Text style={globalStyles.errorText}>{errorText}</Text>
                    </View>
                </View>
                 
                <WideButton label={'Log in'} onPress={onLogin} disabled={validatePayload()} loading={loading}/>    
            </View>
        </>
    )

}
const styles=StyleSheet.create({
    heading:{
        color:Colors.primary,
        fontFamily:Fonts.LatoBlack,
        fontSize:20,
        lineHeight:20,
        marginVertical:10
    },
    inputContainer:{
        marginVertical:5
    },
    errorContainer:{
        backgroundColor:1?Colors.transparent:Colors.dangerBackground,
        justifyContent:'center',
        padding:2,
        borderRadius:2,
        marginVertical:2
    }
})
export default SigninScreen