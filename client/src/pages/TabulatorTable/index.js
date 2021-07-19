import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tabulator from 'tabulator-tables';
import moment from 'moment';
import {
  Input, Row, Col, Select, Button, DatePicker,
} from 'antd';
import {
  MoreOutlined,
} from '@ant-design/icons';
import Compent from './Compent';

import 'tabulator-tables/dist/css/tabulator_simple.min.css';
import './index.css';

const { Option } = Select;

const InputEditor = function (cell, onRendered, success, cancel) {
  // cell - the cell component for the editable cell
  // onRendered - function to call when the editor has been rendered
  // success - function to call to pass the successfuly updated value to Tabulator
  // cancel - function to call to abort the edit and return to a normal cell

  // create and style input
  const input = document.createElement('div');
  console.log(document.getElementById('qwe'));
  // input.onblur =
  return input;
};

const headerMenu = [
  {
    label: 'Hide Column',
    action(e, column) {
      // column.hide();
      column.move('col');
    },
  },
];

const cellContextMenu = [
  {
    label(component) {
      // component - column/cell/row component that triggered the menu
      return '<Compent />'; // customise menu contents with row data
    },
    action(e, cell) {
      console.log(this);
      cell.setValue('');
    },
  },
];

const printIcon = function (cell, formatterParams, onRendered) { // plain text value
  console.log(formatterParams);
  return `<div>${cell.getValue()}</div>`;
};

class MyPage extends Component {
  state = {
    column: [
      {
        rowHandle: true,
        headerSort: false,
        // 是否冻结该列
        frozen: true,
        // 列是否可调整宽度
        resizable: false,
        formatter: 'rowSelection',
        titleFormatter: 'rowSelection',
        hozAlign: 'center',
        cellClick(e, cell) {
          cell.getRow().toggleSelect();
        },
        width: 30,
        minWidth: 30,
        //  formatter: function (cell, formatterParams, onRendered) {
        //   //cell - 单元格组件
        //   //formatterParams - 为列设置的参数
        //   //onRendered - 格式化程序时调用的函数已呈现

        //   return '<div style=color:red>...</div>'; //返回单元格内容；
        // },
      },
      {
        title: 'Name1',
        field: 'name',
        hozAlign: 'center',
        sortable: true,
        editor: true,
        // editor: InputEditor,
        cssClass: 'aaa',
        // 表头对齐方式
        headerHozAlign: 'center',
        headerClick(e, column) {
          // e - the click event object
          // column - column component
          // column.getTable().setColumns(),
          console.log(column, column.getTable().getEditedCells(), column.getElement().className += ' aaa');
        },
        // formatter: printIcon,
        // formatter: "handle",
        // editable根据不同的值来判断是否可编辑
        // editable: function (cell) {
        //   //获取行数据
        //   var data = cell.getRow().getData();
        //   console.log(data, cell)
        //   return data.age > 18; // 仅当年龄超过 18 岁时才允许编辑姓名单元格
        // },
        // columns: [
        //   { title: "Progress", field: "progress", hozAlign: "right", sorter: "number", width: 100, cssClass: 'aaa', },
        //   { title: "Rating", field: "rating", hozAlign: "center", width: 80 },
        //   { title: "Driver", field: "car", hozAlign: "center", width: 80 },
        // ],
        // formatter: "star",
        //  frozen: true
      },
      {
        title: 'Progress',
        field: 'progress',
        sorter: 'number',
        hozAlign: 'center',
        // headerMenu: headerMenu,
        // 右键点击的操作列表
        headerContextMenu: headerMenu,
        // 右键点击单元格
        contextMenu: cellContextMenu,
        // columns: [
        //   { title: "Name", field: "name", width: 200 },
        //   { title: "Age", field: "age", width: 200 }
        // ]
      },
      { title: 'Gender', field: 'gender', hozAlign: 'center' },
      { title: 'Rating', field: 'rating', hozAlign: 'center' },
      { title: 'Favourite Color', field: 'col', hozAlign: 'center' },
      { title: 'Date Of Birth', field: 'dob', hozAlign: 'center' },
    ],
    tabledata: [
      {
        id: 1, name: 'Billy Bob', progress: '12', gender: 'male', rating: 1, col: 'red', dob: '',
      },
      {
        id: 2, name: 'Mary May', progress: '1', gender: 'female', rating: 2, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 3, name: 'Mary May22', progress: '1223', gender: 'female114', rating: 22, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 4, name: 'Mary May4', progress: '1221', gender: 'female112', rating: 22, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 5, name: 'Mary May123', progress: '1222', gender: 'female111', rating: 22, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 6, name: 'Mary May33', progress: '1224', gender: 'female123', rating: 22, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 7, name: 'Mary May11', progress: '1222', gender: 'female112', rating: 22, col: 'blue', dob: '14/05/1982',
      },
      {
        id: 8, name: 'Mary May12', progress: '1221', gender: 'female131', rating: 22, col: 'blue', dob: '14/05/1982',
      },
    ],
  }

  handleCallBack = (value) => {
    console.log(this, value);
  }

  componentDidMount() {
    const { tabledata, column } = this.state;
    const { handleCallBack, dataUpdataCallBack } = this;
    const table = new Tabulator('#example-table', {
      headerHozAlign: 'center',
      // 编辑完成回掉
      cellEditCancelled(cell) {
        // cell - 单元组件
        console.log(cell, 3);
      },
      // 编辑
      cellEditing(cell) {
        // cell - 单元组件
        console.log(cell, 2);
      },
      cellEdited(cell) {
        console.log(cell, 1);
        // cell - cell component
      },
      minHeight: '200px',
      data: tabledata,
      // 列宽调整的回掉
      columnResized(column) {
        handleCallBack(this.getColumns().map((v) => v._column.width));
        // column - column component of the resized column
      },
      // 当一列隐藏和可见状态之间变化触发回调。
      columnVisibilityChanged(column, visible) {
        console.log(column);
        // column - 列组件
        // visible - 列是否可见 (true = visible, false = hidden)
      },
      // 自动生成columns
      // autoColumns: true,
      // layout: "fitColumns",
      virtualDomHoz: true,
      // 固定行
      // dataLoaded: function (data) { //在数据加载时冻结第一行
      //   var firstRow = this.getRows()[0];
      //   if (firstRow) {
      //     firstRow.freeze();
      //   }
      // },
      // groupBy: [],
      // sort: false,
      // 移动列
      movableColumns: true,
      // 移动行
      movableRows: true,
      // rowMoved: function (row) {
      //   console.log("Row: " + row.getData().name + " has been moved");
      // },
      autoResize: false,
      // 是否可以进行列宽调整
      resizableColumns: true,
      columnMinWidth: 160,
      columns: column,
      // 表头排序
      headerSort: false,
      // 可编辑行编辑后重新根据编辑后的值分组
      // groupUpdateOnCellEdit: true,
      // 排序、列宽、
      // persistenceID: "examplePerststance111",
      // persistence: {
      //   sort: true,
      //   filter: true,
      //   columns: true,
      // },
      columnMoved(column, columns) {
        console.log(column, columns);
      },
      // 初始化过滤器
      // initialFilter: [
      //   { field: "name", type: "like", value: "2" }
      // ]
      dataChanged(data) {
        console.log(data, this);
        dataUpdataCallBack(this);
      },
      // 记录历史操作
      history: true,
    });
    // 自定义分组所展示的内容
    table.setGroupHeader((value, count, data, group) => `${group._group.field}：${value} (${count} items)`);

    this.setState({
      table,
    });
    console.log(table);
  }

  dataUpdataCallBack = (table) => {
    this.setState({
      table,
    });
  }

  handleFilter = (key, value) => {
    // removeFilter删除现有过滤条件、getFilters获取现有过滤条件、clearFilter清除过滤器
    this.state.table.setFilter([
      { field: key, type: 'like', value },
    ]);
  }

  handleGroup = (value) => {
    this.state.table.setGroupBy(value);
  }

  handleHide = (value) => {
    if (!value) {
      this.state.table.getColumns().forEach((column) => {
        if (value.indexOf(column.getField()) >= 0) {
          column.show();
        }
      });
      return;
    }
    this.state.table.getColumns().forEach((column) => {
      if (value.indexOf(column.getField()) >= 0) {
        column.hide();
      } else column.show();
    });
  }

  handleUndo = () => {
    const { table } = this.state;
    table.undo();
    this.setState({
      table,
    });
  }

  handleRedo = () => {
    const { table } = this.state;
    table.redo();
    this.setState({
      table,
    });
  }

  handleAddColumn = () => {
    const { table } = this.state;
    // 第一个参数为新加的列的信息、第二个参数true表示现有列左侧，false为右侧、第三个参数为原来列的field值（位置）
    table.addColumn({ title: 'Age', field: 'age' }, true, 'name').then(function (column) {
      console.log(column, this);
    });
    // getColumns获取columns组件信息，getColumnLayout布局信息，getColumnDefinitions默认的
    console.log(table.getColumns(), table.getColumnLayout(), table.getColumnDefinitions());
    // const newColumn =
  }

  handleAddRow = () => {
    const { table } = this.state;
    // 第一个参数为新加的列的信息、第二个参数true表示现有列左侧，false为右侧、第三个参数为原来列的field值（位置）
    table.addRow({ title: 'Age', field: 'age' }, true, 'name');
    console.log(table.getColumns(), table.getColumnLayout(), table.getColumnDefinitions());
    // const newColumn =
  }

  render() {
    const { column, table } = this.state;
    return (
      <div>
        <Input id="qwe" ref="myTextInput" />
        <DatePicker className="qwe1" />
        <div style={{ margin: '10px 0' }}>
          筛选：
          <Input style={{ width: '200px' }} onBlur={(ev) => this.handleFilter('name', ev.target.value)} />
        </div>
        <div style={{ margin: '10px 0' }}>
          分组：
          <Select
            onChange={(value) => {
              this.handleGroup(value);
            }}
            mode="multiple"
            showArrow
            style={{ width: '300px' }}
          >
            {column.filter((v) => v.field).map((v) => <Option value={v.field}>{v.title}</Option>)}
          </Select>
        </div>
        <div style={{ margin: '10px 0' }}>
          隐藏列：
          <Select
            onChange={(value) => {
              this.handleHide(value);
            }}
            mode="multiple"
            showArrow
            style={{ width: '300px' }}
          >
            {column.filter((v) => v.field).map((v, index) => index && <Option value={v.field}>{v.title}</Option>)}
          </Select>
        </div>
        <Button type="primary" disabled={!table || (table && !table.getHistoryUndoSize())} onClick={this.handleUndo}>撤销</Button>
        <Button type="primary" disabled={!table || (table && !table.getHistoryRedoSize())} onClick={this.handleRedo}>重做</Button>
        <Button type="primary" onClick={this.handleAddColumn}>添加列</Button>
        <Button type="primary" onClick={this.handleAddRow}>添加行</Button>
        <div style={{ minWidth: '100%' }} id="example-table" />
      </div>
    );
  }
}

export default MyPage;
