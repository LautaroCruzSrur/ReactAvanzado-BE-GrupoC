import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/product.controllers";
import {check} from "express-validator";
import validarJWT from "../helpers/validar-jwt";

const router = Router();



router
  .route("/productos")
  .get(listarProductos)
  .post(
    [validarJWT,
       check("nombreProducto", "El nombre del producto es obligatorio")
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("El producto debe tener entre 2 y 50 caracteres"),
      check("precio", "El precio del producto es obligatorio")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser numerico")
        .custom((value) => {
          if (value >= 1 && value <= 50000) {
            return true;
          } else {
            throw new Error("El precio debe estar entre 1 y  50000");
          }
        }),
      check("imagen")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("Debe enviar una URL valida"),
        check("descripcionProducto", "La descripción del producto es obligatoria")
        .notEmpty()
        .isLength({ min: 10, max: 300 })
        .withMessage("La descripción debe tener entre 10 y 300 caracteres"),
      check("categoria")
        .isIn(["Cervezas", "Comidas", "Tragos"])
        .withMessage("La categoria debe ser valida"),
      check("quantity")
        .isNumeric()
        .withMessage("La cantidad debe ser valida"),
    ],
    crearProducto
  );

router
router
.route("/productos/:id")
.get(obtenerProducto)
.put(validarJWT,editarProducto)
.delete(validarJWT, borrarProducto);

export default router;
