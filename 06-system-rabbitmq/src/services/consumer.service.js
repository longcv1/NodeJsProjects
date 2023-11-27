"use strict";

const { connectRabbitMq } = require("../dbs/init.rabbitmq");

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectRabbitMq();
      await consumerToQueue(channel, queueName);
    } catch (error) {
      console.log(error);
    }
  },

  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectRabbitMq();
      const notiQueue = "notificationQueueProcess";
      channel.consume(notiQueue, (msg) => {
        console.log(
          `SEND notification queue success:: `,
          msg.content.toString()
        );
        channel.ack(msg);
      });
    } catch (error) {
      console.log(error);
    }
  },

  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectRabbitMq();

      const notificationExDlx = "notificationExDlx";
      const notificationRoutingKeyDlx = "notificationRoutingKeyDlx";
      const notiQueueHandler = "notificationQueueHotFix";

      await channel.assertExchange(notificationExDlx, "direct", {
        durable: true,
      });

      const queueResult = await channel.assertQueue(notiQueueHandler, {
        exclusive: false,
      });

      await channel.bindQueue(queueResult.queue, notificationExDlx, notificationRoutingKeyDlx);
      await channel.consume(queueResult.queue, msgFailed => {
         console.log('Please hot fix');
      }, {durable: true});
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = messageService;
