import React from "react"
import { Text, View } from "react-native"
import globalStyles from "../../Styles/GlobalStyles"
import Header from "../../Components/Headers/Header"

const AccountScreen=()=>{
    return(
        <>
            <Header 
                title={'Account'} 
                enableBackButton={false}
            />
            <View style={globalStyles.container}>
                <Text>Account Screen</Text>
            </View>
        </>
    )
}
export default AccountScreen