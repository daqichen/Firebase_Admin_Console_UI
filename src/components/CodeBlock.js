import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import"./gruvbox-dark.css";
import styles from './card.module.css';
import * as CODE from "../constants/codebase";

const CodeBlock = (props) => {
    // Configure marked
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code,lang){
            const language = hljs.getLanguage(lang) ? lang : 'javascript';
            return hljs.highlight(code, { language }).value;
          }
       });

    const getCode = (val) => {
        if (val == "REQUEST_PARAM") return CODE.REQUEST_PARAM;
        else if (val == "FLASK_FIRESTORE_SETUP") return CODE.FLASK_FIRESTORE_SETUP;
        else if (val == "REQUIREMENT") return CODE.REQUIREMENT;
        else if (val == "LIST") return CODE.LIST;
        else if (val == "ADD") return CODE.ADD;
        else if (val == "ORIGAMI_MODULE") return CODE.ORIGAMI_MODULE;
        else if (val == "UPDATE") return CODE.UPDATE;
        else if (val == "DELETE") return CODE.DELETE;
        else if (val == "REACT_APP") return CODE.REACT_APP;
        else if (val == "DEPENDENCIES") return CODE.DEPENDENCIES;
        else if (val == "FOLDER_STRUCTURE") return CODE.FOLDER_STRUCTURE;
        else if (val == "FIREBASE_JS") return CODE.FIREBASE_JS;
        else if (val == "INDEX_JS") return CODE.INDEX_JS;
        else if (val == "CONTEXT_JS") return CODE.CONTEXT_JS;
        else if (val == "AUTHENTICATION") return CODE.AUTHENTICATION;
        else if (val == "FORM") return CODE.FORM;
        else if (val == "ORIGAMI") return CODE.ORIGAMI;
        else if (val == "HEROKU") return CODE.HEROKU;

    }

    return (
    <div>
    <div className={styles.containerWithoutBorder}>
    {/* <p className={styles.doc}>{props.content}</p> */}
    <div
        className={styles.doc}
        dangerouslySetInnerHTML={{ __html: props.content }} 
        />
    {props.containsCode == "true" && <div
        classPrefix="hljs-"
        className="hljs"
        dangerouslySetInnerHTML={{ __html: marked(getCode(props.code)) }} 
        />}

    </div>
    </div>
    )
}

export default CodeBlock;