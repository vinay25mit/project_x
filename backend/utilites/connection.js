// // const { Schema } = require("mongoose");

// // const mongoose = require("mongoose");

// // const candidateSchema = Schema(
// //   {
// //     name: { type: String, required: true },

// //     email: { type: String, required: true },

// //     password: { type: String, required: true },

// //     gender: String,

// //     race: String,

// //     edaucation: String,

// //     prefrerence: {
// //       location: Array,

// //       shift: String,
// //     },

// //     reference: String,

// //     skills: Array,

// //     experience: Number,
// //   },
// //   { collection: "candidate" }
// // );

// // const employeeSchema = Schema(
// //   {
// //     company_name: { type: Number, required: true, unique: true },

// //     email: String,

// //     password: String,

// //     company_description: String,

// //     job_preferences: Array,
// //   },
// //   { collection: "employee" }
// // );

// // let collection = {};

// // const dbURL = "mongodb://localhost:27017/JobNest";

// // const connectionOptions = {
// //   useNewUrlParser: true,

// //   useUnifiedTopology: true,

// //   useCreateIndex: true,
// // };

// // collection.getAllCandiadte = async () => {
// //   try {
// //     let dbConnection = await mongoose.connect(dbURL, connectionOptions);

// //     let model = await dbConnection.model("Allocation", allocationSchema);

// //     return model;
// //   } catch (error) {
// //     let err = new Error("Could not connect to database");

// //     err.status = 500;

// //     throw err;
// //   }
// // };

// // collection.getAllEmployee = async () => {
// //   try {
// //     let dbConnection = await mongoose.connect(dbURL, connectionOptions);

// //     let model = await dbConnection.model("JobNest", allocationSchema);

// //     return model;
// //   } catch (error) {
// //     let err = new Error("Could not connect to database");

// //     err.status = 500;

// //     throw err;
// //   }
// // };

// // collection.getAll;

// // module.exports = collection;

// const mongoose = require("mongoose");

// const candidateSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     gender: String,
//     race: String,
//     education: String, // Fixed typo from `edaucation`
//     preference: {
//       location: [String], // Fixed spelling from `prefrerence`
//       shift: String,
//     },
//     reference: String,
//     skills: [String],
//     experience: Number,
//   },
//   { collection: "candidate" }
// );

// const employeeSchema = new mongoose.Schema(
//   {
//     company_name: { type: String, required: true, unique: true }, // Fixed type (String instead of Number)
//     email: String,
//     password: String,
//     company_description: String,
//     job_preferences: [String],
//   },
//   { collection: "employee" }
// );

// const dbURL = "mongodb://127.0.0.1:27017/JobNest";

// let isConnected = false; // ✅ Track connection status

// const connectDB = async () => {
//   if (isConnected) {
//     console.log("✅ Using existing MongoDB connection");
//     return mongoose.connection;
//   }

//   try {
//     await mongoose.connect(dbURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB Connection Failed", error);
//     process.exit(1);
//   }
// };

// // ✅ Create Models Once
// const Candidate = mongoose.model("Candidate", candidateSchema);
// const Employee = mongoose.model("Employee", employeeSchema);

// const collection = {
//   connectDB,
//   getCandidateModel: () => Candidate,
//   getEmployeeModel: () => Employee,
// };

// module.exports = collection;
