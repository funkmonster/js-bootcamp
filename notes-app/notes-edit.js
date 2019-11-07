'use strict'

const titleElement = document.querySelector('#note-title')
const lastEditedElement = document.querySelector('#last-edited')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
lastEditedElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    lastEditedElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    lastEditedElement.textContent = generateLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)
        
        if (!note) {
            location.assign('/index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
        lastEditedElement.textContent = generateLastEdited(note.updatedAt)
    }
})