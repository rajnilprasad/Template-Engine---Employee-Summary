const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// first function that runs when app is started

const teamMembers = [];

const generateHTML = () => {
    fs.writeFileSync(outputPath, render(teamMembers));
}

const createIntern = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "what is your Interns name?",
                name: "internName"
            },
            {
                 type: "input",
                 message: "what is your Interns id?",
                 name: "internId"
             },
             {
                 type: "input",
                 message: "what is your Interns email?",
                 name: "internEmail"
             },
             {
                 type: "input",
                 message: "what is your Interns school number?",
                 name: "internSchool"
             },
        ]
    ).then(({ internName, internId, internEmail, internSchool }) => {
 
     //    create our manager object
        const intern = new Intern(internName, internId, internEmail, internSchool);
 
     //  push our manager to array 
     teamMembers.push(intern);
 
     // create the rest of the team
     createTeam();
    })

}

const createEngineer = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "what is Engineer name?",
                name: "engineerName"
            },
            {
                 type: "input",
                 message: "what is your Engineer id?",
                 name: "engineerId"
             },
             {
                 type: "input",
                 message: "what is your Engineer email?",
                 name: "engineerEmail"
             },
             {
                 type: "input",
                 message: "what is your Engineer github?",
                 name: "engineerGitHub"
             },
        ]
    ).then(({ engineerName, engineerId, engineerEmail, engineerGitHub }) => {
 
     //    create our manager object
        const engineer = new Engineer(engineerName, engineerId, engineerEmail, engineerGitHub);
 
     //  push our manager to array 
     teamMembers.push(engineer);
 
     // create the rest of the team
     createTeam();
    })

}
const createTeam = () => {
    inquirer.prompt(
        [
            {
                type: "list",
                choices: ["Engineer", "inter", "Done"],
                message: "Which team would you like to add?",
                namw: "userChoice"
            }
        ]
    ).then(({ userChoice }) => {

        switch(userChoice){
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                generateHTML();
        }
    })
}

const createManager = () =>{
   inquirer.prompt(
       [
           {
               type: "input",
               message: "what is your managers name?",
               name: "managerName"
           },
           {
                type: "input",
                message: "what is your managers id?",
                name: "managerId"
            },
            {
                type: "input",
                message: "what is your managers email?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "what is your managers office number?",
                name: "managerOfficeNumber"
            },
       ]
   ).then((managerName,managerId, managerEmail, managerOfficeNumber) => {

    //    create our manager object
       const manager = new Manager(managerName,managerId, managerEmail, managerOfficeNumber);

    //  push our manager to array 
    teamMembers.push(manager);

    // create the rest of the team
    createTeam();
   })
}


const doInit = () =>{
    createManager();
}


doInit();