import React from 'react'
import { shallow } from 'enzyme'

import Sidenav from './index'

let props

const dummyElement = (elValue) => React.createElement('li', { id: 'li1' }, elValue)

describe('Index', () => {
  beforeEach(() => {
    props = {
      sidenav: dummyElement('one'),
      children: dummyElement('two'),
      onSetOpen: jest.fn(),
      open: false
    }
  })

  it('renders without crashing', () => {
    const wrapper = shallow(<div><Sidenav sidenav={props.sidenav} children={props.children} onSetOpen={props.onSetOpen} open={props.open} /></div>)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('li').length).toBe(1)

  })
})
