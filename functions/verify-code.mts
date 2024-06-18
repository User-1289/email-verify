import { configRedis } from "../lib/redisConfig";

export async function handler(event:any, context:any) {

    if(event.queryStringParameters?.Req_Key!==process.env.REQ_KEY){
        return{
            statusCode:403,
            body:JSON.stringify({message:'Unauthorized access'})
        }
    }
    let userEmailId = event.queryStringParameters?.emailId;
    let codeEntered = event.queryStringParameters?.code;
    if(userEmailId==null || userEmailId.length===0 || codeEntered==null || codeEntered.length===0){
        return{
            statusCode:400,
            body:JSON.stringify({message:"Provide email id", error:"invalid email id"})
        }
    }

    let client;

    try {
        client = configRedis()
        await client.connect()
        let getActualCode = await client.get(userEmailId)
        if(getActualCode==null || getActualCode.length<=0){
            return{
                statusCode:500,
                body:JSON.stringify({message:'cannot find code or failed to retrieve code'})
            }
        }
        else if(codeEntered===getActualCode){
            await client.del(userEmailId)
            return{
                statusCode:200,
                body:JSON.stringify({message:'Verified successfully'})
             }
         } 
         else if(codeEntered!==getActualCode){
            return{
                statusCode:400,
                body:JSON.stringify({message:'Invalid code'})
            }
         }
    } catch (error) {
        return{
            statusCode:500,
            body:JSON.stringify({message:"Failed to connect to redis", error:error})
        }
    } finally{
        await client.disconnect()
    }
}