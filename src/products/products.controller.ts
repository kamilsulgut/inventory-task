import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Catalog } from "src/catalogs/catalog.entity";
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateProductDto } from "src/DTO/create-product.dto";
import { UpdateProductDto } from "src/DTO/update-product.dto";
import { ProductDto } from "src/DTO/product.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: "Product created successfully",
    type: ProductDto,
  })
  create(@Body() body: CreateProductDto) {
    return this.service.create(body.name, body.price, body.catalogs);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Returns the product with given ID",
    type: ProductDto,
  })
  getOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "Returns list of products",
    type: [ProductDto],
  })
  getAll() {
    return this.service.findAll();
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update product by ID",
    description: "You can update name and price",
  })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: "Returns list of products",
  })
  update(
    @Param("id") id: number,
    @Body() body: { name: string; price: number }
  ) {
    return this.service.update(+id, body.name, body.price);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({
    summary: "Delete product by ID",
    description: "You can delete product by ID",
  })
  @ApiResponse({
    status: 204,
    description: "Successfully deleted",
  })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }

  @Post(":productId/assign/:catalogId")
  @ApiOperation({
    summary: "Assign product to catalog by ID",
    description: "You can assign catalogs to product",
  })
  @ApiResponse({
    status: 200,
    description: "Response give changed product",
    type: ProductDto,
  })
  @ApiConflictResponse({
    description: "Product is already assigned to this catalog",
  })
  @ApiNotFoundResponse({ description: "Product or catalog not found" })
  assign(
    @Param("productId") productId: number,
    @Param("catalogId") catalogId: number
  ) {
    return this.service.assignToCatalog(+productId, +catalogId);
  }

  @Delete(":productId/remove/:catalogId")
  @HttpCode(204)
  @ApiOperation({
    summary: "Remove product from catalog by ID's",
    description: "You can delete catalog from product",
  })
  @ApiResponse({
    status: 204,
    description: "Response give changed product",
  })
  removeFromCatalog(
    @Param("productId") productId: number,
    @Param("catalogId") catalogId: number
  ) {
    return this.service.removeFromCatalog(+productId, +catalogId);
  }

  @Get("/catalog/:catalogId")
  @ApiOperation({
    summary: "Get all product with catalog ID",
    description:
      "The ID specified must be the catalogue ID, response will return all products that are assigned to this catalogue ",
  })
  @ApiResponse({
    status: 200,
    description: "Response give products assignet to catalogue",
  })
  findByCatalogId(@Param("catalogId") catalogId: number) {
    return this.service.findProductsInCatalog(+catalogId);
  }
}
