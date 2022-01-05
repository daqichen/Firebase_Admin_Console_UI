import React, { useState, useEffect } from 'react';
import  { FirebaseContext } from './components/Auth/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from 'firebase/auth';
import CodeBlock from './components/CodeBlock';
import designDoc from "./components/DesignDoc.json";

const Home = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth);
    if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        console.log(email)

    }
    
    return (
        <main>
            <div className="container">
                {user && <div> 
                    <h2 className="contentTitle">Welcome, Admin {auth.currentUser.displayName} to the README.md</h2> 
                    
                </div>}

                {!user && <div> 
                    <h2 className="contentTitle">README.md </h2> 
                    
                </div>}
                
                {designDoc.map(section => {
                    return (
                        <div key = {section.section_id}>
                            <h3 className="contentTitle">{section.section_id} - {section.title}</h3>
                            {section.details.map(para => {
                                return (
                                    <CodeBlock
                                        content={para.content}
                                        containsCode={para.contains_code}
                                        code={para.code}
                                        codeLang={para.code_lang}
                                        />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

export default Home;