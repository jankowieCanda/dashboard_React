import { useState } from 'react';
import './Description_Modal.scss';
import { changeDescriptions } from '../../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';

let favData = localStorage.getItem('favData');
let favs = JSON.parse(favData);


export const Descriptions_Modal = ({id, url, alt_description, setShowModal}) => {
    const dispatch = useDispatch()
    const [widthInput, setWidthInput] = useState('');
    const [heightInput, setHeightInput] = useState('');
    const [likesInput, setLikesInput] = useState('');
    const [createdInput, setCreatedInput] = useState('');
    let formData = {};
    
    
    formData.id = id;
    formData.url = url;
    formData.alt_description = alt_description;
    formData.width = widthInput;
    formData.height = heightInput;
    formData.likes = likesInput;
    formData.created = createdInput;
    console.log(formData);

    
    
    const handleClickEditDescription = (e) => {
        const btnId = e.target.id;
        if(btnId.match('save')) {
            dispatch(changeDescriptions(formData));
            console.log(formData)
            setShowModal(false);
            e.preventDefault();
        } else {
            setShowModal(false)
        }
        
        

    }
    
    const dialog_form = () => {
        

        return (
            <form value={formData} className="descriptions__modal_form" action='#' method="get" onChange={(e) => e.target.value}>
                <div className="form__boxAttribute">
                    <input value={id} type='hidden' name="id" id="id" />
                    <input value={url} type='hidden' name="url" id="url" />
                    <input value={alt_description} type='hidden' name="alt_description" id="alt_description" />
                    <label htmlFor="width"><span>Width:</span></label>
                    <input value={widthInput} type="text" name="width" id="width" onChange={(e) => setWidthInput(e.target.value)}/>
                </div>
                <div className="form__boxAttribute">
                    <label htmlFor="height"><span>Height:</span></label>
                    <input value={heightInput} type="text" name="height" id="height" onChange={(e) => setHeightInput(e.target.value)} />
                </div>
                <div className="form__boxAttribute">
                    <label htmlFor="likes"><span>Likes:</span></label>
                    <input value={likesInput} type="text" name="likes" id="likes" onChange={(e) => setLikesInput(e.target.value)} />
                </div>
                <div className="form__boxAttribute">
                    <label htmlFor="created"><span>Created at:</span></label>
                    <input value={createdInput} type="text" name="created" id="created" onChange={(e) => setCreatedInput(e.target.value)} />
                </div>
                <button id='save' className='btn form__btn form__btn_save' onClick={handleClickEditDescription}>Save Changes</button>
                <button id='discard' className='btn form__btn form__btn_discard' onClick={handleClickEditDescription}>Discard Changes</button>
            </form>
        );
    }

    return (
        <dialog className="descriptions__modal" id="dialog">{dialog_form()}</dialog>
    );
}
