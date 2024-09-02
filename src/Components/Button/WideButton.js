import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import { Loader } from "../../Utils/Loader"
const WideButton=({label,onPress,disabled,loading=false,buttonColor=Colors.primary,leadingIcon})=>{
    return(
        <TouchableOpacity  disabled={disabled} onPress={onPress} style={[styles.buttonContainer,{opacity:disabled?0.5:1,backgroundColor:buttonColor}]}>
            {
                leadingIcon && (
                    leadingIcon
                )
            }
            {
                loading
                ?
                <Loader flag={loading}/>
                :
                <Text style={styles.buttonText}>{label}</Text>    
            }
            
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginVertical:20,
        flexDirection:'row'
    },
    buttonText:{
        color:Colors.white,
        fontFamily:Fonts.LatoBold,
        lineHeight:20
    }
})
export default WideButton