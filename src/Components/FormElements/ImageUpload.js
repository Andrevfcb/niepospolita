import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesValue, setImagesValue] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file && props.previewUrl) {
      console.log(props.previewUrl);
      const actualPrevievUrl = process.env.REACT_APP_AWS_URL + "/" + props.previewUrl
      setPreviewUrl(actualPrevievUrl)
    } else if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      let allImages = images
      fileReader.onload = () => {
        if (props.id === "images") {
          allImages.push(fileReader.result)
          setImages(allImages);
        }
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);
  
  const pickedHandler = event => {
    let pickedFile;
    let newImagesValue
    let fileIsValid = isValid;
    setImagesValue([
      ...imagesValue,
      event.target.files[0]
    ]);
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      newImagesValue = [
        ...imagesValue,
        pickedFile
      ]
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    let onInputImgValue
    if (props.id === "images") {onInputImgValue = newImagesValue} 
    else {onInputImgValue = pickedFile}
    
    props.onInput(props.id, onInputImgValue, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const deleteImage = (e) => {
    setSelectedId(e.target.id)
    const newImages = images
    const newImagesValue = imagesValue
    if (newImages.length > 0) {
    newImages.splice(e.target.id, 1);
    newImagesValue.splice(e.target.id, 1);
    setImages(newImages)
    setImagesValue(newImagesValue)
    setSelectedId(null)
    }
    let fileIsValid = isValid;
    if (newImagesValue.length > 1) {
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, newImagesValue, fileIsValid);
  };

  const imageArea = images.map((i, id) => 
  (<div style={{height: "100%", width: "100%"}} key={id}>
  <img src={i} alt="Preview" id={id} onClick={deleteImage}
  style={{cursor: 'pointer'}}/>
  </div>
  )
  )

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {props.id === "images" && images.length > 0 && imageArea}
          {!(props.id === "images") && previewUrl && <img src={previewUrl} alt="Preview" />}
          {props.id === "images" && !images.length > 0 && <p>Proszę wybrać zdjęcie produktu.</p>}
          {!(props.id === "images") && !previewUrl && <p>Proszę wybrać zdjęcie produktu.</p>}
          
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
