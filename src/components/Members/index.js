import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';
import Button from '../../styles/components/Button';
import { MembersList } from './style';

class Members extends Component {
  render() {
    return (
      <Modal size="big">
        <h1>Membros</h1>

        <form>
          <MembersList>
            <li>
              <strong>Diego Fernandes</strong>
            </li>
          </MembersList>
          <Button onClick={this.props.closeMembersModal} filled={false} color="gray">
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);


export default connect(null, mapDispatchToProps)(Members)