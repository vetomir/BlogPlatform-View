import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import {colors} from "../utils/Colors";
import {fonts} from "../utils/Fonts";

export function CKEditorConfig() {
    ClassicEditor.defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'insertTable',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative'
            ]
        },
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
        language: 'en'
    };
}

export const EditorWrapper = styled.div`
  .Error{
    padding: 1rem .5rem;
    display: flex;
    width: 100%;
    background-color: ${colors.orange};
    transition: 500ms;
    justify-content: center;
    div{
      margin-left: .5rem;
      font-weight: ${fonts.regular};
      color: ${colors.black}; 
    }
  }
    .ck{
      color: ${colors.gray};
      background: ${colors.black}!important;
      border: none;
      .ck-toolbar{
        background: none;
      }
    }
    .ck-editor{
      width: 100% !important;
      overflow: hidden;
      color: ${colors.black};
      border: 1px solid ${colors.orange};
      color: ${colors.white} !important;
      &:hover{
        border-color: ${colors.white};
        transition: 500ms;
      }
    }
    .ck.ck-button.ck-on:not(.ck-disabled):hover, a.ck.ck-button.ck-on:not(.ck-disabled):hover{
      background: ${colors.indigo};
    }
    .ck-list__item{
      &:hover{
        background: ${colors.indigo};
      }
      button{
        background: none !important;
        &:hover{
          background: ${colors.indigo};
        }
      }
    }
    .ck-content{
      color: ${colors.white};
      background: ${colors.black};
      height: auto;
      min-height: 200px !important;
      &:focus{
        outline: none;
        background: ${colors.indigo};
        border: none;
      }
    }
    .ck.ck-toolbar__separator{
      background: none;
    }
    .ck-tooltip{
      background: none !important;
    }
    .ck-button{
      background: none;
      &:hover{
        background: ${colors.indigo};
        span{
          background: ${colors.indigo};
        }
        svg{
          background: ${colors.indigo};
        }
      }
      .ck-button.ck-on{
        background: ${colors.indigo};
      }
    }
`
