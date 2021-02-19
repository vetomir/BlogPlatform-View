import styled from "styled-components";
import {colors} from "./Colors";
import React from "react";
import {isEmail} from "validator";

const Alert = styled.div`
  position: absolute;  
  right: 0;
  left: 0;
  text-align: center;
  color: ${colors.white};
  background: ${colors.black};
  padding: 1rem;
`;

export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export const validLead = value => {
    if (value.length < 50 || value.length > 400) {
        return (
            <div>
                The lead must be between 50 and 400 characters.
            </div>
        );
    }
};

export const validContent = value => {
    if (value.length < 400 || value.length > 10000) {
        return (
            <div>
                The content must be between 400 and 10000 characters.
            </div>
        );
    }
};

export const validTitle = value => {
    if (value.length < 5 || value.length > 20) {
        return (
            <div>
                The title must be between 5 and 20 characters.
            </div>
        );
    }
};

export const validPhoto = value => {
    if (value.length < 3) {
        return (
            <div>
                The title must be between 3 and 20 characters.
            </div>
        );
    }
    if (!validURL(value)) {
        return (
            <div>
                Photo must be url query
            </div>
        );
    }
};

export const requiredField = value => {
    if (!value) {
        return (
            <div>
                This field is required!
            </div>
        );
    }
};

export const validPassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <Alert>
                The password must be between 6 and 40 characters.
            </Alert>
        );
    }
};

export const validEmail = value => {
    if (!isEmail(value)) {
        return (
            <Alert>
                This is not a valid email.
            </Alert>
        );
    }
};

export const validUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <Alert>
                The nickname must be between 3 and 20 characters.
            </Alert>
        );
    }
};

export function findSpace(s) {
    return s.indexOf(' ') >= 0;
}


export const validComment = value => {
    if (value.length < 3 || value.length > 400) {
        return (
            <div>
                The content must be between 3 and 400 characters.
            </div>
        );
    }
};
