import { ToastAndroid } from "react-native"

export const Toast=(msg)=>{
    return(
        ToastAndroid.show(msg,ToastAndroid.LONG)
    )
}