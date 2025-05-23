import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiProperty({ example: "iPhone 16", description: "Name of the product" })
  name: string;

  @ApiProperty({ example: 3499.99, description: "Price of the product" })
  price: number;
}
