import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Catalog } from "./catalog.entity";
import { Repository } from "typeorm";

@Injectable()
export class CatalogsService {
  constructor(@InjectRepository(Catalog) private repo: Repository<Catalog>) {}

  findAll() {
    return this.repo.find({ relations: ["products"] });
  }

  async findOne(id: number) {
    const catalog = await this.repo.findOneBy({ id });
    if (!catalog) throw new NotFoundException("Catalog not found!");
    return catalog;
  }

  create(name: string) {
    const catalog = this.repo.create({ name });
    return this.repo.save(catalog);
  }

  async update(id: number, name: string) {
    const catalog = await this.repo.findOneBy({ id });
    if (!catalog) throw new NotFoundException("Catalog not found!");

    catalog.name = name;
    return this.repo.save(catalog);
  }
  async remove(id: number) {
    const catalog = await this.repo.findOneBy({ id });
    if (!catalog) throw new NotFoundException("Catalog not found!");
    return this.repo.remove(catalog);
  }
}
