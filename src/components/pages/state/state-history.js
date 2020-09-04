import React from 'react'
import { Th, Td, Table } from '~components/common/table'
import { FormatNumber, FormatDate } from '~components/utils/format'
import stateHistoryStyle from './state-history.module.scss'
import { FieldName } from '~components/utils/field-name'

const StateHistory = ({
  history,
  testColumn = 'totalTestResults',
  testUnits = 'People',
}) => (
  <Table>
    <thead>
      <tr>
        <Th alignLeft>Date</Th>
        <Th>New Tests</Th>
        <Th>Cases</Th>
        <Th>Negative</Th>
        <Th>Pending</Th>
        <Th>Hospitalized</Th>
        <Th>Deaths</Th>
        <Th>
          <FieldName
            field={testColumn === 'posNeg' ? 'totalTestResults' : testColumn}
          />
          {testColumn === 'posNeg' && <> ({testUnits})</>}
        </Th>
      </tr>
    </thead>
    <tbody className={`state-history-table ${stateHistoryStyle.history}`}>
      {history.map(node => (
        <tr key={`history-${node.date}`}>
          <Td alignLeft>
            <FormatDate
              date={node.date}
              format="ccc LLL d yyyy"
              timezone={false}
            />
          </Td>
          <Td>
            <FormatNumber number={node.totalTestResultsIncrease} />
          </Td>
          <Td>
            <FormatNumber number={node.positive} />
          </Td>
          <Td>
            <FormatNumber number={node.negative} />
          </Td>
          <Td>
            <FormatNumber number={node.pending} />
          </Td>
          <Td>
            <FormatNumber number={node.hospitalized} />
          </Td>
          <Td>
            <FormatNumber number={node.death} />
          </Td>
          <Td>
            <FormatNumber number={node.totalTestResults} />
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default StateHistory
