import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class Chart extends React.Component {
  // Some constants...
  barWidth = 100
  margin = [20, 20, 20, 20]

  componentDidMount() {
    this.createChart(this.props.data, this.props.size)
  }

  createChart(data, size) {
    const max = d3.max(data, d => d.value) // get max value from array, 2nd parameter is getter of value from object
    const node = d3.select(this.node) // select svg
    const yScale = d3
      .scaleLinear() // create linear scale (will be used to create proper ratio for values)
      .domain([max, 0]) // define min and max values
      .range([0, size[1]]) // define size in pixels

    const firstDate = new Date(data[0].month) // get first date in data
    const lastDate = new Date(data[data.length - 1].month) // get last date in data

    const xScale = d3
      .scaleTime() // create time scale for x axis
      .domain([firstDate, new Date(lastDate.setMonth(lastDate.getMonth() + 1))]) // set data ranges
      .range([0, (this.barWidth + 1) * data.length]) // set size in pixels

    const yAxis = d3.axisLeft(yScale).ticks(5) // create y axis with 5 shown values (ticks)
    const xAxis = d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)) // create x axis that shows value for every month

    node
      .append('g') // create container for y axis
      .call(yAxis) // draw y axis into svg
      .attr('transform', `translate(${this.margin[3]}, ${this.margin[0]})`) // move it by margins

    node
      .append('g') // craete container for x axis
      .call(xAxis) // draw x axis
      .attr(
        'transform',
        `translate(${this.margin[3]}, ${this.margin[0] + size[1]})` // move it into position
      )

    node
      .append('g') // container for bars
      .attr('class', 'bars') // add class name
      .attr('transform', `translate(${this.margin[3] + 1}, ${this.margin[0]})`) // move it by margins (+1 is to not overlay y axis)

    d3
      .select('.bars') // select g.bars
      .selectAll('rect') // select all rect nodes
      .data(data, d => d.value) // for each item in data select value
      .enter()
      .append('rect') // create rect for each item
      .style('fill', '#bada55') // set fill style
      .attr('x', (d, i) => i * (this.barWidth + 1)) // move item on x axis
      .attr('y', d => yScale(d.value)) // set y position by scaled value
      .attr('height', d => size[1] - yScale(d.value)) // set height
      .attr('width', this.barWidth) // and width
  }

  render() {
    // eslint-disable-next-line no-return-assign
    return (
      <svg
        ref={node => (this.node = node)}
        width={this.props.size[0] + this.margin[1] + this.margin[3]}
        height={this.props.size[1] + this.margin[0] + this.margin[2]}
      />
    )
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  size: PropTypes.arrayOf(PropTypes.number),
}

export default Chart
