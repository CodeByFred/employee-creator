package io.nology.employeecreator.data;

import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.contract.ContractEmploymentType;
import io.nology.employeecreator.contract.ContractRepository;
import io.nology.employeecreator.contract.ContractType;
import io.nology.employeecreator.department.DepartmentRepository;
import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import io.nology.employeecreator.role.Role;
import io.nology.employeecreator.role.RoleRepository;
import net.datafaker.Faker;
import net.datafaker.providers.base.TimeAndDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    private final ContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;
    private final Faker faker = new Faker();
    private final JdbcTemplate jdbcTemplate;



    DataSeeder(ContractRepository contractRepository, EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, RoleRepository roleRepository, JdbcTemplate jdbcTemplate) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args)  {
        System.out.println(" INSIDE RUN METHOD FROM DATA SEEDER");
        System.out.println("How many departments? " + departmentRepository.count());
        System.out.println("How many roles? " + roleRepository.count());
        System.out.println("How many employees? " + employeeRepository.count());
        System.out.println("How many contracts? " + contractRepository.count());



        if(departmentRepository.count() == 0) {
            jdbcTemplate.execute("""
            INSERT INTO departments (department) VALUES
              ('ENGINEERING'),
              ('DEVOPS'),
              ('QA'),
              ('IT_INFRASTRUCTURE'),
              ('PRODUCT'),
              ('DESIGN'),
              ('CUSTOMER_SUPPORT'),
              ('SALES'),
              ('HUMAN_RESOURCES');
        """);
        }

        if (roleRepository.count() == 0) {
            jdbcTemplate.execute("""
            INSERT INTO roles (role_type, department_id) VALUES
              ('SOFTWARE_ENGINEER', 1),
              ('SENIOR_SOFTWARE_ENGINEER', 1),
              ('TECH_LEAD', 1),
              ('BACKEND_DEVELOPER', 1),
              ('FRONTEND_DEVELOPER', 1),
              ('FULL_STACK_DEVELOPER', 1),
              ('PRODUCT_MANAGER', 5),
              ('ASSOCIATE_PRODUCT_MANAGER', 5),
              ('PRODUCT_OWNER', 5),
              ('UX_DESIGNER', 6),
              ('UI_DESIGNER', 6),
              ('UX_RESEARCHER', 6),
              ('QA_ENGINEER', 3),
              ('TEST_AUTOMATION_ENGINEER', 3),
              ('MANUAL_TESTER', 3),
              ('DEVOPS_ENGINEER', 2),
              ('SITE_RELIABILITY_ENGINEER', 2),
              ('SYSTEMS_ADMINISTRATOR', 4),
              ('TECH_SUPPORT_ENGINEER', 7),
              ('CUSTOMER_SUCCESS_SPECIALIST', 7),
              ('HR_MANAGER', 9),
              ('RECRUITER', 9),
              ('OFFICE_ADMINISTRATOR', 9),
              ('SALES_EXECUTIVE', 8),
              ('ACCOUNT_MANAGER', 8)
        """);
        }

        if (employeeRepository.count() == 0) {

            Set<String> emails = new HashSet<>();
            Set<String> phoneNumbers = new HashSet<>();

            for (int i = 1; i <= 100; i++) {

                String givenName = faker.name().firstName();
                String surname = faker.name().lastName();
                String email = faker.internet().emailAddress();

                String auMobile = faker.numerify("04########");

                String street = faker.address().streetAddress();
                String city = faker.australia().locations();
                String state = faker.australia().states();
                String auPostcode = String.valueOf(2000 + faker.random().nextInt(6000));

                String address = street + " " + city + " "  + state + " " + auPostcode;

                if (emails.contains(email) || phoneNumbers.contains(auMobile)) {
                    continue;
                }

//                RoleType roleType = faker.options().option(RoleType.class);

                List<Role> allRoles = roleRepository.findAll();
                Role role = allRoles.get(faker.number().numberBetween(1, allRoles.size()));

                Employee employee = new Employee();
                employee.setGivenName(givenName);
                employee.setSurname(surname);
                employee.setEmail(email);
                employee.setPhone(auMobile);
                employee.setAddress(address);
                employee.setRole(role);

                ContractType contractType = faker.options().option(ContractType.class);


//                LocalDate startDate = faker.date().between(Date.from(LocalDate.of(2010, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant()), new Date()).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//                LocalDate finishDate = faker.date().between(Date.from(LocalDate.of(2010, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant()), new Date()).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                TimeAndDate timeAndDate = faker.timeAndDate();

                // Step 1: Generate a start date up to 30 days in the future
                Date startDateRaw = Date.from(timeAndDate.future(30, TimeUnit.DAYS));
                LocalDate startDate = startDateRaw.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                // Step 2: Add 3–12 months for end date
                int monthsToAdd = faker.number().numberBetween(3, 13);
                LocalDate endDate = startDate.plusMonths(monthsToAdd);



                ContractEmploymentType employmentType = faker.options().option(ContractEmploymentType.class);
                Integer hours = faker.number().numberBetween(1, 38);


                Contract contract = new Contract();
                contract.setContractType(contractType);
                contract.setStartDate(startDate);
                contract.setFinishDate(endDate);
                contract.setContractEmploymentType(employmentType);
                contract.setHoursPerWeek(hours);
                contract.setEmployee(employee);

                emails.add(email);
                phoneNumbers.add(auMobile);
                this.employeeRepository.save(employee);
                this.contractRepository.save(contract);
            }
        }
    }
}
