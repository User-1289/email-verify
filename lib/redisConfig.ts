import { createClient } from 'redis';

export function configRedis() {
        const client = createClient({
        password: process.env.REDIS_DB_PASSWORD,
        socket: {
            host: 'redis-16708.c15.us-east-1-2.ec2.redns.redis-cloud.com',
            port: 16708
        }
    })
    return client
}
