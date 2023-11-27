'use strict'

const amqp = require('amqplib');
const message = 'created a new product abxyz';

const producer = async () => {
   try {
      const connection = await amqp.connect('amqp://guest:12345@localhost');
      const channel = await connection.createChannel();

      const queueName = 'test-topic';
      await channel.assertQueue(queueName, {
         durable: true,
      });

      // eslint-disable-next-line no-undef
      channel.sendToQueue(queueName, Buffer.from(message));

      setTimeout(() => {
         connection.close();
         // eslint-disable-next-line no-undef
         process.exit(0);
      }, 500);

   } catch (error) { 
      console.log(error);
   }
}

producer().then(rs => console.log(rs)).catch(err => console.log(err))