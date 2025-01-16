import { join } from 'path';

export const handlebarsConfig = {
  viewsPath: join(process.cwd(), 'src/templates'), // Thư mục chứa các template
  layoutPath: join(process.cwd(), 'src/templates/layout'), // Thư mục chứa layout
  publicPath: join(process.cwd(), 'src/public'), // Thư mục chứa file tĩnh (CSS/JS)
};
