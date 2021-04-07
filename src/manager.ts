import dedent from 'dedent';
import * as fs from 'fs'
import * as glob from 'glob'
import * as path from "path";

export async function generateManagerJs(): string {

    return dedent`
       import regeneratorRuntime from 'regenerator-runtime';
       import * as React from 'react';
       import renderStorybookUI from '@storybook/ui';
       import ReactProvider from '@storybook/core-client/dist/esm/manager/provider.js';

       const roolEl = document.getElementById('root');
       renderStorybookUI(roolEl, new ReactProvider());  
    `
}

let template: string;
export async function generateManagerIframe(base: string) {
    if (!template) {
        template = (await fs.promises.readFile(path.resolve(__dirname, '../templates/manager.template.html'))).toString()
    }

    return template
        .replace('__STORYBOOK_SCRIPT_PATH__', base + '/manager.js')
        .replace('__IFRAME_PATH__', base + '/iframe.html')
}
