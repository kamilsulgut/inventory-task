import { ApiProperty } from "@nestjs/swagger";
import { CatalogDto } from "./catalog.dto";

export class ProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Phone" })
  name: string;

  @ApiProperty({ example: 599.99 })
  price: number;

  @ApiProperty({ example: [] })
  catalogs: CatalogDto[];
}
