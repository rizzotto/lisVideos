import React, { useMemo } from 'react';
import {useDropzone} from 'react-dropzone'
import './Upload.css'

export default function Upload({onUpload}) {
  
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'video/*',
    onDropAccepted: files => onUpload(files)
  });

  const dragActive = {
    borderColor: '#78e5d5',
    
  }

  const dragReject = {
    borderColor: '#e57878'
  } 

  const defaultColor = {
    borderColor: '#ddd'
  } 
  const style = useMemo(() => ({
    ...defaultColor,
    ...(isDragAccept && dragActive),
    ...(isDragReject && dragReject)
  }), [
    isDragAccept,
    isDragReject,    
    defaultColor,
    dragActive,
    dragReject
  ]);

  function renderDragMessage(isDragAccept, isDragReject){
    if(isDragAccept){
      return <p className="success">Drop files here...</p>
    }
    if(isDragReject){
      return <p className="reject">File not supported</p>
    }

    return <p className="default">Drag and drop files here, or click to select files</p>
  }
  
  return (
    <div className="dropContainer" {...getRootProps({style})}>
          <input  {...getInputProps()} />
          {renderDragMessage(isDragAccept, isDragReject)}
    </div>
  );
}
