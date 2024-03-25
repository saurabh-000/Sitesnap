import React, { useRef, useState } from "react"
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import Colors from "../../Theme/Colors"
const OTPTextInput=({length,value,onChangeText})=>{
    const [otp,setOTP]=useState(Array(length).fill(''))
    const [tempOTP,setTempOTP]=useState([])
    const handleOtpChange = (item, index) => {
      console.log(item,tempOTP,length)
      if(item){
        const newOtp = [...tempOTP];
        newOtp[index] = item;
        setTempOTP([...tempOTP,item])
        onChangeText([...tempOTP,item].join(''))
        // Move focus to the next box if the current one has a value
        if (item && tempOTP.length < length - 1) {
          inputs[index + 1].focus();
        }
      }
      console.log("hete",item,index,tempOTP)
        
      };
      const inputs = [];
    
    return(
        <View style={{flexDirection:'row'}}>
            {
                otp.map((item,index)=>
                    <TextInput 
                        cursorColor={Colors.primary}
                        style={styles.textInput}
                        maxLength={1}
                        onKeyPress={({ nativeEvent }) => {
                          console.log(index)
                            if (nativeEvent.key === 'Backspace') {
                              let newOtp = [...tempOTP];
                              if(newOtp.length>1){
                                newOtp.splice(index,1)
                              }else{
                                newOtp=[]
                              }
                              
                              console.log(newOtp,tempOTP)
                              setTempOTP(newOtp)
                              onChangeText([...newOtp].join(''))
                              if(index-1>=0)
                                inputs[index - 1].focus();
                            }
                          }}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        ref={(input) => {
                            inputs[index] = input;
                          }}
                        keyboardType='numeric'
                    />
                )
            }
            
        </View>
        
    )
}
const styles=StyleSheet.create({
    textInput:{
        height:40,
        width:40,
        borderWidth:1,
        borderColor:Colors.primary,
        marginRight:20,justifyContent:'center',
        alignItems:'center',textAlign:'center'
    }
})
export default OTPTextInput