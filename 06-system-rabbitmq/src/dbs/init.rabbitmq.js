'use strict'

const amqp = require('amqplib');

const connectRabbitMq = async () => {
   try {
      const connection = await amqp.connect('amqp://guest:12345@localhost');

      if(!connection) throw new Error('Connection can not established');

      const channel = await connection.createChannel();

      return {channel, connection};
   } catch (error) {
      console.log(error);
   }
}

const connectRabbitMqForTest = async () => {
   try {
      const {channel, connection} = connectRabbitMq();

      const queue = 'test-queue';
      const message = 'HELLO FROM RABBIT MQ';
      await channel.assertQueue(queue);
      await channel.sendToQueue(queue, Buffer.from(message));

      await connection.close();
   } catch (error) {
      console.log(error);
   }
}

const consumeQueue = async (channel, queueName) => {
   try {
      await channel.assertQueue(queueName, {durable: true});
      channel.consume(queueName, (message) => {
         console.log(`RECEIVED message: ${queueName}:: `, message.content.toString());
      }, {noAck: true})
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   connectRabbitMq,
   connectRabbitMqForTest
}