import React, { Component }  from 'react';
import db from '../firebase';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 2em;
    color: #f3f3f3;
`
const Form = styled.form`
    display: flex;
    margin: 6rem auto;
    height: 10vh;
    align-items: center;
`
const InputTitle = styled.input`
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    font-family: 'Montserrat',
        sans-serif;
    font-size: 1.2em;
    transition: all .3s;
    border-bottom: 2px solid #bebed2;
    color: #f3f3f3;
    &:focus{
        outline: none;
        border-bottom: 2px solid #78788c;
    }
`
const ButtonCreate = styled.button`
    cursor: pointer;

    margin: 1em;
    padding: 10px;

    background-color: #00ad7c;
    color: #f3f3f3;

    font-size: 1.2rem;

    border-radius: 25px;
    border: solid 2px #00ad7c;
    &:active{
        transition: 0.2s all;
        transform: translateY(3px);
        border: 1px solid transparent;
        opacity: 0.8;
    }
    &:focus{
        outline: none;
    }
`
const CardWrapper = styled.div`
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(auto-fill, minmax(240px, 300px));
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #4d4545;

    font-size: 1.3rem;

    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 300ms;
    overflow: hidden;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:hover{
        box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
        transform: translateY(-3px) scale(1.1);
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #f3f3f3;
`
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
            <Wrapper>
                <h1>Hello world from Home</h1>
                <Form onSubmit={this.onSubmit}>
                    <InputTitle 
                        type="text"
                        name="title"
                        placeholder="Create a post..."
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <ButtonCreate type="submit">Create</ButtonCreate>
                </Form>
                <CardWrapper>
                    {this.state.posts.map(post => (
                        <StyledLink key={post.key} to={`/post/${post.key}`}>
                            <Card key={`card_${post.key}`}>
                                <h2>{post.title}</h2>
                            </Card>
                        </StyledLink>
                    ))}
                </CardWrapper>
            </Wrapper>
        );
    }
}

export default Home;
