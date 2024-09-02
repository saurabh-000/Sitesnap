import React, { useRef, useState } from "react"
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../Styles/GlobalStyles"
import Header from "../../Components/Headers/Header"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import FloatingTextInput from "../../Components/Input/FloatingTextInput";
import WideButton from "../../Components/Button/WideButton";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView, State } from "react-native-gesture-handler";
import Metrics from "../../Theme/Metrics";
import ImageCropPicker from "react-native-image-crop-picker";
import EditProfilePictureBottomSheet from "./Components/EditProfilePicBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../Redux/UserSlice";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const AccountScreen=()=>{
    const editProfilePictureBottomSheetRef = useRef();
    const dispatch=useDispatch()
    const navigation=useNavigation()
    const userData=useSelector(state=>state.user.userData)
    const isLoggedIn=useSelector(state=>state.user.isLoggedIn)
    const [firstName,setFirstName]=useState(userData?.account?.first_name)
    const [lastName,setLastName]=useState(userData?.account?.last_name)
    const [mobileNumber,setMobilenNumber]=useState(userData?.account?.mobile_number)
    const [email, setEmail] = useState(userData?.email)
    const [profilePic,setProfilePic]=useState(userData?.account?.profile_pic)

    const onLogoutAccount=()=>{
        dispatch(clearUserData())
        //navigation.navigate("Auth")
        GoogleSignin.signOut()
        navigation.popToTop()
        navigation.replace('Auth')
        console.log(userData,isLoggedIn)
    }

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
                    <FloatingTextInput
                        label={'Email Address'} 
                        value={email} 
                        editable={false} 
                    />
                </View>
                <View style={[globalStyles.inputContainer,styles.textInputContainer]}>
                    <FloatingTextInput 
                        label={'First Name'} 
                        value={firstName} 
                        onChangeText={setFirstName}  
                    />
                </View>
                <View style={[globalStyles.inputContainer,styles.textInputContainer]}>
                    <FloatingTextInput 
                        label={'Last Name'} 
                        value={lastName} 
                        onChangeText={setLastName}  
                    />
                </View>

                </View>
                <WideButton label={'Save changes'} onPress={onEditAccount}/>
                <WideButton label={'Log out'} onPress={onLogoutAccount} buttonColor={Colors.danger}/>
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