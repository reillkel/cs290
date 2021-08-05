// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/users_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set('useCreateIndex', true);

/**
 * Define the schema
 */
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model("User", userSchema);

/**
 * Create a user
 * @param {String} name
 * @param {Number} age
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createUser = async (name, age, email, phoneNumber) => {
    // Call the constructor to create an instance of the model class User
    const user = new User({ name: name, age: age, email: email, phoneNumber: phoneNumber });
    // Call save to persist this object as a document in MongoDB
    return user.save();
}

/**
 * Retrieve users based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findUsers = async (filter, projection, limit) => {
    const query = User.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Replace the name, age, email, or phoneNumber properties of the user id with the value provided
 * @param {String} _id 
 * @param {String} name
 * @param {Number} age
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceUser = async (_id, name, age, email, phoneNumber) => {
    const result = await User.replaceOne({ _id: _id },
        { name: name, age: age, email: email, phoneNumber: phoneNumber });
    return result.nModified;
}


/**
 * Delete the user with provided name, age, email, phoneNumber, or id value
 * @param {String} name
 * @param {Number} age
 * @param {String} email
 * @param {Number} phoneNumber
 * @param {String} _id 
 * 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteByValue = async (name, age, email, phoneNumber, _id) => {
    const result = await User.deleteMany({ name: name, age: age, email: email, phoneNumber: phoneNumber, _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { createUser, findUsers, replaceUser, deleteByValue };