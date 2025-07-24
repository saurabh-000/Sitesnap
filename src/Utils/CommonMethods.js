import { Image } from "react-native-compressor";
import { Toast } from "./Toast";
import { STRING_CONSTANTS } from "./Constants";

export const getFileName=(urlStr)=>{
    if(urlStr){
      const f2 = urlStr.split("/");
  
      // then get the file name with extention.
      const fileName = f2[f2.length - 1];
      if(fileName.length>50){
        return fileName.substring(0,50)+'....'
      }else{
        return fileName
      }
      
    }else{
      return ''
    }
    
  }
export const CompressImage=async(image)=>{
  try {
    let compressedImage=await Image.compress(image)
    return compressedImage
  } catch (error) {
    Toast(STRING_CONSTANTS.SOMETHING_WENT_WRONG)
  }
}  

export const getCacheBustedUrl = (imageUrl) => {
  const timestamp = new Date().getTime(); // Generates a unique timestamp
  return `${imageUrl}?t=${timestamp}`;    // Appends the timestamp as a query param
};