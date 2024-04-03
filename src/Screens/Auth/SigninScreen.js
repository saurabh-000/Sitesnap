import React, { useState } from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import WideButton from "../../Components/Button/WideButton"
import FloatingTextInput from "../../Components/TextInput/FloatingTextInput"
import { useNavigation } from "@react-navigation/native"
const SigninScreen=()=>{
    const navigation=useNavigation()
    const [mobileNumber,setMobileNumber]=useState('')

    const onLogin=()=>{
        console.log("login function")
        navigation.navigate("OTPScreen")
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
                        label={'Mobile number'} 
                        value={mobileNumber} 
                        onChangeText={setMobileNumber}  
                    />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{1?'':'Please enter valid email ID'}</Text>
                    </View>
                </View>
                 
                <WideButton label={'Log in'} onPress={onLogin}/>    
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
})
export default SigninScreen