import { ApiProperty } from "@nestjs/swagger";

export class ApiResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: [string];

  @ApiProperty()
  error?: string;
}
