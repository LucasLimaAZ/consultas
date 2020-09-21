import React, { useEffect } from "react"
import { Col, Container, Row, Table } from "reactstrap"
import { connect } from "react-redux"
import * as actions from "../../store/actions"
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons"

const Files = props => {

    useEffect(() => {
        props.fetchFiles(1)
        props.setPageTitle("Material de Apoio")
    },[])

    return(
        <div className="box">
            <Row>
                <Col md={12}>
                    {
                        props.files.length > 0 ? 
                        (
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Arquivo: </th>
                                    <th>Paciente: </th>
                                    <th>Upload: </th>
                                    <th>Visualizar: </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.files.map(file => (
                                        <tr>
                                            <td>{file.name}</td>
                                            <td>Fulano da Silva</td>
                                            <td>{file.created_at}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <a href={file.path}>
                                                    <button className="btn edit-button">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table> 
                        ) :
                        (
                            <Loader className="loader" type="TailSpin" color="#17A2B8" height={100} width={100} />
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        files: store.filesReducer.files
    }
}

const mapDispatchToProps = dispatch => ({
    fetchFiles: page => dispatch(actions.fetchFiles(page)),
    setPageTitle: title => dispatch(actions.setPageTitle(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)