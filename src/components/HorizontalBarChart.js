import React from 'react';
import { Svg, Rect, G, Text as SvgText } from 'react-native-svg';

const userColors = {
  'ユーザーA': '#70a1ff',
  'ユーザーB': '#ff6348',
  'ユーザーC': '#ffa502',
  'ユーザーD': '#2ed573',
};

const HorizontalBarChart = ({ data, width, height }) => {
  const barHeight = 40;
  const chartWidth = width - 60; // padding for labels

  const maxValue = Math.max(...data.datasets[0].data);

  return (
    <Svg width={width} height={height}>
      <G>
        {data.datasets[0].data.map((value, index) => {
          const barWidth = (value / maxValue) * chartWidth;
          const userColor = userColors[data.labels[index]] || 'blue'; // デフォルトカラーを青に設定

          return (
            <G key={index}>
              <SvgText
                x="10" // ユーザー名の位置を調整
                y={index * (barHeight + 40) + 20}
                alignmentBaseline="middle"
                fontSize="12"
                fill="black"
              >
                {data.labels[index]}
              </SvgText>
              <Rect
                x="10" // グラフの位置をユーザー名に合わせる
                y={index * (barHeight + 40) + 40}
                width={barWidth}
                height={barHeight}
                fill={userColor}
              />
              <SvgText
                x={10 + barWidth / 2} // グラフの中間に配置
                y={index * (barHeight + 40) + 40 + barHeight / 2}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize="14"
                fill="#fff" // 白色で表示
                fontWeight="bold"
              >
                {value}
              </SvgText>
            </G>
          );
        })}
      </G>
    </Svg>
  );
};

export default HorizontalBarChart;
