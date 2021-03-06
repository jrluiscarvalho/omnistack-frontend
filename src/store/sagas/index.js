import { all, takeLatest } from 'redux-saga/effects';

import { signIn, signOut } from './auth';
import { AuthTypes } from '../ducks/auth'

import {getTeams, createTeam} from './teams';
import { TeamTypes } from '../ducks/teams'

import { getProjects, createProject } from './projects';
import { ProjectsTypes } from '../ducks/projects'

export default function* rootSaga() {
    return yield all(
      [
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),

        takeLatest(TeamTypes.GET_TEAM_REQUEST, getTeams),
        takeLatest(TeamTypes.CREATE_TEAM_REQUEST, createTeam),

        takeLatest(TeamTypes.SELECT_TEAM, getProjects),
        takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
        takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),
      ]
    );
}