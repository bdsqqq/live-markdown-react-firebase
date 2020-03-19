import React, { Component }  from 'react';
import db from '../firebase';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';

class Home extends Component {
    state = {
        posts : [],
        title: ''
    }

    componentDidMount(){
        db.ref('/posts').on('value', (snapshot) => {
            let posts = [];
            snapshot.forEach(childSnapshot => {
                posts.push({ ...childSnapshot.val(), key: childSnapshot.key})
            });
            this.setState({ posts })
        })
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newId = uuid();
        if(this.state.title == '') return;
        db.ref(`posts/${newId}`).set({
            title: this.state.title,
            body: ''
        })
        .then(res => {
            this.props.history.push(`/post/${newId}`)
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.posts)
        return(
            <div>
                <h1>Hello world from Home</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input 
                        type="text"
                        name="title"
                        placeholder="Create a post..."
                        value={this.state.title}
                        onChange={this.onChange}
                        />
                        <div>
                            <button type="submit">Create</button>
                        </div>
                    </div>
                </form>
                <div>
                    {this.state.posts.map(post => (
                        <div key={post.key}>
                            <Link to={`/post/${post.key}`}>
                                <h2>{post.title}</h2>
                                <hr />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
