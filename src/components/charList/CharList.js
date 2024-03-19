import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        chars: []
    }
    MarvelService = new MarvelService();
    newChars = (chars) => {
        this.setState({
            chars
        })
    }
    componentDidMount() {
        this.MarvelService.getAllCaracters()
        .then(this.newChars)
        
    }

    
    render() {
        console.log(this.state)
        const {chars} = this.state;
        
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;