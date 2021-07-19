import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Row, Col, Input } from 'antd';
import { Editors, DraggableHeader, Data } from 'react-data-grid-addons';
import InputCom from './Input';

import './index.css';

// 分组的key
const groupBy = ['complete'];
// 列排序组件
const { DraggableContainer } = DraggableHeader;
// 编辑组件
const { DropDownEditor } = Editors;
const issueTypes = [
  { id: 'bug', value: 'Bug' },
  { id: 'epic', value: 'Epic' },
  { id: 'story', value: 'Story' },
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

const InputEditor = <InputCom options={issueTypes} />;

const handleFilterChange = (filter) => (filters) => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

class MyPage extends Component {
  state = {
    rows: [
      {
        id: 0, title: 'Task 1', issueType: 'Bug', complete: 20000,
      },
      {
        id: 1, title: 'Task 2', issueType: 'Story', complete: 40,
      },
      {
        id: 2, title: 'Task 3', issueType: 'Epic', complete: 60,
      },
      {
        id: 3, title: 'Task 4', issueType: 'Epic4', complete: 40,
      },
      {
        id: 4, title: 'Task 5', issueType: 'Epic5', complete: 20000,
      },
      {
        id: 5, title: 'Task 6', issueType: 'Epic6', complete: 60,
      },
    ],
    // draggable拖拽、sortable排序、editable编辑、resizable调整宽度
    columns: [
      {
        key: 'id', name: 'ID', editable: true, resizable: true, sortable: true, draggable: true,
      },
      {
        key: 'title', name: 'Title', editable: true, resizable: true, sortable: true, draggable: true,
      },
      {
        key: 'complete', name: 'Complete', editable: true, resizable: true, editor: InputEditor, sortable: true, draggable: true,
      },
      {
        key: 'issueType', name: 'Task Type', editable: true, resizable: true, editor: IssueTypeEditor, sortable: true, draggable: true,
      },
    ],
  };

  componentDidMount() {
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  setFilters = (value) => {
    this.setState({
      filters: value,
    });
  }

  sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
    console.log(rows, initialRows);
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer);
  };

  // 表头排序的回掉
  onHeaderDrop = (source, target) => {
    const stateCopy = { ...this.state };
    const columnSourceIndex = this.state.columns.findIndex(
      (i) => i.key === source,
    );
    const columnTargetIndex = this.state.columns.findIndex(
      (i) => i.key === target,
    );

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0],
    );

    const emptyColumns = { ...this.state, columns: [] };
    this.setState(emptyColumns);

    const reorderedColumns = { ...this.state, columns: stateCopy.columns };
    this.setState(reorderedColumns);
  };

  handleInputChange = () => {

  }

  RowRenderer = ({ renderBaseRow, ...props }) => {
    console.log(props, renderBaseRow);
    const color = props.idx % 2 ? 'green' : 'blue';
    return <div style={{ color }}>{renderBaseRow(props)}</div>;
  };

  render() {
    const { rows, columns } = this.state;
    const groupedRows = rows;
    console.log(groupedRows);
    return (
      <Row>
        <Input onBlur={this.handleInputChange} />
        <Col span={12}>
          <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
            <ReactDataGrid
            // 表格单元格填充、编辑的回掉
              onGridRowsUpdated={this.onGridRowsUpdated}
              columns={columns}
              rowGetter={(i) => groupedRows[i]}
              rowsCount={groupedRows.length}
              minHeight={1000}
            // 是否可编辑
              enableCellSelect
            // rowRenderer-行自定义渲染
              rowRenderer={this.rowRenderer}
              enableCellAutoFocus={false}
            // column宽度调整的回掉函数
              onColumnResize={(idx, width) => console.log(`Column ${idx} has been resized to ${width}`)}
            // EmptyRowsView-暂无数据时渲染的调用
              onGridSort={(sortColumn, sortDirection) => {
                console.log(this.sortRows(rows, sortColumn, sortDirection));
              }}
            />
          </DraggableContainer>
        </Col>
      </Row>
    );
  }
}

export default MyPage;
