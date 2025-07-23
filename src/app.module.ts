import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesRatingModule } from './hero-rating/hero-rating.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    HeroesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'heroes',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HeroesRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
