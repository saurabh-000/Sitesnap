import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import ImageCropPicker from "react-native-image-crop-picker";
const ImageInput=({image,onChange,multiple=false})=>{
    const uploadImage=()=>{
        console.log("upload image")
        ImageCropPicker.openPicker({
            multiple:multiple,
            width: 300,
            height: 400,
            cropping: false,
            cropperCircleOverlay: true,
            cropperToolbarColor: Colors.primary,
            cropperToolbarWidgetColor: Colors.white,
            showCropFrame: false,
            showCropGuidelines: false,
            cropperStatusBarColor: Colors.primary,
          }).then(image => {
            console.log("image obj",image)
            onChange(image)
          });
    }

    const onRemove=(item,index)=>{
        if(item){
            let arr=image
            arr.splice(index,1)
            onChange(arr)
        }else{
            onChange(null)
        }
        
    }

    const renderImages=({item,index})=>{
        return(
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={()=>onRemove(item,index)} style={styles.removeIconButton}>
                    <Icon name='close-circle' size={24} color={Colors.danger}/>
                </TouchableOpacity>
                <Image source={{uri:item.path}} style={{height:100,width:100}} resizeMode="contain"/>
            </View>
        )
    }

    return(
        <View style={[styles.textInputContainer,styles.imageInputContainer]}>           
            <TouchableOpacity onPress={uploadImage} style={styles.imageUploadButton}>
                <Text style={styles.imageUploadText}>Upload Image</Text>
            </TouchableOpacity>
            {
                multiple 
                ?
                image.length>0 && (
                    <View>
                        <FlatList
                            horizontal
                            data={image}
                            renderItem={renderImages}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    
                )
                :
                image && (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={()=>onRemove()} style={styles.removeIconButton}>
                            <Icon name='close-circle' size={24} color={Colors.danger}/>
                        </TouchableOpacity>
                        <Image source={{uri:image?.path?image.path:image}} style={{height:300,width:'auto'}} resizeMode="contain"/>
                    </View>     
                )
                
            }
                    
        </View>
    )
}
const styles=StyleSheet.create({
    imageInputContainer:{
        borderWidth:0.5,
        borderRadius:5,
        borderColor:Colors.backgroundPrimary,
        padding:5,
        backgroundColor:Colors.backgroundSecondary
    },
    imageUploadButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.white,
        borderRadius:5
    },
    imageUploadText:{
        color:Colors.primary,                    
        fontFamily:Fonts.LatoBold,
        fontSize:16,
        lineHeight:40
    },
    imageContainer:{
        marginTop:10,
        backgroundColor:'white',
        padding:10,
        borderRadius:5
    },
    removeIconButton:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:5,
        top:5,
        zIndex:999
    }
})
export default ImageInput