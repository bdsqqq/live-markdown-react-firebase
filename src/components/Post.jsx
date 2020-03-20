import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 2em;
    color: #f3f3f3;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #f3f3f3;
    transition: .3s ease-in-out;
    font-size: 1.125em;
    &:hover{
        opacity: 0.8;
    }
`
const GridWrapper = styled.div`
    display: grid;
    max-width: 1200px;
    gap: 1rem;

    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    justify-items: center;
    align-items: center;
    margin: 4em auto;
`
const CardWrapper = styled.div`
    width: 100%;
`
const Label = styled.span`
    font-size: 2em;
    font-weight: 700;
`
const Card = styled.div`
    padding: 2em;
    border-radius: 15px;
    background-color: #4d4545;
    width: 70%;
    max-height: 600px;
`
const InputTitle = styled.input`
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: auto;
    border: 0;
    font-family: 'Montserrat',
        sans-serif;
    font-size: 1em;
    transition: all .3s;
    border-bottom: 2px solid #bebed2;
    color: #f3f3f3;
    &:focus{
        outline: none;
        border-bottom: 2px solid #78788c;
    }
`
const TextArea = styled.textarea`
    width: 100%;
    height: 600px;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    font-family: 'Montserrat',
        sans-serif;
    font-size: 1em;
    transition: all .3s;
    border-bottom: 2px solid #bebed2;
    color: #f3f3f3;
    &:focus{
        outline: none;
        border-bottom: 2px solid #78788c;
    }
`
const StyledMarkdown = styled(ReactMarkdown)`
    overflow: auto;
    max-height: inherit;
`
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
            <Wrapper>
                <StyledLink to="/"><span>{"<" } Voltar</span></StyledLink>
                <GridWrapper>
                    <CardWrapper>
                        <Label>Titulo: </Label>
                        <InputTitle 
                            type="text" 
                            placeholder="Title" 
                            ref={this.titleRef} 
                            onChange={this.onChange} 
                        />
                        <Card>
                            <TextArea 
                                type="text"
                                placeholder="Postbody.."
                                ref={this.bodyRef}
                                onChange={this.onChange}
                            />
                        </Card>
                    </CardWrapper>
                    <CardWrapper>
                        <Label>Preview</Label>
                        <Card>
                            <StyledMarkdown source={this.state.mdBody}/>
                        </Card>
                    </CardWrapper>
                </GridWrapper>
            </Wrapper>
        )
    }
}

export default Post;
