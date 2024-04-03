import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import FloatingTextInput1 from "../../Components/TextInput/FloatingTextInput"
import WideButton from "../../Components/Button/WideButton"
import Fonts from "../../Theme/Fonts"
import Colors from "../../Theme/Colors"
import OTPTextInput from "../../Components/TextInput/OTPTextInput"

const OTPScreen=()=>{
    const [otp, setOTP]=useState('')
    const navigation=useNavigation()
    const onVerifyOTP=()=>{
        console.log("verify otp",otp)
        navigation.navigate("BottomNavigation")
    }

    const _onChangeText=(text)=>{
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
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                </View>
                
                 
                <WideButton label={'Verify OTP'} onPress={onVerifyOTP}/>    

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
        fontSize:10,
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