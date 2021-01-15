import React from 'react';
import { Spin } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';

export default class BarReact extends React.Component {
  constructor(props) {
    super(props);
    this.initPie = this.initPie.bind(this);
  }

  componentDidMount() {
    this.initPie();
  }

  initPie() {
    const { option = {} } = this.props;
    const myChart = echarts.init(this.ID, 'light');
    myChart.setOption(option);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }

  componentDidUpdate() {
    this.initPie();
  }

  render() {
    const { width = '100%', height = '400px', loading = false } = this.props;
    return (
      <Spin spinning={loading}>
        <div
          ref={ID => {
            this.ID = ID;
          }}
          style={{ width, height }}
        />
      </Spin>
    );
  }
}
