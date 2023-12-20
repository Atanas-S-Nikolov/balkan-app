import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const OrderSchema = new Schema({
  orderId: {
    type: Number,
    unique: [true, 'Order already exists!'],
    required: [true, 'Order id is required!'],
  },
  orderDate: {
    type: Date,
    required: [true, 'Order date is required!'],
  },
  inputProducts: {
    type: Array,
    required: [true, 'Input products are required!'],
  },
  standardPallets: {
    type: Array,
  },
  leftoverProducts: {
    type: Array,
  },
  builderProducts: {
    type: Array,
  },
  palletNumber: {
    type: Number,
    required: [true, 'Pallet number is required'],
  },
},
{ collection: 'orders' }
)

OrderSchema.plugin(mongoosePaginate);
const Order = models.Order || model('Order', OrderSchema);

export default Order;
