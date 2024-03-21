import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import FloatingTextInput1 from "../../Components/TextInput/FloatingTextInput"
import WideButton from "../../Components/Button/WideButton"
import Fonts from "../../Theme/Fonts"
import Colors from "../../Theme/Colors"
const ForgotPasswordScreen=()=>{
    const navigation=useNavigation()
    const [username,setUsername]=useState('')
    const onContinue=()=>{
        console.log("go to Otp screen")
    }

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Forgot Password</Text>
                <Text style={styles.description}>Please enter your registered details and we will send you an OTP to reset your password</Text>
                <View style={styles.inputContainer}>
                    <FloatingTextInput1 
                        label={'Username'} 
                        value={username} 
                        onChangeText={setUsername}  
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                    </View>
                </View>
                
                 
                <WideButton label={'Continue'} onPress={onContinue}/>    

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
export default ForgotPasswordScreen