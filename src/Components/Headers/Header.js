import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
const Header=(props)=>{
    return(
        <View style={styles.container}>
            <View style={styles.parts}>
                {props.enableBackButton && (
                    <Icon
                        name="arrow-left"
                        size={22}
                        style={styles.iconStyle}
                        color={Colors.primary}
                    />
                )}
                
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <View style={styles.parts}>
            {
                props.component1 && (
                    props.component1
                )
            }
            {
                props.component2 && (
                    props.component2
                )
            }
            {
                props.component3 && (
                    props.component3
                )
            }
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:Colors.white},
    parts:{alignItems:'center',paddingVertical:10,flexDirection:'row'},
    text:{marginHorizontal:10,fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18},
    iconStyle:{justifyContent: 'center',marginHorizontal:10},
})
export default Header