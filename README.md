# Firebase_Admin_Console_UI 

### [View Deployed Web App as ghpage](https://daqichen.github.io/Firebase_Admin_Console_UI/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A more detailed and more structured guide can be found at this <a href="https://locrian-colt-32b.notion.site/Firebase-Admin-Console-d4bd55aac10245aa8b208871c1eb23ed">Notion Notebook</a>.

## Overview

Firebase Admin Console is a centralized platform for easy viewing and maintenance of Firestore database, the application's front-end is built in ReactJS, and the back-end API is a Python Flask app. This application serves as a starting template for developers to customize, build, and even deploy the desired admin console for their DB. 

## Create React App

To clone this repo and install all the required packages:

```shell
git clone https://github.com/daqichen/Firebase_Admin_Console_UI.git

npx create-react-app NAME_OF_YOUR_FRONTEND_UI
cd NAME_OF_YOUR_FRONTEND_UI
npm start
```

For front-end, the Admin Console relied on `ReactJS` framework. The following code will quickly set up a React application for you. I encountered various errors while setting up React, upgrading my Node.js resolved the initial build issue. On Notion, I included links to all the forum posts (Stack Overflow, GitHub Issues, etc.) where I found the solutions to those problems; another reason I highly recommend looking through the Notion pages.

The list of dependencies used by Firebase Admin Console UI.
```javascript
"dependencies": {
      "@testing-library/jest-dom": "^5.11.4",
      "@testing-library/react": "^11.1.0",
      "@testing-library/user-event": "^12.1.10",
      "bootstrap": "^5.1.3",
      "firebase": "^9.6.1",
      "highlight.js": "^11.3.1",
      "marked": "^4.0.8",
      "react": "^17.0.2",
      "react-bootstrap": "^2.0.3",
      "react-bootstrap-range-slider": "^3.0.3",
      "react-dom": "^17.0.2",
      "react-firebase-hooks": "^4.0.1",
      "react-router-dom": "^6.1.1",
      "react-scripts": "4.0.3",
      "styled-components": "^5.3.3",
      "web-vitals": "^1.0.1"}
```

Below is the folder/file structure. <strong>(Disclaimer: by all means, this template's set-up might not follow the best practices for React App, since this project is my first attempt at full-stack dev from scratch and is still an on-going effort.)</strong> 

```plaintext
src/
    index.js
    index.css // Styling
    App.js // Routing
    Home.js // Landing Page, where you are reading this design doc
    Origami.js // Page to READ/view existing documents
    Add.js // Forms to CREATE new documents
    TVmazeDemo.js // Misc: demo-ing TV Maze's API as practice

src/constants/
        codebase.js // Storing all the code chunks you are seeing here
        routes.js // What it sounds like, routing

src/Subpages/
        AddOrigami.js // Form to add new origami document
        AddUser.js // Form to add new user
        UpdateOrigami.js // Form to update origami document fields
        UpdateUser.js // Form to update user fields

src/components/
        card.module.css // Styling for OrigamiCard.js
        gruvbox-dark.css // Styling for these code chunks
        styles.module.css // General Styling
        Navbar.js 
        OrigamiCard.js // Rendering documents in Origami Collection from Firestore DB
        CodeBlock.js // Rendering codechunks from codebase.js
        DesignDoc.json // Storing all the paragraphs you are reading here

src/components/Auth/
            Admin.js
            SignIn.js
            SignUp.js

src/components/Auth/Firebase/
                firebase.js
                context.js
                index.js
```

## Firebase Auth Set Up
As is true for most administrative tool, this application features Firebase Auth and restrict certain access to logged-in users. Here is a great <a href="https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/">article</a> that goes into extensive details of setting up Firebase Auth, although it is a slightly different approach than the template, it does offer more sophisticated operations on userbase. In this template app, it allows for basic functions like Sign-in, Sign-out, Update profile. Sign-up is not allowed since it is admin access only, therefore new users will be registered directly on the Firebase console. Below is the implementation for `firebase.js`.

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import app from 'firebase/compat/app';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
class Firebase {
    constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    }
}

export default Firebase;
```

Then `/context.js`:

```javascript
import React from 'react';

const FirebaseContext = React.createContext(null);

export default FirebaseContext;
```


And lastly, `/index.js`:
```js
import FirebaseContext from './context';
import Firebase from './firebase';

export default Firebase;

export { FirebaseContext };
```

## React Firebase Auth Hook

After setting up Firebase Auth, accessing the current logged-in session, are detecting unauthorized access by a user who's not logged-in are the next steps. I found a package at this <a href="https://github.com/CSFrequency/react-firebase-hooks/tree/11aa6dc474743ff1db44dbb8342c73f463fa4566/auth">GitHub Repo</a> that neatly incorporate the state hooks in React into Firebase Auth. An example of a `User.js` utilizing useAuthState: 

```js
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from 'firebase/auth';

const User = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth);
    if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
    }

    return (
        <main>
        {!user && <div message="To view Design Doc, please Log in"/>}
        {user && <div message="Only Admins can see this message!"/>}
        </main>
    );
}

export default User;
```

## Useful React-Bootstrap Components

Perhaps the name of this app appearing at the top left corner is already a give-away, the front-end part of developing this project truly pushed me out of my comfort zone; and in particular, styling. <a href="https://react-bootstrap.github.io/forms/overview/">React-Bootstrap</a> was an immense time-saver throughout the development process, and three components were used extensively, `forms`, `buttons`, and `offcanvas`. One example of each component will be demonstrated below from a React component in this template.

```js
const SignInForm = () => {
    const ...;

    return (
    <Form className="mb-4">
        <h2 className="title">Sign In</h2>
        <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                name = "email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                name = "password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button 
                bsPrefix="customButton"
                variant="success" 
                onClick={() => signInWithEmailAndPassword(email, password)}
                >
                Sign In
        </Button>
        {error && <p>Error: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {/* Successful Log-in is being handled in Navbar.js */}
    </Form>
    );
};

export default SignInForm;
```

In `/SignInForm.js`, all three of these components are seen working simultaneously together. To see it in action, try clicking on the button `"Log in/Sign Up"` on the top right corner.

## Tie Together Front-end and Back-end: Origami (Demo Collection)

rigami is undeniably my favorite hobby in the world, therefore it is no surprise that I chose to build this template with a back-end DB on origami models. <a href="https://daqichen.github.io/Firebase_Admin_Console_UI/origami">Origami</a> is a `Firestore Collection`, each of the model is a `document` with various fields, such as creator, number of steps, and so on. But how exactly is the back-end and front-end of this application talking to each other? 

Make sure both your back-end Flask app and your front-end React app are running on some port. Then, utilizing `fetchURL`, `useEffect` in ReactJS to send HTTP request(s), at page launching and after some user inputs like filtering options. `/OrigamiCard.js` has all these functionalities and more, shown below: 
```js
import React, { useState, useEffect } from 'react';
import OrigamiCard from './components/OrigamiCard';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const Origami = () => {
    const [rerenderTrig, setRerenderTrig] = useState(0)
    const [origami, setOrigami] = useState([])
    const [filters, setFilters] = useState({
        ...
    })

    useEffect(() => {
        const urlParameters = Object.entries(filters).map(e => e.join('=')).join('&')
        fetch('http://127.0.0.1:5000/list?' + String(urlParameters), {
            'method':'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( async (response) => {
            // get json response here
            let data = await response.json();

            if(response.status === 200){
            // Process data here
                setNoResult(false)
                setOrigami(data)
                console.log(Object.keys(origami).length)
                console.log(origami)
                // setFilteredResultShow(true)
            }else{
            // Rest of status codes (400,500,303), can be handled here appropriately
                console.log("status code is prob 90 and no results from selected filters")
                setNoResult(true)
                // setFilteredResultShow(true)
            }
        })
        .catch((err) => {
            console.log(err);
        })

    },[rerenderTrig]) // important to have [] so that it doesn't repeatedly make Get request

    return (
            <main>
                <div>

                {noResult && <h2 className="title"> 
                            Yikes, the filter selected didn't return any creations, please try a different filter!
                            </h2>}

                {!noResult && origami.map(model => {
                    return (
                        <div key = {model.model_name}>
                            <OrigamiCard
                                name={model.model_name}
                                creator={model.creator}
                                difficulty_level={model.level_of_difficulty}
                                video_tutorial={model.video_tutorial}
                                source={model.source_pattern}
                                steps={model.number_of_steps}
                                paper={model.paper_ratio}
                                img={model.img}
                            />
                        </div>
                    )
                    })}
            </div>
        </main>
    );
}

export default Origami;
```

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

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
