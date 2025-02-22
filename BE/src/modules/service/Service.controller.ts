import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { SkinService } from './services/skin.service';
import { ServiceStep } from 'src/database/schemas/serviceStep/serviceStep.schema';
import { TypeExpressionOperator, Types } from 'mongoose';
import { ServiceType } from 'src/database/schemas/serviceType/serviceType.schema';

@Controller('services')
export class ServiceController {

  constructor(
    private readonly servicesService: ServicesService,
    private readonly skinService: SkinService,
  ) { }

  // Lấy danh sách services (bao gồm cả isDeleted = true)
  @Get("")
  async getAllServices() {
    return {
      services: await this.servicesService.getAllServices()
    }
  }

  // Thêm service type 
  @Post("service-types")
  async addServiceType(
    @Body() body: ServiceType
  ) {
    await this.servicesService.addServiceType(body);
    return { message: 'Add service type successfully' };
  }

  // Lấy danh sách loại da
  @Get("skin-types")
  async getSkinTypes() {
    return {
      skinTypes: await this.skinService.getSkinTypes()
    }
  }

  // Lấy danh sách trạng thái da
  @Get("skin-statuses")
  async getSkinStatuses() {
    return {
      skinStatuses: await this.skinService.getSkinStatuses()
    }
  }

  // Thêm service mới (bao gồm danh sách steps, sắp xếp theo step order tăng dần)
  @Post("")
  async addService(
    @Body() body: {
      description: string,
      serviceTypeId: number,
      name: string,
      duration: number,
      fee: number,
      imageBase64: string,
      steps: (ServiceStep & { imageBase64: string })[]
    }
  ) {
    await this.servicesService.addService(body);
    return { message: 'Add service successfully' };
  }

  // Lọc services theo tiêu chí (truyền vào object filter gồm mảng skinTypes và skinStatuses và service type)
  @Post("filters")
  async filterServices(
    @Body() body: {
      skinTypes: number[],
      skinStatuses: number[],
      serviceTypeId: number
    }
  ) {
    return {
      services: await this.servicesService.filterServices(body.skinTypes, body.skinStatuses, body.serviceTypeId)
    }
  }

  // Lấy service detail (bao gồm danh sách steps, skinTypes, skinStatuses, các therapist có thể thực hiện service)
  @Get(":serviceId")
  async getServiceDetail(
    @Param('serviceId') serviceId: Types.ObjectId
  ) {
    const service = await this.servicesService.getServiceDetail(serviceId);
    return {
      service: service.service,
      steps: service.steps,
      skinTypes: service.skinTypes,
      skinStatuses: service.skinStatuses,
      therapists: service.therapists
    }
  }



  // Cập nhật service (bao gồm danh sách steps mới hoàn toàn)
  @Post(":serviceId")
  async updateService(
    @Param('serviceId') serviceId: Types.ObjectId,
    @Body() body: {
      description: string,
      serviceTypeId: number,
      name: string,
      duration: number,
      fee: number,
      isDeleted: boolean,
      imageBase64: string,
      steps: (ServiceStep & { imageBase64: string })[]
    }
  ) {
    await this.servicesService.updateService(serviceId, body);
    return { message: 'Update service successfully' };
  }


  // Xóa services (xoá service + xoá steps)
  @Delete(":serviceId")
  async deleteService(
    @Param('serviceId') serviceId: Types.ObjectId
  ) {
    await this.servicesService.deleteService(serviceId);
    return { message: 'Delete service successfully' };
  }

  // Cập nhật danh sách skin type cho service
  @Post(":serviceId/skin-types")
  async updateSkinTypes(
    @Param('serviceId') serviceId: Types.ObjectId,
    @Body() body: {
      skinTypes: number[]
    }
  ) {
    await this.skinService.updateSkinTypes(serviceId, body.skinTypes);
    return { message: 'Update skin types successfully' };
  }

  // Cập nhật danh sách skin status cho service
  @Post(":serviceId/skin-statuses")
  async updateSkinStatuses(
    @Param('serviceId') serviceId: Types.ObjectId,
    @Body() body: {
      skinStatuses: number[]
    }
  ) {
    await this.skinService.updateSkinStatuses(serviceId, body.skinStatuses);
    return { message: 'Update skin statuses successfully' };
  } 


  // Xoá service type
  @Delete("service-types/:serviceTypeId")
  async deleteServiceType(
    @Param('serviceTypeId') serviceTypeId: number
  ) {
    await this.servicesService.deleteServiceType(serviceTypeId);
    return { message: 'Delete service type successfully' };
  }

}
