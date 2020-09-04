import React, { useState } from 'react'
import isUrl from 'is-url'
import { Form, Input, Select, List, Textarea } from '~components/common/form'
import Alert from '~components/common/alert'

const VolunteerForm = () => {
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [url, setUrl] = useState(false)
  const [skill, setSkill] = useState(false)
  const [timezone, setTimezone] = useState(false)
  const [projects, setProjects] = useState(false)
  const [urlValid, setUrlValid] = useState(false)

  const isComplete = () =>
    name && email && url && skill && timezone && projects && urlValid

  return (
    <Form
      method="POST"
      name="volunteer"
      action="/contact/volunteer-success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="volunteer" />
      <Input
        label="Name"
        type="text"
        name="name"
        id="name"
        isRequired
        onChange={event => setName(event.target.value)}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        id="email"
        onChange={event => setEmail(event.target.value)}
        isRequired
        detailText="If possible, this should be a Gmail or Google-linked address,
              since we rely heavily on Google Docs and Sheets. We will show your
              email internally to other volunteers but will not share it
              elsewhere."
      />

      <Input
        label="URL"
        type="text"
        name="url"
        id="url"
        isRequired
        onChange={event => {
          setUrl(event.target.value)
          setUrlValid(isUrl(event.target.value))
        }}
        detailText="Personal website, LinkedIn, or other website that will tell us
              about you."
      />

      {!urlValid && url && (
        <div>
          <Alert>The link you provided is not a valid URL.</Alert>
        </div>
      )}

      <Select
        label="About how many hours are you available to volunteer each week?"
        name="hours"
        id="hours"
        options={[
          '-- Select hours per week -- ',
          '1-5',
          '5-10',
          '10-20',
          '20-30',
          '30-40',
          '40+',
        ]}
        isRequired
      />

      <Select
        label="What time zone are you in?"
        name="timezone"
        id="timezone"
        options={[
          '-- Select time zone --',
          'Pacific',
          'Mountain',
          'Central',
          'Eastern',
          'Other',
        ]}
        isRequired
        onChange={event => {
          setTimezone(event.target.value !== '-- Select time zone --')
        }}
      />

      <List
        label="When are you most available to volunteer?"
        isRequired
        options={[
          { value: 'weekdays', label: 'Weekdays' },
          { value: 'mornings', label: 'Weekday mornings' },
          { value: 'evenings', label: 'Weekday evenings' },
          { value: 'weekends', label: 'Weekends' },
        ]}
        type="checkbox"
        name="availability"
      />

      <Input
        label="Specializations / Skills"
        type="text"
        name="skills"
        id="skills"
        isRequired
        onChange={event => setSkill(event.target.value)}
        detailText="Examples: Python, SQL, Tableau, data viz, editing, social media,
              public health, research, journalism, etc."
      />

      <List
        label="What would you like to volunteer to do?"
        isRequired
        type="radio"
        options={[
          {
            value: 'data',
            label:
              "I'd like to help build data tools, collect data, or analyze data.",
          },

          {
            value: 'website',
            label: "I'd like to help design or build your website.",
          },

          {
            value: 'writing',
            label:
              "I'd like to help write content, monitor news sources, or do original journalism.",
          },
        ]}
        id="workstream"
        name="workstream"
      />

      <Textarea
        label="What kinds of projects or tasks would you most like to help with?"
        inputtype="text"
        name="why"
        id="why"
        rows="5"
        isRequired
        onChange={event => setProjects(event.target.value)}
      />

      <Input
        label="I was referred by ..."
        type="text"
        id="referred"
        name="referred"
      />

      {!isComplete() && (
        <div>
          <Alert>Please complete all fields marked as required.</Alert>
        </div>
      )}

      <div style={{ display: 'none' }}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&#8217;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>

      <button
        disabled={!isComplete()}
        aria-disabled={!isComplete()}
        type="submit"
      >
        Apply to volunteer
      </button>
    </Form>
  )
}

export default VolunteerForm
