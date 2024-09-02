import React, { useRef, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../Components/Headers/Header"
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import globalStyles from "../../Styles/GlobalStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GETAPI } from "../../API/APICalls";
import { AppUrls } from "../../API/AppUrls";
import { Toast } from "../../Utils/Toast";
import { Loader } from "../../Utils/Loader";
import { useSelector } from "react-redux";
import EditSiteComponent from "./Componenet/EditSiteComponent";
import ListItemSeparator from "../../Components/Dividers/ListItemSeparator";
const HomeScreen=()=>{
    const navigation=useNavigation()
    const userData=useSelector(state=>state.user.userData)
    const editSiteModalizeRef = useRef();
    const [loading,setLoading]=useState(false)
    const [siteList,setSiteList]=useState([])
    const [selectedSiteToEdit,setSelectedSiteToEdit]=useState(null)

    useFocusEffect(
        React.useCallback(()=>{
            getSites()
            console.log("userData",userData)
        },[])
    )

    const getSites=()=>{
        setLoading(true)
        console.log("usr data",userData)
        console.log("url",AppUrls.SITE_LIST)
        console.log("token",userData?.token)
        GETAPI(AppUrls.SITE_LIST,userData?.token).then(responseSiteList=>{
            console.log("sitelist",responseSiteList)
            if(responseSiteList.success){
                setSiteList(responseSiteList?.data)
            }else{
                Toast(responseSiteList?.error?.message)
            }
        }).catch((e)=>console.log(e))
        .finally(()=>setLoading(false))
    }   

    const onPressSite=(item)=>{
        navigation.navigate("TimelineScreen",{
            site_id:item?._id
        })
    }

    const onEdit=(item)=>{
        console.log("site",item,userData)
        if(userData?.account?.role==='site engineer'){
            setSelectedSiteToEdit(item)
            editSiteModalizeRef.current?.open();
        }
        
    }

    const getInfo=(data)=>{
        console.log("data",data)
        if(userData?.account?.role!=='site engineer'){
            data=data?.created_by    
        }
        if(data?.account?.first_name && data?.account?.last_name){
            return `${data?.account?.first_name} ${data?.account?.last_name}`  
        }
        if(data?.account?.first_name){
            return `${data?.account?.first_name}`  
        }
        if(data?.account?.last_name){
            return `${data?.account?.last_name}`  
        }
        if(data?.site_owner_email_address){
            return `${data?.site_owner_email_address}`  
        }
        if(data?.site_owner_mobile_number){
            return `${data?.site_owner_mobile_number}`
        }

    }

    const renderSite=({item})=>{
        return(
                <TouchableOpacity onLongPress={()=>onEdit(item)} onPress={()=>onPressSite(item)} style={globalStyles.box}>
                    {
                        item?.site_image
                        ?
                            <Image source={item?.site_image?{uri:item?.site_image}:''} style={{height:150,width:'auto'}} resizeMode='cover'/>
                        :
                            <View style={{height:150,width:'auto',backgroundColor:Colors.backgroundSecondary}}/>                    
                    }
                    
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:5}}>
                        <View style={{justifyContent:'center'}}>
                            <Text style={globalStyles.regularText}>{getInfo(item)}</Text>
                            <Text style={globalStyles.regularText}>{item?.site_address}</Text>
                        </View>
                        <View style={{width:55,height:55,borderRadius:2000,padding:5,justifyContent:'center',alignItems:'center'}}>
                            {
                                userData?.account?.role==='site engineer'
                                ?
                                <Image source={{uri:item?.account?.profile_pic}} style={{width:40,height:40,borderRadius:200,backgroundColor:Colors.backgroundSecondary}} resizeMode="contain"/>
                                :
                                <Image source={{uri:item?.created_by?.account?.profile_pic}} style={{width:40,height:40,borderRadius:200,backgroundColor:Colors.backgroundSecondary}} resizeMode="contain"/>
                            }
                            
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    const onRemoveEditSiteMoadalize=()=>{
        editSiteModalizeRef.current?.close();
    }
    
    return(
        <>
            <Header 
                title={'Home'} 
                enableBackButton={false}
            />
            {
                loading && <Loader/>
            }
            <View style={[globalStyles.container]}>
                <FlatList
                    data={siteList}
                    renderItem={renderSite}
                    keyExtractor={(item,index)=>index}
                    ItemSeparatorComponent={ListItemSeparator}
                    showsVerticalScrollIndicator={false}
                />
                
            </View>
            <EditSiteComponent reference={editSiteModalizeRef} onRemove={onRemoveEditSiteMoadalize} site={selectedSiteToEdit} onRefresh={getSites}/>
        </>
    )
}
const  styles=StyleSheet.create({
    iconStyle:{justifyContent: 'center',marginHorizontal:10},
    text:{marginHorizontal:10,fontFamily:Fonts.LatoBold,color:Colors.primary,fontSize:18},
    textInputContainer:{
        marginVertical:10
    }
})
export default HomeScreen