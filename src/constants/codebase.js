export const FLASK_FIRESTORE_SETUP = `
\`\`\`python
import os
import requests
from flask import Flask, jsonify, request, make_response
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
\`\`\`
`;

export const REQUIREMENT = `
\`\`\` plaintext
# requirements.txt
CacheControl==0.12.10
cachetools==4.2.4
certifi==2021.10.8
charset-normalizer==2.0.10
click==8.0.3
dataclasses-json==0.5.6
firebase-admin==5.2.0
Flask==2.0.2
Flask-Cors==3.0.10
google-api-core==2.3.2
google-api-python-client==2.34.0
google-auth==2.3.3
google-auth-httplib2==0.1.0
google-cloud-core==2.2.1
google-cloud-firestore==2.3.4
google-cloud-storage==1.43.0
google-crc32c==1.3.0
google-resumable-media==2.1.0
googleapis-common-protos==1.54.0
grpcio==1.43.0
grpcio-status==1.43.0
gunicorn==20.0.4
...
\`\`\`
`;

export const LIST = `
\`\`\`python
@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents    """
    try:
        # details of the request
        dir_id = request.args.get('collection')  

        print('in collection ' + dir_id)
        curr_dir = db.collection(dir_id)
        all_dirs = [doc.to_dict() for doc in curr_dir.stream()]
        return jsonify(all_dirs), 200
\`\`\`
`;

export const ADD = `
\`\`\`python
from datamodel.origamimodule import Origami

@app.route('/add', methods=['POST'])
def create():
    try:
        # details of the request
        formData = request.json
        if (formData['collection'] == "Origami"):
            model = Origami(creator=formData['creator_field'], model_name=formData['model_name_field'], 
                            level_of_difficulty=formData['level_of_difficulty_field'],number_of_steps=formData['steps_field'],
                            source_pattern=formData['source_pattern_link_field'],paper_ratio=formData['paper_ratio_field'],
                            video_tutorial=formData['video_tutorial_field'],img=formData['img_field'])
            print(model.to_dict())
        elif (formData['collection'] == "Placeholder for some other collection"):
            #some other custom datamodel
        db.collection(formData['collection']).document().set(model.to_dict())
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
\`\`\`
`;

export const ORIGAMI_MODULE =`
\`\`\`python
from dataclasses import dataclass
from dataclasses_json import dataclass_json 

@dataclass_json
@dataclass
class Origami:
    model_name:str
    level_of_difficulty:str
    number_of_steps:int
    source_pattern:str
    creator:str
    paper_ratio:str
    video_tutorial:str
    img:str
\`\`\`
`;

export const UPDATE = `
\`\`\`python
@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        # details of the request
        details = request.json
        collection_dir = details['collection']
        name = details['identifier_name']
        value = details['identifier_value']
        # get doc id
        docs = db.collection(collection_dir).where(name, "==", value).get()
        for doc in docs:
            doc_id = doc.id
            print("doc id: " + doc_id)
            break

        # details of the UPDATE request
        formData = request.json
        if (formData['collection'] == "Origami"):
            model = Origami(creator=formData['creator_field'], model_name=formData['model_name_field'], 
                            level_of_difficulty=formData['level_of_difficulty_field'],number_of_steps=formData['steps_field'],
                            source_pattern=formData['source_pattern_link_field'],paper_ratio=formData['paper_ratio_field'],
                            video_tutorial=formData['video_tutorial_field'],img=formData['img_field'])
            print(model.to_dict())
        
        db.collection(formData['collection']).document(doc_id).update(model.to_dict())
        return jsonify({"success": True}), 200

    except Exception as e:
        return f"An Error Occured: {e}"
\`\`\`
`;

export const DELETE = `
\`\`\`python
@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    try:
        # details of the request
        details = request.json
        collection_dir = details['collection']
        name = details['identifier_name']
        value = details['identifier_value']
        print(collection_dir, name, value)
        # check if the document exists
        docs = db.collection(collection_dir).where(name, "==", value).get()
        exists = False
        for doc in docs:
            doc_id = doc.id
            exists = True
            print("this doc exists")
            break
        if exists:
            db.collection(collection_dir).document(doc_id).delete()
            print('deleted successfully for '+value)
            return jsonify({"success": True}), 200
        else:
            print("no doc found")
            return jsonify({"fail": "Document you are trying to delete does not exist"})
    except Exception as e:
        print(e)
        return f"An Error Occured: {e}"
\`\`\`
`;

export const REACT_APP = `
    npx create-react-app NAME_OF_YOUR_FRONTEND_UI
    cd NAME_OF_YOUR_FRONTEND_UI
    npm start
`;

export const DEPENDENCIES = `
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
`;

export const FOLDER_STRUCTURE = `
\`\`\`plaintext
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
\`\`\`
`;

export const FIREBASE_JS = `
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
`;

export const CONTEXT_JS = `
    import React from 'react';

    const FirebaseContext = React.createContext(null);

    export default FirebaseContext;
`;

export const INDEX_JS = `
    import FirebaseContext from './context';
    import Firebase from './firebase';

    export default Firebase;

    export { FirebaseContext };
`;

export const REQUEST_PARAM = `
\`\`\`python
@dataclass
def Delete:
    collection:str #which collection within Firebase you are trying to update
    identifier_name:str // in Origami, it will be model_name; User, it will be username
    identifier_value:str // the actual value the identifier field holds in firestore

@dataclass
def Update:
    collection:str #which collection within Firebase you are trying to update
    identifier:str // in Origami, it will be model_name; User, it will be username
\`\`\`
`;


export const AUTHENTICATION = `
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
`;

export const FORM = `
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
`;

export const ORIGAMI = `
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
`;

export const HEROKU = `
\`\`\`shell
echo "web: gunicorn app:app" > Procfile
\`\`\`
`;

export const CODE = `React + marked + highlight.js


    import marked from "marked";

    marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function(code) {
        return require("highlight.js").highlightAuto(code, ["html", "javascript"])
        .value;
    }
    });

    @app.route('/list', methods=['GET'])
    def read():
        """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents    """
    try:
        # details of t
    
    `;