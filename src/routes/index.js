import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import ActiveNoteList from '../app/active-note-list/active-note-list.component'
import ArchivedNoteList from '../app/active-note-list/active-note-list.component'
import BaseLayout from '../common/base-layout/base-layout.component'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' render={() => (<Redirect to='/active-notes' />)} /> 
          <Route exact path='/active-notes' component={ActiveNoteList} />
          <Route exact path='/archived-notes' component={ArchivedNoteList} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}