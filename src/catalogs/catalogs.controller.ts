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
import { CatalogsService } from "./catalogs.service";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CatalogDto } from "src/DTO/catalog.dto";
import { CreateCatalogDto } from "src/DTO/create-catalog.dto";
import { UpdateCatalogDto } from "src/DTO/update-catalog.dto";

@ApiTags("catalogs")
@Controller("catalogs")
export class CatalogsController {
  constructor(private readonly service: CatalogsService) {}

  @Get()
  @ApiOperation({ summary: "Get all catalogs" })
  @ApiResponse({
    status: 200,
    description: "Returns a list of catalogues with associated products",
    type: [CatalogDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get catalogue by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Returns a directory with a specified ID",
    type: CatalogDto,
  })
  findOne(@Param("id") id: number) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create new catalogue" })
  @ApiBody({ type: CreateCatalogDto })
  @ApiResponse({
    status: 200,
    description: "Returns a catalogue with a specified ID",
    example: {
      id: 4,
      name: "Car",
    },
  })
  create(@Body("name") name: string) {
    return this.service.create(name);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update catalog by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateCatalogDto })
  @ApiResponse({
    status: 200,
    description: "Returns a changed catalogue",
    example: {
      id: 4,
      name: "Car",
    },
  })
  update(@Param("id") id: number, @Body("name") name: string) {
    return this.service.update(+id, name);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete catalog by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 204,
    description: "Successfully deleted",
  })
  remove(@Param("id") id: number) {
    return this.service.remove(+id);
  }
}
