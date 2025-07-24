import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Modalize } from "react-native-modalize"
import FloatingTextInput from "../../../Components/Input/FloatingTextInput"
import ImageInput from "../../../Components/Input/ImageInput"
import WideButton from "../../../Components/Button/WideButton"
import globalStyles from "../../../Styles/GlobalStyles"
import Colors from "../../../Theme/Colors"
import Fonts from "../../../Theme/Fonts"
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PUTAPI } from "../../../API/APICalls"
import { AppUrls } from "../../../API/AppUrls"
import { useSelector } from "react-redux"
import { getFileName } from "../../../Utils/CommonMethods"
import { Toast } from "../../../Utils/Toast"


const EditSiteComponent=({reference,onRemove,site,onRefresh})=>{
    const userData=useSelector(state=>state.user.userData)
    const [siteAddress,setSiteAddress]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [siteImage,setSiteImage]=useState('')
    const [editableSite,setEditableSite]=useState(null)
    const [loading,setLoading]=useState(false)


    const onOpen=()=>{
        setMobileNumber(site?.site_owner_mobile_number)
        setSiteAddress(site?.site_address)
        setSiteImage(site?.site_image)
        setLoading(false)
    }

    const renderHeaderComponent=()=>{
        return(
          <>
            <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18,textAlignVertical:'center',lineHeight:22}}>Edit Site</Text>
                <TouchableOpacity onPress={()=>onRemove()} style={styles.removeIconButton}>
                    <MCIcon name='close-circle' size={24} color={Colors.danger}/>
                </TouchableOpacity>
            </View>
            
            <View style={{height:1,backgroundColor:Colors.primary}}/>
          </>
        )
    }

    const validatePayload=()=>{
        if(!siteAddress || !mobileNumber || mobileNumber.length<10)
            return true
        else if(!/^\d+$/.test(mobileNumber)){
            //setErrorText("Please enter valid mobile number")
            return true
        }
        else
            return false
    }

    const onChangeImage=(image)=>{
        setSiteImage(image)
    }
    
    const onSubmit=async()=>{
        setLoading(true)
        let payload = new FormData();
        payload.append("site_address", siteAddress);
        payload.append("site_owner_mobile_number", mobileNumber);
        if(siteImage?.path)
            payload.append("site_image", {
                name:getFileName(siteImage.path),
                uri:siteImage?.path,
                type:siteImage.mime
        });
        console.log("payload",payload)
        console.log("url",AppUrls.UPDATE_SITE.replace('<site_id>',site._id))
        console.log("token",userData?.token)
        
        PUTAPI(payload,AppUrls.UPDATE_SITE.replace('<site_id>',site._id),userData?.token,true).then(siteResponse=>{
            console.log("update site response",siteResponse)
            if(siteResponse?.success){
                Toast(siteResponse?.message) 
                onRefresh()
                onRemove()
            }else{
                Toast(siteResponse?.error?.message)
            }
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))

    }


    return(
        
        <Modalize
                onOpen={()=>onOpen()}
                ref={reference}
                withHandle={false}
                HeaderComponent={renderHeaderComponent}
                adjustToContentHeight={true}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                    contentContainerStyle:{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }
                }}>
                <View  style={globalStyles.container}>
                    <View style={[styles.textInputContainer]}>
                        <FloatingTextInput
                            label={'Site Address'} 
                            value={siteAddress} 
                            onChangeText={(text)=>setSiteAddress(text)}  
                        />
                    </View>
                    <View style={[styles.textInputContainer]}>
                        <FloatingTextInput
                            label={'Mobile Number'} 
                            value={mobileNumber} 
                            onChangeText={(text)=>setMobileNumber(text)}
                            maxLength={10}
                            keyboardType='numeric'  
                        />
                    </View>
                    <View style={[styles.textInputContainer]}>
                        <ImageInput image={siteImage} onChange={onChangeImage} />
                    </View> 
                    <View style={{marginVertical:20}}>
                        <WideButton label={'Save changes'} onPress={onSubmit} disabled={validatePayload()} loading={loading}/>
                    </View>
                </View>
            </Modalize>
    )
}
const styles=StyleSheet.create({
    textInputContainer:{
        marginVertical:10
    },
    removeIconButton:{
        justifyContent:'center',
        alignItems:'center',
    },
})
export default EditSiteComponent