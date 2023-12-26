import { ResponsivePie } from '@nivo/pie'
import React from 'react'

export default function Chart({fakeData,scheme}) {
  return (
    <ResponsivePie
                    data={fakeData}
                    margin={{ left:70,top: 2.5,bottom:2.5 }}
                    innerRadius={0.7}
                    padAngle={0.7}
                    cornerRadius={3}
                    arcLinkLabelsOffset={5}
                    arcLinkLabelsStraightLength={0}
                    arcLinkLabelsDiagonalLength={5}
                    startAngle={-220}
                    // colors={{ scheme: scheme }}
                    // enableArcLinkLabels={false}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                    fill={[
                      {
                        match: {
                          id: "ruby",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "c",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "go",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "python",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "scala",
                        },
                        id: "lines",
                      },

                      {
                        match: {
                          id: "javascript",
                        },
                        id: "lines",
                      },
                    ]}
                  />
  )
}
