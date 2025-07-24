import React from "react"
import { StyleSheet, Text, View } from "react-native"
import globalStyles from "../Styles/GlobalStyles"
import Metrics from "../Theme/Metrics"
const EmptyListCompoenet=({message})=>{
    return(
        <View style={styles.container}>
            <Text style={[globalStyles.regularText,{marginTop:Metrics.ScreenHeight*0.3}]}>{message} 🙂</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{alignItems:'center',height:Metrics.ScreenHeight,flex:10}
})
export default EmptyListCompoenet