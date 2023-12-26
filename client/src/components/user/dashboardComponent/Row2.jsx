import { Box, Paper, Stack } from '@mui/material'
import React from 'react'
import Chart from './Chart'
import { fakeData, fakeDataRow2 } from '../../../util'
import Line from './Line'
import Pie from './Pie'
import { ResponsivePie } from '@nivo/pie'





export default function Row2() {
  return (
    <Stack spacing={1} direction={"row"} marginTop={3}>
        <Paper sx={{width:'67%',height:350}} elevation={6}>
                <Line />
        </Paper>
        <Paper sx={{width:'33%',height:350}} elevation={6}>
        <ResponsivePie
        data={fakeData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={3}
        arcLinkLabelsOffset={15}
        arcLinkLabelsStraightLength={20}
        arcLinkLabelsDiagonalLength={20}
        activeOuterRadiusOffset={8}
        startAngle={-220}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />       
        </Paper>
    </Stack>
  )
}
