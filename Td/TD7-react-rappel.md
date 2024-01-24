# TD7 React JS et manipulation de l'arbre DOM HTML

## React et la création de Composant


* Organisation en composants
* Génération de html via la fonction render (jsx plutot que js)


Creation d'une application ReactJS
```bash
npx create-react-app my-app
cd my-app
npm start
```

## L'objet Component
```js
import React from 'react';
import '../css/my_css_component.css';
class SectionComponent  extends React.Component {
    render() {
      return (
            <section>
                <h3>Titre</h3>
                <p>
                    Ceci est un paragraph
                </p>
            </section>
      );
    }
}
```
## Des composants dans les Composants

```js
    import React from 'react';
    import Login from './component/login'
    import '../css/my_css_component.css';
    class SectionComponent  extends React.Component {
        render() {
        return (
                <section>
                    <h3>Titre</h3>
                    <!--Le composant login-->
                    <Login />
                </section>
        );
        }
    }

```

## Les propriétés via props

Le constructeur par défaut du Composant React à un attribut props (pour propriétés), il permet de transmettre des valeurs au composants *"fils"*.

```js
import React from 'react';
import '../css/my_css_component.css';
class MessageComponent  extends React.Component {
    constructor(props){
        this.message = props.content.message;
    }

    render() {
      return (
            <section>
                <h3>{this.props.content.title}</h3>
                <p>
                    {this.message}
                </p>
            </section>
      );
    }
}
```

Du côté du composant parent on transmet ces valeurs:




```js
import React from 'react';
import '../css/my_css_component.css';
class ListeMessageComponent  extends React.Component {
    constructor(props){
        // une liste de messages [{title:"", message:""}, ...]
        this.list_message = props.list_message
    }

    render() {
      return (
            <section className="list_message">
                {
                    this.list_message.map(
                        (value, index) => 
                        {
                            return <Message content={value} />
                        }
                    )
                }
            </section>
      );
    }
}
```

### L'état

```js
import React from 'react';
import '../css/my_css_component.css';
class MessageComponent  extends React.Component {
    constructor(props){
        this.title = props.content.title;
        this.message = props.content.message;
        this.author = props.info.author;

        this.add_friend = this.add_friend.bind(this);

        this.state = {
            follow: false
        }; 
    }

    add_friend(event){
        this.setState({
            follow: !this.state.follow
        });
    }

    render() {
        button_text = "Follow"
        if(this.state.follow):
            button_text = "Unfollow"
        return (
            <section>
                <h3>{this.title}</h3>
                <p>
                    {this.message}
                </p>
                <button onclick={onBlur={this.add_friend}}>{button_text}</button>
            </section>
        );
    }
}
```

### Les références

```js
constructor{
    this.myRef = React.createRef();
}

f(){
    dom_element = this.myRef.current;
}
render(){
    return (<p ref={this.myRef}></p>);
}
```


## Transmettre une information au composant parent

* Un état est visible par la classe seulement
* On ne veut transmettre que des propriétés

On peut transmettre une fonction dans les propriétés, celle-ci est executé dans le composant parent !!!

```js
// Dans le composant parent
f(){
    ...
}
render(){
    return (<ChildComponent callbackprops={this.f}/>);
}

// Dans le composant enfant
render(){
    return ( <p onClick={(event) => this.props.callbackprops()}></p>)
}
```
