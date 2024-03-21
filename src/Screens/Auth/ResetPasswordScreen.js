import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import WideButton from "../../Components/Button/WideButton"
import FloatingTextInput from "../../Components/TextInput/FloatingTextInput"
const ResetPasswordScreen=()=>{
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const onResetPassword=()=>{
        console.log("on reset password")
    }
    return(
        <View style={styles.container}>

                <Text style={styles.heading}>Reset Password</Text>
                
                <View style={styles.inputContainer}>
                    <FloatingTextInput 
                        label={'Password'} 
                        value={password} 
                        onChangeText={setPassword}  
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <FloatingTextInput 
                        label={'Confirm Password'} 
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword}  
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                    </View>
                </View>

                <WideButton label={'Reset Password'} onPress={onResetPassword}/> 

            </View>
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
    forgotPasswordTextLink:{
        fontFamily:Fonts.LatoBold,
        lineHeight:20,
        marginVertical:10,
        color:Colors.primary
    },
    signupTextLinkOuter:{
        fontFamily:Fonts.LatoBold,
        lineHeight:20,
        marginVertical:10
    },
    signupTextLinkInner:{
        color:Colors.primary
    }
})
export default ResetPasswordScreen