import React, { Component } from 'react'
import './App.css'
import { stack, area, curveBasis, stackOrderInsideOut, 
	stackOffsetSilhouette } from 'd3-shape'
import { range } from 'd3-array'
import { scaleLinear } from 'd3-scale'

class StreamGraph extends Component {
	render() {
		console.log(this.props.data.length)

		const dataLen = this.props.data.length

		{/* this initializes a blank array (of 30 elements) to store our data */}
		const stackData = range(dataLen).map(() => ({}))
		for (let x = 0; x < dataLen; x++) {
			this.props.data.forEach(country => {
				stackData[x][country.id] = country.data[x]
			})
		}
		const xScale = scaleLinear()
			.domain([0, dataLen])
			.range([0, this.props.size[0]])

		const yScale = scaleLinear()
			.domain([0, 60])
			.range([this.props.size[1], 0])

		const stackLayout = stack()
			.offset(stackOffsetSilhouette)
			.order(stackOrderInsideOut)
			.keys(Object.keys(stackData[0]))

		const stackArea = area()
			.x((d, i) => xScale(i))
			.y0(d => yScale(d[0]))
			.y1(d => yScale(d[1]))
			.curve(curveBasis)

		const stacks = stackLayout(stackData).map((d, i) => 
			<path
				key={"stack" + i}
				d={stackArea(d)}
				onMouseEnter={() => {this.props.onHover(this.props.data[i])}}
				style={{ fill: this.props.hoverElement === this.props.data[i]["id"] ?
						"#f7fcb9" : this.props.colorScale(this.props.data[i].launchday),
						stroke: "black", strokeOpacity: 0.25 }}
			/>)

		return <svg width={this.props.size[0]} height={this.props.size[1]}>
			<g transform={"translate(0," + (-this.props.size[1] / 2) + ")"}>
				{stacks}
			</g>
		</svg>
	}
}

export default StreamGraph