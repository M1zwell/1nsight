import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Chart } from 'react-chartjs-2';

const ChartComponent = ({ node }) => {
  const chartData = JSON.parse(node.attrs.data);
  return <Chart type={node.attrs.type} data={chartData} />;
};

export const ChartExtension = Node.create({
  name: 'chart',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      type: {
        default: 'bar',
      },
      data: {
        default: '{}',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'chart-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['chart-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ChartComponent);
  },
});