'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'
const ImagePicker = ({ label, name }) => {

    const imageInputRef = useRef()
    const [pickedImage, setPickedImage] = useState()
    const handlePickClick = (e) => {
        e.preventDefault()
        imageInputRef.current.click()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setPickedImage(null);
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }
    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
                </div>
                <input ref={imageInputRef}
                    className={classes.input}
                    type="file"
                    id={name}
                    accept='image/png, image/jpeg'
                    name={name}
                    onChange={handleImageChange}
                    required />
                <button onClick={handlePickClick} className={classes.button} type='button'>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker