//export const BASEURL="https://sitesnap-backend.onrender.com"
export const BASEURL="http://192.168.31.232:3000"
export const AppUrls={
    LOGIN:BASEURL+"/auth/login/",
    GOOGLE_LOGIN:BASEURL+"/auth/google/",
    HEALTH:BASEURL+"/health/",
    VERIFY_OTP:BASEURL+"/auth/verify-otp",
    CREATE_SITE:BASEURL+"/site/create/",
    SITE_LIST:BASEURL+'/site/list/',
    CREATE_TIMELINE:BASEURL+'/timeline/create/',
    FETCH_TIMELINE:BASEURL+'/timeline/list/<site_id>',
    UPDATE_SITE:BASEURL+'/site/update/<site_id>',
    UPDATE_TIMELINE:BASEURL+'/timeline/update/<timeline_id>',
    FETCH_TRANSACTION:BASEURL+'/transaction/list/<site_id>',
    UPDATE_PROFILE:BASEURL+'/profile/user/'
}