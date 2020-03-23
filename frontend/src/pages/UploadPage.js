import React, { Component } from "react";
import './UploadPage.css'
import FileList from '../components/FileList'
import Upload from '../components/Upload'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import api from '../services/api'

class UploadPage extends Component {

  state = {
    uploadedFiles: []
  };

  
  
  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };
  
  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("/upload", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };
  
  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  async componentDidMount() {
    const response = await api.get("/names");
    let middle = []
    let info = []
    response.data.map(item => {
      middle = item.filename.split('-')
      info.push({
        filename: middle[1],
        id: item.id,
        size: item.size
      })

    })
    
    this.setState({
      uploadedFiles: info.map(file => ({
        id: file.id,
        name: file.filename,
        readableSize: filesize(file.size),
        uploaded: true,

      }))
    });
  }


  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  handleDelete = async uploadedFile => {
    console.log(uploadedFile)
    await api.delete(`delete/${uploadedFile.id}`)

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== uploadedFile.id)
    })
  }

 
  render(){
    const { uploadedFiles } = this.state;

    return(

      <div className="outside">
        <div className="container">
          <div className="content">     
            <Upload onUpload={(files)=>{this.handleUpload(files)}}/>
            { !!uploadedFiles.length && (
              <FileList files={uploadedFiles} onDelete={(uploadedFile) => this.handleDelete(uploadedFile)}/>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default UploadPage;
