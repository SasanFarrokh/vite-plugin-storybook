const reactRefresh = require('@vitejs/plugin-react-refresh');
const { storybookPlugin } = require('./storybook-plugin');

module.exports = {
    define: {
        process: {
            env: {}
        }
    },
    resolve: {
        alias: {
            __STORYBOOK_FRAMEWORK__: '@storybook/react'
        }
    },
    plugins: [storybookPlugin({ base: 'storybook', framework: 'react' }), reactRefresh()]
};
