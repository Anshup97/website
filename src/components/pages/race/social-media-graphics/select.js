import React, { useState, useEffect } from 'react'
import { Form, Select } from '~components/common/form'
import ShareCard from './share'

export default ({ separateStates, combinedStates, stateInfo }) => {
  const defaultState = {
    name: '-- Select a state --',
    childSlug: {
      slug: '',
    },
  }

  const [state, setState] = useState(defaultState)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location &&
      window.location.hash
    ) {
      const stateFilter = window.location.hash.replace('#', '')
      const foundState = stateInfo.find(node => node.state === stateFilter)
      if (foundState) {
        setState(foundState)
      }
    }
  }, [])

  stateInfo.sort((a, b) => (a.name > b.name ? 1 : -1))

  const names = stateInfo.map(node => node.name)

  names.unshift(defaultState.name) // prepend the default state to the list

  return (
    <Form>
      <Select
        label="State or territory"
        id="social-card-state"
        options={names}
        value={state.name}
        isRequired
        onChange={event => {
          if (event.target.value === '-- Select a state --') {
            setState(defaultState)
            return
          }
          const selectedState = stateInfo.find(
            node => node.name === event.target.value,
          )
          setState(selectedState)
          window.location.hash = `#${selectedState.state}`
        }}
      />
      {state.name !== '-- Select a state --' && (
        <ShareCard
          state={state}
          stateRaceData={
            separateStates.find(node => node.stateName === state.name) ||
            combinedStates.find(node => node.stateName === state.name)
          }
          combinedStates={combinedStates.map(node => node.state)}
          population={
            stateInfo.find(node => node.name === state.name).childPopulation
              .population
          }
        />
      )}
    </Form>
  )
}
