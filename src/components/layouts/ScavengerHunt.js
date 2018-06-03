import React, { Component } from "react";
import PropTypes, { string, number } from "prop-types";
import { storage, database } from "../../utils/firebase";
import { Row, Col, FormGroup, HelpBlock } from "react-bootstrap";
import FaCheck from "react-icons/lib/fa/check";
import FaSpinner from "react-icons/lib/fa/spinner";
import styled, { keyframes } from "styled-components";

const UploadBtn = styled.label`
  input[type="file"] {
    display: none;
  }
`;

const Status = styled.div`
  position: relative;
  height: 16px;
`;

const ProgressWell = styled.div`
  background-color: #ccc;
  width: calc(100% - 21px);
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 4px;
  left: 0;
`;

const ProgressBar = styled.div`
  background-color: ${props => (props.progress < 100 ? `blue` : `green`)};
  width: ${props => `${props.progress}%`};
  height: 8px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Loading = styled(FaSpinner)`
  position: absolute;
  top: 0;
  right: 0;
  color: blue;
  animation: ${rotate} 1s linear infinite;
`;

const Checkmark = styled(FaCheck)`
  position: absolute;
  top: 0;
  right: 0;
  color: green;
`;

const Instructions = styled(HelpBlock)`
  text-align: center;
`;

const GalleryTitle = styled.h4`
  text-align: center;
`;

const Gallery = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const UploadedImg = styled.img`
  flex: 0 1 auto;
  height: auto;
  width: 300px;
  padding: 1rem;
`;

const saveObjValsInArr = object =>
  object
    ? Object.keys(object)
        .map(key => object[key])
        .reverse()
    : [];

const INITIAL_STATE = {
  fileSelected: false,
  fileName: "",
  progress: 0,
  uploadComplete: false,
  imgURL: "",
  uploadedImgs: [],
  userSubmitted: false
};

export default class ScavengerHunt extends Component {
  static contextTypes = {
    firebase: PropTypes.object.isRequired
  };

  static propTypes = {
    acf: PropTypes.shape({
      content: PropTypes.string.isRequired
    }),
    layoutIndex: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired
  };

  state = INITIAL_STATE;

  componentDidMount() {
    const { database } = this.context.firebase;
    const { pageTitle, path } = this.props;

    const titleOfPage = pageTitle
      .split(" ")
      .join("-")
      .toLowerCase();
    let imgRef = database().ref(`${path}/${titleOfPage}`);
    imgRef.on("value", snapshot =>
      this.setState({ uploadedImgs: saveObjValsInArr(snapshot.val()) })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthed !== this.props.isAuthed) {
      // User just logged in or out
      const { database } = this.context.firebase;
      const { pageTitle, path, isAuthed, uid } = this.props;
      if (isAuthed) {
        // User just logged in
        const titleOfPage = pageTitle
          .split(" ")
          .join("-")
          .toLowerCase();
        let uidRef = database().ref(`${path}/${titleOfPage}`);
        // Determine if user has submitted an image
        if (!!uid) {
          uidRef
            .orderByChild("uid")
            .equalTo(uid)
            .on("child_added", snapshot => {
              if (snapshot.exists()) {
                this.setState({ userSubmitted: true });
              }
            });
        }
      } else {
        // User just logged out
        this.setState({ userSubmitted: false });
      }
    }
  }

  componentWillUnmount() {
    const { database } = this.context.firebase;
    const { pageTitle, path } = this.props;
    const titleOfPage = pageTitle
      .split(" ")
      .join("-")
      .toLowerCase();
    database()
      .ref(`${path}/${titleOfPage}`)
      .off();
  }

  handleChange = file => {
    const { database, storage } = this.context.firebase;

    this.setState({ fileSelected: true, fileName: file.name });

    const pageTitle = this.props.pageTitle
      .split(" ")
      .join("-")
      .toLowerCase();

    let uploadTask = storage()
      .ref()
      .child(this.props.path)
      .child(pageTitle)
      .child(file.name)
      .put(file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = Math.round(
          snapshot.bytesTransferred / snapshot.totalBytes * 100
        );
        this.setState({ progress });
      },
      error => {
        // Handle unsuccessful upload
        console.log(error);
      },
      () => {
        // Handle successful upload
        console.log(`Successful Upload!`);
        this.setState({
          fileSelected: false,
          fileName: "",
          progress: 100,
          uploadComplete: true
        });
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState({ imgURL: downloadURL });
          let newImgKey = database()
            .ref()
            .child(this.props.path)
            .child(pageTitle)
            .push().key;
          const imgObject = {};
          imgObject[`${this.props.path}/${pageTitle}/${newImgKey}`] = {
            name: file.name,
            uid: this.props.uid,
            url: downloadURL
          };
          database()
            .ref()
            .update(imgObject);
        });
      }
    );
  };

  canBeSubmitted = () => {
    const { fileSelected, uploadComplete } = this.state;
    const { isAuthed } = this.props;

    if (fileSelected) {
      return false;
    } else if (uploadComplete) {
      return false;
    } else if (!isAuthed) {
      return false;
    } else {
      return true;
    }
  };

  buttonText = () => {
    const { fileSelected, uploadComplete } = this.state;

    if (fileSelected) {
      return `Uploading Screenshot...`;
    } else if (uploadComplete) {
      return `Upload Complete`;
    } else {
      return `Upload Screenshot`;
    }
  };

  render() {
    const isEnabled = this.canBeSubmitted();
    const buttonText = this.buttonText();

    return (
      <Row
        id={`layout-${this.props.layoutIndex}`}
        className={this.props.layoutName}
      >
        {this.props.acf.content && (
          <Col
            xs={12}
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: this.props.acf.content }}
          />
        )}
        {this.state.userSubmitted ? (
          <Col xs={12}>
            {!!this.state.uploadedImgs.length && (
              <ImgArray uid={this.props.uid} imgs={this.state.uploadedImgs} />
            )}
          </Col>
        ) : (
          <Col xs={12} sm={8} smOffset={2}>
            <form>
              <FormGroup controlId="fileUpload">
                <UploadForm
                  handleChange={this.handleChange}
                  isEnabled={isEnabled}
                  buttonText={buttonText}
                />
                <Instructions>
                  {this.state.fileSelected || this.state.uploadComplete ? (
                    <Status>
                      <ProgressWell>
                        <ProgressBar progress={this.state.progress} />
                      </ProgressWell>
                      {this.state.fileSelected &&
                        !this.state.uploadComplete && <Loading />}
                      {this.state.uploadComplete && <Checkmark />}
                    </Status>
                  ) : this.props.isAuthed ? (
                    `Please include your initials in the filename, e.g., ABC.png`
                  ) : (
                    `Sign up or login to submit an image.`
                  )}
                </Instructions>
              </FormGroup>
            </form>
          </Col>
        )}
      </Row>
    );
  }
}

const UploadForm = ({ handleChange, isEnabled, buttonText }) => {
  return (
    <UploadBtn className={`btn btn-block btn-primary`} disabled={!isEnabled}>
      {buttonText}
      <input
        type="file"
        accept="image/*"
        multiple={false}
        disabled={!isEnabled}
        onChange={event => handleChange(event.target.files[0])}
      />
    </UploadBtn>
  );
};

const ImgArray = ({ uid, imgs }) => {
  const userImg = imgs.filter(img => img.uid === uid)[0];
  const otherImgs = imgs.filter(img => img.uid !== uid);
  return (
    <div>
      <GalleryTitle>Your Submission</GalleryTitle>
      <Gallery>
        <div>
          <a href={userImg.href} target="_blank" rel="nofollow">
            <UploadedImg src={userImg.url} />
          </a>
          <p>{userImg.name}</p>
        </div>
      </Gallery>
      {otherImgs && (
        <div>
          <GalleryTitle>Other Submissions</GalleryTitle>
          <Gallery>
            {otherImgs.map((img, index) => (
              <div key={index}>
                <a href={img.url} target="_blank" rel="nofollow">
                  <UploadedImg src={img.url} />
                </a>
                <p>{img.name}</p>
              </div>
            ))}
          </Gallery>
        </div>
      )}
    </div>
  );
};
