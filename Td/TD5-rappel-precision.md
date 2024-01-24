# Rappels et quelques précisions SQL
## I. Les requêtes Join 
 Considérons les table suivante :

**table users:**

| user_id(int) | user_name(varchar) |
|--------------|--------------------|
| 1            |           jean     |
| 20           |    marine          |
| 3            |   louise             |
| 7           |   arthur             |


**table ages:**

| user_id_age (int) | user_age(int) |
|--------------|----------|
| 1            |   32     |
| 20            |   24     |
| 3            |   37     |
| 7            |   192     |

Les tables sont crées de la manière suivante: 
```sql
CREATE TABLE users (user_id INTEGER PRIMARY KEY, user_name VARCHAR(256)
CREATE TABLE ages  (user_id_age INTEGER, user_age INTEGER, FOREIGN KEY(user_id_age) REFERENCES users(user_id));
INSERT INTO users VALUES (1, "jean"), (20, "marine"), (3, "louise"), (7,
"arthur");
INSERT INTO ages VALUES (1, 32), (2, 24), (3, 37), (4, 192);
```
### Trouver les utilisateurs de plus de 30 ans avec JOIN

Joindre les tables
```sql
SELECT * FROM users INNER JOIN ages ON users.user_id = ages.user_id_age;
```

| user_id | user_name(varchar) | user_id_age (int) | user_age |
|---------|--------------------|-------------------|----------|
|      1  |     jean|1|32|
|2|marine|2|24|
|3|louise|3|37|
|7|arthur|4|192|

Et enfin :
```sql
SELECT user_name FROM users INNER JOIN ages ON users.user_id = ages.user_id_age WHERE users.user_age < 30;
```

## II. Le rowid (Important)

La semaine dernière je n'ai pas parler du **rowid**: le rowid et un identifiant qui nous servira d'index à la place de l'utilisation d'un champ de type AUTOINCREMENT.


Si on execute la requête suivante sur la table précédente:
``` sql
SELECT ROWID, user_name FROM users;
```
| rowid | user_name(varchar) | 
|---------|--------------------|
|      1  |     jean|
|2|marine|
|3|louise|
|4|arthur|

On se servira dans la suite de cette identifiant, pour le from_id et to_id de la table friend.

```sql
CREATE TABLE IF NOT EXISTS friends(
    from_user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,
    since TIMESTAMP NOT NULL,
    PRIMARY KEY (from_user, to_user),
    FOREIGN KEY(from_user) REFERENCES users(rowid),
    FOREIGN KEY(to_user) REFERENCES users(rowid)
);
```
et la méthode Users.get() retournera le rowid.

``` javascript
    // la méthode est asynchrone car l'on veut utiliser await
    async get(login){
        return new Promise((resolve, reject) =>{
            // on prépare la requête
            let statement =
            this.database.prepare("SELECT ROWID FROM users WHERE user_login=?");
            // ron intéroge la bd
            statement.get([login], function (err, row){
                if(err){
                    console.error("SQL query error", err);
                    reject();
                }
                else{
                    // on applique le resolve sur le rowid (identifiant de la ligne)
                    resolve(row.rowid)
                }
            });
        });
    }
```


## III. La session

Pour les sessions on utilise la bibliothèque **"express-session"**, c'elle ci nus permet à moindre frais de stocker les informations de sessions comme le "rowid". Pour vérifier qu'une session est active, on vérifie la présence des valuers enregistrés lors de la connexion de l'utilisateur. De plus une session peut avoir une durée limité dans le temps, la bibliothèque noous permet de spécifié ce temps. Enfin, le client ne doit pas être capable de lire l'information stocké pour cela on encode les sessions à l'aide d'une clef.
Ci-dessous un exemple d'instanciation de l'objet session avec la clef et un temps de session maximal. L'option rolling permet de remttre à zero le temps lors d'une intéraction avec le server.

``` js
    app.use(session({
        genid: (req) => {
          console.log('Inside the session middleware')
          console.log(req.sessionID)
          return uuid() // use UUIDs for session IDs
        },
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
      }))
      
    // create the homepage route at pas obligatoire(pour tester) '/'
    app.get('/', (req, res) => {
        console.log('Inside the homepage callback function')
        console.log(req.sessionID)
        res.send(`You hit home page!\n`)
    })
```

Enfin, il faut vérifier pour certaines requête que l'utilisateur est bien connécté :
* Supprimer un utilisateur
* Ajouter/supprimer des amis

**example**

```js

function delete_service(req, res, users_instance){

    if(!req.session.user_id){
        res.status(401).send({
            "message": "You can not delete user you are not login on"
        });
        return;
    }
    user_id = req.session.user_id
    req.session.user_id = undefined
    users_instance.delete(user_id)
    .then((user_id) => { res.status(205).send({id: user_id})})
    .catch((err) => {res.status(500).send({"message": err.toString()})});
}
```

Aussi si des utilisateurs n'ont pas les mes droits avec des session plus ou moins longue, alors il ne faut pas utiliser **maxAge** et **rolling** mais manuellement remettre a jours les sessions.







