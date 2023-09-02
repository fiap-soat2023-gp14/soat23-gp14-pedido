import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ValidationException } from 'src/infrastructure/exceptions/ValidationException';
import { ValueObject } from './ValueObject';

class ValueProps {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  value: string;
}

export class CPF extends ValueObject<ValueProps> {
  public readonly value: string;

  private constructor(props: ValueProps) {
    super(props);
    this.value = props.value;
  }

  public static async create(value: string): Promise<CPF> {
    const cpfValue = value.replace(/[^\d]+/g, '');
    const valueProps = { value: cpfValue };
    return new CPF(valueProps);
  }
  public async validate(): Promise<void> {
    if (
      this.value.length !== 11 ||
      !Array.from(this.value).filter((e) => e !== this.value[0]).length
    ) {
      throw new ValidationException('Invalid CPF');
    }
    const values = this.value.split('').map((el) => +el);
    const rest = (count) =>
      ((values
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    if (!(rest(10) === values[9] && rest(11) === values[10])) {
      throw new ValidationException('Invalid CPF');
    }
  }
}
