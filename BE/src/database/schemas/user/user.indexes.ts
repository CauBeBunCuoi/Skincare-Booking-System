export function apply_Indexes(schema: any) {
    //** schema.index sẽ tương đương với việc khai index trong @Prop() [nên sử dụng schema.index để quản lý index thay vì @Prop()] 
    //** unique: true => field sẽ không cho phép trùng lặp giá trị
    schema.index({ name: 1 });
    schema.index({ age: 1 }, { unique: true }); 
    schema.index({ age: -1 }, { unique: false }); 
}