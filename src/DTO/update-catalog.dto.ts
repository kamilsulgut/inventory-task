import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatalogDto {
  @ApiProperty({ example: "Trucks", description: "Name of the Catalog" })
  name: string;
}
