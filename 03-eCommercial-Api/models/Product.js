const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter product name"],
      maxlength: [100, "No more than 100 char"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please choose category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please enter company"],
      enum: {
        values: ["ikea", "marcos", "toto", "lock&lock","liddy"],
        message: "{VALUE} is not supported",
      },
    },
    color: {
      type: [String],
      default:['#222'],
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please enter stock"],
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true} }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model('Product', ProductSchema);