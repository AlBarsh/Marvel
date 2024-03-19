import { Component } from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import Skeleton from  '../skeleton/Skeleton';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }
    marvelService = new MarvelService();
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }
    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        } 
        this.onCarLoading()

        this.marvelService
            .getCaracter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false
            
        })
    }
    onCarLoading = () => {
        this.setState({
            loading: true
        })
    }
    onError = () => {
        this.setState({
            loading:false,
            error:true,
        })
    }
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        const skeleton = (errorMessage || spinner || char) ? null : <Skeleton/>

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.map((item, i) => {
                        return (
                            <li key = {i} className="char__comics-item">
                        {item.name} 
                    </li>
                        )
                    })}
                    
                   
                </ul>
        </>
    )
}
export default CharInfo;