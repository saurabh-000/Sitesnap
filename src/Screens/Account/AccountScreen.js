import React, { useRef, useState } from "react"
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../Styles/GlobalStyles"
import Header from "../../Components/Headers/Header"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import FloatingTextInput1 from "../../Components/TextInput/FloatingTextInput";
import WideButton from "../../Components/Button/WideButton";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Metrics from "../../Theme/Metrics";
import ImageCropPicker from "react-native-image-crop-picker";
import EditProfilePictureBottomSheet from "./Components/EditProfilePicBottomSheet";
const AccountScreen=()=>{
    const editProfilePictureBottomSheetRef = useRef();
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [profilePic,setProfilePic]=useState(null)
    const onEditAccount=()=>{
        console.log('Edit account')
    }

    const onClose=()=>{
        editProfilePictureBottomSheetRef.current.close()
    }

    const onImportFromGallery=()=>{
        onClose()
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true,
            cropperToolbarColor: Colors.primary,
            cropperToolbarWidgetColor: Colors.white,
            showCropFrame: false,
            showCropGuidelines: false,
            cropperStatusBarColor: Colors.primary,
          }).then(image => {
            console.log("image obj",image)
            setProfilePic(image.path)
            onClose()
          });
      

    }

    const onTakePhoto=()=>{
        hasAndroidPermission().then((permisson)=>{
            if(permisson){
                ImageCropPicker.openCamera({
                    compressImageQuality:0.8,
                    width: 100,
                    height: 100,
                    cropping: true,
                    cropperCircleOverlay: true,
                    cropperToolbarColor: Colors.primary,
                    cropperToolbarWidgetColor: Colors.white,
                    showCropFrame: false,
                    showCropGuidelines: false,
                    cropperStatusBarColor: Colors.primary,
                  }).then(image => {
                    setProfilePic(image.path)
                    onClose()
                  }).catch(e=>console.log(e))
            }else{
                onClose()
                showToastMessage("Please give permission to use camera")
            }
            
        })
        
      
    }

    async function hasAndroidPermission() {
        
        console.log("checking android permission")
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    
        const hasPermission = await PermissionsAndroid.check(permission);
        console.log("has permission",hasPermission)
        if (hasPermission) {
          return true;
        }else{   
            const status=await PermissionsAndroid.request(permission);
            console.log(status) 
            return status === 'granted';
        }
    
        
        
      }

    return(
        <>
        
            <Header 
                title={'Account'} 
                enableBackButton={false}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={globalStyles.container}>
                <View style={globalStyles.center}>
                    <View style={styles.profilePicContainer}>
                     {
                        profilePic 
                        ?
                        (
                        <Image source={{uri:profilePic}} style={styles.profilePic}/>
                        )
                        :
                        (
                        <Icon
                            name="camera"
                            size={50}
                            color={Colors.white}
                        />
                        )
                        
                    } 
                    
                    
                    </View>
                    <TouchableOpacity onPress={()=>editProfilePictureBottomSheetRef.current?.open()}>
                        <Text style={styles.editPictureText}>Edit picture</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.userDetailContainer}>
                <View style={[globalStyles.inputContainer,styles.textInputContainer]}>
                    <FloatingTextInput1 
                        label={'Mobile Number'} 
                        value={mobileNumber} 
                        onChangeText={setMobileNumber}  
                    />
                </View>
                <View style={[globalStyles.inputContainer,styles.textInputContainer]}>
                    <FloatingTextInput1 
                        label={'First Name'} 
                        value={firstName} 
                        onChangeText={setFirstName}  
                    />
                </View>
                <View style={[globalStyles.inputContainer,styles.textInputContainer]}>
                    <FloatingTextInput1 
                        label={'Last Name'} 
                        value={lastName} 
                        onChangeText={setLastName}  
                    />
                </View>

                </View>
                <WideButton label={'Save changes'} onPress={onEditAccount}/>
            </View>
            <EditProfilePictureBottomSheet editProfilePictureBottomSheetRef={editProfilePictureBottomSheetRef} onClose={onClose} onImportFromGallery={onImportFromGallery} onTakePhoto={onTakePhoto} />
            </GestureHandlerRootView>
        </>
    )
}
const styles=StyleSheet.create({
    profilePicContainer:{
        height:100,
        width:100,
        backgroundColor:Colors.grayLight,
        borderRadius:200,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    profilePic:{
        height:100,
        width:100,
        borderRadius:200
    },
    editPictureText:{
        color:Colors.primary,
        fontFamily:Fonts.LatoBold
    },
    textInputContainer:{
        marginVertical:10
    },
    userDetailContainer:{
        paddingVertical:20
    }
})
export default AccountScreen