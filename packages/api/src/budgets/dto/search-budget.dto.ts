import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class SearchBudgetDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1999)
  @Max(9999)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  @Transform(({ value }) => parseInt(value))
  month: number;
}
