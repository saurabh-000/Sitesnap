import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Header from "../../Components/Headers/Header"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import globalStyles from "../../Styles/GlobalStyles";
const HomeScreen=()=>{
    return(
        <>
            <Header 
                title={'Home'} 
                enableBackButton={false}
            />
            <View style={globalStyles.container}>
                <Text>Home Screen</Text>
            </View>
        </>
    )
}
const  styles=StyleSheet.create({
    iconStyle:{justifyContent: 'center',marginHorizontal:10},
    text:{marginHorizontal:10,fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18},
})
export default HomeScreen