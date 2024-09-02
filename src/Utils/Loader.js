import { ActivityIndicator, StyleSheet, View } from "react-native"
import Colors from "../Theme/Colors"

export const Loader=({flag})=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size={'small'} color={Colors.white} animating={true}/>
        </View>
        
    )
}
const styles=StyleSheet.create({
    container:{}
})