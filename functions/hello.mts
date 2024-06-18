import { configRedis } from "../lib/redisConfig";

export async function handler(event, context) {
  let rdClient;

  try {
    rdClient = configRedis();
    await rdClient.connect();

    //await rdClient.set('webdev1289@gmail.com', 212121);
    const value = await rdClient.get('webdev1289@gmail.com');
    //let value = 'e'
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello, world!',
        value: value
      }),
    };
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message
      }),
    };
  } finally {
    if (rdClient) {
      await rdClient.disconnect();
    }
  }
}
