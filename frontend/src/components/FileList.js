import React from 'react';
import 'react-circular-progressbar/dist/styles.css'
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md'
import './FileList.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import {uniqueId} from 'lodash'

const FileList = ({ files, onDelete }) => {
  return (
    <div>
      <ul >
        {/* {console.log(files)} */}
        {files.map(uploadedFile => (
          <li className="list" key={uniqueId()}>
            <div className="fileInfo">
              <div >
                <strong>{uploadedFile.name}</strong>
                  <span>{uploadedFile.readableSize} 
                  {/* fazer deletar um arquivo */}
                    <button onClick={() => onDelete(uploadedFile)}>Delete</button>
                  </span> 
              </div>
            </div>

            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: {width: 24},
                    path: {stroke: '#0096D6'}
                    
                  }}
                  strokeWidth={10}
                  value={uploadedFile.progress}
                />
              )}
              {uploadedFile.url && (
                <a href="https://cdn.pixabay.com/photo/2016/08/17/04/43/template-1599667_960_720.png" >
                  <MdLink style={{marginRight: 8}} size={24} color={'#222'}/>
                </a>
              )}
              {uploadedFile.uploaded && <MdCheckCircle size={24} color={'#78e5d5'}/>}
              {uploadedFile.error && <MdError size={24} color={'#e57878'}/>}

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;

