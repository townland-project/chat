import fs from 'fs'
import path from 'path'

function CreateTagName(name: string): string {
    const split = name.split('')
    for (const i in split) {
        if (split[i].match('[A-Z]')) {            
            split[i] = `-${split[i]}`
        }
    }
    return split.join('')
}

function CreateComponentName(name: string): string {
    const split = name.split('')
    split[0] = split[0].toUpperCase()
    for (const index in split) {
        const i: number = parseInt(index)
        if (split[i] == '-') {
            split[i] = ''
            if (split[i + 1])
                split[i + 1] = split[i + 1].toUpperCase()
        }
    }
    return split.join('')
}

function GetProjectPath(dir: string): string {
    const files = fs.readdirSync(dir)
    if (files.includes('package.json')) return dir
    else return GetProjectPath(path.join(dir, '..'))
}

export function GenerateComponent(prefix: string, name: string): void {
    const html = `<p><span>${name}</span> component is working!</p>`
    const style = `p {
    font-family:  Tahoma, Geneva, Verdana, sans-serif;
    
    span {
        font-weight: bold;
    }
}`
    const ts = `import { Component } from '@townland-project/dom'
    
@Component({
    id: '${prefix}-${CreateTagName(name)}',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class ${CreateComponentName(name)}Component {}
    `    
    const component_path = path.join(GetProjectPath(__dirname), 'src', 'components', CreateTagName(name))

    if (fs.existsSync(component_path)) {
        return console.error(`Component with name '${name}' exists.`)
    }

    fs.mkdirSync(component_path)
    fs.writeFileSync(path.join(component_path, 'component.htmlx'), html)
    fs.writeFileSync(path.join(component_path, 'component.scssx'), style)
    fs.writeFileSync(path.join(component_path, 'index.ts'), ts)

    console.log(`Component with name '${name}' created successfully.`);
}