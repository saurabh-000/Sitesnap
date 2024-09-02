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