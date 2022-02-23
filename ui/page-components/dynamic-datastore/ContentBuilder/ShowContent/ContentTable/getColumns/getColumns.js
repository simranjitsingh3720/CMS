export default function getColumns(tableSchema) {
  let columns = [];

  columns = tableSchema.schema.map((field) => ({
    title: field.name,
    dataIndex: field.name,
    key: field.id,
  }));

  // console.log(columns);
  return columns;
}
