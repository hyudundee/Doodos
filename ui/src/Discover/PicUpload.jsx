import React from "react";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = window.ENV.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = window.ENV.CLOUDINARY_UPLOAD_URL;

export default class PicUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFileCloudinaryUrl: ''
        };
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    componentDidMount() {
        const { uploadedFileCloudinaryUrl } = this.state;
        if (uploadedFileCloudinaryUrl === '') this.loadData();
    }

    async loadData() {
        const { imageUrl, onFormerUrlChange } = this.props;
        if (imageUrl !== undefined) {
            this.setState({ uploadedFileCloudinaryUrl: imageUrl });
            onFormerUrlChange(imageUrl)
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
                const { onUrlChange } = this.props;
                onUrlChange(response.body.secure_url);
            }
        });
    }

    render() {
        return (
            <div style={{border: "1px dashed", textAlign: "center"}}>
                <div className="FileUpload">
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drop an image<br/> or <br/>click to select a file to upload. </p>
                            </div>
                        )}
                    </Dropzone>
                </div>
                <div>
                    {this.state.uploadedFileCloudinaryUrl === ''? null:
                        <div>
                            <img
                                style={{width: '100%'}}
                                src={this.state.uploadedFileCloudinaryUrl}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}
