import {useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charsEnded, setCharsEnded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const marvelService = new MarvelService();

    useEffect(() => {
        console.log('effect');
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCaracters(offset)
            .then(onCharListLoaded)
            .catch(onError)

    }
    const onCharListLoading = () => {
        setCharsEnded(true);

    }

    const onCharListLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true
        };

        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(newItemLoading => false);
        setCharsEnded(charsEnded => ended);
        setLoading(loading => false);
        setOffset(offset => offset + 9)
    }
    const onError = () => {
        setError(true);
        setLoading(loading => false);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
       
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

  
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onSelectedChar(item.id);
                        focusOnItem(i);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onSelectedChar(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(chars);

 const errorMessage = error ? <ErrorMessage/> : null;
 const spinner = loading ? <Spinner/> : null;
 const content = !(loading || error) ? items : null;

 return (
     <div className="char__list">
         {errorMessage}
         {spinner}
         {content}
         <button 
             className="button button__main button__long"
             disabled={newItemLoading}
             style={{'display': charsEnded ? 'none' : 'block'}}
             onClick={() => onRequest(offset)}>
             <div className="inner">load more</div>
         </button>
     </div>
 )
 }
 


CharList.propTypes = {
 onSelectedChar: PropTypes.func.isRequired
}


export default CharList;