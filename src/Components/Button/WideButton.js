import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
const WideButton=({label,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    buttonContainer:{
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginVertical:20
    },
    buttonText:{
        color:Colors.white,
        fontFamily:Fonts.LatoBold,
        lineHeight:20
    }
})
export default WideButton