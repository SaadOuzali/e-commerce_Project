import React, { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
export default function Line() {

const data=useMemo(()=> {
    return [
        {
          "id": "Orders",
          "color": "hsl(107, 70%, 50%)",
          "data": [
            {
              "x": "January",
              "y": 109
            },
            {
              "x": "February",
              "y": 16
            },
            {
              "x": "March",
              "y": 139
            },
            {
              "x": "May",
              "y": 199
            },
            {
              "x": "June",
              "y": 149
            },
            {
              "x": "July",
              "y": 57
            },
            {
              "x": "Aughust",
              "y": 189
            },
            {
              "x": "September",
              "y": 189
            },
            {
              "x": "October",
              "y": 162
            },
            {
              "x": "November",
              "y": 197
            },
            {
              "x": "December",
              "y": 163
            },
            
          ]
        }
      ]
},[])

  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Mounth',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'category10' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}
