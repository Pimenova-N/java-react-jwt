# Spring Boot REST API and JWT Authentication
Restful CRUD API for a library.
This API uses JWT token for authentication and authorization.

### Authentication
|  HTTP Method |Endpoint               | Description                                |
|--------------|-----------------------|--------------------------------------------|
| POST         | /api/v1/auth/register | User Registration.                         | 
| POST         | /api/v1/auth/login    | Authenticate a user and return a JWT token.|

### Authors

|  HTTP Method |Endpoint              | Description                              |
|--------------|----------------------|------------------------------------------|
| GET          | /api/v1/authors      | Get a paginated list of all authors.     | 
| GET          | /api/v1/authors/{id} | Get a single author by ID.               |
| POST         | /api/v1/authors      | Create a new author.                     | 
| PUT          | /api/v1/authors/{id} | Update an existing author by ID.         | 
| DELETE       | /api/v1/authors/{id} | Delete an existing author by ID.         |

 ### Books
|  HTTP Method |Endpoint              | Description                                                 |
|--------------|----------------------|-------------------------------------------------------------|
| POST         | /api/v1/authors/{authorId}/books      | Create a new book on a author.             | 
| GET          | /api/v1/authors/{authorId}/books	   | Get all books on a author.                 | 
| GET          | /api/v1/authors/{authorId}/books/{id} | Get a single book on a author by ID.       | 
| PUT          | /api/v1/authors/{authorId}/books/{id} | Update an existing book on a author by ID. | 
| DELETE       | /api/v1/authors/{authorId}/books/{id} | Delete an existing book on a author by ID. |

### Dependencies
- Spring Boot
- Spring Security
- Spring Data JPA
- Postgresql
- Flyway
- Hibernate Validator
- Lombok
- Testcontainers

## Steps to Setup

**1. Clone the application**

```bash
git clone git clone https://github.com/Pimenova-N/java-react-jwt.git
cd server
```

**2. Change Postgresql settings**

+ open `src/main/resources/application.properties`
+ change `spring.datasource.url`, `spring.datasource.username` and `spring.datasource.password`.

**3. Run the app using maven**

```bash
mvn spring-boot:run
```
The app will start running at <http://localhost:8080>