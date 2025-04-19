const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid eemail address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

// complie User model from UserSchema
const User = mongoose.model("User", UserSchema);

async function createUsers(name, email, password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    hashed_password: hashedPassword,
  });
  await user.save();
  console.log("New user :" + name + "Email: " + email);
}

async function listUsers() {
  let users = await User.find({}, { name: 1, email: 1, _id: 0 });
  console.log(users);
}

async function updateUsers(name, newname) {
  const user = await User.updateOne(
    { name: name },
    { $set: { name: newname } }
  );
  console.log("Update user :" + name + "to: " + newname);
}

async function deleteUsers() {
  const user = await User.deleteMany({});
  console.log("Delete all users ");
}

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/").then(() => {
    console.log("Mongodb Connected!");
  });
  await deleteUsers();
  await createUsers("Jill Anne", "JillAnne@gmail.com", "password@1234");
  await createUsers("Bruno", "B123@gmail.com", "password@1234");
  await listUsers();
  await updateUsers("Bruno", "Brian Brown");
  await listUsers();
};

module.exports = connectDB;
