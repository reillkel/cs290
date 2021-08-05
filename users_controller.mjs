import * as users from './users_model.mjs';
import express from 'express';
const app = express();

const PORT = 3000;

/**
 * Create a new user with a name, age, email, and phone number provided in the query parameters
 */
app.get("/create", (req, res) => {
    console.log(req.query);
    users.createUser(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

/**
 * Retrieve users. 
 * If the query parameters include a name, age, email, phoneNumber, or id then only the users for that value are returned.
 * Otherwise, all users are returned.
 */
app.get("/retrieve", (req, res) => {
    console.log(req.query);
    const filter = {}
    if (req.query.name !== undefined) {
        filter.name = req.query.name
    } else if (req.query.age !== undefined) {
        filter.age = req.query.age
    } else if (req.query.email !== undefined) {
        filter.email = req.query.email
    } else if (req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber
    } else if (req.query._id !== undefined) {
        filter._id = req.query._id
    }  
    users.findUsers(filter, '', 0)
        .then(users => {
            console.log(users)
            res.send(users);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });

});

/**
 * Update the user whose _id is provided and set its name, age, email, and phoneNumber to
 * the values provided in the query parameters
 */
app.get("/update", (req, res) => {
    console.log(req.query);
    const user = {}
    if (req.query.name !== undefined) {
        user.name = req.query.name
    } else if (req.query.age !== undefined) {
        user.age = req.query.age
    } else if (req.query.email !== undefined) {
        user.email = req.query.email
    } else if (req.query.phoneNumber !== undefined) {
        user.phoneNumber = req.query.phoneNumber
    } else if (req.query._id !== undefined) {
        user._id = req.query._id
    }  
    users.replaceUser(user, '', 0)
        .then(users => {
            console.log(users)
            res.send(users);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Not found' });
        });

});


/**
 * Delete the user(s) whose value is provided in the query parameters
 */
app.get("/delete", (req, res) => {
    console.log(req.query.name, req.query.age, req.query.email, req.query.phoneNumber, req.query.id);
    users.deleteByValue(req.query.name, req.query.age, req.query.email, req.query.phoneNumber, req.query._id)
        .then(deleteCount => {
            console.log(deleteCount);
            res.send({ deleteCount: deleteCount });
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});