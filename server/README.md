## How to run the application:

### Prerequisites

- Docker (for Docker Compose)
- Java Development Kit (JDK) 21 (for Maven)
- Maven 3.6.1 or higher (for Maven build)
- PostgreSQL database (can be run with Docker)

### 1. Clone the repository:

```bash
git clone https://github.com/ptvinh203/healthy-me.git
```

### 2. Change directory to project:

```bash
cd healthy-me/server
```

### 3. Run database using Docker Compose:

- Configure <span style="color:lightblue">**.env**</span>:
    - Create a <span style="color:lightblue">**.env**</span> file in the root directory of the project with examples in
      <span style="color:lightblue">**.env.example**</span> file.
    - Add the environment variables from docker-compose.yml file to the <span style="color:lightblue">**.env**</span>
      file
- Run the application:
  ```bash
  docker-compose up -d
  ```

### 4. Run application using Maven:

- Configure <span style="color:lightblue">**application-dev.yml**</span>:
    - Copy <span style="color:lightblue">**application.yml**</span> to <span style="color:lightblue">*
      *application-dev.yml**</span>
    - Fill in the missing values in <span style="color:lightblue">**application-dev.yml**</span>
- Run the application:
  ```bash
  mvn spring-boot:run -Dspring-boot.run.profiles=dev
  ```

### 5. Access the API:

- Once the application is running, the API is available at `http://localhost:8000/api`.