const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Inquirer Questions

var countQuestion = [
    {
        type: "input",
        name: "employeeCount",
        message: "how many employees worked on the project?",
        validate: (input) => {return !isNaN(input)}
    }
]

var employeeInfoQuestions = [
    {
        type: "input",
        name: "name",
        message: "Employee Name: "
    },
    {
        type: "list",
        name: "type",
        message: "Employee Type: ",
        choices: ["Engineer","Manager","Intern"]
    },
    {
        type: "input",
        name: "email",
        message: "Employee Email: "
    }
]

var engineerQuestions = [
    {
        type:"input",
        name:"github",
        message:"Github Username: "
    }
]

var managerQuestions = [
    {
        type:"input",
        name:"office",
        message:"Office Number: "
    }
]

var internQuestions = [
    {
        type:"input",
        name:"school",
        message:"School or Place of Education: "
    }
]

//Global Variables

const employees = [];

//Main Function

async function main() {

    let {employeeCount} = await inquirer.prompt(countQuestion);

    for (let i = 0; i < employeeCount; i++) {

        console.log(`Enter Info for Employee ${i}: `)

        const {name,type,email} = await inquirer.prompt(employeeInfoQuestions);
        let newEmployee;

        switch (type.toLowerCase()) {    

            case "engineer":
                const {github} = await inquirer.prompt(engineerQuestions);
                newEmployee = new Engineer(name,i,email,github);
                break;

            case "manager":
                const {office} = await inquirer.prompt(managerQuestions);
                newEmployee = new Manager(name,i,email,office);
                break;

            case "intern":
                const {school} = await inquirer.prompt(internQuestions);
                newEmployee = new Intern(name,i,email,school);
                break;

            default:
                console.log("this message should not appear")
                break;
        }
        employees.push(newEmployee);
    }



    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    const html = render(employees);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.
    
    console.log("Writing file...")
    fs.writeFileSync(outputPath,html);
    console.log("file has been Written!")
}

main();

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!