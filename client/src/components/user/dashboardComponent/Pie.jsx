import { ResponsiveBar } from '@nivo/bar'
import React, { useMemo } from 'react'
import { fakeDataPie } from '../../../util'

export default function Pie() {
const data=useMemo(()=>{
    return [
        {
            "year": "2021",
            "sofas": 62,
            "dresser":90,
            "bed":50,
            "chairs":100
            
          },
          {
            "year": "2022",
            "sofas": 52,
            "tables":50,
            "chairs":180,
            
           
          },
        {
          "year": "2023",
          "sofas": 88,
          "tables":150,
          "chairs":250,
          'lighting':90,
          'accessories':66
         
        },
        {
          "year": "2024",
        //   "sales": 177,
        
          
        },
        {
            "year": "2025",
            // "sales": 177,
          },
          {
            "year": "2026",
            // "sales": 177,
            
          },
          {
            "year": "2027",
            // "sales": 177,
            
            
          },
        
      ]
},[])


  return (
   
    <ResponsiveBar
    data={data}
    keys={[
        'sofas',
        'tables',
        'bed',
        'dresser',
        'wall decors',
        'chairs',
        'lighting',
        'accessories',
        'desks'
        
    ]}
    indexBy="year"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'category10' }}
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
        legend: 'year',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'sales of products',
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
}
