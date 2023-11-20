'use strict';

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'Notifications';

// Declare the Schema of the Mongo model
const notificationSchema = new mongoose.Schema(
   {
      noti_type: {
         type: String,
         enum: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'SHOP-001'],
      },
      noti_senderId: { type:  mongoose.Schema.Types.ObjectId, ref: 'Shop'},
      noti_receivedId: { type: Number },
      noti_content: { type: String },
      noti_options: { type: Object, default: {} },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   },
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, notificationSchema);
