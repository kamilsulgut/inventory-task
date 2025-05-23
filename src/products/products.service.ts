import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { Catalog } from "src/catalogs/catalog.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Catalog) private catalogRepo: Repository<Catalog>
  ) {}

  async create(name: string, price: number, catalogs: Catalog[]) {
    const product = this.productRepo.create({
      name,
      price,
      catalogs: catalogs,
    });
    return this.productRepo.save(product);
  }
  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ["catalogs"] });
  }

  findAll() {
    return this.productRepo.find({ relations: ["catalogs"] });
  }

  async update(id: number, name: string, price: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException("Product not found!");
    product.name = name;
    product.price = price;
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException("Product not found!");

    return this.productRepo.remove(product);
  }

  async assignToCatalog(productId: number, catalogId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ["catalogs"],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found!`);
    }

    const catalog = await this.catalogRepo.findOneBy({ id: catalogId });

    if (!catalog) {
      throw new NotFoundException(`Catalog with id ${catalogId} not found!`);
    }

    const isAlreadyAssigned = product.catalogs.some((c) => c.id === catalogId);

    if (isAlreadyAssigned) {
      throw new ConflictException(
        `Catalog (id: ${catalog.id}) is already assigned to product (id: ${product.id})`
      );
    }

    product.catalogs.push(catalog);
    return this.productRepo.save(product);
  }

  async removeFromCatalog(productId: number, catalogId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ["catalogs"],
    });

    if (!product) {
      throw new NotFoundException("Product not found!");
    }

    const initialLength = product.catalogs.length;

    product.catalogs = product.catalogs.filter((c) => c.id !== catalogId);

    if (product.catalogs.length === initialLength) {
      throw new NotFoundException(
        `Catalog with id ${catalogId} is not assigned to product ${productId}`
      );
    }

    return this.productRepo.save(product);
  }

  async findProductsInCatalog(catalogId: number) {
    const catalog = await this.catalogRepo.findOne({
      where: { id: catalogId },
      relations: ["products"],
    });
    if (!catalog) throw new NotFoundException("Catalog not found!");
    return catalog.products;
  }
}
