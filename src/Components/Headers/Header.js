import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import { useNavigation } from "@react-navigation/native";
const Header=(props)=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
            <View style={styles.parts}>
                {props.enableBackButton && (
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            size={18}
                            style={styles.iconStyle}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    
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
    container:{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:Colors.white,paddingHorizontal:10},
    parts:{alignItems:'center',paddingVertical:10,flexDirection:'row'},
    text:{marginHorizontal:10,fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18,textAlignVertical:'center',lineHeight:22},
    iconStyle:{justifyContent: 'center',alignItems:'center',marginHorizontal:10},
})
export default Header