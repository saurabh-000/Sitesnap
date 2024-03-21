import React from "react"
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
const SplashScreen=()=>{
    const navigation=useNavigation()
    useFocusEffect(
        React.useCallback(()=>{
            setTimeout(()=>{
                navigation.navigate('SigninScreen')
            },2000)
        },[])
    )
    return(
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.primary}
                barStyle={'dark-content'}
            />

            <SafeAreaView style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:Colors.primary}}>
                <View>
                    <View style={{flex:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:Colors.white,fontSize:50,fontFamily:Fonts.LatoBold}}>Sitesnap</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center',alignItems:'center',backgroundColor:'gren'}}>
                        <Text style={{color:Colors.white,fontSize:16,fontFamily:Fonts.LatoRegular}}>from</Text>
                        <Image style={{width:120,height:70}} source={require('../../Assets/Logos/logo.jpg')} resizeMode="contain"/>
                    </View>
                </View>        
            </SafeAreaView>
        </>
    )
}
export default SplashScreen