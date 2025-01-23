import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountModel } from "./account.schema";

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: AccountModel,
  ) { }

  async findById(id: any): Promise<Account | null> {
    return this.accountModel.findById(id).exec();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async create(account: Account): Promise<Account> {
    return this.accountModel.create(account);
  }

  async update(id: any, account: Account): Promise<Account | null> {
    return this.accountModel.findByIdAndUpdate(id, account, { new: true }).exec();
  }

  async delete(id: any): Promise<Account | null> {
    return this.accountModel.findByIdAndDelete(id).exec();
  }
}