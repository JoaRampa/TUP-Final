import { computed } from 'vue';
import { sales, products } from '@/server';
/**
 * Agrupa las ventas por producto con benefit, cantidad y total de ventas
 * @param {Function} transform - función opcional para transformar el resultado final
 * @returns {import('vue').ComputedRef<any[]>}
 */
export function useGroupedSales(transform) {
  return computed(() => {
    const map = new Map();

    for (const item of sales.value) {
      const name = item.id_product;

      if (!map.has(name)) {
        const product = products.value.find(p => p.id === name);
        map.set(name, {
          id_product: product ? product.name : name,
          singleBenefit: 0,
          totalBenefit: 0,
          q_sold: 0,
          total_sales: 0,
        });
      }

      const entry = map.get(name);
      entry.singleBenefit += (item.sale_price - item.cost_price);
      entry.q_sold += item.quantity;
      entry.totalBenefit += (item.sale_price - item.cost_price) * entry.q_sold;
      entry.total_sales += 1;
    }

    const result = Array.from(map.values());
    return transform ? transform(result) : result;
  });
}