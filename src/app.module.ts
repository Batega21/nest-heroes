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
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    HeroesRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
