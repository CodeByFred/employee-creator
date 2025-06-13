# Employee Creator – Backend

The backend is a Spring Boot application that manages employee data, roles, departments, and contracts. It exposes a REST API that communicates with the frontend of the Employee Creator. The backend supports full CRUD functionally on an Employee.

---

## Tech Stack

- Java 21
- Spring Boot 3.5
- Spring Data JPA
- MySQL
- Maven
- Hibernate
- Java Faker (for optional DB seeding)

---

## Project Structure

```
src/
└── main/
    └── java/
        └── io/
            └── nology/
                └── employeecreator/
                    ├── config/
                    │   └── CorsConfig.java
                    ├── contract/
                    │   ├── Contract.java
                    │   ├── ContractController.java
                    │   ├── ContractEmploymentType.java
                    │   ├── ContractRepository.java
                    │   ├── ContractService.java
                    │   ├── ContractType.java
                    │   └── CreateContractDTO.java
                    ├── department/
                    │   ├── Department.java
                    │   ├── DepartmentController.java
                    │   ├── DepartmentRepository.java
                    │   ├── DepartmentService.java
                    │   └── DepartmentType.java
                    ├── employee/
                    │   ├── CreateEmployeeDTO.java
                    │   ├── Employee.java
                    │   ├── EmployeeController.java
                    │   ├── EmployeeRepository.java
                    │   ├── EmployeeService.java
                    │   └── UpdateEmployeeDTO.java
                    ├── role/
                    │   ├── Role.java
                    │   ├── RoleController.java
                    │   ├── RoleRepository.java
                    │   ├── RoleService.java
                    │   └── RoleType.java
                    └── EmployeeCreatorApplication.java
resources/
├── static/
├── templates/
└── application.properties
test/
target/
```

---

## API Endpoints Overview

| Resource    | Method | Endpoint                         | Description                        |
| ----------- | ------ | -------------------------------- | ---------------------------------- |
| Employees   | GET    | `/employees`                     | Get all employees                  |
|             | GET    | `/employees/{id}`                | Get employee by ID                 |
|             | POST   | `/employees`                     | Create new employee                |
|             | PATCH  | `/employees/{id}`                | Update employee                    |
|             | PUT    | `/employees/{id}/toggleIsActive` | Toggle active status (soft delete) |
|             | DELETE | `/employees/{id}`                | Delete employee (hard delete)      |
| Contracts   | GET    | `/contracts`                     | Get all contracts                  |
|             | POST   | `/contracts`                     | Create contract (employee linked)  |
| Roles       | GET    | `/roles`                         | Get all roles                      |
| Departments | GET    | `/departments`                   | Get all departments                |
|             | GET    | `/departments/{id}`              | Get all departments                |

---

## Running Locally

### Prerequisites

- Java 21
- Maven
- MySQL server

### 1. Clone the repository

```bash
git clone https://github.com/CodeByFred/employee-creator.git
```

### 2. Configure `application.properties`

Either create a `.env` file or update `src/main/resources/application.properties`:

```properties
spring.application.name=employee-creator
spring.datasource.url=jdbc:mysql://localhost:3306/company
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.properties.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
logging.file.name=logs/app.log
logging.level.io.nology=DEBUG
logging.level.root=WARN
```

### 3. Run the application

```bash
./mvnw spring-boot:run
```

---

## Seeding the Database

It runs automatically on startup **only if the `company` database does not exist**.

---

## Error Handling

Errors are currently thrown as a ResponseStatusException with the revelant status code.

---

## Security Considerations

No authentication is currently implemented.

---

## Resources

![Database Diagram](https://raw.githubusercontent.com/CodeByFred/employee-creator/main/frontend/src/assets/teamTracker.png)

[Trello](https://trello.com/b/LR5yKYAj/employee-creator)

[Figma](https://www.figma.com/design/EGZSIM6wholcP1Kw93lOuH/employee-creator?node-id=0-1&p=f&t=JuQ2nBUa3C42j070-0)

[Color Palette](https://coolors.co/1f3a93-4fc1e9-dcdedf-e74c3c-2c3e50)

---
