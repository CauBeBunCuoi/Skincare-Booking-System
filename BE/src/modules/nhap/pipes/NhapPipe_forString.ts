import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NhapPipe_forString implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {

    console.log('\nPipe ForString value taken: ', value); // value này là  1 tham số của api
    console.log('Pipe ForString metadata taken: ', metadata); // metadata này là chứa dữ liệu về kiểu của value @...() value : ...
    console.log('')

    var name = value;

    return name.trim()+ " [đã xử lí qua Pipe ForString 1]";  // trả về giá trị mới sau khi đã xử lý
  }


}
