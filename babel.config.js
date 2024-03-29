module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    plugins: ['@babel/plugin-syntax-import-assertions'],
};
