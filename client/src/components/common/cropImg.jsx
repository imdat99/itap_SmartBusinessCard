import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import css from './crop.module.css'

const CropImg = props => {

    const [scale_value, setscale_value] = useState(1);
    const [pickFile, set_pickFile] = useState({ openCropper: false, selectedImage: null, fileUploadErrors: null });
    const [userProfilePic, set_userProfilePic] = useState('');
    const [editor, set_editor] = useState(null);
    const setEditorRef = editor_ => set_editor(editor_);
    const onCrop = () => {
        if (editor !== null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            console.log(url)
            set_userProfilePic(url);
        }
    };
    const onScaleChange = (e) => {
        setscale_value((e.target.value / 10))
    }
    const profilePicChange = (e) => {
        const file = e.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            set_pickFile({ openCropper: true, selectedImage: e.target.files[0], fileUploadErrors: [] })
            console.log(pickFile)

        }
    };
    return (
        <>
            <input type="file" name="profilePicBtn" accept="image/png, image/jpeg" onChange={e => { profilePicChange(e) }} />

            <AvatarEditor
                className={css.custom}
                image={pickFile.selectedImage}
                width={150}
                height={150}
                border={0}
                borderRadius={125}
                ref={setEditorRef}
                color={[0, 0, 0, 0.3]} // RGBA
                scale={scale_value}
                rotate={0}
            />


            <input style={{ width: '250px' }} type="range" defaultValue={scale_value} name="points" min="10" max="50" onChange={e => { onScaleChange(e) }} />
            <button onClick={onCrop}>crop</button>
            <img src={userProfilePic} alt="" />
        </>
    )
}

CropImg.propTypes = {

}

export default CropImg
