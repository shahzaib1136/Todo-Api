var { mongoose } = require('../server/db/mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        // required: true
    },
    completed: {
        type: Boolean,
        // default:false
    },
    completedAt: {
        type: Number,
        required:true
    }
})

module.exports = {
    Todo
}

// var newTodo = new Todo({
//     text: "first text from Todo",
// });

// newTodo.save().then((doc) => {
//     console.log('Save todo', JSON.stringify(doc,undefined,2));
// }).catch((err) => {
//     console.log('Unable to Save Todo', err);
// })
