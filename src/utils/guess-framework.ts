import { UserConfig } from "vite";
import * as path from 'path'
import * as fs from 'fs'
import { satisfies } from 'semver'

export function guessFramework(config: UserConfig) {
    const frameworks = ['vue', 'react']

    let frameworkPath = null
    let foundFramework = frameworks.find(f => {
        try {
            frameworkPath = require.resolve(f)
            return true
        } catch (err) {
            return false
        }
    })

    if (!foundFramework) {
        throw new Error('Framework cannot be automatically detected, please specify in your plugin options like this: { framework: "react" }')
    }

    if (foundFramework === 'vue') {
        const packageJSON = JSON.parse(fs.readFileSync(path.resolve(frameworkPath, '../package.json')).toString())
        const isVue3 = satisfies(packageJSON.version, '>=3')
        if (isVue3) {
            foundFramework = 'vue3'
        }
    }

    console.info('Framework automatically detected: ' + foundFramework)

    return '@storybook/' + foundFramework
}
