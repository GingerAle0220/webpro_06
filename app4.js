const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = 'すり抜けなし星5が早めにあたる';
  else if( num==2 ) luck = 'すり抜けなし天井で星5があたる';
  else if(num==3) luck = 'すり抜けするけど早めに星5があたる';
  else if(num==4) luck = 'すり抜け＋１天井で星5が当たる';
  else if(num==5) luck = 'すり抜け＋２天井';
  else if(num==6) luck = '今日は引いたら死にます';
  res.send( '今日の運勢は' + luck + 'です' )
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = 'すり抜けなし星5が早めにあたる';
  else if( num==2 ) luck = 'すり抜けなし天井で星5があたる';
  else if(num==3) luck = 'すり抜けするけど早めに星5があたる';
  else if(num==4) luck = 'すり抜け＋１天井で星5が当たる';
  else if(num==5) luck = 'すり抜け＋２天井';
  else if(num==6) luck = '今日は引いたら死にます';
  res.render( 'omikuji2', {result:luck} );
});

app.get("/omikuji3", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) {luck = 'すり抜けなし星5が早めにあたる';
    comment = 'ガチャ石放出の時！';}
  else if( num==2 ) {luck = 'すり抜けなし天井で星5があたる';
    comment = 'いつも通りって感じ';}
  else if(num==3) {luck = 'すり抜けするけど早めに星5があたる';
    comment = 'まあ許せるよね';}
  else if(num==4) {luck = 'すり抜け＋１天井で星5が当たる';
    comment = 'ははは...こういう時もあるさー';}
  else if(num==5) {luck = 'すり抜け＋２天井';
    comment = 'スマホ叩き割りたい．ふざけるなー🤬';}
  else if(num==6) {luck = '今日は引いたら死にます';
    comment = '警告はしたよ？それでも君は引くんだね';}
  res.render( 'omikuji3',{result:luck,comment:comment} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
