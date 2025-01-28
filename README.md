
# UK295 Project LB1

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## System Requirements

To run the application locally or in a production environment, the following requirements must be met:

| **Category**         | **Recommendation**                                           |
|-----------------------|-------------------------------------------------------------|
| **Operating System**  | Windows 10/11, macOS Monterey or newer, Ubuntu 20.04+      |
| **Node.js Version**   | 18.x or higher ([Download here](https://nodejs.org/))      |
| **npm Version**       | 9.x or higher (comes with Node.js)                         |
| **Angular CLI**       | 15.x or higher ([Installation Guide](https://angular.io/cli)) |
| **Browser**           | Latest version of Google Chrome, Firefox, Safari, Edge    |
| **Hardware**          | CPU: Dual-Core or better, RAM: 4 GB or more, SSD recommended |

### Backend-API
- The application uses a backend available at the following URL:
  [Swagger Documentation](https://294.cyrotech.ch/swagger-ui/index.html#/).
- Authentication is performed using Bearer Tokens.

## Installation

### 1. Clone the repository
Clone the project repository using:

```bash
git clone <https://github.com/CodeChoreographer/UK294-Project-LB1.git>
cd uk295-project-lb1
```

### 2. Install dependencies
Install the required dependencies:

```bash
npm install
```

## Local Development

Start the application in the development environment:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Production Build

Create a production version of the application with:

```bash
npm run build
```

The production build will be placed in the folder `dist/uk295-project-lb1/` and can be deployed on a web server.

## Technologies Used

### Frontend
- **Angular 17**: Framework for web development
- **Angular Material**: UI components
- **ngx-toastr**: Toast notifications
- **SweetAlert2**: Modal dialogs
- **JWT-Decode**: Token processing

### Backend
- API: Documentation at [Swagger](https://294.cyrotech.ch/swagger-ui/index.html#/)
- Authentication: Bearer Tokens

## Troubleshooting

### Common Issues
1. **Missing Dependencies**:
   - Verify that all dependencies are installed correctly:
     ```bash
     npm install
     ```

2. **Invalid Node.js Version**:
   - Ensure that Node.js is installed in the correct version.

3. **CORS Issues with the API**:
   - If problems arise with local requests, check the API's CORS settings or use a proxy.

## Additional Notes

- For changes to the backend, refer to [Swagger Documentation](https://294.cyrotech.ch/swagger-ui/index.html#/).
- UI customizations are based on Angular Material and can be made in the SCSS files.

Enjoy using the application. For questions and issues, feel free to contact the developer cedric.baumann@ict-csbe.ch | CodeChoreographer
