import React, { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import FloatingTextInput1 from "../../Components/Input/FloatingTextInput"
import WideButton from "../../Components/Button/WideButton"
import Fonts from "../../Theme/Fonts"
import Colors from "../../Theme/Colors"
import OTPTextInput from "../../Components/Input/OTPTextInput"
import { PUTAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { Toast } from "../../Utils/Toast"
import globalStyles from "../../Styles/GlobalStyles"
import { useDispatch } from "react-redux"
import { setUserData } from "../../Redux/UserSlice"

const OTPScreen=()=>{
    const route=useRoute()
    const {mobileNumber}=route.params
    const [otp, setOTP]=useState('')
    const [loading,setLoading]=useState(false)
    const [errorText,setErrorText]=useState('')
    const navigation=useNavigation()
    const dispatch = useDispatch()
    const onVerifyOTP=()=>{
        setLoading(true)
        let payload={
            "mobile_number":mobileNumber,
            "otp":otp
        }
        PUTAPI(JSON.stringify(payload),AppUrls.VERIFY_OTP).then(async otpResponse=>{
            console.log("otp response",otpResponse)
            if(otpResponse.success){
                setErrorText('')
                Toast(otpResponse.message)
                dispatch(setUserData(otpResponse.data.user))
                navigation.navigate("BottomNavigation")       
            }else{
                if(otpResponse.error.message==="OTP is expired" || otpResponse.error.message==='Invalid OTP'){
                    setErrorText("Please enter valid OTP")
                }else{
                    Toast(otpResponse.error.message)
                }
                
            }
        }).catch((e)=>console.log(e))
        .finally(()=>setLoading(false))
    }

    const validatePayload=()=>{
        if(!otp || otp.length<4)
            return true
        else if(!/^\d+$/.test(otp)){
            //setErrorText("Please enter valid mobile number")
            return true
        }
        else
            return false
    }

    const _onChangeText=(text)=>{
        setErrorText('')
        setOTP(text)
    }

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>OTP</Text>
                <Text style={styles.description}>Please enter OTP sent on your phone</Text>
                <View style={styles.inputContainer}>
                    <OTPTextInput
                        length={4}
                        value={otp}
                        onChangeText={(text)=>_onChangeText(text)}
                    />             
                </View>
                <View style={styles.errorContainer}>
                        <Text style={globalStyles.errorText}>{errorText}</Text>
                </View>
                
                 
                <WideButton label={'Verify OTP'} onPress={onVerifyOTP} disabled={validatePayload()} loading={loading}/>    

            </View>
        </>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        justifyContent:'center',
        backgroundColor:Colors.white
    },
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
    },
    errorText:{
        fontSize:12,
        color:Colors.danger,
        fontFamily:Fonts.LatoRegular
    },
    description:{
        color:Colors.black,
        fontSize:14,
        fontFamily:Fonts.LatoBold,
        marginVertical:10
    }
})
export default OTPScreen