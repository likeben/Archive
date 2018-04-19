import React from 'react';
import xss from 'xss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { api } from '../../utils/config';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const htmlToState = (html) => {
  if (typeof html !== 'string') {
    return;
  }
  const contentBlock = htmlToDraft(html);
  if (!contentBlock) {
    return;
  }
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  return EditorState.createWithContent(contentState);
};

const stateToHtml = (editorState) => {
  return xss(draftToHtml(convertToRaw(editorState.getCurrentContent())), {
    onIgnoreTagAttr: (tag, name, value) => {
      if (name === 'style') {
        return `${name}="${xss.escapeAttrValue(value)}"`;
      }
    },
  });
};

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);

    let editorState = htmlToState(props.value);
    editorState = editorState || EditorState.createEmpty();

    this.state = { editorState };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const editorState = htmlToState(nextProps.value);

      if (editorState) {
        this.setState({ editorState });
      }
    }
  }

  onEditorStateChange = (editorState) => {
    if (!('value' in this.props)) {
      this.setState({ editorState });
    }

    const value = stateToHtml(editorState);
    this.props.onChange(value);
  };

  render() {
    const { editorState } = this.state;
    const { auth, toolbar } = this.props;

    const uploadImageCallBack = (file) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', api.uploadURL);
        const data = new FormData();
        data.append('file', file);
        data.append('userId', auth.userId);
        data.append('sessionToken', auth.sessionToken);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve({ data: { link: response.data.url } });
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      });
    };

    const toolbarImageConfig = {
      uploadCallback: uploadImageCallBack,
      alt: {
        present: false,
        mandatory: false,
      },
    };

    const toolbarCustom = {
      ...toolbar,
      image: auth ? toolbarImageConfig : false,
    };

    return (
      <Editor
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
        toolbar={toolbarCustom}
        localization={{
          locale: 'zh',
        }}
        onEditorStateChange={this.onEditorStateChange}
        editorState={editorState}
      />
    );
  }
}


export default EditorComponent;
