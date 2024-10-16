import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartComponent = ({ node }: NodeViewProps) => {
  const chartData = node.attrs.data;

  return (
    <NodeViewWrapper className="chart">
      <div style={{ width: '100%', height: '300px' }}>
        <Bar data={chartData} />
      </div>
    </NodeViewWrapper>
  );
};