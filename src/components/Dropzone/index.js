import React, { useMemo, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
}

const activeStyle = {
    borderColor: '#2196f3'
}

const acceptStyle = {
    borderColor: '#00e676'
}

const rejectStyle = {
    borderColor: '#ff1744'
}

const StyledDropzone = props => {

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone()

    useEffect(() => {
        props.setSelectedFiles(acceptedFiles)
    }, [acceptedFiles])


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ])

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
    ))

    return (
        <div>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Arraste e solte aqui os arquivos que deseja salvar.</p>
                <FontAwesomeIcon icon={faUpload} />
            </div>
            <h5>Arquivos:</h5>
            <ul>{files}</ul>
        </div>
    )
}

const mapStateToProps = store => {
    return{
        files: store.filesReducer,
    }
}

const mapDispatchToProps = dispatch => ({
    setSelectedFiles: files => dispatch(actions.setSelectedFiles(files)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledDropzone)