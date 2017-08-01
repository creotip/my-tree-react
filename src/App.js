import React, {Component} from "react";
import TreeView from "./react-treeviewer/src/index";
import Contacts from "./Contacts";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: Contacts,
            open: false,
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>MY FRIENDS TREE</h2>
                </div>
                <div className="listWrapper">
                    <TreeView
                        data={this.state.contacts}
                    />
                </div>
            </div>
        );
    }
}

export default App;
