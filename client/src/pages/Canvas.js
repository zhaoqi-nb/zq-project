/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

class Canvans extends Component {
  ctx = null

  preview = null

  sPoint = {}

  ePoint = {}

  componentDidMount() {
    const canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d')
    this.preview = new Image()
    canvas.addEventListener('mousedown', this.handleMousedown);
    canvas.addEventListener('mousemove', this.handleMousemove);
    document.test.file.addEventListener('change', this.changeImg)
    canvas.addEventListener('mouseup', this.handleMouseup)
  }

  handleMouseup = (e) => {
    const canvas = document.querySelector('canvas');
    const { sPoint, restore, ePoint, ctx, preview } = this
    if (e.button === 0) {
      sPoint.drag = false;
      ePoint.x = e.offsetX;
      ePoint.y = e.offsetY;
      const imgData = ctx.getImageData(sPoint.x, sPoint.y, ePoint.x - sPoint.x, ePoint.y - sPoint.y); // 把裁剪区域的图片信息提取出来

      // ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

      // canvas.width = Math.abs(ePoint.x - sPoint.x); // 重置canvas的大小为新图的大小
      // canvas.height = Math.abs(ePoint.y - sPoint.y);
      // ctx.putImageData(imgData, 0, 0); // 把提取出来的图片信息放进canvas中
      // preview.src = canvas.toDataURL();
    } else if (e.button === 2) {
      restore();
    }
  }

  restore = () => {
    this.sPoint = {};
    this.ePoint = {};
    this.drawImage();
  }

  handleMousemove = (e) => {
    const { sPoint, ctx } = this
    const canvas = document.querySelector('canvas');
    if (e.button === 0 && sPoint.drag) {
      const nPoint = {
        x: e.offsetX,
        y: e.offsetY
      };
      ctx.save(); // clip要通过restore回复
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 画布全清
      this.drawImage(); // 绘制底图
      this.drawCover(); // 绘制阴影
      ctx.beginPath(); // 开始路径
      ctx.rect(sPoint.x, sPoint.y, nPoint.x - sPoint.x, nPoint.y - sPoint.y); // 设置路径为选取框
      ctx.clip(); // 截取路径内为新的作用区域
      this.drawImage(); // 在选取框内绘制底图
      ctx.restore(); // 恢复clip截取的作用范围
    }
  }

  handleMousedown = (e) => {
    const { sPoint } = this
    if (e.button === 0) {
      sPoint.x = e.offsetX;
      sPoint.y = e.offsetY;
      sPoint.drag = true;
    }
  }

  drawCover = () => {
    const { ctx } = this
    const canvas = document.querySelector('canvas');
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  changeImg = () => {
    const canvas = document.querySelector('canvas');
    const fr = new FileReader();
    const { drawImage, preview } = this
    fr.onload = function () {
      preview.src = this.result;
      canvas.width = preview.width;
      canvas.height = preview.height;
      drawImage();
    };
    const files = document.querySelector('input[type=file]').files[0];
    console.log(document.querySelector('input[type=file]').files)
    if (files) fr.readAsDataURL(files);
  }

  drawImage = () => {
    this.ctx.drawImage(this.preview, 0, 0);
  }

  render() {
    return (
      <>
        <form name="test">
          <input type="file" name="file" />
          <input type="submit" value="提交" />
        </form>
        <canvas width="0" height="0" />

      </>);
  }
}

export default Canvans;
