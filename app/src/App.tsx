import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

import Kinoko from './data/kinoko.json';
import Takenoko from './data/takenoko.json';

const data = [
  { argument:'Takenoko', value:Takenoko.meta.total_tweet_count },
  { argument:'Kinoko', value:Kinoko.meta.total_tweet_count },
];

function App() {
  return (
    <div className="App">
      <Paper>
        <Chart
          data={data}
        >
          <PieSeries valueField="value" argumentField="argument" />
          <Title text="Kinoko vs Takenoko" />
          <Legend />
        </Chart>
      </Paper>
    </div>
  );
}

export default App;
