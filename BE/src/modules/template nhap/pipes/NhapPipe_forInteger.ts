import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NhapPipe_forInteger implements PipeTransform {

  transform(value: number, metadata: ArgumentMetadata) {

    console.log('\nPipe ForInteger value taken: ', value); // value này là  1 tham số của api
    console.log('Pipe ForInteger metadata taken: ', metadata); // metadata này là chứa dữ liệu về kiểu của value @...() value : ...
    console.log('')

    var new_integer : number = Number(value) + 1000; // phải ép kiểu về number vì dữ liệu từ query string và param mặc định là string

    return new_integer;  // trả về giá trị mới sau khi đã xử lý
  }


}
