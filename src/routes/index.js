import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import BaseLayout from '../common/base-layout/base-layout.component'
import ActiveNoteList from '../app/active-note-list/active-note-list.component'
import ArchivedNoteList from '../app/archived-note-list/archived-note-list.component'
import FilteredNoteList from '../app/filtered-note-list/filtered-note-list.component'


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' render={() => (<Redirect to='/active-notes' />)} /> 
          <Route exact path='/active-notes' component={ActiveNoteList} />
          <Route exact path='/archived-notes' component={ArchivedNoteList} />

          <Route exact path='/search' component={FilteredNoteList} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}