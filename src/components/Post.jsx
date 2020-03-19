import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import ReactMarkdown from 'react-markdown';

class Post extends Component {
    constructor(props){
        super(props);

        this.titleRef = React.createRef();
        this.bodyRef = React.createRef();
        this.postFBref = db.ref(`posts/${this.props.match.params.postId}`);
        this.state = {
            mdBody: ''
        }
    }

    componentDidMount(){
        this.postFBref.on('value', snapshot =>{
            if(!snapshot.val()) return;
            this.titleRef.current && (this.titleRef.current.value = snapshot.val().title);
            this.bodyRef.current && (this.bodyRef.current.value = snapshot.val().body);
            this.setState({
                mdBody: snapshot.val().body
            })
        })
    }

    onChange = () =>{
        this.postFBref.set({
            title: this.titleRef.current.value,
            body: this.bodyRef.current.value
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <input 
                    type="text"
                    placeholder="Title"
                    ref={this.titleRef}
                    onChange={this.onChange}
                    />
                </div>
                <div>
                    <textarea 
                    type="text"
                    placeholder="Postbody.."
                    ref={this.bodyRef}
                    onChange={this.onChange}
                    rows={35}
                    />
                </div>
                <div>
                    <ReactMarkdown source={this.state.mdBody}/>
                </div>
            </div>
        )
    }
}

export default Post;
