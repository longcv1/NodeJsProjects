const amqplib = require('amqplib');
const RABBIT_URL = 'amqps://jmxnroxa:qwoapb2xsShL6Oq2VJHbl4PSanu4yXgw@armadillo.rmq.cloudamqp.com/jmxnroxa';

const consumeMsg = async() => {
    try {
        //1. Create connection
        const connection = await amqplib.connect(RABBIT_URL);
        //2. Create channel
        const channel = await connection.createChannel();
        //3. Create exchange queue
        const nameQueue = 'name1';
        await channel.assertQueue(nameQueue, {
         durable: false,
        })
        //4. Send message to queue
        channel.consume(nameQueue, (msg) => {
            console.log(msg.content.toString());
        });

    } catch (error) {
        console.log(error);
    }
    
}

consumeMsg();