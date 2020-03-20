import React from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const FooterWrapper = styled.div`
    height: auto;
    margin: 15vh auto 5vh;
    width: 70%;
    color: #f3f3f3;
    font-size: 13px;
    text-align: center;
`
const StyledA = styled.a`
    color: #00ad7c;
    &:visited{
        color: #00ad7c;
    }
    &:hover{
        color: #00ad7c;
    }
    &:active{
        color: #00ad7c;
    }
`
function Footer(){

    return(
        <FooterWrapper>
            <span>Feito com <FontAwesomeIcon role="img" aria-label="amor" icon={faHeart}/> por <StyledA href="https://github.com/bdsqqq">igor bedesqui</StyledA>, atribuições podem ser encontradas <StyledA href="https://github.com/bdsqqq/live-markdown-react-firebase">no repositorio </StyledA></span>
        </FooterWrapper>
    );
}

export default Footer