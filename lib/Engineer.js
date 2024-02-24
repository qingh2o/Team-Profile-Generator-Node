// Link 'Employee' parent class flie
const Employee = require("./Employee");

// Extend class for Engineer
class Engineer extends Employee {
    constructor(name,id,email,github) {
        super(name, id, email);
        this.github = github;
    };
    getGithub() {
        return this.github;
    };
    getRole() {
        return 'Engineer';
    };
};

module.exports = Engineer;