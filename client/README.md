# Getting Started with Create React App

##  *****   Letter Editor  ********

```bash
A web application for creating, editing, and managing letters, with the ability to save them to Google Drive. Built with React on the front-end and Node.js/Express on the back-end, using Auth0 for authentication and MongoDB for data storage.

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## ***Features *****
```bash
Create, update, and delete letters.
Save letters to Google Drive.
User authentication via Auth0.
Responsive UI with a simple letter editor and list view.

```

### ***  Tech Stack ****

```bash
Front-End: React, React Router, Auth0 React SDK, Axios
Back-End: Node.js, Express, MongoDB (Mongoose), Google APIs, Auth0 JWT
Database: MongoDB
Styling: Custom CSS

```

### Project Structure ***********

Letter-Editor/
├── Back-end/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── driveController.js
│   │   └── letterController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── Letter.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── driveRoutes.js
│   │   └── letterRoutes.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── driveApi.js
│   │   │   └── letterApi.js
│   │   ├── components/
│   │   │   ├── Editor.js
│   │   │   ├── LetterList.js
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── EditorPage.js
│   │   │   ├── Home.js
│   │   │   └── Login.js
│   │   ├── styles/
│   │   │   ├── editor.css
│   │   │   └── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
└── README.md


###  **** Project Setup Instructions **********

1. Clone the Repository
   https://github.com/sakeel-103/WarrantyMe_Full-Stack-Projct.git

2. Move to frontend 

```bash
   npm install
   npm start
```

3. Move to backend 

```bash
    npm install
    nodemon server.js

```

###  ** Screenshorts **   

1. Home Page 

![alt text](image.png)

2. Login Page 

![alt text](image-1.png)

3. Editor Page after login with google

![alt text](image-2.png)

4. Letter Editor Page 

![alt text](image-3.png)

5. Save Draft 

![alt text](image-4.png)


#### *************************************************************************

## NOTE -- In the Letter Editor page "Save draft", this function some tie works because of the Localhost error .