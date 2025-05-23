import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Catalog } from "../catalogs/catalog.entity";
import { Product } from "../products/product.entity";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepo: Repository<Catalog>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async onModuleInit() {
    const count = await this.catalogRepo.count();
    if (count > 0) return;

    const electronics = this.catalogRepo.create({ name: "Electronics" });
    const books = this.catalogRepo.create({ name: "Books" });

    await this.catalogRepo.save([electronics, books]);

    const phone = this.productRepo.create({
      name: "Smartphone",
      price: 1200,
      catalogs: [electronics],
    });

    const book = this.productRepo.create({
      name: "Clean Code",
      price: 80,
      catalogs: [books],
    });

    await this.productRepo.save([phone, book]);
  }
}
