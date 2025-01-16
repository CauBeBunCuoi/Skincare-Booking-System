export function apply_Indexes(schema: any) {
    // schema.index({ name: 1 });
    schema.index({ sku: -1, price: -1, stock: -1 });   
    schema.index({ sku: -1});
    schema.index({ price: -1})
}