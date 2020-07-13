
// USER MODULES
// User modules are written in Javascript and executed by NodeJS
// All valid NodeJS modules are valid user modules
// Public functions should be exported
// Default Location of User modules: AppFolder/modules
// Location of user modules can be specified in the config.js file.
// "user_modules_folder": "projects/modules"


module.exports = {
    FunctionName1: function (param) {
        return (param * 5);
    },

    FunctionName2: function (param1, param2) {
        return (param1 * 5 + param2);
    }
};

module.exports.FunctionName3 = function (param) {
    return (param * 6);
}

