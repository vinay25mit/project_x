const connection = require("../config/connection");

const employerService = {};

employerService.createProfile = async (employerDetails) => {
  try {
    const model = await connection.getEmployerDbModel();

    const allreadyPresent = await model.findOne({
      email: "$employerDetails.email",
    });

    if (allreadyPresent) {
      const errObj = new Error(`Email Allready Exits`);

      errObj.status = 500;

      throw errObj;
    }

    const result = await model.create(employerDetails);

    if (result) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

employerService.addJob = async (jobDetails) => {
  try {
    console.log("Inside the service of add job");

    const model = await connection.getJobDbModel();

    const response = await model.create(jobDetails);

    console.log("job created");

    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

employerService.getJobs = async () => {
  try {
    const model = await connection.getJobDbModel();

    const response = await model.find();

    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
