import { PRODUCT_ID_PATTERN } from "@/constants/RegexConstants";
import { isBlank } from "underscore.string";

export function validateProductId(productId) {
  return PRODUCT_ID_PATTERN.test(productId);
}

export function validateProductQuantity(quantity) {
  return /^\d+$/.test(quantity);
}

export function validatePalletType(palletType) {
  return palletType || !isBlank(palletType);
}
