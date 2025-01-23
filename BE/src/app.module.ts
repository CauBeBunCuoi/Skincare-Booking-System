import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppMigration } from './app.migration';
import { databaseFeatures } from './database/database.feature';
import { AccountModule } from './modules/account/Account.module';
import { ServiceModule } from './modules/service/Service.module';
import { BookingModule } from './modules/booking/Booking.module';
import { QuizModule } from './modules/quiz/Quiz.module';


@Module({
  imports: [
    DatabaseModule,

    AccountModule,
    ServiceModule,
    BookingModule,
    QuizModule,

    ConfigModule.forRoot({  
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
    }),
    MongooseModule.forFeature(databaseFeatures),


  ],                                    
  controllers: [AppController],         
  providers: [                          
    AppService,
    AppMigration 
  ],
})
export class AppModule { }

