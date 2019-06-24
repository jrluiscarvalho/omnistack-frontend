import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectsActions from '../../store/ducks/projects'
import MembersActions from '../../store/ducks/members'

import {Container, Project} from './style';
import Modal from '../../components/Modal'
import Members from '../../components/Members'
import Button from '../../styles/components/Button'


class Projects extends Component {

  state = {
    newProject: ''
  }

  componentDidMount(){
    const {getProjectsRequest, activeTeam} = this.props;

    if(activeTeam) {
      getProjectsRequest()
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleCreateProject = e => {
    e.preventDefault();

    const {createProjectRequest} = this.props;
    const {newProject} = this.state;

    createProjectRequest(newProject)
  }

  render() {

    const {activeTeam, openProjectModal, closeProjectModal, projects, openMembersModal, members} = this.props;
    const {newProject} = this.state;

    if(!activeTeam) return null;
    return(
      <Container>
        <header>
          <h1>
            {this.props.activeTeam.name}
          </h1>
          <div>
            <Button onClick={openProjectModal}>+ Novo</Button>
            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects.data.map(p => (
          <Project key={p.id}>
            <p>{p.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar Projeto</h1>

            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange}/>

              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button onClick={closeProjectModal} size="small" color="gray'">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}

        {members.membersModalOpen && <Members />}

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  members: state.members,
  projects: state.projects
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...ProjectsActions, ...MembersActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);