import { Catalog } from "src/catalogs/catalog.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @ManyToMany(() => Catalog, (catalog) => catalog.products)
  catalogs: Catalog[];
}
