'use strict'

const { connectRabbitMqForTest } = require("../dbs/init.rabbitmq")

describe('RabbitMQ Connection', () => {
   it('should connect successfully ', async() => {
      const result = await connectRabbitMqForTest();
      expect(result).tobeUndefined();
   })
})