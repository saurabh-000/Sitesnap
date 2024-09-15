import React, { useEffect, useState } from "react"
import Header from "../../Components/Headers/Header"
import FloatingTextInput from "../../Components/Input/FloatingTextInput"
import { FlatList, Image, StyleSheet, View } from "react-native"
import ImageInput from "../../Components/Input/ImageInput"
import WideButton from "../../Components/Button/WideButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import globalStyles from "../../Styles/GlobalStyles"
import { getFileName } from "../../Utils/CommonMethods"
import { POSTAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { useSelector } from "react-redux"
import { STRING_CONSTANTS } from "../../Utils/Constants"
import { Toast } from "../../Utils/Toast"
const AddActivityScreen=()=>{
    const navigation=useNavigation()
    const route=useRoute()
    const {site_id}=route?.params
    const userData=useSelector(state=>state.user.userData)
    const [loading,setLoading]=useState(false)
    const [description,setDescription]=useState('')
    const [transactionAmount,setTransactionAmount]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const [images,setImages]=useState([])
    const [isChanged,setIsChanged]=useState(false)

    const onChangeImage=(images)=>{
        console.log("onChanrgeImage",images)
        setImages(images)
        setIsChanged(!isChanged)
    }

    const onSubmit=()=>{
        console.log("on submit")
        setLoading(true)
        let payload = new FormData();
        payload.append("description", description);
        payload.append("site_id", site_id);
        if(transactionAmount)
            payload.append("payment[amount]", transactionAmount);
        if(transactionId)
        payload.append("payment[transaction_id]", transactionId);
        if(images.length>0)
            images.map((item,index)=>{
                payload.append("images", {
                    name:getFileName(item.path),
                    uri:item.path,
                    type:item.mime
            });
        })
            
        console.log("payload",payload)
        
        POSTAPI(payload,AppUrls.CREATE_TIMELINE,userData?.token,true).then(timelineResponse=>{
            console.log("timeline response",timelineResponse)
            if(timelineResponse?.success){
                if(timelineResponse?.message===STRING_CONSTANTS.RECORD_CREATE){
                    Toast("Activity saved successfully")
                }else{
                    Toast(timelineResponse?.message)
                }
                 
                navigation.navigate("TimelineScreen",{
                    site_id:site_id
                })   
            }else{
                Toast(timelineResponse?.error?.message)
            }
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
    }

    const validatePayload=()=>{
        if(!description){
            return true
        }else{
            return false
        }
    }

    const renderImages=({item})=>{
        <Image source={{uri:item?.path}} style={{width:100,height:100}}/>
    }

    return(
        <>
            <Header 
                title={'Add Activity'} 
                enableBackButton={false}
            />
            <View style={globalStyles.container}>
                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Description'} 
                        value={description} 
                        onChangeText={(text)=>setDescription(text)}  
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Transaction Amount'} 
                        value={transactionAmount} 
                        onChangeText={(text)=>setTransactionAmount(text)}
                        keyboardType='numeric'  
                    />
                </View>

                <View style={[styles.textInputContainer]}>
                    <FloatingTextInput
                        label={'Transaction ID'} 
                        value={transactionId} 
                        onChangeText={(text)=>setTransactionId(text)}  
                    />
                </View>
                
                    <View style={[styles.textInputContainer]}>
                        <ImageInput image={images} onChange={onChangeImage} multiple={true} />
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
export default AddActivityScreen