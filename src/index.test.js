import React from 'react'
import { shallow } from 'enzyme'

import Sidenav from './index'

const dummyElement = elValue =>
  React.createElement('li', { id: `id-${elValue}` }, elValue)

describe('Index', () => {
  let props

  beforeEach(() => {
    props = {
      sidenav: dummyElement('one'),
      children: dummyElement('two'),
      onSetOpen: jest.fn(),
      open: false
    }
  })

  it('renders without crashing', () => {
    const wrapper = shallow(
      <div>
        <Sidenav
          sidenav={props.sidenav}
          onSetOpen={props.onSetOpen}
          open={props.open}
        >
          {props.children}
        </Sidenav>
      </div>
    )

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('li').length).toBe(1)
  })
})
