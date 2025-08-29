const calculadora = require('../src/calculadora.js');

describe("Testa as funções da calculadora.js", function(){

test("Soma inteiro com inteiro da inteiro?", function(){
    expect(calculadora.soma).toBeDefined();
    expect(calculadora.soma(2,2)).toBe(4);
    expect(calculadora.soma(2,0)).toBe(2);
    expect(calculadora.soma(2,-3)).toBe(-1);
    expect(calculadora.soma(2,-2)).toBe(0);
    expect(calculadora.soma(-2,-2)).toBe(-4);
});

test("Multiplica inteiro com inteiro da inteiro?", function(){
    expect(calculadora.multiplicacao).toBeDefined();
    expect(calculadora.multiplicacao(2,2)).toBe(4);
    expect(calculadora.multiplicacao(2,0)).toBe(0);
    expect(calculadora.multiplicacao(2,-1)).toBe(-2);
    expect(calculadora.multiplicacao(-2,-1)).toBe(2);
});

test("Não pode dividir por ZERO", function(){
    expect(calculadora.divisao).toBeDefined();
    expect(() => calculadora.divisao(2,0)).toThrow("Divisão por zero!");
});

test("Inteiro dividido por inteiro da um resultado", function(){
    expect(calculadora.divisao).toBeDefined();
    expect(calculadora.divisao(1,1)).toBe(1);
    expect(calculadora.divisao(-1,-1)).toBe(1);
    expect(calculadora.divisao(1,2)).toBe(0.5);
    expect(calculadora.divisao(1,-2)).toBe(-0.5);
    expect(calculadora.divisao(0,1)).toBe(0);
});
})