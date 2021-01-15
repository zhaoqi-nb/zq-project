import React from 'react';
import { Spin } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/chart/pie';

class PieReact extends React.Component {
  constructor(props) {
    super(props);
    this.initPie = this.initPie.bind(this);
  }

  componentDidMount() {
    this.initPie();
  }

  componentDidUpdate(prevProps) {
    this.initPie(prevProps);
  }

  initPie(prevProps) {
    const { option = {} } = this.props; // 外部传入的data数据
    const myChart = echarts.init(this.ID, 'light'); // 初始化echarts

    // 设置options
    myChart.setOption(option);
    myChart.on('click', param => {
      if (this.props.onClick) this.props.onClick(param);
    });
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    if (prevProps) {
      if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
        myChart.resize();
      }
    }
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
export default PieReact;
