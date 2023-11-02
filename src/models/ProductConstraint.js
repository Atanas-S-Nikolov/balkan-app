import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductConstraintSchema = new Schema({
  productId: {
    type: String,
    unique: [true, 'Product already exists!'],
    required: [true, 'Product id is required!'],
  },
  quantityPerPallet: {
    type: Number,
    required: [true, 'Quantity per pallet is required!'],
    match: [/^\d+$/, 'Quantity per pallet must be a number!'],
  },
  palletType: {
    type: String,
    required: [true, 'Pallet type is required!'],
  },
},
{ collection: 'productConstraints' }
)

ProductConstraintSchema.plugin(mongoosePaginate);
const ProductConstraint = models.ProductConstraint || model('ProductConstraint', ProductConstraintSchema);

export default ProductConstraint;
