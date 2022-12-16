sequenceDiagram
participant Frontend as Frontend
participant Controller as Controller
participant Service as Service
participant Database as Database

Frontend->>Controller: HTTP Request
Controller->>Service: Request Data
Service->>Database: Query Data
Database-->>Service: Returned Data
Service-->>Controller: Returned Data
Controller-->>Frontend: HTTP Response

example:
Angular->>UserController: HTTP Request registerUser
UserController->>UserService: Hash Password and process Data
UserService->>MongoDb: Save User
MongoDb-->>UserService: Returne Data
UserService-->>UserController: Return Success
UserController-->>Angular: HTTP Response
