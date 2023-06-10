# Frontend Project Name

This is the frontend component of the Dynamite_Transport project. It provides the user interface for interacting with the truck management system.

## Technologies Used

- [React](https://reactjs.org): JavaScript library for building user interfaces
- [Axios](https://axios-http.com): Promise-based HTTP client for making API requests
- [Bootstrap](https://getbootstrap.com): CSS framework for responsive and mobile-first design
- [React Bootstrap](https://react-bootstrap.github.io/): React Bootstrap is a popular UI library

## Getting Started

### Prerequisites

- Node.js (version X.X.X)

### Installation

1. Clone the repository: `git clone https://github.com/redmojo7/Dynamite_Transport.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install the dependencies: `npm install`

### Configuration

1. Create a `.env` file in the root directory of the frontend project.
2. Set the environment variables in the `.env` file, including:
   - `REACT_APP_API_BASE_URL`: The base URL of the backend API (e.g., `http://localhost:8080/`).

### Usage

1. Start the frontend development server: `npm start`
2. The application will be available at `http://localhost:3000` (or the port specified).

### Folder Structure

The main files and directories in the frontend project:

- `src/`: Contains the application source code.
  - `components/`: Contains reusable components used in the application.
  - `pages/`: Contains the main pages of the application.
  - `services/`: Contains service modules for making API requests.
  - `App.js`: The root component of the application.
  - `index.js`: The entry point of the application.

### Deployment

To deploy the frontend to a production environment, you can build the optimized version of the application using the following command:

```bash
npm run build
```

## Contributing
Contributions are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License
### MIT License

Feel free to modify and customize this README template to fit the specifics of your project.
