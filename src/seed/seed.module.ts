import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedService } from "./seed.service";
import { Catalog } from "../catalogs/catalog.entity";
import { Product } from "../products/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Catalog, Product])],
  providers: [SeedService],
})
export class SeedModule {}
