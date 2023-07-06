let { people } = require("../data");

// Get people handler
const getPeople = (req, res) => {
  try {
    if (people.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Found people data!", data: people });
    } else {
      return res.status(404).json({
        success: false,
        message: "No people data found!",
        data: people,
      });
    }
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

// Get single person handler
const getSinglePerson = (req, res) => {
  try {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
      return res.status(404).json({
        success: false,
        message:
          "This person does not exist! Verify the person's id is correct.",
        data: req.params,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Found this person!", data: person });
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    res.status(404).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

// Add person handler
const addPerson = (req, res) => {
  try {
    if (req.body.name) {
      // In the assignment instructions, using 'id: people.length' without the '+ 1' causes there to be two objects with an id of '5' since the first index starts at an id of '0'. So, I added '+ 1' to make the new person have an id of '6'.
      people.push({ id: people.length + 1, name: req.body.name });
      return res.status(201).json({
        success: true,
        message: "Person name created!",
        data: { name: req.body.name },
      });
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a name or verify your req.body data is accurate!",
        data: req.body,
      });
    }
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

// Update person handler
const updatePerson = (req, res) => {
  try {
    const person = people.find(
      (person) => person.id === parseInt(req.params.id)
    );

    if (!person) {
      return res.status(404).json({
        success: false,
        message:
          "This person does not exist! Verify the person's id is correct.",
        data: req.params,
      });
    }

    const newPeople = people.map((person) => {
      if (person.id === Number(req.params.id)) {
        person.name = req.body.name;
      }
      return person;
    });
    return res.status(200).json({
      success: true,
      message: `Updated the person with an id of ${req.params.id}!`,
      data: newPeople,
    });
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

// Delete person handler
const deletePerson = (req, res) => {
  try {
    const person = people.find(
      (person) => person.id === parseInt(req.params.id)
    );

    if (!person) {
      return res.status(404).json({
        success: false,
        message:
          "This person does not exist! Verify the person's id is correct.",
        data: req.params,
      });
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    );
    return res.status(200).json({
      success: true,
      message: `Removed the person with an id of ${req.params.id}!`,
      data: newPeople,
    });
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

module.exports = {
  getPeople,
  addPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
};
