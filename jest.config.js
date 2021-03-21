export default {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
};