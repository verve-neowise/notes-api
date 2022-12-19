import { readFileSync, writeFileSync } from 'fs'

export type Note = {
    id: number,
    image: string,
    name: string,
    text: string,
    likes: number,
    comments: number
}

export type State = { 
    lastId: number,
    notes: Note[] 
}

export let state: State = {
    lastId: 0,
    notes: []
}

export function saveState() {
    writeFileSync('./state.json', JSON.stringify(state))
}

export function loadState() {
    const text = readFileSync('./state.json').toString()
    state = JSON.parse(text) 
}