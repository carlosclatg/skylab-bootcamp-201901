const uuid = require('uuid/v4')
const fs = require('fs').promises
const path = require('path')


const artistComment = {
    add(comment){ 
        comment.id= uuid()
        const file = path.join(__dirname, 'artist-comments.json')
        fs.readFile(file, 'utf8')
        .then(data =>{
            data=JSON.parse(data)
            data.push(comment)
            dataJS = JSON.stringify(data)
            fs.writeFile(file, dataJS, err => {
                if (err) throw err
                return 
            })
        })    
    },

    retrieve(id){ //Param: Comment.id, returns the comment object
        const file = path.join(__dirname, 'artist-comments.json')
        return fs.readFile(file, 'utf8')
        .then((data) => {
            data.filter(comment => comment.id = id)
            return data
        })
    },

    update(newComment){ //Overrides a comment
        const file = path.join(__dirname, 'artist-comments.json')
        return fs.readFile(file, 'utf8')
        .then((data) => {
            data = JSON.parse(data)
            objectToReplace = data.find(comment => comment.id = newComment.id)
            console.log(objectToReplace)
            Object.assign(objectToReplace, newComment)
            console.log(data)
            return fs.writeFile(file, data, err => {
                if (err) throw err
                return true
            })
        })
    },
    
    delete(id){ //Deletes a comment, param comment.id
        const file = path.join(__dirname, 'artist-comments.json')
        return fs.readFile(file, 'utf8')
        .then((data) => {
            data = JSON.parse(data)
            objectToReplace = data.find(comment => comment.id = newComment.id)
            console.log(objectToReplace)
            Object.assign(objectToReplace, newComment)
    },

    find(){ //PAL FINAL

    }
}

module.exports = artistComment;
