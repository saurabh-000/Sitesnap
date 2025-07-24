import React, { useRef, useState } from "react"
import Header from "../../Components/Headers/Header"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../Styles/GlobalStyles"
import Metrics from "../../Theme/Metrics"
import Colors from "../../Theme/Colors"
import Fonts from "../../Theme/Fonts"
import WideButton from "../../Components/Button/WideButton"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { GETAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { useSelector } from "react-redux"
import { Toast } from "../../Utils/Toast"
import moment from "moment"
import EditTimelineComponent from "./Componenet/EditTimelineComponenet"
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from "react-native-fast-image"
import { getCacheBustedUrl } from "../../Utils/CommonMethods"
import { STRING_CONSTANTS } from "../../Utils/Constants"
import EmptyListCompoenet from "../../Components/EmptyListComponent"
const TimelineScreen=()=>{
    const route=useRoute()
    const navigation=useNavigation()
    const editTimelineModalizeRef = useRef();
    const userData=useSelector(state=>state?.user?.userData)
    const {site_id}=route?.params
    const [timeline,setTimeline]=useState([])
    const [selectedTimelineToEdit,setSelectedTimelineToEdit] = useState(null)
    const [totalAmount,setTotalAmount]=useState(0)
    const [loading,setLoading]=useState(false)
    useFocusEffect(
        React.useCallback(()=>{
            getTimeline()
        },[])
    )

    const getTimeline=()=>{
        setLoading(true)
        GETAPI(AppUrls.FETCH_TIMELINE.replace('<site_id>',site_id),userData?.token).then(response=>{
            if(response?.status){
                console.log("response",response?.data)
                setTimeline(response?.data?.activity_list)
                setTotalAmount(response?.data?.total_amount)
            }else{
                Toast(response?.error?.message)
            }
        }).catch((e)=>{
            console.log("error",e)
            Toast(STRING_CONSTANTS.SOMETHING_WENT_WRONG)
        }).finally(()=>setLoading(false))
    }

    const onPressAddToTimeline=()=>{
        console.log("add to timeline")
        navigation.navigate("AddActivityScreen",{
            site_id:site_id
        })
    }

    const onEdit=(item)=>{
        console.log("site",item)
        if(userData?.account?.role==='site engineer'){
            setSelectedTimelineToEdit(item)
            editTimelineModalizeRef.current?.open();
        }
    }

    const onRemoveEditTimelineMoadalize=()=>{
        editTimelineModalizeRef.current?.close();
    }

    const navigateToTransactionScreen=()=>{
        navigation.navigate('Transaction', {
            screen: 'TransactionListScreen',
            params: { site_id:site_id },
          });
    }

    return(
        <>
            <Header 
                title={'Timeline'} 
                enableBackButton={true}
            />
            <View style={globalStyles.container}>
            <TouchableOpacity onPress={()=>navigateToTransactionScreen()} style={{backgroundColor:Colors.dangerBackground,padding:10,marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontFamily:Fonts.LatoBold,color:Colors.primary,lineHeight:20}}>Total amount : {totalAmount?totalAmount:0} <Text style={{fontSize:18}}>{'\u20B9'}</Text></Text>
                <TouchableOpacity >
                        <Icon
                            name="chevron-right"
                            size={18}
                            style={styles.iconStyle}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
            </TouchableOpacity> 
            {console.log("timeline",timeline)}
            {
                (timeline.length==0 && !loading) && (
                    <EmptyListCompoenet message={'No Activity Found'}/>
                )
            }
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    timeline?.map((item,index)=>(
                        <View key={index} style={{marginVertical:10}}>
                    <View style={{backgroundColor:Colors.backgroundPrimary,padding:10,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                        <Text style={{fontFamily:Fonts.LatoBlack,color:Colors.black,fontSize:18}}>{item?.date}</Text>
                    </View>
                    <View style={{marginVertical:0,backgroundColor:Colors.backgroundSecondary,borderBottomLeftRadius:5,borderBottomRightRadius:5,paddingHorizontal:5}}>
                        {
                            item.activities.map((it,ind)=>(
                                <TouchableOpacity key={ind} onLongPress={()=>onEdit(it)} style={{marginVertical:10}}>
                                    <Text style={{fontFamily:Fonts.LatoBold,color:Colors.grayLight,textAlign:'center'}}>{moment(it.timestamp).format('hh:mm A')}</Text>
                                        {
                                            it.images.map((img,imgInd)=>(                                                  
                                                <FastImage source={{uri:getCacheBustedUrl(img),cache: FastImage.cacheControl.web}} style={styles.timelineImage} resizeMode={FastImage.resizeMode.cover}/>
                                            ))
                                        }
                                    
                                    <Text style={{color:Colors.black,fontSize:16,fontFamily:Fonts.LatoRegular}}>{it?.description}</Text>
                                {
                                    it.payment && (
                                        <View style={{marginVertical:10}}>
                                            <Text style={{color:Colors.black,fontFamily:Fonts.LatoBlack,fontSize:18}}>Transaction</Text>
                                            <View style={{backgroundColor:Colors.dangerBackground,padding:10,marginVertical:10,borderRadius:5}}>
                                                <Text style={{fontSize:16,fontFamily:Fonts.LatoBold,color:Colors.primary,lineHeight:20}}>Amount  {it?.payment?.amount}</Text>
                                                <Text style={{fontSize:16,fontFamily:Fonts.LatoBold,color:Colors.primary,lineHeight:20}}>Transaction ID  {it?.payment?.transaction_id}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            
                            
                        </TouchableOpacity>
                            ))
                        }
                        
                    </View>
                    
                </View>    
                    ))
                }
                
            </ScrollView>
            <WideButton label={'Add to timeline'} onPress={onPressAddToTimeline} disabled={false} loading={false}/>
            </View>
            <EditTimelineComponent reference={editTimelineModalizeRef} onRemove={onRemoveEditTimelineMoadalize} timeline={selectedTimelineToEdit} siteId={site_id} onRefresh={getTimeline}/>
        </>
    )
}
const styles=StyleSheet.create({
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginVertical:20
    },
    buttonText:{
        color:Colors.white,
        fontFamily:Fonts.LatoBold,
        lineHeight:20
    },
    timelineImage:{
        height:150,
        marginVertical:10,
        borderRadius:5,
        backgroundColor:Colors.backgroundSecondary
    }
})
export default TimelineScreen