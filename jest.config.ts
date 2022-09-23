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
	},
	resetMocks: false,
};
export default config;
