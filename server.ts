import express from 'express'
import cors from 'cors'
import { saveState, loadState, state, Note } from './data'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

app.listen(1416, () => console.log('Running...'))

loadState()