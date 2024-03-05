import { DELETE, GET, POST, PUT } from "@/constants/RequestMethodsConstants";
import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";
import { handleServerErrors } from "@/utils/ApiUtils";

export default async function handler(req, res) {
  const { method, body } = req;
  try {
    if (method === POST) {
      const { productId } = body;
      const existingProduct = await executeDbCall(() => ProductConstraint.findOne({ productId: productId }));
      if (existingProduct) {
        res.status(404).json({
          errorMessage: `Изделие с номер '${productId}' вече съществува`
        });
      }
      await executeDbCall(() => ProductConstraint.create(body));
      res.status(201).json({
        message: 'Изделието е създадено'
      });
    } else if (method === GET) {
      const { page = 1, productId } = req.query;
      const parameters = productId ? { productId: { $regex: productId } } : {};
      const query = ProductConstraint.find(parameters);
      const products = await executeDbCall(() => ProductConstraint.paginate(query, {
        page: page,
        limit: 50,
        sort: { productId: 1 }
      }));
      res.status(200).json(products);
    } else if (method === PUT) {
      await executeDbCall(() => ProductConstraint.findOneAndUpdate({ productId: body.productId }, body));
      res.status(200).json({
        message: 'Изделието беше променено'
      });
    } else if (method === DELETE) {
      const { productId } = req.query;
      if (productId) {
        await executeDbCall(() => ProductConstraint.deleteOne({ productId: productId }));
        res.status(200).json({
          message: 'Изделието е изтрито'
        });
      }
    }
  } catch (error) {
    handleServerErrors(error, res);
  }
}
