import { createClient } from 'redis';

export function configRedis() {
        const client = createClient({
        password: process.env.REDIS_DB_PASSWORD,
        socket: {
            host: 'redis-19833.c81.us-east-1-2.ec2.redns.redis-cloud.com',
            port: 19833
        }
    })
    return client
}