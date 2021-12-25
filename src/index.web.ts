import { RenderComponent } from "@townland-project/dom"
import { MainComponent } from "."

RenderComponent(MainComponent).then(element => document.getElementById('root')?.appendChild(element))