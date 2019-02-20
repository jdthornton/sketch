import React from 'react';
const COLORS = [
  "#111111", //Black
  "#AAAAAA", //Gray
  "#FFFFFF", //White
  "#001f3f", //Navy
  "#0074D9", //Blue
  "#7FDBFF", //Aqua
  "#39CCCC", //Teal
  "#3D9970", //Olive
  "#2ECC40", //Green
  "#01FF70", //Lime
  "#FFDC00", //Yellow
  "#FF851B", //Orange
  "#FF4136", //Red
  "#85144b", //Maroon
  "#F012BE", //Fuchsia
  "#B10DC9" //Purple
]

import styles from './index.css';

const ColorMenu = ({currentColor, chooseColor}) =>
  <div className={styles.container}>
    {COLORS.map(color =>
      <div
        className={styles.item}
        style={{backgroundColor: color, border: color == currentColor ? '1px solid teal' : '1px solid #d0d0d0'}}
        onClick={() => {chooseColor(color)}}
        key={color}
      ></div>
    )}
  </div>

export default ColorMenu
