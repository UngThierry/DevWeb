# TD7 notes

## Question 1

```js 
import React from 'react';

// importer une feuille de style
import 'mon_fichier_css';


class Card extends React.Component{

    constructor(props){
        // attribut envoyé au composant lorsque l'on appel <Card symbol='toto'/>
        super(props);
        // this.props
    }
    render(){
        return (<div className="Card">{this.props.symbol}</div>)
    }
}

```


## Question 3


```js 
import React from 'react';

// importer une feuille de style
import 'mon_fichier_css';


class Card extends React.Component{

    constructor(props){
        // attribut envoyé au composant lorsque l'on appel <Card symbol='toto'/>
        super(props);
        // this.props
        this.state = {affichage: 'hidden'}
        // this.state = {affichage: this.props.affichage}
    }
    render(){
        return (<div className="Card">{this.props.symbol}</div>)
    }
}

```

## Question 4:
```js
render(){

    // if(this.state.affichage === 'visible')
    //     return (<div className="Card">{this.props.symbol}</div>);
    // else
    //     return (<div className="Card">----</div>);

    return (<div className="Card">{this.state.affichage === 'visible' ? this.props.symbol : '---'}</div>)


}
```


## Question 5

```js
class Card extends React.Component{

    constructor(props){
        // attribut envoyé au composant lorsque l'on appel <Card symbol='toto'/>
        super(props);
        // this.props
        this.state = {affichage: 'hidden'}
        // this.state = {affichage: this.props.affichage}
    }
    // changer l'état -> rappel render
    //     this.setState({
    //     follow: !this.state.follow
    // });
    change_affichage(){
        if(this.state.affichage === 'hidden')
            this.setState({affichage: 'visible'})
        else
            this.setState({affichage: 'hidden'})
    }

    render(){
        return (<div className="Card" onClick={(event) => this.change_affichage()} >{this.state.affichage === 'visible' ? this.props.symbol : '---'}</div>);


    }
}

export default Card;
```

## Question 2.1

```js
    <MonComposant ma_prop='toto' />

    // dans MonComposant props.ma_prop === 'toto'
```

```js
    import React from 'react';
    import Card from './Card';
    class CardList extends React.Component{
        constructor(props){
            super(props);

        }

        render(){
            return (
                <section>
                    <Card symbol='First' affichage='visible'/>
                    <Card symbol='Second' affichage='hidden' />
                    <Card symbol='Third' affichage='hidden'/>
                </section>
            );
        }
    }
```

Question 2.2
Soit une liste l = [1, 2, 3] -> <Comp attribut={1} /> <Comp attribut={2} /> <Comp attribut={3} />
```js
    l.map((element_list, index) => (<Comp attribut={element_list}>))
```



```js
    import React from 'react';
    import Card from './Card';
    class CardList extends React.Component{
        constructor(props){
            super(props);
            //definir la liste dans l'état
            this.state = { 
                'cards': [
                    {key:1, symbol:'First', affichage:'visible'},
                    {key:2, symbol:'Second', affichage:'hidden'},
                    {key:3, symbol:'Third', affichage:'hidden'},
                ]

            };
        }

        render(){
            return (
                <section className="cardlist">
                    {
                        this.state.cards.map((card, index) => (
                            <Card symbol={card.symbol} key={card.key} affichage={card.affichage} />
                        ))
                    }
                </section>
            );
        }
    }
```


Question 2.3


```js

ReactDOM.render(
    <PageCard />
  document.getElementById('root')
);
```

```js

ReactDOM.render(
  <React.StrictMode> // Debug pour l'async
    <PageCard />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Question 3.1

Methode 1 (deprecated):
<balise ref="toto"></balise>

Dans le reste du code 
 this.refs.toto


Methode 2 (reco):

constructor(){
    this.myRef = React.createRef();
};

f(){
    this.myRef.current // la balise
    this.myRef.current.value; // valeur dans l'input
}


render() { return (<input ref={this.myRef}/>)}


<select ref={this.my_ref}>
    <option value='A'> A</option>
    <option value='B'> B</option>
    <option value='C'> C</option>
</select>

```js
    import React from 'react';
    import Card from './Card';
    class AddCard extends React.Component{
        constructor(props){
            super(props);
            this.ref_input = React.createRef();
            this.ref_select = React.createRef();
        }

        nouvellecarte(){

        }

        render(){
            return (
                <div className="formaddcard"> 
                    <label> Symbole </label> <input ref={this.ref_input} type='text'/>
                    <label> Affichage </label> 
                    <select ref={this.ref_select}>
                        <option value='visible'> Visible </option>
                        <option value='hidden'> Cache </option>
                    </select>
                    <button onClick={(event) => this.nouvellecarte()}></button>
                </div>
            );
        }
    }
```

## Question 3.2

```js
    import React from 'react';
    import CardList from './CardList';
    import AddCard  from './AddCard ';
    class PageCard extends React.Component{

        render(){
            return (
                <div>
                    <CardList />
                    <AddCard />
                </div>
            )
        }

```

## Question 3.3


```js
    import React from 'react';
    import Card from './Card';
    class AddCard extends React.Component{
        constructor(props){
            super(props);
            this.ref_input = React.createRef();
            this.ref_select = React.createRef();
        }

        nouvellecarte(){
            var data_to_send = {
                symbol : this.ref_input.current.value,
                affichage : this.this.ref_select.current.value
            }
            this.props.addCard(data_to_send)
        }

        render(){
            return (
                <div className="formaddcard"> 
                    <label> Symbole </label> <input ref={this.ref_input} type='text'/>
                    <label> Affichage </label> 
                    <select ref={this.ref_select}>
                        <option value='visible'> Visible </option>
                        <option value='hidden'> Cache </option>
                    </select>
                    <button onClick={(event) => this.nouvellecarte()}></button>
                </div>
            );
        }
    }
```


```js
    import React from 'react';
    import CardList from './CardList';
    import AddCard  from './AddCard ';
    class PageCard extends React.Component{
        constructor(props){
            super(props);
            this.state = { 
                'cards': [
                    {key:1, symbol:'First', affichage:'visible'},
                    {key:2, symbol:'Second', affichage:'hidden'},
                    {key:3, symbol:'Third', affichage:'hidden'},
                ]

            };
        }

        addCard(card){
            card['key'] = this.state.cards.lenght;
            this.setState((state, props) => {
                state.cards = state.cards.concat(card);
                return state;
            })
        }

        render(){
            return (
                <div>
                    <CardList  cards={this.state.cards}/>
                    <AddCard  addCard={this.addCard}/>
                </div>
            )
        }

```



```js
    import React from 'react';
    import Card from './Card';
    class CardList extends React.Component{
        constructor(props){
            super(props);
            //definir la liste dans l'état
            this.state = { 
                'cards': this.props.cards
            };
        }

        componentWillReceiveProps(nextProps){
            this.setState({ 
                'cards': this.props.cards
            });
        }
        render(){
            return (
                <section className="cardlist">
                    {
                        this.state.cards.map((card, index) => (
                            <Card symbol={card.symbol} key={card.key} affichage={card.affichage} />
                        ))
                    }
                </section>
            );
        }
    }
```

//index.js
ReactDOM.render(<PageCard/>, document.getElementById("root"));


## Le cycle de vie des composant
* A la création
    * constructeur
    * componentWillMount (avant l'affichage du composant)
    * render -> affichage
    * componentDidMount

* Lors d'un changement d'état (setState)
    * shouldComponenentUpdate
    * component .....

* Lors d'un changement de propriétés
    * componentWillRecieveProps
    * shouldComponenentUpdate
    * component .....

## 4  (voir TME)
4.1 Composant formulaire connexion, logout, login...
4.2 Message, ListMessage, Research...
4.3 User, UserList ...

4.4 Dans MonApplication (le composant)
* si this.state.connect=False -> page connexion
* si this.state.connect=True -> page principal
* si this.state.connect=True, this.state.profil=123 -> page profil
 

```bash
npx create-react-app my-app
cd my-app
npm start
```