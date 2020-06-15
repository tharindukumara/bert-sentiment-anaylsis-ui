import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Text } from 'grommet';


class BarChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: [this.props.positive, this.props.negative]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 130,
                    toolbar: {
                        show: false
                      },
                },
                
                labels: {
                    show: false
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                xaxis: {
                    categories: ['Positive', 'Negative'],
                    show: false,
                    visible: false,
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false,
                    }
                },
                yaxis: {
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                crosshairs: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                    offsetX: 0,
                },
            }
        };
    }

    render() {
        return (
            <Box width="200%">
                <Text>This is how the values!!!</Text>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={130} />
            </Box>
        );
    }
}

export default BarChat;
