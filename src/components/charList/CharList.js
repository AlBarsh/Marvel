import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        chars: [],
        offset: 210,
        newItemLoading: false,
        charsEnded: false
    }
    MarvelService = new MarvelService();
  
    componentDidMount() {
        
        this.onRequest()
        
    }
    onRequest = (offset) => {
        this.onCharListLoading();
        this.MarvelService.getAllCaracters(offset)
        .then(this.onCharListLoaded)
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onCharListLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            newItemLoading: false,
            charsEnded: ended,
            offset: offset + 9
        }))
    }
    
    render() {
        console.log(this.state)
        const {chars, offset, newItemLoading, charsEnded} = this.state;
        
        const elements =chars.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
                }
           return (<li className="char__item" key = {item.id}
                        onClick={() => this.props.onSelectedChar(item.id)}>
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>)
        }) 
        return (
            <div className="char__list">
                <ul className="char__grid">
                {elements}
                   
                </ul>
                <button className="button button__main button__long"
                        onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{'display': charsEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;