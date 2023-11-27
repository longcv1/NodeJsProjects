'use strict'

const amqp = require('amqplib');

const producer = async () => {
   try {
      const connection = await amqp.connect('amqp://guest:12345@localhost');
      const channel = await connection.createChannel();

      const notificationExchange = 'notificationEx';
      const notiQueue = 'notificationQueueProcess';
      const notificationExDlx = 'notificationExDlx';
      const notificationRoutingKeyDlx = 'notificationRoutingKeyDlx';

      await channel.assertExchange(notificationExchange, 'direct', {durable: true});
      const queueResult = await channel.assertQueue(notiQueue,{
         exclusive: false, // allow other connections access to queue at the same time
         deadLetterExchange: notificationExDlx,
         deadLetterRoutingKey: notificationRoutingKeyDlx,
      });

      await channel.bindQueue(queueResult.queue, notificationExchange);
      // eslint-disable-next-line no-undef
      channel.sendToQueue(queueResult.queue, Buffer.from('a new product created,,,', {
         expiration: '1000',
      }))

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