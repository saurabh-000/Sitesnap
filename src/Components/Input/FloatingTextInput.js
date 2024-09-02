import React, { useState } from "react"
import { Animated, StyleSheet, Text, TextInput, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
const FloatingTextInput=({label,...props})=>{
    const [isFocused,setIsFocused]=useState(false)
    const [animatedIsFocused]=useState(new Animated.Value(props.value?1:0))
    const handleFocus=()=>{
        setIsFocused(true)
    }
    const handleBlur=()=>{
        setIsFocused(false)
    }
    const labelStyle={
        position:'absolute',
        left:9,
        top:animatedIsFocused.interpolate({
            inputRange:[0,1],
            outputRange:[(40-16)/2,0]
        }),
        fontSize:animatedIsFocused.interpolate({
            inputRange:[0,1],
            outputRange:[16,10]
        }),
        color:animatedIsFocused.interpolate({
            inputRange:[0,1],
            outputRange:['transparent',Colors.primary],
        }),
    }
    Animated.timing(
        animatedIsFocused,{
            toValue:isFocused || props.value?1:0,
            duration:200,
            useNativeDriver:false,
        }
    ).start();
    return(
        <View style={styles.floatingTextContainer}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>            
            <TextInput
            {...props}
            style={styles.floatingTextInput}
            placeholder={isFocused?"":label}
            placeholderTextColor={Colors.primary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            cursorColor={Colors.primary}
            />
            </View>
    )
}
const styles=StyleSheet.create({
    floatingTextContainer:{
        borderWidth:0.5,
        borderRadius:5,
        borderColor:Colors.backgroundPrimary,
        padding:5,
        backgroundColor:Colors.backgroundSecondary
    },
    floatingTextInput:{
        color:Colors.black,
        fontFamily:Fonts.LatoBold,
        height:40,
        fontSize:16,
    },
    
})
export default FloatingTextInput