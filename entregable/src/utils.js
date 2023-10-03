import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const productsFilePath = join(__dirname, "./files/productos.json");
export const cartsFilePath = join(__dirname, "./files/carts.json");