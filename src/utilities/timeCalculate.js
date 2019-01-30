export function timeCalculate(expireTime){
   let expireIn=new Date(expireTime);
   let currentTime=new Date();
   console.log("Expiretime",expireIn,"current",currentTime)
   let diff=(expireIn.getTime()-currentTime.getTime())/1000/60;
   if(diff<1)
   {console.log("inside timecalculate",diff)
       return true;
   }
   console.log("inside timeCalculate",diff)
   return false;
}