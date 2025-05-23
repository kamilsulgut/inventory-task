import { ApiProperty } from "@nestjs/swagger";
import { Catalog } from "src/catalogs/catalog.entity";

export class CreateProductDto {
  @ApiProperty({ example: "iPhone 16", description: "Name of the product" })
  name: string;

  @ApiProperty({ example: 3499.99, description: "Price of the product" })
  price: number;

  @ApiProperty({
    type: [Catalog],
    description: "List of catalog IDs the product belongs to",
    example: [
      {
        id: 1,
        name: "Electronics",
        products: [],
      },
    ],
  })
  catalogs: Catalog[];
}
