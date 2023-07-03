import { ValueObject } from './ValueObject';
import { IsNotEmpty, IsNumber, validate } from 'class-validator';
import { ValidationException } from '../../../infrastructure/exceptions/ValidationException';

class ValueProps {
  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @IsNotEmpty()
  value: number;
}
export class Price extends ValueObject<ValueProps> {
  public readonly value: number;

  private constructor(props: ValueProps) {
    super(props);
    this.value = props.value;
  }

  public static async create(value: number): Promise<Price> {
    const valueProps = { value: value };
    const requiredErrors = await validate(valueProps);
    if (requiredErrors.length > 0) {
      throw new ValidationException(requiredErrors);
    } else if (value <= 0) {
      throw new ValidationException('The price needs to be greater than 0');
    } else {
      return new Price(valueProps);
    }
  }
}
