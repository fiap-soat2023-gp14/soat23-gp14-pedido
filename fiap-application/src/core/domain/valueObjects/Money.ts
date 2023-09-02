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
  currency: string;
}
export class Money extends ValueObject<ValueProps> {
  public readonly value: number;
  public readonly currency: string = 'BRL';

  private constructor(props: ValueProps) {
    super(props);
    this.value = props.value;
  }

  public static async create(value: number): Promise<Money> {
    const valueProps = { value: value, currency: 'BRL' };

    return new Money(valueProps);
  }

  public async validate() {
    const requiredErrors = await validate(this.props);
    if (requiredErrors.length > 0) {
      throw new ValidationException(requiredErrors);
    } else if (this.value <= 0) {
      throw new ValidationException('The price needs to be greater than 0');
    }
  }
}
