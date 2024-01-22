import CPF from '../../../../src/domain/sharedKernel/valueObjects/CPF';

describe('CPF', () => {
  test('should validate a valid CPF with only number', () => {
    const cpf = new CPF('12345678909');
    expect(cpf.validate(cpf.value)).toBe(true);
  });

  test('should validate a valid formatted CPF', () => {
    const cpf = new CPF('123.456.789-09');
    expect(cpf.validate(cpf.value)).toBe(true);
  });

  test('should throw an error for an invalid CPF', () => {
    const invalidCpfValue = '00000000000';
    const cpf = new CPF(invalidCpfValue);
    expect(() => cpf.validate(cpf.value)).toThrow('invalid CPF');
  });
});
