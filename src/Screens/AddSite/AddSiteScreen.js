import React, { useState } from "react"
import globalStyles from "../../Styles/GlobalStyles"
import { StyleSheet, View } from "react-native"
import Header from "../../Components/Headers/Header"
import FloatingTextInput from "../../Components/Input/FloatingTextInput"
import WideButton from "../../Components/Button/WideButton"
import ImageInput from "../../Components/Input/ImageInput"
import { getFileName } from "../../Utils/CommonMethods"
import { POSTAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { Toast } from "../../Utils/Toast"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"

const AddSiteScreen=()=>{
    const navigation=useNavigation()
    const userData=useSelector(state=>state.user.userData)
    const [siteAddress,setSiteAddress]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [email,setEmail]=useState('')
    const [siteImage,setSiteImage]=useState('')
    const [loading,setLoading]=useState(false)

    const onChangeImage=(image)=>{
        setSiteImage(image)
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

    const onSubmit=()=>{
        setLoading(true)
        let payload = new FormData();
        payload.append("site_address", siteAddress);
        payload.append("site_owner_mobile_number", mobileNumber);
        payload.append("site_owner_email_address", email);
        if(siteImage)
            payload.append("site_image", {
                name:getFileName(siteImage.path),
                uri:siteImage.path,
                type:siteImage.mime
        });
        console.log("payload",payload)
        
        POSTAPI(payload,AppUrls.CREATE_SITE,userData?.token,true).then(siteResponse=>{
            console.log("site response",siteResponse)
            if(siteResponse?.success){
                Toast(siteResponse?.message) 
                navigation.navigate("HomeScreen")   
            }else{
                Toast(siteResponse?.error?.message)
            }
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))

    }

    return(
        <>
            <Header 
                title={'Add Site'} 
                enableBackButton={false}
            />
            <View style={globalStyles.container}>
                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Site Address'} 
                        value={siteAddress} 
                        onChangeText={(text)=>setSiteAddress(text)}  
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Client Mobile Number'} 
                        value={mobileNumber} 
                        onChangeText={(text)=>setMobileNumber(text)}
                        maxLength={10}
                        keyboardType='numeric'  
                    />
                </View>

                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Client Email Address'} 
                        value={email} 
                        onChangeText={(text)=>setEmail(text)}
                        maxLength={30}
                        keyboardType={'email-address'} 
                    />
                </View>

                <View style={[styles.textInputContainer]}>
                    <ImageInput image={siteImage} onChange={onChangeImage} />
                </View>
                           
                <View style={{marginVertical:20}}>
                    <WideButton label={'Save changes'} onPress={onSubmit} disabled={validatePayload()} loading={loading}/>
                </View>
                
            </View>
        </>
        
    )
}
const styles=StyleSheet.create({
    textInputContainer:{
        marginVertical:10
    }
})
export default AddSiteScreen