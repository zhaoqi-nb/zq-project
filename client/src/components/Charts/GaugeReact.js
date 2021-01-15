import React, { Component } from 'react';
import { Spin } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';

class GaugeReact extends Component {
  constructor(props) {
    super(props);
    this.initPie = this.initPie.bind(this);
  }

  componentDidMount() {
    this.initPie();
  }

  componentDidUpdate() {
    this.initPie();
  }

  initPie() {
    const { option = {} } = this.props; // 外部传入的data数据
    const myChart = echarts.init(this.ID, 'light'); // 初始化echarts

    // 设置options
    myChart.setOption(option);
    myChart.on('mouseover', param => {
      if (this.props.onMouseover) this.props.onMouseover(myChart, param);
    });
    myChart.on('mouseout', param => {
      if (this.props.onMouseout) this.props.onMouseout(myChart, param);
    });
    window.addEventListener('resize', () => {
      myChart.resize();
    });
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
export default GaugeReact;
