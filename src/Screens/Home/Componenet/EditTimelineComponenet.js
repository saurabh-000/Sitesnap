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
import { STRING_CONSTANTS } from "../../../Utils/Constants"

const EditTimelineComponent=({reference,onRemove,timeline,siteId,onRefresh})=>{

    const userData=useSelector(state=>state.user.userData)
    const [loading,setLoading]=useState(false)
    const [description,setDescription]=useState('')
    const [transactionAmount,setTransactionAmount]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const [images,setImages]=useState([])
    const [isChanged,setIsChanged]=useState(false)
    const onOpen=()=>{
        console.log("timeline",timeline)
        setDescription(timeline?.description)
        setTransactionAmount(timeline?.payment?.amount)
        setTransactionId(timeline?.payment?.transaction_id)
        setImages(timeline?.images)
    }

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
        payload.append("site_id", siteId);
        payload.append("payment[amount]", transactionAmount);
        payload.append("payment[transaction_id]", transactionId);
        if(images.length>0)
            images.map((item,index)=>{
                if(item?.path)
                payload.append("images", {
                    name:getFileName(item.path),
                    uri:item.path,
                    type:item.mime
            });
        })
            
        console.log("payload",payload)
        
        PUTAPI(payload,AppUrls.UPDATE_TIMELINE.replace('<timeline_id>',timeline?._id),userData?.token,true).then(timelineResponse=>{
            console.log("timeline response",timelineResponse)
            if(timelineResponse?.success){
                if(timelineResponse?.message===STRING_CONSTANTS.RECORD_UPDATE){
                    Toast("Activity updated successfully")
                    onRefresh()
                    onRemove()
                }else{
                    Toast(timelineResponse?.message)
                }
                 
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

    const renderHeaderComponent=()=>{
        return(
          <>
            <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18,textAlignVertical:'center',lineHeight:22}}>Edit Timeline</Text>
             <TouchableOpacity onPress={()=>onRemove()} style={styles.removeIconButton}>
                    <MCIcon name='close-circle' size={24} color={Colors.danger}/>
                </TouchableOpacity>
            </View>
            
            <View style={{height:1,backgroundColor:Colors.primary}}/>
          </>
        )
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
export default EditTimelineComponent