import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Box } from '@mui/material'


// const data=[
//     {
//       "country": "AD",
//       "hot dog": 14,
//       "hot dogColor": "hsl(339, 70%, 50%)",
//       "burger": 102,
//       "burgerColor": "hsl(1, 70%, 50%)",
//       "sandwich": 159,
//       "sandwichColor": "hsl(329, 70%, 50%)",
//       "kebab": 159,
//       "kebabColor": "hsl(160, 70%, 50%)",
//       "fries": 184,
//       "friesColor": "hsl(139, 70%, 50%)",
//       "donut": 179,
//       "donutColor": "hsl(58, 70%, 50%)"
//     },
//     {
//       "country": "AE",
//       "hot dog": 81,
//       "hot dogColor": "hsl(333, 70%, 50%)",
//       "burger": 80,
//       "burgerColor": "hsl(85, 70%, 50%)",
//       "sandwich": 180,
//       "sandwichColor": "hsl(332, 70%, 50%)",
//       "kebab": 82,
//       "kebabColor": "hsl(203, 70%, 50%)",
//       "fries": 116,
//       "friesColor": "hsl(76, 70%, 50%)",
//       "donut": 78,
//       "donutColor": "hsl(341, 70%, 50%)"
//     },
//     {
//       "country": "AF",
//       "hot dog": 168,
//       "hot dogColor": "hsl(327, 70%, 50%)",
//       "burger": 135,
//       "burgerColor": "hsl(107, 70%, 50%)",
//       "sandwich": 141,
//       "sandwichColor": "hsl(259, 70%, 50%)",
//       "kebab": 11,
//       "kebabColor": "hsl(270, 70%, 50%)",
//       "fries": 71,
//       "friesColor": "hsl(258, 70%, 50%)",
//       "donut": 55,
//       "donutColor": "hsl(9, 70%, 50%)"
//     },
//     {
//       "country": "AG",
//       "hot dog": 58,
//       "hot dogColor": "hsl(296, 70%, 50%)",
//       "burger": 199,
//       "burgerColor": "hsl(103, 70%, 50%)",
//       "sandwich": 144,
//       "sandwichColor": "hsl(35, 70%, 50%)",
//       "kebab": 185,
//       "kebabColor": "hsl(233, 70%, 50%)",
//       "fries": 87,
//       "friesColor": "hsl(162, 70%, 50%)",
//       "donut": 188,
//       "donutColor": "hsl(273, 70%, 50%)"
//     },
//     {
//       "country": "AI",
//       "hot dog": 48,
//       "hot dogColor": "hsl(328, 70%, 50%)",
//       "burger": 120,
//       "burgerColor": "hsl(259, 70%, 50%)",
//       "sandwich": 190,
//       "sandwichColor": "hsl(22, 70%, 50%)",
//       "kebab": 168,
//       "kebabColor": "hsl(1, 70%, 50%)",
//       "fries": 146,
//       "friesColor": "hsl(18, 70%, 50%)",
//       "donut": 135,
//       "donutColor": "hsl(214, 70%, 50%)"
//     },
//     {
//       "country": "AL",
//       "hot dog": 36,
//       "hot dogColor": "hsl(300, 70%, 50%)",
//       "burger": 135,
//       "burgerColor": "hsl(152, 70%, 50%)",
//       "sandwich": 189,
//       "sandwichColor": "hsl(275, 70%, 50%)",
//       "kebab": 30,
//       "kebabColor": "hsl(12, 70%, 50%)",
//       "fries": 35,
//       "friesColor": "hsl(115, 70%, 50%)",
//       "donut": 191,
//       "donutColor": "hsl(214, 70%, 50%)"
//     },
//     {
//       "country": "AM",
//       "hot dog": 153,
//       "hot dogColor": "hsl(259, 70%, 50%)",
//       "burger": 7,
//       "burgerColor": "hsl(286, 70%, 50%)",
//       "sandwich": 92,
//       "sandwichColor": "hsl(106, 70%, 50%)",
//       "kebab": 176,
//       "kebabColor": "hsl(138, 70%, 50%)",
//       "fries": 41,
//       "friesColor": "hsl(241, 70%, 50%)",
//       "donut": 150,
//       "donutColor": "hsl(302, 70%, 50%)"
//     }
//   ]

export default function Barchart() {
    const Bardata=[
        {
          "country": "AD",
          "hot dog": 14,
          "hot dogColor": "hsl(339, 70%, 50%)",
          "burger": 102,
          "burgerColor": "hsl(1, 70%, 50%)",
          "sandwich": 159,
          "sandwichColor": "hsl(329, 70%, 50%)",
          "kebab": 159,
          "kebabColor": "hsl(160, 70%, 50%)",
          "fries": 184,
          "friesColor": "hsl(139, 70%, 50%)",
          "donut": 179,
          "donutColor": "hsl(58, 70%, 50%)"
        },
        {
          "country": "AE",
          "hot dog": 81,
          "hot dogColor": "hsl(333, 70%, 50%)",
          "burger": 80,
          "burgerColor": "hsl(85, 70%, 50%)",
          "sandwich": 180,
          "sandwichColor": "hsl(332, 70%, 50%)",
          "kebab": 82,
          "kebabColor": "hsl(203, 70%, 50%)",
          "fries": 116,
          "friesColor": "hsl(76, 70%, 50%)",
          "donut": 78,
          "donutColor": "hsl(341, 70%, 50%)"
        },
        {
          "country": "AF",
          "hot dog": 168,
          "hot dogColor": "hsl(327, 70%, 50%)",
          "burger": 135,
          "burgerColor": "hsl(107, 70%, 50%)",
          "sandwich": 141,
          "sandwichColor": "hsl(259, 70%, 50%)",
          "kebab": 11,
          "kebabColor": "hsl(270, 70%, 50%)",
          "fries": 71,
          "friesColor": "hsl(258, 70%, 50%)",
          "donut": 55,
          "donutColor": "hsl(9, 70%, 50%)"
        },
        {
          "country": "AG",
          "hot dog": 58,
          "hot dogColor": "hsl(296, 70%, 50%)",
          "burger": 199,
          "burgerColor": "hsl(103, 70%, 50%)",
          "sandwich": 144,
          "sandwichColor": "hsl(35, 70%, 50%)",
          "kebab": 185,
          "kebabColor": "hsl(233, 70%, 50%)",
          "fries": 87,
          "friesColor": "hsl(162, 70%, 50%)",
          "donut": 188,
          "donutColor": "hsl(273, 70%, 50%)"
        },
        {
          "country": "AI",
          "hot dog": 48,
          "hot dogColor": "hsl(328, 70%, 50%)",
          "burger": 120,
          "burgerColor": "hsl(259, 70%, 50%)",
          "sandwich": 190,
          "sandwichColor": "hsl(22, 70%, 50%)",
          "kebab": 168,
          "kebabColor": "hsl(1, 70%, 50%)",
          "fries": 146,
          "friesColor": "hsl(18, 70%, 50%)",
          "donut": 135,
          "donutColor": "hsl(214, 70%, 50%)"
        },
        {
          "country": "AL",
          "hot dog": 36,
          "hot dogColor": "hsl(300, 70%, 50%)",
          "burger": 135,
          "burgerColor": "hsl(152, 70%, 50%)",
          "sandwich": 189,
          "sandwichColor": "hsl(275, 70%, 50%)",
          "kebab": 30,
          "kebabColor": "hsl(12, 70%, 50%)",
          "fries": 35,
          "friesColor": "hsl(115, 70%, 50%)",
          "donut": 191,
          "donutColor": "hsl(214, 70%, 50%)"
        },
        {
          "country": "AM",
          "hot dog": 153,
          "hot dogColor": "hsl(259, 70%, 50%)",
          "burger": 7,
          "burgerColor": "hsl(286, 70%, 50%)",
          "sandwich": 92,
          "sandwichColor": "hsl(106, 70%, 50%)",
          "kebab": 176,
          "kebabColor": "hsl(138, 70%, 50%)",
          "fries": 41,
          "friesColor": "hsl(241, 70%, 50%)",
          "donut": 150,
          "donutColor": "hsl(302, 70%, 50%)"
        }
      ]

      const MyResponsiveBar = ({ data /* see data tab */ }) => (
        <ResponsiveBar
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    )
  return (
    <Box sx={{height:"75vh"}}>
    <MyResponsiveBar data={Bardata} />

    </Box>
  )
}
