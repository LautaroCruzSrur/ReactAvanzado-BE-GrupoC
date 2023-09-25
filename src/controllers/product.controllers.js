import Product from "../models/products";


export const listarProductos = async (req, res) => {
    try {
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
  
      res.status(404).json({
        mensaje: "Error al buscar los productos",
      });
    }
  };
  export const obtenerProducto = async (req, res) => {
    try {
      console.log(req.params.id);
      const productoBuscado = await Product.findById(req.params.id);
  
      res.status(200).json(productoBuscado);
    } catch (error) {
      console.error(error);
  
      res.status(404).json({
        mensaje: "Error al buscar un producto",
      });
    }
  };
  
  export const crearProducto = async (req, res) => {
    try {
      const productoNuevo = new Product(req.body);
  
      await productoNuevo.save();
      res.status(201).json({
        mensaje: "El producto fue creado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        mensaje: "Error al intentar agregar un nuevo producto",
      });
    }
  };
  
  export const editarProducto = async (req, res) => {
    try {
      
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        mensaje: "El producto fue editado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        mensaje: "Error al intentar editar un producto",
      });
    }
  };
  export const borrarProducto = async (req, res) => {
    try {
      Product.findByIdAndDelete(req.params.id, (err, producto) => {
        if (err || producto === null) {
          console.log(err);
          return res
            .status(404)
            .json({ mensaje: "No se pudo eliminar el producto" });
        }
        console.log(producto);
        res.status(200).json({
          mensaje: "El producto fue eliminado correctamente",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        mensaje: "Error al intentar borrar un producto",
      });
    }
  };
  