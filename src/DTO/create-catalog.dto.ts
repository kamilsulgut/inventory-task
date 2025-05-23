import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "./product.dto";

export class CreateCatalogDto {
  @ApiProperty({ example: "Car", description: "Name of the catalog" })
  name: string;

  @ApiProperty({
    type: [ProductDto],
    description: "List of products belongs to",
    example: [],
  })
  catalogs: ProductDto[];
}
