import React, { useState } from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import WideButton from "../../Components/Button/WideButton"
import FloatingTextInput from "../../Components/TextInput/FloatingTextInput"
import { useNavigation } from "@react-navigation/native"
const SigninScreen=()=>{
    const navigation=useNavigation()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const onLogin=()=>{
        console.log("login function")
    }
    const onClickSignup=()=>{
        console.log("go to gc")
        navigation.navigate("SignupScreen")
    }

    const onClickForgotPassword=()=>{
        navigation.navigate("ForgotPasswordScreen")
    }
    return(
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle={'dark-content'}
            />
            <View style={styles.container}>
                <Text style={styles.heading}>Login to Sitesnap</Text>
                <View style={styles.inputContainer}>
                    <FloatingTextInput 
                        label={'Username'} 
                        value={username} 
                        onChangeText={setUsername}  
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <FloatingTextInput 
                        label={'Password'} 
                        value={password} 
                        onChangeText={setPassword}  
                    />
                    <TouchableOpacity onPress={onClickForgotPassword}>
                        <Text  style={styles.forgotPasswordTextLink}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                 
                <WideButton label={'Log in'} onPress={onLogin}/>    
            
                <Text style={styles.signupTextLinkOuter}>Don't have account? <Text style={styles.signupTextLinkInner} onPress ={onClickSignup}>Sign up</Text></Text>

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
export default SigninScreen