import { Button, Spin } from 'antd';
import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import Compent from './Compent';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less';

const ReactGridLayout = WidthProvider(RGL);

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const {
      cols, dataList, layout, rowHeight, isDraggable, isResizable, isLazyLoading, isEditor, isEnlarge, isDelete,
    } = this.props;
    return {
      cols: cols || 1, // 默认几列
      dataList, // 自定义组件list
      layout, // layout布局,
      isCustomize: false, // 是否自己进行拖拽、缩放布局
      isDraggable: isResizable, // 是否可进行拖拽
      isResizable, // 是否可进行缩放
      rowHeight: rowHeight || 380, // 默认的行高
      isLazyLoading: isLazyLoading || true,
      isEditor,
      isEnlarge,
      isDelete,
    };
  }

  componentDidMount() {
    this.handleNewInter();
  }

  componentWillReceiveProps(nextProps) {
    const { dataList } = this.state;
    const { cols } = this.props;
    if (cols != nextProps.cols) {
      this.handleChangeCols(nextProps.cols);
    }
    if (JSON.parse(JSON.stringify(dataList)) != JSON.parse(JSON.stringify(nextProps.dataList))) {
      this.setState({
        // 防止add或者delete重新加载组件
        dataList: nextProps.dataList.map((v, index) => ({
          ...v,
          isRead: dataList[index] ? dataList[index].isRead : false,
        })),
        dataListChange: true,
      }, this.handleNewInter);
    }
  }

  handleNewInter = () => {
    const { isLazyLoading } = this.state;
    if (!isLazyLoading) return;
    var io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target, intersectionRatio } = entry;
        // 目标元素的可见比例大于0
        if (intersectionRatio) {
          // 取消监听，防止重复加载
          io.unobserve(target);
          const targetIndex = Number(target.getAttribute('data-index'));
          const { dataList } = this.state;
          this.setState({
            dataList: dataList.map((v, index) => (index == targetIndex ? { ...v, isRead: true } : v)),
          });
        }
      });
    }, {
      // 设置多个阈值，防止第一次没监听到
      threshold: [0.0001, 0.001, 0.01, 0],
      // 设置监听的根元素
      // root: document.getElementsByClassName('layout')[0]
    });
    // 监听，定时器为了保证能获取到最终的元素
    setTimeout(() => {
      document.getElementsByClassName('layout')[0].childNodes.forEach((element) => {
        io.observe(element);
      });
    }, 100);
  }

  layoutChange = (layout) => {
    const {
      cols, io, isDraggable, isResizable, dataListChange,
    } = this.state;
    // dataListChange组件数据更新，不重置新位置信息
    this.setState({
      layout: layout.map((v, i) => ({
        ...v,
        // minW: 1,
        // maxW: 1,
        isDraggable: v.i == 'add' ? false : isDraggable,
        isResizable: v.i == 'add' ? false : isResizable,
        // y: v.i == 'add' ? Infinity : Math.floor(i / cols),
        // x: v.i == 'add' ? Infinity : i % cols,
        y: Math.floor(i / cols),
        x: i % cols,
      })),
    }, () => {
      this.props.onLayoutChange(this.state.layout.filter((v) => v.i != 'add'));
    });
  }

  handleChangeCols = (propCols) => {
    const { cols, layout, isCustomize } = this.state;
    const type = propCols > cols ? 'add' : 'sub';
    // cols减少时重置isCustomize为false，保证下次cols时不错位
    // if (type == 'sub' && isCustomize) {
    //   this.setState({
    //     isCustomize: false
    //   })
    // }
    this.setState({
      cols: propCols,
    }, () => {
      // todo:更新cols时重置列排序
      // if (type !== 'add' || !isCustomize) {
      this.layoutChange(layout.filter((v) => !v.add).concat({
        i: String(layout.length),
        x: layout.length % cols,
        y: Math.floor(layout.length / cols),
        w: 1,
        h: 1,
        add: true,
        isDraggable: false,
        isResizable: false,
      }));
      // }
    });
  }

  handleDragCallBack = (layouts, newLayout, oldLayout) => {
    const { isCustomize } = this.state;
    if (!isCustomize) {
      if (newLayout.x != oldLayout.x || newLayout.y != oldLayout.y) {
        this.setState({
          isCustomize: true,
        });
      }
    }
  }

  handleResizeCallBack = (layouts, newLayout, oldLayout) => {
    const { isCustomize } = this.state;
    if (!isCustomize) {
      if (newLayout.w != oldLayout.w || newLayout.h != oldLayout.h) {
        this.setState({
          isCustomize: true,
        });
      }
    }
  }

  render() {
    const {
      cols, layout, isDraggable, isResizable, rowHeight, isEditor, isEnlarge, isDelete, isAdd, dataList,
    } = this.state;
    const newdataList = [...dataList];
    const { onDelete, onAdd } = this.props;
    typeof onAdd === 'function' && newdataList.push({ add: true });
    return (
      <>
        <ReactGridLayout
          className="layout"
          isDraggable={isDraggable || false}
          isResizable={isResizable || false}
          rowHeight={rowHeight || 180}
          layout={layout || []}
          onLayoutChange={this.layoutChange}
          cols={cols}
          isBounded
          measureBeforeMount
        // onDragStop={this.handleDragCallBack}
        // onResizeStop={this.handleResizeCallBack}
        // onResizeStop={resizeStop}
        // compactType='horizontal'
          verticalCompact // 是否需要垂直压实
          resizeHandles={['se', 'sw', 'nw', 'ne']}
        >
          {newdataList.map((v, index) => {
            if (v.add) return <div data-index={index} className="layout-div" key="add"><Button onClick={onAdd}>添加</Button></div>;
            return (
              <div className="layout-div" data-index={index} style={{ border: '1px solid' }} key={v.data}>
                {v.isRead ? (
                  <div>
                    <div className="action">
                      {isEnlarge && <span>放大</span>}
                      {isEditor && <span>编辑</span>}
                      {typeof onDelete === 'function' && <span onClick={() => onDelete(index)}>删除</span>}
                    </div>
                    <Compent data={v.num ? v.num + 1 : v.data + 1} />
                  </div>
                )
                // 'loading'
                  : <Spin className="center-spin" tip="加载中..." />}
              </div>
            );
          })}
        </ReactGridLayout>
      </>
    );
  }
}

export default React.memo(MyPage);
// export default MyPage;
