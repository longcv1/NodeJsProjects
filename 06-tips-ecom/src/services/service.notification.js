'use strict';

const { NOTI } = require('../models/model.notification');

const publishNotiToSystem = async ({
   type = 'SHOP-001',
   receivedId = 1,
   senderId = 1,
   options = {},
}) => {
   let noti_content;
   if (type === 'SHOP-001') {
      noti_content = '@@ has been added 1 product';
   } else if (type === 'PROMOTION-001') {
      noti_content = '@@ has been added 1 voucher';
   }

   const newNotification = NOTI.create({
      noti_type: type,
      noti_content,
      noti_senderId: senderId,
      noti_receivedId: receivedId,
      noti_options: options,
   });

   return newNotification;
};

const listNotiByUser = async ({
   userId = 1,
   type = 'ALL',
   // isRead = 0,
}) => {
   const match = { noti_receivedId: userId };
   if (type !== 'ALL') {
      match['noti_type'] = type;
   }

   return await NOTI.aggregate([
      {
         $match: match,
      },
      {
         $project: {
            noti_type: 1,
            noti_senderId: 1,
            noti_receivedId: 1,
            noti_content: 1,
            createAt: 1,
            noti_options: 1,
         },
      },
   ]);
};

module.exports = {
   publishNotiToSystem,
   listNotiByUser,
};
