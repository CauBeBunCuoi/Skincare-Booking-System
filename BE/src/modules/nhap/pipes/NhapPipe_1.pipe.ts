import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NhapPipe_1 implements PipeTransform {

  /**
   * Hàm này xử lý logic chính của Pipe.
   * @param value - Dữ liệu nhận được từ request.
   * @param metadata - Thông tin metadata về tham số. ví dụ: type( body, query, param, ... ) nguồn gốc dữ liệu trong @Body, @Query, @Param, @Headers, @Request, ...
   *                                                         metatype( string, number, object, ... ) kiểu dữ liệu của tham số. vd @Body() body : string => metatype = string
   */
  transform(value: any, metadata: ArgumentMetadata) {




    console.log('\nPipe NHAP 1 value taken: ', value); // value này là  1 tham số của api
    console.log('Pipe NHAP 1 metadata taken: ', metadata); // metadata này là chứa dữ liệu về kiểu của value @...() value : ...
    console.log('')

    if (metadata.type === 'body') {

      var name = value.name;
      if (!name || typeof name !== 'string') {
        return 'name is required ! [đã xử lí qua Pipe NHAP 1]';
      }
      return name.trim() + " [đã xử lí qua Pipe NHAP 1]";  // trả về giá trị mới sau khi đã xử lý

    } else if (metadata.type === 'param') {

      var id = value;
      return id.trim() + " [đã xử lí qua Pipe NHAP 1]";  // trả về giá trị mới sau khi đã xử lý

    }
  }


}
