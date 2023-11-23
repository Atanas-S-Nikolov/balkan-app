import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const InputProductSchema = new Schema({
  productId: {
    type: String,
    unique: [true, 'Product already exists!'],
    required: [true, 'Product id is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
    match: [/^\d+$/, 'Quantity must be a number!'],
  },
},
{ collection: 'inputProducts' }
)

InputProductSchema.plugin(mongoosePaginate);
const InputProduct = models.InputProduct || model('InputProduct', InputProductSchema);

export default InputProduct;
