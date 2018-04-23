import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart'
import worlddata from './world'
import WorldMap from './WorldMap'
import StreamGraph from './StreamGraph'
import { range, sum } from 'd3-array'
import { scaleThreshold } from 'd3-scale'
import { geoCentroid } from 'd3-geo'

const appdata = worlddata.features
  .filter(d => geoCentroid(d)[0] < -20)

const colorScale = scaleThreshold()
      .domain([5,10,20,30,50])
      .range(["#99d8c9","#66c2a4","#41ae76","#238b45","#005824"])

console.log(appdata.length)

appdata
  .forEach((d,i) => {
    const offset = Math.random()
    d.launchday = i
    d.data = range(appdata.length).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
  })

class App extends Component {
  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    this.onHover = this.onHover.bind(this)
    this.state = { screenWidth: 1000, screenHeight: 450}
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  onResize() {
    this.setState({ 
      screenWidth: window.innerWidth, 
      screenHeight: window.innerHeight - 120 })
  }

  onHover(d) {
    this.setState({ hover: d.id })
  }

  render() {
      return (
        <div className="App">
          {/*<div className="App-header">
            <h2>d3ia dashboard</h2>
          </div>*/}
        <div>
          {/* Cool, we can pass data directly to a custom-built visualization
          //   in an html element's tag*/}
          <StreamGraph hoverElement={this.state.hover} onHover={this.onHover}
            colorScale={colorScale} data={appdata} 
            size={[this.state.screenWidth, this.state.screenHeight / 2]} />

          <WorldMap hoverElement={this.state.hover} onHover={this.onHover}
            colorScale={colorScale} data={appdata} 
            size={[this.state.screenWidth / 2, this.state.screenHeight / 2]} />

          <BarChart hoverElement={this.state.hover} onHover={this.onHover}
            colorScale={colorScale} data={appdata} 
            size={[this.state.screenWidth / 2, this.state.screenHeight / 2]} />


          

        </div>
        
      </div>
    );
  }
}

export default App
