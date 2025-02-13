import { mapState, mapActions} from "vuex";
import sStock from "@/services/sStock";

export const groupedProducts = {
  data() {
    return {
      transacciones: [],
      groupedProducts: [],
      totalCostPriceSum: 0,
      totalSalesSum: 0,
      totalNetEarnings: 0,
    };
  },
  computed: {...mapState(["products"])},
  async created() {
    await this.fetchTransacciones();
    this.groupProducts();
  },
  methods: {
  ...mapActions(["fetchProducts"]),
  async fetchTransacciones() {
    try {
      const res = await sStock.getAll();
      this.transacciones = res.data.transacciones;
      this.groupProducts();
    } catch (error) {
      console.error("Error al cargar transacciones:", error);
      this.transacciones = [];
    }
  },
  getProductDescription(id) {
    const product = this.products.find(prod => prod.id === id);
    return product ? product.nombreProducto : '';
  },
  groupProducts(transacciones = null) {
  const productMap = {};
  let saleSum = 0;
  let earnSum = 0; //ganancias netas
  let totalStockCostSum = 0;

  const transToProcess = transacciones || this.transacciones;

  transToProcess.forEach(trans => {
    trans.detalles.forEach(detalle => {
      const key = detalle.idProduct;
      if (!productMap[key]) {
        const productDescription = this.getProductDescription(key);

        productMap[key] = {
          idProduct: key,
          totalCompraQuantity: 0,  
          totalSaleQuantity: 0,   
          totalCompraPrice: 0,       // Precio total de compras
          totalSalePrice: 0,        // Precio total de ventas
          description: productDescription,
          stock: 0,
          ingresos: [] //para luego calcular el ppc
        };
      }

      if (trans.tipo === 'ingreso') {
        productMap[key].totalCompraQuantity += parseFloat(detalle.cantidad);
        // Sumar solo si es una compra
        const compraTotal = parseFloat(detalle.precio * detalle.cantidad);
        productMap[key].totalCompraPrice += compraTotal;
        productMap[key].stock += parseFloat(detalle.cantidad);

        productMap[key].ingresos.push({ precio: detalle.precio, cantidad: detalle.cantidad });
      } else if (trans.tipo === 'venta') {
        const saleQuantity = parseFloat(detalle.cantidad);
        const totalSale = parseFloat(detalle.precio * saleQuantity);
        productMap[key].totalSaleQuantity += saleQuantity;
        productMap[key].totalSalePrice += totalSale;
        saleSum += totalSale;
        productMap[key].stock -= saleQuantity;
      }
    })
  });

  Object.values(productMap).forEach(prod => {
    const ultimosIngresos = prod.ingresos.reverse().slice(0, 3); // Tomar los últimos 3

    let totalCompraUlt = 0;
    let cantidadUlt = 0;

    ultimosIngresos.forEach(ingreso => {
      totalCompraUlt += ingreso.precio * ingreso.cantidad;
      cantidadUlt += ingreso.cantidad;
    });

    const ppc = cantidadUlt > 0 ? totalCompraUlt / cantidadUlt : 0;

    prod.ppc = ppc;

    totalStockCostSum += prod.stock * ppc; //mercaderia total en stock precio costo

    if (prod.totalSaleQuantity > 0) {
      // Calcular el costo promedio solo de las unidades vendidas
      const costoPromedioUnitario = prod.totalCompraPrice / prod.totalCompraQuantity;
      const costoTotalVendidos = costoPromedioUnitario * prod.totalSaleQuantity;
      const gananciaPorProducto = prod.totalSalePrice - costoTotalVendidos;
      earnSum += gananciaPorProducto;
    }
  });

  this.groupedProducts = Object.values(productMap).map((trans) => ({
    idProduct: trans.idProduct, 
    totalCompraQuantity: trans.totalCompraQuantity,
    totalSaleQuantity: trans.totalSaleQuantity,
    stock: trans.stock,
    averagePrice: trans.ppc,
    description: trans.description,
  }));  
    this.totalCostPriceSum = totalStockCostSum;
    this.totalSalesSum = saleSum;
    this.totalNetEarnings = earnSum;
  },
  }
}