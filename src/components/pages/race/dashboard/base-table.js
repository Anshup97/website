import React from 'react'
import { StateTable, StateTableHeader, StateTableBody } from './table'

const BaseTable = ({ data, type, noPositives, noDeaths, rows }) => {
  return (
    <StateTable>
      <StateTableHeader
        groupTitle={type}
        noPositives={noPositives}
        noDeaths={noDeaths}
      />
      <StateTableBody
        noPositives={noPositives}
        noDeaths={noDeaths}
        state={data.name}
        stateAbbr={data.state}
        type={type}
        rows={rows}
      />
    </StateTable>
  )
}

export default BaseTable
