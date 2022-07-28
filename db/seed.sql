INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jerry', 'Smith', 2, null),
('Rick', 'Sanchez', 3, 2),
('Sarah', 'Green', 6, 3),
('Bob', 'Loblaw', 8, null),
('John', 'Smith', 4, null),
('Jane', 'Doe', 7, 4),
('Don', 'Draper', 1, 1),
('Leslie', 'Leslieson', 5, null);
