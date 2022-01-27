import React from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chart from 'react-apexcharts';
import Kinoko from './data/kinoko.json';
import Takenoko from './data/takenoko.json';
import Emacs from './data/emacs.json';
import Vim from './data/vim.json';

function dateFormat(dateString: string) {
  const date = new Date(Date.parse(dateString));
  return date.toISOString().slice(0, 10);
}

const series = {
    kinotake: [
      Takenoko.meta.total_tweet_count,
      Kinoko.meta.total_tweet_count
    ],
    kinotakeTime: [
      {
        name: 'Takenoko',
        data:[
        {x: dateFormat(Takenoko.data[0].end), y:Takenoko.data[0].tweet_count},
        {x: dateFormat(Takenoko.data[1].end), y:Takenoko.data[1].tweet_count},
        {x: dateFormat(Takenoko.data[2].end), y:Takenoko.data[2].tweet_count},
        {x: dateFormat(Takenoko.data[3].end), y:Takenoko.data[3].tweet_count},
        {x: dateFormat(Takenoko.data[4].end), y:Takenoko.data[4].tweet_count},
        {x: dateFormat(Takenoko.data[5].end), y:Takenoko.data[5].tweet_count},
        {x: dateFormat(Takenoko.data[6].end), y:Takenoko.data[6].tweet_count},
      ]},
      {
        name: 'Kinoko',
        data:[
        {x: dateFormat(Kinoko.data[0].end), y:Kinoko.data[0].tweet_count},
        {x: dateFormat(Kinoko.data[1].end), y:Kinoko.data[1].tweet_count},
        {x: dateFormat(Kinoko.data[2].end), y:Kinoko.data[2].tweet_count},
        {x: dateFormat(Kinoko.data[3].end), y:Kinoko.data[3].tweet_count},
        {x: dateFormat(Kinoko.data[4].end), y:Kinoko.data[4].tweet_count},
        {x: dateFormat(Kinoko.data[5].end), y:Kinoko.data[5].tweet_count},
        {x: dateFormat(Kinoko.data[6].end), y:Kinoko.data[6].tweet_count},
      ]}
    ],
    editor: [
      Emacs.meta.total_tweet_count,
      Vim.meta.total_tweet_count
    ]
  }
const labels = {
  kinotake: [
    'Takenoko',
    'Kinoko'
  ],
  editor: [
    'Emacs',
    'Vim'
  ]
}

const options = {
  kinotake: {
    labels: labels.kinotake
  },
  editor: {
    labels: labels.editor
  }
}

const legend = {
  show: true,
  position: 'top'
}

function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" scrollButtons={true} allowScrollButtonsMobile>
              <Tab label="Kinoko vs Takenoko" value="1" wrapped/>
              <Tab label="Kinoko vs Takenoko (time)" value="2" wrapped/>
              <Tab label="Emacs vs Vim" value="3" wrapped/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Paper>
              <Chart options={options.kinotake} series={series.kinotake} legend={legend} type="donut" width="100%" height="300px"/>
            </Paper>
          </TabPanel>
          <TabPanel value="2">
          <Paper>
              <Chart options={options.kinotake} series={series.kinotakeTime} legend={legend} type="line" width="100%" />
            </Paper>
          </TabPanel>
          <TabPanel value="3">
            <Paper>
              <Chart options={options.editor} series={series.editor} legend={legend} type="donut" width="400" />
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
