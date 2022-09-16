const text = 'Hola mundo';
const fruits = ['pera', 'manzana', 'fresa', 'banana'];

test('Debe contener texto', () => {
	expect(text).toMatch(/mundo/);
});
test('Existe banana?', () => {
	expect(fruits).toContain('banana');
});

test('Mayor que', () => {
	expect(10).toBeGreaterThan(8);
});

test('es Verdadero', () => {
	expect(true).toBeTruthy();
});

export {};
