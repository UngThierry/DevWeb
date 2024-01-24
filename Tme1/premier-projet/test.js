const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const articles = [{ title:'Example'}];
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/articles', (req, res, next)=>{
    console.log("liste des articles");
    res.send(articles);
});
// Test: http http://localhost:3000/articles

app.post('/articles', (req, res, next)=>{
    console.log("Création d'un article");
    articles.push(req.body);
    console.log(articles)
    res.send(req.body);
});
// Test: http http://localhost:3000/articles title=Toto

// Code accès un article
app.get('/articles/:id', (req, res, next)=>{
    console.log("Accès article", req.params.id);
    res.send(articles[req.params.id]);
});
// Test: http http://localhost:3000/articles/0
// ou http http://localhost:3000/articles/0 si on a déjà fait un ajout

// Code suppression un article
app.delete('/articles/:id', (req, res, next)=>{
    console.log("Suppression article", req.params.id);
    articles.splice(req.params.id, 1); // suppression d'un élément dans un tableau
    res.send(articles);
});
// Test: http DELETE http://localhost:3000/articles/0
// on voit ensuite avec http http://localhost:3000/articles que
// l'article a disparu

app.listen(app.get('port') ,()=>{
    console.log('App started on port ', app.get('port'));
});
module.exports=app;