# self-destructing-note-api



A RESTful backend for one-time access, self-destructing notes.

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen" alt="Node.js badge" />
  <img src="https://img.shields.io/badge/express-v5.1.0-brightgreen"   alt="Express badge" />
  <img src="https://img.shields.io/badge/mongodb-v6.17.0-brightgreen"     alt="MongoDB badge" />
  <img src="https://img.shields.io/badge/mongoose-v8.16.1-brightgreen"
  alt="Mongoose badge">
</p>

## Features

- **Create One-Time Note**

  Accepts a ``` {message: string} ``` payload and returns a unique slug.

- **Unique Slug Generation**

  Uses nanoid to generate collision-resistant URLs.

- **Single Retrieval Enforcement**

  Once a slug is accessed, the note is marked as "accessed" and subsequent GETs are unable to return the message.

- **Automatic Expiration**

  Notes self-destruct 6 hours after creation if never fetched. 

- **JSON Responses**

  HTTP status codes are consistent with clean JSON bodies for success and error handling.

- **CORS-Enabled**

  CORS middleware allows integration with any frontend origin.

## Tech Stack

- **Backend**:

  - Node.js ≥ 16.x
  
  - Express 5.x

  - MongoDB 6.x

  - Mongoose 8.x

- **Frontend** (in a [separate repo](https://github.com/kavehfayyazi/my-personal-website)):

  - React 18.x

  - Vite

  - Tailwind CSS



## Usage

### Prerequisites
- Node.js version 16 or higher.
- MongoDB connection URI

### Installation


1. Clone the repository:
    
    ```bash
    git clone https://github.com/kavehfayyazi/self-destructing-note-api.git
    cd self-destructing-note-api
    ```
    
2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variable by creating a .env file in the root directory and add:

    ```bash
    DATABASE_URL=your-mongodb-connection-string
    ```

4. Run the development server:
    ```bash
    npm run dev
    # or npm start
    ```

The API will be available at ``` http://localhost:3356/ ```

## API Endpoints

### Create a Note

**POST** ``` /notes ```

- **Body**:
  ```json
  {"message": "Your secret note"}
  ```
  
- **Response**:
  ```json
  {"slug": "abc123"}
  ```
### Get a Note

**GET** ``` /notes/:slug ```

- **Parameters**

  - ``` slug ``` - The unique note identifier

- **Responses**

  - ``` 200 OK ``` with ``` {message: "This note has already been accessed."} ``` if the note has already been opened

  - ``` 200 OK ``` with ``` {message: "This note has self destructed!"}} ``` if the note was not opened in 6 hours

  - ``` 200 OK ``` with the note JSON if it's accessible 

  - ``` 404 Not Found ``` with ``` {message: "This note was not found."} ``` if no note matchces


## Project Structure
```
self-destructing-note-api/
├── server.js             # initialize Express, connect to DB, start server
├── package.json          # project metadata
├── package-lock.json     # dependency tree
├── controllers/          # request handlers
│   └── notes.js          # createNote and getNote logic
├── models/               # Mongoose schemas
│   └── note.js           # Note schema
└── routes/               # Express routers
    └── notes.js          # POST /notes, GET /notes/:slug
```

## Contributing

1. **Fork** this repository.

2. **Clone** your fork locally:

    ```bash
    git clone https://github.com/<your-username>/self-destructing-note-api.git
    cd self-destructing-note-api
    ```

3. **Create** a new branch:

    ```bash
    git checkout -b feature/your-feature
    ```

4. **Commit** your changes:

    ```bash
    git commit -m "Add feature-name."
    ```

5. **Push** to the branch

    ```bash
    git push origin feature/feature-name
    ```

6. **Open** a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Creator: kavehfayyazi
- Email: [kfayyazi@andrew.cmu.edu](mailto:kfayyazi@andrew.cmu.edu)
- Github: [@kavehfayyazi](https://github.com/kavehfayyazi)