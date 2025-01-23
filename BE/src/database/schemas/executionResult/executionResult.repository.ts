import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ExecutionResult, ExecutionResultModel } from "./executionResult.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class ExecutionResultRepository {
  constructor(
    @InjectModel(ExecutionResult.name) private readonly executionResultModel: ExecutionResultModel,
  ) { }

  async findById(id: any): Promise<ExecutionResult | null> {
    return this.executionResultModel.findById(id).exec();
  }

  async findAll(): Promise<ExecutionResult[]> {
    return this.executionResultModel.find().exec();
  }

  async create(executionResult: ExecutionResult): Promise<ExecutionResult> {
    return this.executionResultModel.create(executionResult);
  }
  
  async update(id: any, executionResult: ExecutionResult): Promise<ExecutionResult | null> {
    return this.executionResultModel.findByIdAndUpdate(id, executionResult, { new: true }).exec();
  }

  async delete(id: any): Promise<ExecutionResult | null> {
    return this.executionResultModel.findByIdAndDelete(id).exec();
  }
}