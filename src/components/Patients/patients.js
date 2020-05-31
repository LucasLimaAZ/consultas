import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

const Patients = props => {

    useEffect(() => {
        props.setPageTitle("Gerenciar pacientes");
    });

    return(
        <h1 className="title">Gerenciar Pacientes</h1>
    );
}

const mapDispatchToProps = dispatch => ({
    setPageTitle: title => dispatch(actions.setPageTitle(title))
 });
 
 export default connect(null, mapDispatchToProps)(Patients);