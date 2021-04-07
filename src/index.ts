import {Plugin} from 'vite'
import * as path from 'path'
import {StorybookVitePluginOptions} from "./types";
import {generateManagerIframe, generateManagerJs} from "./manager";
import {generatePreviewIframe, generatePreviewJs} from "./preview";
import {guessFramework} from "./utils/guess-framework";

export default (options: Partial<StorybookVitePluginOptions>): Plugin => {
    const STORYBOOK_PATH = '/' + (options.base || '/_storybook').replace('//', '/');
    const STORYBOOK_SCRIPT_PATH = STORYBOOK_PATH + '/manager.js'
    const STORYBOOK_PREVIEW_PATH = STORYBOOK_PATH + '/iframe.html'
    const STORYBOOK_PREVIEW_SCRIPT_PATH = STORYBOOK_PATH + '/preview.js'

    let framework: string = options.framework ? '@storybook/' + options.framework : null

    let stories = [].concat(options.stories)

    return {
        name: 'storybook-vite-plugin',
        configureServer(app) {
            app.middlewares.use((req, res, next) => {
                const path = req.url.replace(/\/?(\?.+)?$/, '')

                const generator = {
                    [STORYBOOK_PATH]: () => generateManagerIframe(STORYBOOK_PATH),
                    [STORYBOOK_PREVIEW_PATH]: () => generatePreviewIframe(STORYBOOK_PREVIEW_PATH)
                }[path]

                if (!generator) {
                    return next()
                }

                return generator()
                    .then(html => {
                        return app.transformIndexHtml(req.url, html)
                    }).then(html => {
                        res.write(html)
                        res.end()
                    }).catch(err => {
                        console.error(err)
                        res.write('ERROR: ' + err.message)
                        res.end()
                    })
            })
        },
        config(config) {
            if (!config.optimizeDeps) {
                config.optimizeDeps = {}
            }
            if (!config.optimizeDeps.include) {
                config.optimizeDeps.include = []
            }

            if (!framework) framework = guessFramework(config)

            config.optimizeDeps.include.push(...[
                'regenerator-runtime',
                'react',
                '@storybook/client-api',
                '@storybook/ui',
                '@storybook/core-client/dist/esm/manager/provider.js',
                framework
            ])
        },
        configResolved(config) {
            stories = stories.map(story => path.resolve(config.root, story))
        },
        resolveId(source: string) {
            return [STORYBOOK_SCRIPT_PATH, STORYBOOK_PREVIEW_SCRIPT_PATH].includes(source) ? source : undefined
        },
        async load(id: string, ssr?: boolean) {
            if (id === STORYBOOK_SCRIPT_PATH) {
                return generateManagerJs()
            }
            if (id === STORYBOOK_PREVIEW_SCRIPT_PATH) {
                return generatePreviewJs({ stories, framework })
            }
        }
    };
}
