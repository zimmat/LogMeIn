var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    //getting
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        //using
        bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            // res == false
            console.log(res);
        });
        //console.log(hash);
    });
});
