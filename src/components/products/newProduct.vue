<template>
  <div class="module">
    <div class="container">
      <h2 class="title">Nuevo Producto</h2>
        <input ref="nombreProductoInput" v-model="currentProduct.nombreProducto" type="text" id="nombreProducto" 
          placeholder="Nombre del Producto" @input="removeErrorBorder('nombreProductoInput')"/>
        <input ref="precioRefInput" v-model="currentProduct.precioRef" type="text" id="precioRef" 
          placeholder="Precio clientes" @input="removeErrorBorder('precioRefInput')"/>
        <input v-model="currentProduct.precioMayorista" type="text" id="precioMayorista" placeholder="Precio Mayoristas"/>
        <input v-model="currentProduct.prodCod" type="text" id="cod" placeholder="Codigo"/>
        <button type="button" @click="addProduct">Agregar Producto</button>
    </div>
    <div class="container">
      <form @submit.prevent="handleProduct" class="id-input" id="form-product">
        <h2 class="title">Productos Agregados</h2>
        <ul>
          <li class="li" v-for="(product, index) in selectedProducts" :key="index">
            {{ product.nombreProducto }} - Precio clientes: {{ product.precioRef }} - 
            Precio mayorista: {{ product.precioMayorista }} - Codigo: {{ product.prodCod }}
            <span class="close" @click="removeProduct(index)">&times;</span>
          </li>
        </ul>
      <button type="submit" id="submit-id"><strong>Cargar Productos</strong></button>
     </form>
    </div>
  </div>
  <div class="container">
    <h2 class="title">Agregar/Actualizar Productos y precios desde excel </h2>
    <input type="file" @change="handleFileUpload" accept=".xls,.xlsx" style="background-color: var(--button-color);"/>
  </div>
  <cmLoader v-if="isLoading" :msg="msg || 'Producto/s cargados!'"></cmLoader>
</template>

<script>
import sProduct from "@/services/sProduct";
import * as XLSX from "xlsx";
import cmLoader from "../cmLoader.vue"

export default {
  components: {cmLoader},
  data() {
    return {
      currentProduct: { nombreProducto: "", precioRef: "", precioMayorista: "", prodCod: "" },
      isLoading2: false,
      productos: [],
      selectedProducts: [],
      isLoading: false,
      msg: null
    };
  },
  methods: {
    addProduct() {
      if(this.currentProduct.nombreProducto !== "" && this.currentProduct.precioRef !== "" ){
        const product = {
          nombreProducto: this.currentProduct.nombreProducto,
          precioRef: this.currentProduct.precioRef,
          precioMayorista: this.currentProduct.precioMayorista,
          prodCod: this.currentProduct.prodCod
        };
        this.selectedProducts.push(product);
        console.log(this.selectedProducts)
        this.currentProduct = { nombreProducto: "", precioRef: "", precioMayorista: "", prodCod: ""  }; 
      } else { if (this.currentProduct.nombreProducto === "") {
        this.$refs.nombreProductoInput.classList.add('error-border');
        this.$refs.nombreProductoInput.focus();
      } else if (this.currentProduct.precioRef === "") {
        this.$refs.precioRefInput.classList.add('error-border');
        this.$refs.precioRefInput.focus();
      }}
    },
    removeProduct(index) {
      this.selectedProducts.splice(index, 1);
    },
    removeErrorBorder(refName) {
      this.$refs[refName].classList.remove('error-border');
    },
    async handleProduct() {
      try {
        if (this.selectedProducts.length === 0) {
          this.$refs.nombreProductoInput.focus();
          return;
        }
        const res = await sProduct.getAll();
        const productos = res.data.products;

        const nombresExistentes = productos.map(p => p.nombreProducto.trim().toUpperCase());
        this.isLoading = true;
        for (const product of this.selectedProducts) {
         const nombreProducto = product.nombreProducto.trim().toUpperCase();
          if (nombresExistentes.includes(nombreProducto)) {
            alert(`El producto "${product.nombreProducto}" ya existe en la base de datos. Por favor, edite el producto existente.`);
            continue; // Saltar al siguiente producto
          }   

          const response = await sProduct.add({
            nombreProducto: product.nombreProducto.toUpperCase(),
            precioRef: product.precioRef,
            precioMayorista: product.precioMayorista,
            prodCod: product.prodCod
          });
          console.log("Respuesta del servidor:", response.data);
          this.$store.dispatch("fetchProducts");
        }
      } catch (error) {
        this.msg = "Error al Agregar el Producto";
        console.error("Error al agregar producto:", error);
      } finally {
        this.selectedProducts = [];     
        setTimeout(() => {
          this.isLoading = false;
        }, 5000);
      }
    }, 
    handleFileUpload(event) {
      this.isLoading = true;
      const file = event.target.files[0];
      if (!file) {
        alert("Por favor selecciona un archivo.");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Mapear filas para obtener idProduct y precioRef
        this.productos = rows.map((row) => ({
          nombreProducto: row[0].toUpperCase(), // Primera columna (Nombre del producto)
          precioRef: row[1] || "", // Segunda columna (Precio de referencia clientes)
          precioMayorista: row[2] || "",
          prodCod: row[3] || "",
        }));
        await this.uploadProducts();
      };

      reader.readAsArrayBuffer(file);
    },
    async uploadProducts() {
      try {
        const productosExistentes = await sProduct.getAll();
        const productos = productosExistentes.data.products;

        for (const producto of this.productos) {
          const nombreProducto = producto.nombreProducto.trim().toUpperCase();
          const productoExistente = productos.find(p => p.nombreProducto.trim().toUpperCase() === nombreProducto);

          if (productoExistente) {
            // Editar el producto existente
            productoExistente.precioRef = producto.precioRef;
            productoExistente.precioMayorista = producto.precioMayorista;
            productoExistente.prodCod = producto.prodCod;

            await sProduct.edit(productoExistente);
            //console.log(`Producto actualizado: ${producto.nombreProducto}`);
          }else {
            // Agregar un nuevo producto
            await sProduct.add(producto);
          }
        }
      } catch (error) {
        console.error("Error al procesar productos:", error);
        this.msg = "Error al cargar";
      } finally {      
        setTimeout(() => {
          this.isLoading = false;
        }, 10000);}
    },
  },
};
</script>