import { StyleSheet } from "react-native";
import Colors from "../Theme/Colors";
import Fonts from "../Theme/Fonts";

const globalStyles=StyleSheet.create({
    authContainer:{
        flex:1,
        padding:20,
        justifyContent:'center',
        backgroundColor:Colors.white
    },
    heading:{
        color:Colors.primary,
        fontFamily:Fonts.LatoBlack,
        fontSize:20,
        lineHeight:20,
        marginVertical:10
    },
    container:{
        flex:1,
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:15
    },
    inputContainer:{
        marginVertical:5
    },
    errorContainer:{
        backgroundColor:1?Colors.transparent:Colors.dangerBackground,
        justifyContent:'center',
        padding:2,
        borderRadius:2,
        marginVertical:2
    },
    errorText:{
        fontSize:12,
        color:Colors.danger,
        fontFamily:Fonts.LatoRegular
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        borderRadius:10,
        padding:10,
        backgroundColor:Colors.backgroundPrimary,
        shadowRadius:10
    },
    regularText:{
        color:Colors.primary_l3,
        fontFamily:Fonts.LatoBold,
        fontSize:16
    }
})
export default globalStyles