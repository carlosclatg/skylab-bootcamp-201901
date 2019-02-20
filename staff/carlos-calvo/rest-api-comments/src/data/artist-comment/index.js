const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, 'artist-comments.json')
const artistComment = {

    add(comment){ 
        
        comment.id= uuid()
        return new Promise((resolve,reject)=>
            fs.readFile(file, 'utf8',((err,data) =>{
                if(err) return reject(err)
                data=JSON.parse(data)
                data.push(comment)
                dataJS = JSON.stringify(data)
                fs.writeFile(file, dataJS, err => {
                    if (err) return reject(err) 
                    resolve(true)
                })
                
            }))   
            
        )
    },
    retrieve(id) { //Param: Comment.id, returns the comment object
        
        return new Promise((resolve, reject) =>
            fs.readFile(file,'utf8',((err, data) =>{
                data=JSON.parse(data) 
                data = data.filter(comment => comment.id == id)
                if(err) return reject(err)
                resolve(data[0])
            }))
        )
    },

    update(newComment){ //Overrides a comment
        return new Promise ((resolve,reject)=>
            fs.readFile(file, 'utf8',((err,data) => {
                data = JSON.parse(data)
                objectToReplace = data.find(comment => comment.id === newComment.id)
                if(err) return reject(err)
                Object.assign(objectToReplace, newComment)
                dataJSON = JSON.stringify(data)
                fs.writeFile(file, dataJSON, err => {
                    if (err)  return reject(err) 
                    resolve() 
                })
            }))
        )
        

    },

    delete(id){ //Deletes a comment, param comment.id
        return new Promise ((resolve,reject) =>
            fs.readFile(file, 'utf8',((err,data) => {
                data = JSON.parse(data)
                let index = data.findIndex(comment => comment.id === id)
                data.splice(index, 1)
                if(err) return reject(err)
                let dataJSON = JSON.stringify(data)
                fs.writeFile(file, dataJSON, err => {
                    if (err) return reject(err) 
                    resolve(true) 
                })
            }))
        )
    },

    find(criteria){
        return new Promise ((resolve,reject) =>
            fs.readFile(file, 'utf8',((err,data) => {
                if(err) return reject(err)
                data = JSON.parse(data)
                let filtered = data.filter(comment => {
                    for (const key in criteria){
                        if (comment[key] !== criteria[key]) return false
                    }
                    return true
                })
                filtered.forEach(comment => comment.date = new Date(comment.date))
                return resolve(filtered)
            }))
        )
    }
}

module.exports = artistComment
