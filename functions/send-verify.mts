import { createCode } from "../lib/createRandom";
import { sendConfirmEmail } from "../lib/emailSend";
import {saveCode} from "../lib/saveCode"
import { configRedis } from "../lib/redisConfig";
export async function handler(event:any, context:any) {

    if(event.queryStringParameters?.Req_Key!==process.env.REQ_KEY){
        return{
            statusCode:403,
            body:JSON.stringify({message:'Unauthorized access'})
        }
    }

    let userEmailId = event.queryStringParameters?.emailId;
    if(userEmailId==null || userEmailId.length===0){
        return{
            statusCode:400,
            body:JSON.stringify({message:"Provide email id", error:"invalid email id"})
        }
    }
    let client;
    try {
        client = configRedis()
        await client.connect()
        let code =  createCode()
        let saveCodeResponse = await saveCode(client,userEmailId,code);
        if(saveCodeResponse.status==="success"){
            await sendConfirmEmail(code,userEmailId)
            return{
                statusCode:200,
                body:JSON.stringify({code:200, message:"Verification code successfully sent, Check your inbox"})
            }
        } else if(saveCodeResponse.status!="success"){
            return {
                statusCode:500,
                body:JSON.stringify({message:"an error occured in saving the generated code", error:saveCodeResponse.error})
            }
        }
    } catch (error) {
        return{
            statusCode:500,
            body:JSON.stringify({message:"an error occured in connecting to redis", error:error})
        }
    } finally{
        await client.disconnect()
    }
}