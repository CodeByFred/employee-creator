package io.nology.employeecreator.data;

import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.contract.ContractEmploymentType;
import io.nology.employeecreator.contract.ContractRepository;
import io.nology.employeecreator.contract.ContractType;
import io.nology.employeecreator.department.DepartmentRepository;
import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import io.nology.employeecreator.employeerole.EmployeeRole;
import io.nology.employeecreator.employeerole.EmployeeRoleRepository;
import io.nology.employeecreator.employeerole.PromotionType;
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
import java.util.*;
import java.util.concurrent.TimeUnit;

@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    private final ContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;
    private final Faker faker = new Faker();
    private final EmployeeRoleRepository employeeRoleRepository;
    private final JdbcTemplate jdbcTemplate;


    DataSeeder(ContractRepository contractRepository, EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, RoleRepository roleRepository, EmployeeRoleRepository employeeRoleRepository ,JdbcTemplate jdbcTemplate) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.employeeRoleRepository = employeeRoleRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args)  {
        System.out.println(" INSIDE RUN METHOD FROM DATA SEEDER");
        System.out.println("How many departments? " + departmentRepository.count());
        System.out.println("How many roles? " + roleRepository.count());
        System.out.println("How many employees? " + employeeRepository.count());
        System.out.println("How many contracts? " + contractRepository.count());
        System.out.println("How many employee roles? " + employeeRoleRepository.count());



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

        if (employeeRepository.count() < 150) {

            Set<String> emails = new HashSet<>();
            Set<String> phoneNumbers = new HashSet<>();

            for (int i = 1; i <= 100; i++) {

                String givenName = faker.name().firstName();
                String surname = faker.name().lastName();
                String email = faker.internet().emailAddress();

                String auMobile = faker.numerify("04########");

                String street = faker.address().streetAddress();
                String city = faker.australia().locations();
                String state =  getStateForCity(city);  // faker.australia().states();
                String auPostcode = getRandomPostcodeForState(state);

                String address = street + " " + city + " "  + state + " " + auPostcode;

                if (emails.contains(email) || phoneNumbers.contains(auMobile)) {
                    continue;
                }

                List<Role> allRoles = roleRepository.findAll();
                Role role = allRoles.get(faker.number().numberBetween(1, allRoles.size()));

                Employee employee = new Employee();
                employee.setGivenName(givenName);
                employee.setSurname(surname);
                employee.setEmail(email);
                employee.setPhone(auMobile);
                employee.setAddress(address);

                ContractType contractType = faker.options().option(ContractType.class);

                TimeAndDate timeAndDate = faker.timeAndDate();

                // Step 1: Generate a start date up to 30 days in the future
                Date startDateRaw = Date.from(timeAndDate.past(180, TimeUnit.DAYS));
                LocalDate startDate = startDateRaw.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                // Step 2: Add 3–12 months for end date
                int monthsToAdd = faker.number().numberBetween(3, 13);
                LocalDate endDate = startDate.plusMonths(monthsToAdd);

                ContractEmploymentType employmentType = faker.options().option(ContractEmploymentType.class);
                int hours = faker.number().numberBetween(1, 38);

                Contract contract = new Contract();
                contract.setContractType(contractType);
                contract.setStartDate(startDate);

                if(contract.getContractType().equals(ContractType.PERMANENT)) {
                    contract.setFinishDate(null);
                } else {
                    contract.setFinishDate(endDate);
                }
                contract.setContractEmploymentType(employmentType);
                if(contract.getContractEmploymentType().equals(ContractEmploymentType.FULL_TIME)) {
                    contract.setHoursPerWeek(38);
                } else {
                    contract.setHoursPerWeek(hours);
                }

                emails.add(email);
                phoneNumbers.add(auMobile);
                this.employeeRepository.save(employee);
                contract.setEmployee(employee);
                this.contractRepository.save(contract);

                EmployeeRole employeeRole = new EmployeeRole();
                employeeRole.setContract(contract);
                employeeRole.setRole(role);
                employeeRole.setPriorYearsOfExperience(faker.number().numberBetween(1,30));
                employeeRole.setPromotionType(faker.options().option(PromotionType.class));
                employeeRole.setPerformanceRating(faker.number().numberBetween(1,5));
                this.employeeRoleRepository.save(employeeRole);
            }
        }
    }

    public String getStateForCity(String city) {
        return switch (city) {
            case "Sydney", "Newcastle", "Central Coast", "Wollongong", "Lightning Ridge", "Huskisson", "Jervis Bay",
                 "Coffs Harbour", "Wagga Wagga", "Mildura – Wentworth", "Port Macquarie", "Tamworth", "Orange",
                 "Bowral – Mittagong", "Dubbo", "Nowra – Bomaderry", "Bathurst", "Lismore", "Nelson Bay" -> "NSW";
            case "Melbourne", "Geelong", "Ballarat", "Bendigo", "Albury", "Melton", "Shepparton – Mooroopna",
                 "Traralgon – Morwell", "Warragul – Drouin", "Warrnambool" -> "VIC";
            case "Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns", "Toowoomba", "Mackay",
                 "Rockhampton", "Bundaberg", "Hervey Bay", "Gladstone – Tannum Sands" -> "QLD";
            case "Perth", "Bunbury", "Busselton", "Geraldton", "Albany", "Kalgoorlie" -> "WA";
            case "Adelaide", "Mount Gambier" -> "SA";
            case "Hobart", "Launceston", "Devonport" -> "TAS";
            case "Canberra" -> "ACT";
            case "Darwin" -> "NT";
            default -> "The Bush";
        };
    }

    public static String getRandomPostcodeForState(String state) {
        Random random = new Random();
        List<int[]> ranges = switch (state.toUpperCase()) {
            case "NSW" -> Arrays.asList(new int[]{1000, 2599}, new int[]{2620, 2899}, new int[]{2921, 2999});
            case "VIC" -> Arrays.asList(new int[]{3000, 3999}, new int[]{8000, 8999});
            case "QLD" -> Arrays.asList(new int[]{4000, 4999}, new int[]{9000, 9999});
            case "SA"  -> Arrays.asList(new int[]{5000, 5799}, new int[]{5800, 5999});
            case "WA"  -> Arrays.asList(new int[]{6000, 6797}, new int[]{6800, 6999});
            case "TAS" -> Arrays.asList(new int[]{7000, 7799}, new int[]{7800, 7999});
            case "ACT" -> Arrays.asList(new int[]{200, 299}, new int[]{2600, 2619}, new int[]{2900, 2920});
            case "NT"  -> Arrays.asList(new int[]{800, 999});
            default    -> Collections.emptyList();
        };

        if (ranges.isEmpty()) return "0000";

        int[] range = ranges.get(random.nextInt(ranges.size()));
        int lower = range[0], upper = range[1];
        if (upper < lower) return "0000";

        int postcode = lower + random.nextInt(upper - lower + 1);
        return String.format("%04d", postcode);
    }
}
