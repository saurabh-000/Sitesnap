import { AppUrls } from "./AppUrls";

export const GETAPI=(url,cred=null)=>{
    let headers = new Headers();
    if(cred){
        headers.append("Authorization", cred);
    }
    let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
};

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch((error) => console.error(error));
}

export const POSTAPI=(data,url,cred=null,isFormdata=false)=>{
    let headers = new Headers();
    if(cred){
        headers.append("Authorization", cred);
    }
    if(!isFormdata){
        headers.append("Content-Type", "application/json");
    }
    

    let requestOptions = {
        method: "POST",
        headers: headers,
        body: data,
        redirect: "follow"
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch((error) => console.error(error));
}
export const PUTAPI=(data,url,cred=null,isFormdata=false)=>{
    let headers = new Headers();
    if(cred){
        headers.append("Authorization", cred);
    }
    if(!isFormdata){
        headers.append("Content-Type", "application/json");
    }

    let requestOptions = {
        method: "PUT",
        headers: headers,
        body: data,
        redirect: "follow"
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch((error) => console.error(error));    
}    
