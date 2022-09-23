import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	testEnvironment: 'jest-environment-jsdom',
	verbose: true,
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss|svg)$': '<rootDir>/src/__mocks__/style-mocks.ts',
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
		'^@molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
		'^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
		'^@slices/(.*)$': '<rootDir>/src/store/slices/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
	},
	resetMocks: false,
};
export default config;
