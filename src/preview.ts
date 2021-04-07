import * as fs from 'fs'
import * as path from 'path'
import * as glob from "glob";
import dedent from "dedent";

let template: string

export async function generatePreviewIframe(base: string) {
    if (!template) {
        template = (await fs.promises.readFile(path.resolve(__dirname, '../templates/preview.template.html'))).toString()
    }

    return template.replace('__STORYBOOK_SCRIPT_PATH__', base + '/preview.js')
}

export async function generatePreviewJs({ stories, framework }: { stories: string[], framework: string }): Promise<string> {
    const storyPaths = stories.reduce((carry, pattern) => {
        return carry.concat(glob.sync(pattern))
    }, [])


    return dedent`
    import { addDecorator, addParameters, addLoader, addArgTypesEnhancer } from '@storybook/client-api';
    import { configure } from '${framework}';
    ${storyPaths.map((s, i) => `import * as story_${i} from '${s}'`).join(';\n')}
    
    if (import.meta.hot) {
      import.meta.hot.accept();    
    }
    
    configure(() => [${storyPaths.map((el, i) => `story_${i}`).join(', ')}], { hot: import.meta.hot }, false);
    `
}
