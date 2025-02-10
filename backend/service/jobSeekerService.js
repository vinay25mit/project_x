const { getModel } = require("../config/connection");
const candidateSchema = require("../schemas/jobSeeker");

let jobSeekerService = {};

jobSeekerService.getAllCandidate = async () => {
  try {
    const model = await getModel("Candidate", candidateSchema);
    return await model.find();
  } catch (error) {
    throw error;
  }
};

jobSeekerService.createProfile = async (candidateDetails) => {
    try {
      if (!candidateDetails.name || !candidateDetails.email || !candidateDetails.password) {
        throw new Error("Missing required fields: name, email, password");
      }
  
      const Candidate = getModel("Candidate", candidateSchema); // ✅ Get model without reconnecting
  
      const alreadyPresent = await Candidate.findOne({ email: candidateDetails.email });
  
      if (alreadyPresent) {
        let errOb = new Error("Email already exists");
        errOb.status = 409; // Conflict status code
        throw errOb;
      }
  
      const result = await Candidate.create(candidateDetails);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
module.exports = jobSeekerService;
