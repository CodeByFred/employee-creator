[Frontend README](./frontend/README.md)

# Employee Creator – Full Stack Application

Employee Creator is a full-stack web application designed to manage employee data, departments, roles, and contracts. The two layers support full CRUD operations and provide a modular, maintainable architecture.

- The **backend** is a Spring Boot application that exposes a RESTful API and handles business logic, validation, and data persistence.

---

## Backend Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [To Run Locally](#to-run-locally)
- [Database Seeding](#database-seeding)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [Resources](#resources)

---

## Features

- Modular service structure per feature
- DTO separation for request/response logic
- Global exception handling with meaningful JSON responses
- CORS config for frontend/backend integration
- Database seeding with semi-realistic data using DataFaker
- Application logging (via SLF4J) for tracking requests, errors, and system behavior

---

## Tech Stack

#### Backend

- Java 21
- Spring Boot 3.5
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Lombok
- Slf4j
- DataFaker (optional DB seeding)

#### Dev Tools

- IntelliJ Ultimate
- Postman
- GitKraken
- Git Bash

---

## Project Structure

```
src/
└── main/
├── java/
│ └── io/
│ └── nology/
│ └── employeecreator/
│ ├── config/
│ │ └── CorsConfig.java
│ ├── contract/
│ │ ├── Contract.java
│ │ ├── ContractController.java
│ │ ├── ContractEmploymentType.java
│ │ ├── ContractRepository.java
│ │ ├── ContractService.java
│ │ ├── ContractType.java
│ │ └── CreateContractDTO.java
│ ├── department/
│ │ ├── Department.java
│ │ ├── DepartmentController.java
│ │ ├── DepartmentRepository.java
│ │ ├── DepartmentService.java
│ │ └── DepartmentType.java
│ ├── employee/
│ │ ├── CreateEmployeeDTO.java
│ │ ├── Employee.java
│ │ ├── EmployeeController.java
│ │ ├── EmployeeRepository.java
│ │ ├── EmployeeService.java
│ │ └── UpdateEmployeeDTO.java
│ ├── exceptions/
│ │ ├── GlobalExceptionHandler.java
│ │ ├── NotFoundException.java
│ │ ├── ServiceValidationException.java
│ │ ├── UpdateFailureException.java
│ │ └── ValidationErrors.java
│ ├── role/
│ │ ├── Role.java
│ │ ├── RoleController.java
│ │ ├── RoleRepository.java
│ │ ├── RoleService.java
│ │ └── RoleType.java
│ └── EmployeeCreatorApplication.java
└── resources/
├── static/
├── templates/
└── application.properties
test/
target/
```

---

## API Endpoints

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

## To Run Locally

### Prerequisites

- Java 21
- Maven
- MySQL server

#### 1. Clone the repository

```
git clone https://github.com/CodeByFred/employee-creator.git
```

#### 2. Configure `application.properties`

Either create a `.env` file or use `src/main/resources/application.properties` default settings:

```properties
spring.application.name=employee-creator
spring.datasource.url=jdbc:mysql://localhost:3306/teamtracker
spring.datasource.username=<YOUR DB USERNAME>
spring.datasource.password=<YOUR DB PASSWORD>
spring.jpa.properties.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# only for development
logging.file.name=logs/app.log
logging.level.io.nology=DEBUG
logging.level.root=WARN
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update
spring.profiles.active=dev
spring.sql.init.mode=always
```

#### 3. Run the application

```
./mvnw spring-boot:run
```

---

## Database Seeding

Runs automatically on startup **ONLY if the `teamtracker` database exists in your MySQL AND the database is unseeded**.

---

## Error Handling

The backend uses a centralized exception handling approach via a `@ControllerAdvice` class (`GlobalExceptionHandler`). Instead of directly throwing `ResponseStatusException`, the application defines custom exceptions to handle specific error cases cleanly and consistently.

#### Custom Exceptions

- `NotFoundException`: Thrown when a requested resource (e.g. employee, department) is not found.
- `ServiceValidationException`: Used to encapsulate multiple validation errors in a request.
- `UpdateFailureException`: Indicates a failure when trying to update an existing resource.
- `ValidationErrors`: A helper class used to structure and return multiple field-level validation messages.

#### Exception Mapping

All exceptions are caught and translated into appropriate HTTP responses:

- `NotFoundException` -> `404 NOT FOUND`
- `ServiceValidationException` -> `400 BAD REQUEST` with structured validation errors
- `UpdateFailureException` -> `400 BAD REQUEST`

---

## Testing

- Unit testing _(planned)_
- Integration testing _(planned)_

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
