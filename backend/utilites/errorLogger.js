/* import necessary file */

const fs = require("fs");

let errorLogger = (err, req, res, next) => {
  /* write your code here */

  /*

      1. This errorlogger method should have four params to act as error handler

      2. This should log the full stack trace of the error that is thrown

         during execution of the program

      3. If there is any error in the code the entire error should be

         appended to the ErrorLogger.txt file

      4. If error in appending the error to the Errorlogger.txt,

         it should display the message “Could not log the errors” in console

      5. If error object’s status property is set,

         then the response status should be set to error objects status value

      6. Else, the response status should be set to 500 and

         the error message should be sent as a JSON in the given format

         {“message” :<<message>>}

   */

  if (err) {
    let msg = err.stack;

    fs.appendFileSync("Errorlogger.txt", msg, (error) => {
      if (error) {
        console.log("Could not log the errors");
      }
    });

    if (err.status) {
      res.status = err.status;

      res.json({ message: err.message });
    } else {
      res.status = 500;

      res.json({ message: err.message });
    }
  }

  next();
};

/* export errorLogger object */

module.exports = errorLogger;
