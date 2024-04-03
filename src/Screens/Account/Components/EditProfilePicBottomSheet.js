import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Modalize } from "react-native-modalize"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import Divider from "../../../Components/Dividers/Divider";
const EditProfilePictureBottomSheet=({editProfilePictureBottomSheetRef,onClose,onImportFromGallery,onTakePhoto})=>{
    return(
        <Modalize
             
                ref={editProfilePictureBottomSheetRef}
                withHandle={false}
                adjustToContentHeight={true}
            >
                <View style={styles.bottomSheetHeaderContainer}>
                    <Text style={styles.bottomSheetHeaderText}>Edit Picture</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name='close' size={22} color={Colors.primary}/>
                    </TouchableOpacity>
                                 
                </View>
                <Divider/>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity onPress={onImportFromGallery} style={styles.section}>
                        <Icon name='photo' size={22} color={Colors.primary}/>
                        <Text style={styles.modalTextContent}>Import From Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onTakePhoto} style={styles.section}>
                        <Icon name='camera' size={22} color={Colors.primary}/>
                        <Text style={styles.modalTextContent}>Take Photo</Text>
                    </TouchableOpacity>
                    
                    
                </View>           

            </Modalize>
    )
}
const styles=StyleSheet.create({
    bottomSheetHeaderContainer:{justifyContent:'space-between', paddingVertical:15,paddingHorizontal:20,flexDirection:'row'},
    bottomSheetHeaderText:{color:Colors.black,fontFamily:Fonts.LatoBold,fontSize:18},
    bodyContainer:{paddingHorizontal:20,paddingVertical:10},
    section:{flexDirection:'row',alignItems:'center',marginVertical:10},
    modalTextContent:{marginHorizontal:10,fontFamily:Fonts.LatoRegular,color:Colors.black}
})
export default EditProfilePictureBottomSheet