import React,{Component} from 'react';

class EditPanel extends Component {
    render(){
        return(
            <h1>
                Editing {this.props.match.params.id}
            </h1>
        )
    }
}

export default EditPanel;