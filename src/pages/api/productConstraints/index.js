import { DELETE, GET, POST, PUT } from "@/constants/RequestMethodsConstants";
import { executeDbCall } from "@/lib/database";
import ProductConstraint from "@/models/ProductConstraint";

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === POST) {
    try {
      await executeDbCall(() => ProductConstraint.create(body));
      res.status(201).json({
        message: 'Изделието е създадено'
      });
    } catch (error) {
      res.status(404).json({
        message: 'Изделието не можа да се създаде'
      });
    }
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
    try {
      res.status(200).json({
        message: 'Изделието беше променено'
      });
    } catch (error) {
      res.status(404).json({
        message: `Изделието не съществува`
      });
    }
  } else if (method === DELETE) {
    const { productId } = req.query;
    if (productId) {
      await executeDbCall(() => ProductConstraint.deleteOne({ productId: productId }));
      try {
        res.status(200).json({
          message: 'Изделието е изтрито'
        });
      } catch (error) {
        res.status(404).json({
          message: `Изделието не съществува`
        });
      }
    }
  }
}
