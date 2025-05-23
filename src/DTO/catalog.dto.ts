import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "./product.dto";

export class CatalogDto {
  @ApiProperty({ example: 1, description: "Unique identifier of the catalog" })
  id: number;

  @ApiProperty({ example: "Electronics", description: "Name of the catalog" })
  name: string;

  @ApiProperty({
    type: () => [ProductDto],
    description: "List of products in this catalog",
    required: false,
  })
  products?: ProductDto[];
}
