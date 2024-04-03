import React from "react"
import { View, StyleSheet } from "react-native"
import Colors from "../../Theme/Colors"

const Divider=()=>{
    return(
        <View style={styles.divider}/>
    )
}
const styles=StyleSheet.create({
    divider:{height:1,backgroundColor:Colors.grayLight,opacity:0.5,}
})
export default Divider