import vue from '@vitejs/plugin-vue'
import storybookPlugin from '../../dist/index'

export default {
    define: {
        process: {
            env: {}
        }
    },
    plugins: [
      vue(),
      storybookPlugin({
          base: '_storybook',
          // framework: 'vue3',
          stories: [
            './stories/*.stories.ts'
          ]
      })
    ]
};
