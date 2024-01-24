# TD8 Réalisation du jeu du pendu avec ReactJs

npx create-react-app lenomdemonapp

# Question 1: 
Dessin de l'application (voir mattermost)


# Question 2

Le set :
```js
> x = new Set(['a', 'b'])
Set { 'a', 'b' }
> x
Set { 'a', 'b' }
> x.add('c')
Set { 'a', 'b', 'c' }
> y = x.add('c')
Set { 'a', 'b', 'c' }
> y
Set { 'a', 'b', 'c' }
> y.has('e')
false
> y.has('a')
true
```


* Game (ou Pendu)
    * l'état : {
        nb_victories: integer,
        nb_defeats: integer,
        wordToGuess: str,
        letterTried: Set()
        maxLetterTries: integer
    }
    * tryLetter : quand onClick sur lettre
    * checkVictory : vérifie la victoire/défaite de l'utilisateur
    * render -> rendu des autres composants

* Keyboard
    * props [alphabet, letterTried, tryLetter (function)]
    * render -> affichage des lettres

* Letter
    * props [letter, tryletter, alreadyTried]
    * render si alreadyTried '-' sinon letter

* Word 
    * props [wordToGuess, letterTried]
    * render affiche les lettres du mot qui sont dans letterTried

* Score
    * props [nb_victories, nb_defeats, nbRemainingLetter]


# Question 3:

## Le composant Game

this.setState((state) => ({
    a:5,
    b:6
}))
this.setState({
    a:5,
    b:6
})

```js
import React from 'react';

import Keyboard from './KeyBoard';
import Word from './Word';

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            wordToGuess: 'mot',
            lettersTried: new Set(),
            nb_victories: 0,
            nb_defeats:0,
            nbTries:0
        };
        this.tryLetter = this.tryLetter.bind(this);
    }
    tryLetter(letter){
        this.setState((state)=>{
            lettersTried: state.lettersTried.add(letter),
            nbTries: state.lettersTried.size + 1
        }, () => checkVictory());
    }


    checkVictory(){
        const {wordToGuess, lettersTried} = this.state;
        const wordToGuessSet = new Set(this.state.wordToGuess.split(''));
        const intersect = new Set([...wordToGuessSet].filter(i => lettersTried.has(i)));
        if(intersect.size === wordToGuessSet.size){
            alert('Victory');
        }
        if(this.state.nbTries > 10){
            alert('Defeat');
        }
    }
    ComponentDidUpdate(prevProps, prevState){
        checkVictory()
    }

    render(){
        return (
            <div>
                <Word lettersTried={this.state.lettersTried} wordToGuess={wordToGuess}/>
                <Keyboard lettersTried={this.state.lettersTried} tryLetter={this.tryLetter}>
            </div>
        )
    }

}

export default Game;
```

```js
import React from 'react';
import Letter from './Letter'

class Keyboard extends React.Component{
    
    constructor(props){
        super(props);
        this.alphabet = 'azertyuiopqsdfghjklmwxcvbn'.split('');// ->['a', 'z'.....]
    }

    render(){
        return (<div className="keyboard">
        {this.alphabet.map((letter, index) => <Letter key={letter} letter={letter}
                                         alreadyTried={this.props.letterTried.has(letter)}
                                         tryLetter={() =>  this.props.tryLetter(letter)}/>
                                         
        )}
        </div>
        )

    }

}


export default Keyboard;
```


```js
import React from 'react';


class Letter extends React.Component{
    

    render(){
        return (<button onClick={this.props.tryLetter} disabled={this.props.alreadyTries} >
            {this.props.alreadyTries? '-': this.props.letter}
        </button>
        );

    }

}


export default Letter;
```


```js
import React from 'react';


const Word = props => {
    // comme dans la fonction render
    return ( <div> {
        props.WordToGuess.split('').map(letter => 
        <span key={letter}> 
            {props.lettersTried.has(letter)? letter: '*'} 
        </span> )
    }
    </div>
    )
}



export default Word;
```

