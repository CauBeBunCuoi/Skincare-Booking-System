import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
//** SetMetadata() sẽ set thêm metadata vào "reflection metadata" của handler (hàm api) hoặc class, hoặc biến (nơi decorator được sử dụng)  

//** ExecutionContext là một lớp cung cấp các phương thức để truy xuất thông tin liên quan đến request, handler, và class hiện tại
//** ExecutionContext có thể truy xuất metadata thông qua: 
//          + getHandler(): lấy thông tin handler (hàm api) hiện tại (bao gồm cả metadata của nó)
//          + getClass(): lấy thông tin class hiện tại (bao gồm cả metadata của nó)

//** Reflector là một class cung cấp các phương thức để truy xuất metadata từ handler, class, hoặc biến
//** Reflector có thể truy xuất metadata thông qua:
//          + getAllAndOverride(metadata_Key: string, metadata: any[]): lấy tất cả metadata có key tương ứng là metadataKey từ mảng metadata[] 
//            --> metadata: any[] có thể là metadata của handler, class, hoặc biến => có thể tận dụng getHandler() và getClass() để lấy metadata của handler và class
//            [LƯU Ý]: vì getHandler() và getClass() không chỉ trả về mỗi metadata nên getAllAndOverride() có thể lấy value có trùng tên key mà value đó không phải là metadata của handler hoặc class => nên đặt tên key metadata sao cho chuẩn và không trùng
//            [VÍ DỤ]: getAllAndOverride( KEY , [context.getHandler(), context.getClass()]) 