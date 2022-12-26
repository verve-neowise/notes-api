import express from 'express'
import cors from 'cors'
import { saveState, loadState, state, Note } from './data'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/sign', (req, res) => {
    const { code } = req.body

    res.json({
        isCorrect: code == '54392'
    })
})


app.get('/notes/:id', (req, res) => {
    res.json({
        message: 'Note by id ' + req.params.id,
        note: state.notes.find(note => note.id == +req.params.id)
    })
})

app.get('/notes', (req, res) => {
    res.json({
        message: 'All Notes',
        notes: state.notes
    })
})


app.post('/notes', (req, res) => {
    const { image, name, text, likes, comments } = req.body

    const newNote: Note = {
        id: state.lastId++,
        name,
        image,
        text,
        likes,
        comments
    }
    
    state.notes.push(newNote)

    saveState()

    res.json({
        message: "Note added"
    })
})


app.put('/notes/:id', (req, res) => {
    
    const id = +req.params.id
    const { image, name, text, likes, comments } = req.body

    const newNote: Note = {
        id,
        name,
        image,
        text,
        likes,
        comments
    }
    
    state.notes = state.notes.map(note => note.id == id ? newNote : note)

    saveState()

    res.json({
        message: "Note updated"
    })
})

app.delete('/notes/:id', (req, res) => {
    const id = +req.params.id

    state.notes = state.notes.filter(note => note.id != id)

    res.json({
        message: "Note deleted."
    })

    saveState()
})

app.listen(1416, () => console.log('Running...'))

loadState()
