const { defineConfig } = require('cypress');

module.exports = defineConfig({
    video: false,

    component: {
        devServer: {
            framework: 'vite',
            bundler: 'vite',
        },
    },
});
