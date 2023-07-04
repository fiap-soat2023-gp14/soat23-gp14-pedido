import { ValidationException } from "src/infrastructure/exceptions/ValidationException";
import { ValueObject } from "./ValueObject";
import { IsNotEmpty, IsString, Length, validate } from "class-validator";

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

  public static async isValidCPF(value: string): Promise<CPF> {
    const valueProps = { value: value };
    let cpfValue = value.replace(/[^\d]+/g, '');

    if (cpfValue.length !== 11 || !Array.from(cpfValue).filter(e => e !== cpfValue[0]).length) {
      throw new ValidationException('Invalid CPF');
    }
    const values = cpfValue.split('').map(el => +el);
    const rest = (count) => (values.slice(0, count - 12).reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

    if (rest(10) === values[9] && rest(11) === values[10]) {
      return new CPF(valueProps)
    } else {
      throw new ValidationException('Invalid CPF');
    }
  }
} 