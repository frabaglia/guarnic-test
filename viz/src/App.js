import { useState, useEffect } from 'react';
import { XYPlot, VerticalGridLines, HorizontalGridLines, LineSeries, XAxis, YAxis } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

function getRandomColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Colors({title, color}) {
  return <div style={{backgroundColor: color}}>{title}</div>
}

function App() {
  const generateLineSeries = (product, i) => <LineSeries key={i} stroke={product.color} title={product.name} data={product.prices.map( (price, day) => ({
    x: day,
    y: price
  }))}></LineSeries>
  const generateColors = (product, i) => <Colors title={product.name} color={product.color}></Colors>

  const [ data, setData ] = useState([]);
  const parseJson = (myJson) => {
    let arr = [];
    Object.keys(myJson).forEach(id => arr.push({
      ...myJson[id],
      color: getRandomColor()
    }));
    return arr
  }
  const getData = () => {
    fetch('30days.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .then(myJson => setData(parseJson(myJson)));
  }

  useEffect(() => {
    getData()
  }, [])

  return ([
    <XYPlot
      width={600}
      height={600}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {data && data.length > 0 && data.map(generateLineSeries)}
      <XAxis title="days" />
      <YAxis title="price" />
    </XYPlot>,
    data && data.length > 0 && data.map(generateColors)
  ]);
}

export default App;
