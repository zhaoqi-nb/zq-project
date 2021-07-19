/**
 * Created by yongyuehuang on 2017/8/5.
 */
import React from 'react';
import echarts from 'echarts/lib/echarts'; // 必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';

export default class LineReact extends React.Component {
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
    myChart.setOption(option, true);
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
    const { width = '100%', height = '400px' } = this.props;
    return (
      <div
        ref={(ID) => {
          this.ID = ID;
        }}
        style={{ width, height }}
      />
    );
  }
}
