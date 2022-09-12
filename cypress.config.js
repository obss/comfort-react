const { defineConfig } = require('cypress');

module.exports = defineConfig({
    video: false,

    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
});
