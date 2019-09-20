var { mongoose } = require('../server/db/mongoose');

var User = mongoose.model('User', {
    Emaail: {
        type: String,
        // required: true
    },
})

module.exports = {
    User
}