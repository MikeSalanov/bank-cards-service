import { Module } from '@nestjs/common';
import { BankCardsModule } from './modules/bank-cards/bank-cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Migrations1716247939647 as CreateTablesOfCards } from './migrations/1716247939647-migrations';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BankCardsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT') || 5433,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        migrations: [CreateTablesOfCards],
        entities: [
          path.resolve(
            __dirname,
            './modules/bank-cards/entities/*.entity{.js,.ts}',
          ),
        ],
        logging: 'all',
        autoLoadEntities: true,
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
