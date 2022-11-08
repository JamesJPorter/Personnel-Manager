const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


//Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'staff_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

  function mainMenu(){
    const home = [
        {
            type: 'list', 
            name: 'Menu', 
            message: 'What would you like to do?', 
            choices: [
                'View All Employees', 
                'Add Employee', 
                'Update Employee Role', 
                'View All Roles', 
                'View All Departments', 
                'Add Department'
            ]
        }
    ]
    inquirer.prompt(home).then((data) => {
        console.log('data', data)
        const userAction = data.Menu;
        console.log('userAction', userAction)
        if (userAction === 'View All Employees'){
            console.log('View All Employees selected')
            viewAllEmployees()
        } else if (userAction === 'Add Employee') {
            console.log('Add Employee selected')
            addEmployee();
        } else if (userAction === 'Update Employee Role'){
            console.log('Update Employee role selected')
            updateEmployeeRole();
        } else if (userAction === 'View All Roles'){
            console.log('View All Roles selected')
            viewAllRoles();
        } else if (userAction === 'View All Departments'){
            console.log('View All Departments selected')
            viewAllDepartments();
        } else if (userAction === 'Add Department'){
            console.log('Add Department selected')
            AddDepartment();
        } else {
            mainMenu();
        }
    })
  };

  function viewAllEmployees(){
    db.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function viewAllDepartments(){
    db.query('SELECT * FROM department', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function viewAllRoles(){
    db.query('SELECT * FROM role', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function addEmployee(){
    const newEmployee = [
        {
            type: 'input', 
            name: 'first_name', 
            message: 'Enter employees first name',
        }, 
        {
            type: 'input', 
            name: 'last_name', 
            message: 'Enter employees last name',
        }, 
        {
            type: 'input', 
            name: 'role_id', 
            message: 'Enter employees role ID',
        },
        {
            type: 'input', 
            name: 'manager_id', 
            message: `Enter the employees managers' ID`,
        },
    ]
    inquirer.prompt(newEmployee).then((data) => {
        console.log(cTable.getTable(data))
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${data.first_name}", "${data.last_name}", "${data.role_id}", "${data.manager_id}");`)
        viewAllEmployees();
    })
  }

  function AddDepartment(){
    const newDepartment = [
        {
            type: 'input', 
            name: 'dept_name', 
            message: 'Enter new department name:',
        }
    ]
    inquirer.prompt(newDepartment).then((data) => {
        console.log(cTable.getTable(data))
        db.query(`INSERT INTO department(dept_name) VALUES("${data.dept_name}");`)
        viewAllDepartments();
    })
}

// function updateRole(){
// db.promise().query
// }



// function getEmployeeListPromise () {
//     return new Promise((resolve, reject) => {
//     let employees = db.query("SELECT * FROM employee", function(err, results){
//         if (err) throw err; 
//         console.log('Success!', results)
//         return results;
//     })
//     if (employees) {
//         resolve(conosle.log(employees))
//     } else {
//         reject('Failed')
//     }
// })}

function updateEmployee(){
    let employees = db.promise().query('SELECT * FROM employee').then(([rows]) => rows.map(row => ({name: `${row.first_name} ${row.last_name}`, value: row.id})))
    console.log(employees)
}

updateEmployee()

// getEmployeeListPromise().then((employees) => {
//     const chooseUpdate = [
//         {
//             type: 'list', 
//             name: 'choose_employee', 
//             message: 'Choose employee record to update', 
//             choices: [
//                 `${employees.forEach(employee => chooseUpdate.choices.push(employee.first_name, employee.last_name, employee.id))}`
//             ]
//         }, 
//         {
//             type: 'input', 
//             name: 'first_name', 
//             message: 'Change employees first name:'
//         },
//         {
//             type: 'input', 
//             name: 'last_name', 
//             message: 'Change employees last name:'
//         },
//         {
//             type: 'input', 
//             name: 'role_id', 
//             message: 'Change employees role ID:'
//         },
//         {
//             type: 'input', 
//             name: 'manager_id', 
//             message: `Change employees manager's ID:`
//         }
        
//     ]
//     inquirer.prompt(chooseUpdate).then((data) => {
//         console.log(data)
//         let userSelection = data;
//         return userSelection
//     })
//     .then((userSelection) => {
//         db.query(`UPDATE employee SET first_name = "${userSelection.first_name}", last_name = "${userSelection.last_name}", role_id = "${userSelection.role_id}", manager_id = "${userSelection.manager_id}" WHERE id = ${employees.id}`)
//     }) 
// })


  function init(){
    mainMenu()
  }


  init();