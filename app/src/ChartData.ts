import Kinoko from './data/kinoko.json';
import Takenoko from './data/takenoko.json';
import KinokoPoplar from './data/kinokoPopular.json';
import TakenokoPoplar from './data/takenokoPopular.json';
import KinokoEmotion from './data/kinokoEmotion.json';
import TakenokoEmotion from './data/takenokoEmotion.json';


class ChartData {
    static dateFormat(dateString: string) {
        const date = new Date(Date.parse(dateString));
        return date.toISOString().slice(0, 10);
    }
    
    static formatToLine(data: { end: string, start: string, tweet_count: number }[]) {
        let lineData: Array<{ x: string, y: number }> = [];

        data.slice(0, 7).forEach((node) => {
            lineData.push({
                x: this.dateFormat(node.end),
                y: node.tweet_count
            });
        });
        return lineData;
    }

    static formatToTreemap( data: {[key: string]: number} ) {
        let treemapData: Array<{x: string, y: number}> = [];
        Object.entries(data).forEach(([key, value]) => {
            treemapData.push({
            x: key,
            y: value
          });
        });
        return [{ data: treemapData}] ;
    }


}

export default ChartData;