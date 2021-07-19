import { Button, Spin } from 'antd';
import React, { Component } from 'react';
import {
  ClearOutlined,
  RotateLeftOutlined,
} from '@ant-design/icons';
import RGL, { WidthProvider } from 'react-grid-layout';
import BraftEditor from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';
import Compent from './Compent';
import GridLayout from './GridLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';

import './index.less';

const controls = ['undo', 'redo', 'remove-styles', {
  key: 'remove-styles',
  title: '清除样式',
  text: <RotateLeftOutlined />,
}, 'text-color', 'headings', 'font-size', 'bold', 'italic', 'underline', 'strike-through', 'text-indent', 'text-align', 'list-ul', 'list-ol', {
  key: 'clear',
  title: '清除内容',
  text: <ClearOutlined />,
}, 'link', 'separator'];

// const excludeControls = ['line-height', 'superscript', 'subscript', 'emoji']

BraftEditor.use(ColorPicker({
  includeEditors: ['editor-with-color-picker'],
  theme: 'light', // 支持dark和light两种主题，默认为dark
}));

const ReactGridLayout = WidthProvider(RGL);

class MyPage extends Component {
  state = {
    cols: 3,
    dataList: [...Array(10)].map((_, i) => (
      { isRead: false, data: i }
    )),
    layout: [],
    editorState: BraftEditor.createEditorState('<p>点击插入时间变量<b>变量支持自动更新</b><p>'),
    isFocus: true,
  }

  handleChangeCols = (type) => {
    const { cols } = this.state;
    const newCols = type == 'add' ? cols + 1 : cols - 1;
    this.setState({
      cols: newCols,
    });
  }

  handleAdd = () => {
    const { dataList } = this.state;
    const newDataList = [...dataList];
    this.setState({
      dataList: newDataList.concat({
        isRead: true,
        data: dataList.length,
      }).map((v) => ({
        ...v,
        isRead: true,
      })),
    });
  }

  handleEditorBlur = (value) => {
    this.setState({
      // isFocus: false,
      outputHTML: value.toHTML(),
    });
  }

  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  handleEditorFocus = () => {
    this.setState({
      isFocus: true,
    });
  }

  handleShowModal = () => {
    console.log(1111, this);
  }

  handleLayoutChange = (layout) => {
    this.setState({
      layout,
    });
  }

  handleDelDom = (domIndex) => {
    const { dataList } = this.state;
    this.setState({
      dataList: dataList.filter((v, index) => index != domIndex),
    });
  }

  handleChangeData = () => {
    const { dataList } = this.state;
    this.setState({
      dataList: dataList.map((v) => ({
        ...v,
        num: Math.random(),
      })),
    });
  }

  handleHtmlClick = () => {
    this.setState({
      isFocus: true,
    });
  }

  render() {
    const {
      dataList, cols, layout, isFocus, outputHTML, editorState,
    } = this.state;
    return (
      <>
        <div>
          {isFocus
            ? (
              <BraftEditor
                id="editor-with-color-picker"
                onFocus={this.handleEditorFocus}
                onChange={this.handleEditorChange}
                value={editorState}
                onBlur={this.handleEditorBlur}
                controls={controls}
            // excludeControls={excludeControls}
            // readOnly={true}
                placeholder="1111"
                extendControls={[
                  'separator',
                  {
                    key: 'my-button', // 控件唯一标识，必传
                    type: 'component',
                    component: <div style={{ color: '#9A9A9A', float: 'right', padding: '12px 8px' }}>
                      输入变量：
                      <a onClick={this.handleShowModal}>时间</a>
                      <a onClick={this.handleShowModal}>指标</a>
                               </div>,
                  },
                ]}
              />
            ) : <div onClick={this.handleHtmlClick} dangerouslySetInnerHTML={{ __html: outputHTML }} />}
        </div>
        <div onClick={this.handleHtmlClick} dangerouslySetInnerHTML={{ __html: outputHTML }} />
        <Button disabled={cols >= 5} onClick={() => this.handleChangeCols('add')}>修改cols(+)</Button>
        <Button disabled={cols == 1} onClick={() => this.handleChangeCols('sub')}>修改cols(-)</Button>
        <Button onClick={this.handleChangeData}>changeDatalist</Button>
        <GridLayout
          dataList={dataList}
          layout={layout}
          cols={cols}
          isDraggable
          isResizable
          isEditor // 是否可编辑
          isEnlarge// 是否可放大
          onLayoutChange={this.handleLayoutChange}
          onAdd={this.handleAdd}// 要添加操作，直接传onAdd，类型必须为函数
          onDelete={this.handleDelDom}
        />
      </>
    );
  }
}

export default MyPage;
