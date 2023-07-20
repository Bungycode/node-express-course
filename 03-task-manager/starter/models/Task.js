const mongoose = require("mongoose");

// We use the Schema constructor to set up the
// structure for all the documents in our task collection.
// Once we have the structure for our data(our schema),
// We want to set up this model.
// A model is also known as a representation for
// that collection.
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must include a name!"],
    trim: true,
    maxLength: [20, "name cannot exceed 20 characters!"]
  },
  completed: {
    type: Boolean,
    default: false
  },
});

// In mongoose, a model is a wrapper for the schema.
// So, if the schema defines the structure for a document,
// like the type, validations, and etc. A mongoose model
// provides an interface to the database. So, using the model,
// we'll be able to create, update, query, and delete our documents
// with great ease since the api is extremely straightforward.
// An instance of a model is called a document.

// model() is looking for 2 things, the name and the schema.
// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased
// version of your model name. Thus, for model invocation below,
// the model 'Task' is for the 'tasks' collection in the database.
module.exports = mongoose.model("Task", TaskSchema);
// Once we are done exporting the model, we need to go to our
// controllers and start using the model.
