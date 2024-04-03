import { StyleSheet } from "react-native";
import Colors from "../Theme/Colors";
import Fonts from "../Theme/Fonts";

const globalStyles=StyleSheet.create({
    container:{flex:1,backgroundColor:'white',padding:20},
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
        fontSize:10,
        color:Colors.danger,
        fontFamily:Fonts.LatoRegular
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})
export default globalStyles