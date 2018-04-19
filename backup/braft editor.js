import React, { Component } from 'react';
import fetch from 'dva/fetch';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import { api } from '../../utils/config';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    const { value } = this.state;
    const { onChange, ...props } = this.props;

    return (
      <BraftEditor
        contentFormat="html"
        initialContent={value}
        onChange={(v) => {
          if (!('value' in this.props)) {
            this.setState({ value: v });
          }
          onChange(v);
        }}
        media={{
          image: true, // 开启图片插入功能
          // video: true, // 开启视频插入功能
          uploadFn({ file, success, error }) {
            const formData = new FormData();
            formData.append('files', file);

            fetch(api.uploadURL, {
              method: 'POST',
              body: formData,
              headers: {
                'x-auth': localStorage.getItem('token'),
              },
            }).then(res => res.json())
              .then(({ files: [f] }) => success(f))
              .catch(error);
          },
          externalMedias: {
            image: true,
            // audio: true,
            // video: true,
          },
        }}
        {...props}
      />
    );
  }
}
