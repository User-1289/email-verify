export async function saveCode(rdClient:any, emailId:string, codeNum:string) {
    try {
        await rdClient.set(emailId, codeNum);
        return {status:"success"};
    } catch (error) {
        return {status:'fail', error:error};
    }
}