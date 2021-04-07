import reactRefresh from '@vitejs/plugin-react-refresh'
import storybookPlugin from '../../dist/index'

export default {
    define: {
        process: {
            env: {}
        }
    },
    plugins: [
      reactRefresh(),
      storybookPlugin({
          base: '_storybook',
          framework: 'react',
          stories: [
            './stories/*.stories.tsx'
          ]
      })
    ]
};
