import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Main from "./page/Main";

function App() {
    return (
        <div>
            <main>
                <Route exact path="/">
                    <Main />
                </Route>
            </main>
        </div>
    );
}

export default App;