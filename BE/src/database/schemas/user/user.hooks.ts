export function apply_PreHooks(schema: any) {
    schema.pre('save', function (next) {
      console.log('Pre-hook: before saving');
      next();
    });
  

    // Middleware cho tất cả các hàm find [thực thi theo thứ tự: trên --> dưới]
    schema.pre('find', function () {
      console.log('---------------MongoDb Pre Hooks------------------');
    });
    schema.pre('find', function () {
      console.log('Pre 1');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Pre 3');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Pre 2');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Pre 4');
    });
    
  }

export function apply_PostHooks(schema: any) {
    schema.pre('save', function (next) {
      console.log('Pre-hook: before saving');
      next();
    });
  

    // Middleware cho tất cả các hàm find [thực thi theo thứ tự: trên --> dưới]
    schema.pre('find', function () {
      console.log('---------------MongoDb Post Hooks------------------');
    });
    schema.pre('find', function () {
      console.log('Post 1');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Post 3');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Post 2');
      console.log('.\n')
    });
    schema.pre('find', function () {
      console.log('Post 4');
    });
  }