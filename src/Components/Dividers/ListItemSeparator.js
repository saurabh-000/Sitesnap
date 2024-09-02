import { StyleSheet, View } from "react-native"

const ListItemSeparator=()=>{
    return(
        <View style={styles.separator}/>
    )
}
const styles=StyleSheet.create({
    separator:{
        paddingVertical:10,
        backgroundColor:'transparent'
    }   
})
export default ListItemSeparator