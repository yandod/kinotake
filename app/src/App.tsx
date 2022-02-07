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
import KinokoPoplar from './data/kinokoPopular.json';
import TakenokoPoplar from './data/takenokoPopular.json';
import KinokoEmotion from './data/kinokoEmotion.json';
import TakenokoEmotion from './data/takenokoEmotion.json';
import KinokoAnnotation from './data/kinokoAnnotation.json';
import TakenokoAnnotation from './data/takenokoAnnotation.json';

import Emacs from './data/emacs.json';
import Vim from './data/vim.json';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ChartData from './ChartData';

const series = {
    kinotake: [
      Takenoko.meta.total_tweet_count,
      Kinoko.meta.total_tweet_count
    ],
    kinotakeTime: [
      {
        name: 'Takenoko',
        data: ChartData.formatToLine(Takenoko.data)
      },
      {
        name: 'Kinoko',
        data: ChartData.formatToLine(Kinoko.data)
      }
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
  },
  deepdive: {
    chart: {
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
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
            <TabList
             onChange={handleChange}
             aria-label="lab API tabs example"
             allowScrollButtonsMobile={true}
             variant="scrollable"
             >
              <Tab label="Kinoko vs Takenoko" value="1" wrapped/>
              <Tab label="time series" value="2" wrapped/>
              <Tab label="Kinoko deep dive" value="3"/>
              <Tab label="Takenoko deep dive" value="4"/>
              <Tab label="Emacs vs Vim" value="5" wrapped/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Paper>
              <Chart options={options.kinotake} series={series.kinotake} legend={legend} type="donut" width="100%" height="300px"/>
            </Paper>
            <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              >
              <Box>
                <h2> Kinoko </h2>
              <TwitterTweetEmbed tweetId={KinokoPoplar[0].id} options={{hideThread: true}}/>
              <TwitterTweetEmbed tweetId={KinokoPoplar[1].id} options={{hideThread: true}}/>
              <TwitterTweetEmbed tweetId={KinokoPoplar[2].id} options={{hideThread: true}}/>
              </Box>
              <Box>
                <h2>Takenoko</h2>
              <TwitterTweetEmbed tweetId={TakenokoPoplar[0].id} options={{hideThread: 'true'}}/>
              <TwitterTweetEmbed tweetId={TakenokoPoplar[1].id} options={{hideThread: 'true'}}/>
              <TwitterTweetEmbed tweetId={TakenokoPoplar[2].id} options={{hideThread: 'true'}}/>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
          <Paper>
              <Chart options={options.kinotake} series={series.kinotakeTime} legend={legend} type="line" width="100%" />
            </Paper>
          </TabPanel>
          <TabPanel value="3">
          <Paper>
              <h2>Orientation by phmlask</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(KinokoEmotion.orientation)} legend={legend} type="treemap" width="100%" height="300px"/>
              <h2>Representation by phmlask</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(KinokoEmotion.representative)} legend={legend} type="treemap" width="100%" height="300px"/>
              <h2>Annotation</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(KinokoAnnotation)} legend={legend} type="treemap" width="100%" height="300px"/>
            </Paper>
          </TabPanel>
          <TabPanel value="4">
          <Paper>
              <h2>Orientation by phmlask</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(TakenokoEmotion.orientation)} legend={legend} type="treemap" width="100%" height="300px"/>
              <h2>Representation by phmlask</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(TakenokoEmotion.representative)} legend={legend} type="treemap" width="100%" height="300px"/>
              <h2>Annotation</h2>
              <Chart options={options.deepdive} series={ChartData.formatToTreemap(TakenokoAnnotation)} legend={legend} type="treemap" width="100%" height="300px"/>
          </Paper>
          </TabPanel>
          <TabPanel value="5">
            <Paper>
              <Chart options={options.editor} series={series.editor} legend={legend} type="donut" width="100%" height="300px"/>
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
