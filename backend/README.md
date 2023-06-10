# Backend

This is the backend component of the Dynamite_Transport project. It provides the API endpoints and handles the business logic and data operations.

## Technologies Used

- [Node.js](https://nodejs.org): JavaScript runtime environment
- [Express.js](https://expressjs.com): Web application framework for Node.js
- [MongoDB](https://www.mongodb.com): NoSQL database for storing truck data
- [Mongoose](https://mongoosejs.com): MongoDB object modeling for Node.js

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)

### Installation

1. Clone the repository: `git clone https://github.com/redmojo7/Dynamite_Transport.git`
2. Navigate to the backend directory: `cd backend`
3. Install the dependencies: `npm install`

### Configuration

1. Create a `.env` file in the root directory of the backend project.
2. Set the environment variables in the `.env` file, including:
   - `DB_CONNECTION_URI`: The connection URI for your MongoDB database.
   - `PORT`: The port number for the backend server (e.g., 3000).

### Usage

1. Start the backend server: `npm start`
2. The server will run at `http://localhost:8080` (or the port you specified).

### API Endpoints

- `GET /api/trucks`: Get all trucks
- `GET /api/trucks/:id`: Get a specific truck by ID
- `POST /api/trucks`: Create a new truck
- `PUT /api/trucks/:id`: Update a truck by ID
- `DELETE /api/trucks/:id`: Delete a truck by ID

### Data Model

The data model for a truck in the MongoDB database:

```json
{
  "registration": "ABC123",
  "arrival": "2023-06-08T10:00:00Z",
  "departure": "2023-06-08T18:00:00Z",
  "bay": "A1"
}
```

## Contributing
Contributions are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License
### MIT License

Feel free to modify and customize this README template to fit the specifics of your project.
