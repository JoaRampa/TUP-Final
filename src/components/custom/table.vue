<template>
  <div>
    <p v-if="!rows.length">No {{ title.toLowerCase() }} registered</p>
    <table v-else>
      <caption><h2>{{ title }}</h2></caption>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" :class="typeof rowClass === 'function' ? rowClass(row) : rowClass">
          <td v-for="(field, colIndex) in fields" :key="colIndex">
            <slot :name="`cell-${field}`" :row="row">
              {{ row[field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false, default: "" },
    headers: { type: Array, required: true },
    fields: { type: Array, required: true },
    rows: { type: Array, required: true },
    rowClass: {type: String, default: ""}
  }
};
</script>