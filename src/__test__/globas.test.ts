const text = 'Hola mundo';

test('Debe contener texto', () => {
	expect(text).toMatch(/mundo/);
});

export {};
