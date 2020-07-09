import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import NoteList from '../app/note-list/note-list.component'
import BaseLayout from '../common/base-layout/base-layout.component'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' render={() => (<Redirect to='/NoteList' />)} /> 
          <Route exact path='/note-list' component={NoteList} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}