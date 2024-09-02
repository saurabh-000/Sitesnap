import React, { useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import Header from "../../Components/Headers/Header"
import globalStyles from "../../Styles/GlobalStyles"
import Colors from "../../Theme/Colors"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { GETAPI } from "../../API/APICalls"
import { AppUrls } from "../../API/AppUrls"
import { useSelector } from "react-redux"
import ListItemSeparator from "../../Components/Dividers/ListItemSeparator"
import moment from "moment"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Metrics from "../../Theme/Metrics"
const TransactionListScreen=()=>{
    const route=useRoute()
    const userData=useSelector(state=>state?.user?.userData)
    const {site_id}=route?.params
    const [transactionList,setTransactionList]=useState([])
    useFocusEffect(
        React.useCallback(()=>{
            getTransactionList()
        },[])
    )

    const getTransactionList=()=>{
        return(
            GETAPI(AppUrls.FETCH_TRANSACTION.replace('<site_id>',site_id),userData?.token).then(response=>{
                if(response?.status){
                    console.log("response",response.data)
                    setTransactionList(response?.data)
                }else{
                    Toast(response?.error?.message)
                }
            })
        )
    }

    const renderTransaction=({item})=>{
        return(
            <View style={[globalStyles.box,{flexDirection:'row',justifyContent:'space-between'}]}>
                <View>
                    <Text style={[globalStyles.regularText,{color:Colors.primary}]}>Transaction Id:  <Text style={{color:Colors.primary_l3}}>{item?.payment?.transaction_id}</Text></Text>
                    <Text style={[globalStyles.regularText,{color:Colors.primary}]}>Amount:  <Text style={{color:Colors.primary_l3}}>{item?.payment?.amount}</Text></Text>
                </View>
                    
                <View style={{justifyContent:'flex-end'}}>
                    <Text style={[globalStyles.regularText,{fontSize:14}]}>{moment(item?.payment?.timestamp).format("DD MMM YYYY")}</Text>
                </View>
            </View>
        )
    }

    const ListEmptyComponent=()=>{
        return(
            <View style={styles.emptyListContainer}>
                <Icon
                    name="swap-vertical"
                    size={35}
                    color={Colors.primary_l3}
                    style={styles.emptyListIcon}
                />
                <Text style={globalStyles.regularText}>No Transaction Found!</Text>
            </View>
        )
    }

    return(
        <>
            <Header 
                title={'Transactions'} 
                enableBackButton={true}
            />
            <View style={globalStyles.container}>
                <FlatList
                    data={transactionList}
                    renderItem={renderTransaction}
                    keyExtractor={(item,index)=>index}
                    ItemSeparatorComponent={ListItemSeparator}
                    ListEmptyComponent={ListEmptyComponent}
                />
                
                
            </View>
        </>
    )
}
const styles=StyleSheet.create({
    emptyListContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:Metrics.ScreenHeight/2.8
    },
    emptyListIcon:{
        marginVertical:10
    }
})
export default TransactionListScreen