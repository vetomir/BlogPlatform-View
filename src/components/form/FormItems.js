import React from 'react';
import styled, {keyframes} from "styled-components";
import {colors} from "../utils/Colors";
import {fonts} from "../utils/Fonts";

export const TextareaWhite = styled.textarea`
  font-size: 1rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  color: ${colors.black};
  font-family: ${fonts.main};
  font-weight: ${fonts.regular};
  &:hover{
    border-color: ${colors.white};
    transition: 350ms;
  }
  &:focus{
    border-color: ${colors.lightGray};
    transition: 350ms;
    background-color: ${colors.white};
  }
`;

export const Textarea = styled.textarea`
  resize: vertical;
  font-size: 1rem;
  width: 100%;
  min-height: 150px;
  height: fit-content;
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  color: ${colors.white};
  font-family: ${fonts.main};
  background: none;
  font-weight: ${fonts.regular};
  &:hover{
    border-color: ${colors.orange};
    transition: 350ms;
  }
  &:focus{
    border-color: ${colors.black};
    transition: 350ms;
    background-color: ${colors.indigo};
  }
`;

export const Input = styled.input`
  font-size: 1rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  color: ${colors.white};
  font-family: ${fonts.main};
  background: none;
  font-weight: ${fonts.regular};
  &:hover{
    border-color: ${colors.orange};
    transition: 350ms;
  }
  &:focus{
    border-color: ${colors.black};
    transition: 350ms;
    background-color: ${colors.indigo};
  }
`;
export const Select = styled.select`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${colors.indigo};
  color: ${colors.white};
  font-family: ${fonts.main};
  background: ${colors.indigo};
  border-radius: 10px;
  font-weight: ${fonts.regular};
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  option{
    font-size: 1rem;
  }
  &:before{
    position: absolute;
    right: 1px;
    top: 0;
    width: 10px;
    height: 10px;
    background: red;
  }
  &:hover{
    border: 1px solid ${colors.orange};
    background-color: ${colors.orange};
    transition: 350ms;
  }
  &:focus{
    border-color: ${colors.black};
    background-color: ${colors.orange};
    transition: 350ms;
  }
`;

const appearBasic = keyframes`
  from {
    opacity: .2;
  }

  to {
    opacity: 1;
  }
`;
const appearImage = keyframes`
  from {
    opacity: .2;
    padding: 2rem;
  }

  to {
    opacity: 1;
    padding: 0;
  }
`;

/*
<ImageInput>
    <Input
        type="text"
        placeholder='Photo URL...'
        name="photoUrl"
        value={post.photoUrl}
        onChange={this.onChangePhotoUrl}
        validations={[requiredField, validPhoto]}
    />
    {/!*{validURL(post.photoUrl) ? (*!/}
    {validURL(post.photoUrl) ? (
        <>
            <div className='Image'>
                <div className='Preview'>
                    <img
                        src={post.photoUrl}
                        alt={post.title + ': Preview Image'}
                        onClick={() => this.setState({isOpen: true})}
                    />
                    <span>
                                                    <AiOutlineCloseCircle onClick={() => {
                                                        this.removeImage();
                                                    }}/>
                                                </span>
                </div>
                <div className='Source'>
                    <label>Source</label>
                    <Input
                        type="text"
                        name="photoSource"
                        placeholder='Photo Source...'
                        value={post.photoSource}
                        onChange={this.onChangeImageSource}
                    />
                </div>
            </div>
        </>
    ) : (<></>)}
</ImageInput>
*/
export const ImageInput = styled.div`
      position: relative;
      margin: .5rem 0 1rem 0;
      background: ${colors.indigo};
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      border-radius: 10px;
      .Preview{
        display: flex;
        justify-content: center;
        animation: ${appearBasic} 500ms;
        padding: 1rem;
        img{
          cursor: pointer;
          width: auto;
          height: 5rem;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid ${colors.orange};
          background: ${colors.orange};
          animation: ${appearImage} 500ms;
          &:hover{
            transform: scale(1.05);
            border: 2px solid ${colors.white};
            transition: 500ms;
          }
        }
        span{
          cursor: pointer;
          font-size: 2rem;
          color: ${colors.orange};
          &:hover{
            transform: scale(1.05);
            color: ${colors.white};
            transition: 350ms;
          }
        }
      }
      .Source{
        label{
          color: ${colors.lightGray};
        }
      }
`;
const TagShow = keyframes`
  from{
    background: ${colors.orange};
  }
  to{
    background: ${colors.indigo};
  }
`;

export const TagInput = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li{
    cursor: pointer;
    color: ${colors.white};
    background: ${colors.indigo};
    padding: .7rem .5rem;
    border-radius: 10px;
    width: fit-content;
    margin: .5rem .5rem 0 0;
    animation: ${TagShow} 500ms;
    &:hover{
      background: ${colors.orange};
      transition: 500ms;
    }
  }
`;
