const express = require("express");
const app = express();
//app.use("/public", express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
  { id:7, code:"HANA", name:"廣岡花駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2",(req,res) => {
  res.render('keiyo2',{data:station2});
});

app.get("/keiyo2/create",(req,res)=>{
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number",(req,res) =>{
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail',{id:number,data:detail});
});

app.get("/keiyo1", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});


// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

app.get("/keiyo_add",(req,res)=>{
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = {id: id,code: code,name: name};
  station.push(newdata);
  res.redirect('/public/keiyo_add.html');
});



let aknai = [
  { star:6, job:"前衛", codename:"アイリーニ",job2:"剣豪",birth:"1月3日",CV:"釘宮理恵",personal_history:"アイリーニは、イベリアの大審問官ダリオの弟子であり、以前まで自身も審問官の職に就いていた。彼女はイベリアの歴史、法律、人文、地理などに関して豊かな知識を有している。「狂人号」事件以降、アイリーニは審問官の職を辞して、ケルシー直々の推薦により、現在は裁判所のトランスポーターとしてロドスとの協力協定を結び、海からの脅威に備えている。",my_comment:"私が語る一番の魅力は声が大変可愛らしいということです。厳格な審問官というイメージとはかけ離れた可愛い声に骨抜きになり、このゲームを始めました。戦闘面でも敵の防御力を一定数無視して攻撃してくれるのでどこにでも起用できますし、スキル3の高火力は使っていて楽しいです。（見た目について触れるならば頭上に黒いツノが二つついています。あと白い靴下は私を救う）"},
  { star:6, job:"狙撃", codename:"ウィシャデル",job2:"投擲手",birth:"本人は忘れたと主張",CV:"竹達彩奈",personal_history:"サルカズ傭兵のリーダーであるＷは、正式にウィシャデルと改名した。ロンディニウム戦争中、ロドスロンディニウム特別行動隊と密に協力し、幾度となく軍事委員会の作戦を阻止した。",my_comment:"全キャラの中で最強と言ってもいい環境破壊性能をしています。ウィシャデルがいるだけで大抵のステージはクリアでき、圧倒的な火力と隠密性能でもはやチートです。また、アークナイツの中でも昔からいるキャラクターで愛着が湧いています。また、服装が短パンとそんな装備で大丈夫かと聴きたくなるような姿です。魅惑的な足が見れるのでいいんですが..."},
  { star:6, job:"特殊", codename:"血掟テキサス",job2:"執行者",birth:"6月1日",CV:"田所あずさ",personal_history:"ペンギン急便の社員であり、テキサスファミリー最後の生き残り。単独での作戦能力に秀でている。",my_comment:"元々星5キャラクターだったテキサスが星6となって再登場しました。執行者という職分で、短期間の出陣、高速な再配置を繰り返し、スタン・範囲殲滅・対空も可能な大変汎用性が高いキャラクター。困ったときはテキサスをおいておくだけで陣形の立て直しができるチートキャラクターです。二つの剣で戦う姿がかっこいい！"},
  { star:6, job:"前衛", codename:"ウルピアヌス",job2:"重剣士",birth:"4月13日",CV:"小野大輔",personal_history:"エーギル人であるウルピアヌスは、エーギル技術アカデミーの元執政官であり、科学研究プロジェクト・アビサルハンター計画の責任者であり、またエーギルの軍事団体「アビサルハンター」の作戦指揮官の一人である。彼がいつ、どこから陸に上がったのかは不明。現在は、ロドスの海関連の事務対応時に支援を行っている。本人と関連人員による確認後、ウルピアヌスのすべての資料は権限の高いデータベースに移行された。",my_comment:"圧倒的ステータスで敵をコテンパンにします。紙装甲の馬鹿火力です。防御力は他キャラと比べて最低値の0であり打たれ弱いかと思いきやHPが最高値の6000越えでさらにスキル発動で倍ぐらいまで伸びます。また、ダメージを受けるたびHPを回復（？！）するので大抵の局面で戦うことができます。"},
  { star:6, job:"前衛", codename:"エンテレケイア",job2:"鎌撃士",birth:"12月31日",CV:"長谷川育美",personal_history:"カズデルのスパイ組織「ローズ河畔」のメンバー。かつてはバベルに情報提供をしていた。ロンディニウム戦争中、エンテレケイアは自主的にロドスに連絡を取り、現在は訪問者として本艦に滞在している｡エンテレケイアはロドスと正式な契約を結んでいないため、彼女とロドスの協力はすべて個人間の依頼によるものと見なされる点に留意されたし。",my_comment:"アークナイツでも珍しい鎌を扱うオペレーターです。鎌撃士は味方からのHP回復を受けず、敵に攻撃することで回復します。このキャラクターの魅力は魅力的なセリフと太ももです。きちんとこのコメントを読んでいたらお分かりかと思いますが私の性癖は足なのでエンテレケイアの足はとても刺さりました。また、声もいいので最高です。好きなキャラを使っている時がいちばん楽しい！"},
  { star:5, job:"前衛", codename:"ラ・プルマ",job2:"鎌撃士",birth:"8月29日",CV:"高野麻里佳",personal_history:"トゥルーボリバリアン」に所属した某中尉の娘。父親の死後、その戦友だったパンチョに引き取られ、養女として育てられた。その後共に各地を転々とし、やがてドッソレスにたどり着いた。ドッソレス事件後、テキーラと共にロドスにやってきた。特殊な身分であるために会議と審査を経て、ロドスへの加入が許可された。",my_comment:"鎌を扱うオペレーター２人目です。また、今回の紹介において初の星5となります。やっぱりソシャゲの特徴で星が多いい方が強いため、あまり星5は使用しないのですが、ラ・プルマだけは違います。スキル2の高速鎌攻撃がとても楽しい。敵がミンチになります。あと可愛い（大事）"},
];

// 一覧
app.get("/akunai", (req, res) => {
  res.render("akunai", { aknai });
});

// 作成
app.get("/akunai/create", (req, res) => {
  res.render("akunai_create");
});
app.post("/akunai/create", (req, res) => {
  const newChar = {
    codename: req.body.codename,
    star: req.body.star,
    job: req.body.job,
    job2: req.body.job2,
    birth: req.body.birth,
    CV: req.body.CV,
    image: req.body.image || `/images/${req.body.codename}.jpg`,
    personal_history: req.body.personal_history,
    my_comment: req.body.my_comment
  };
  aknai.push(newChar);
  res.redirect("/akunai");
});

// 編集
app.get("/akunai/:number/edit", (req, res) => {
  const item = aknai[req.params.number];
  if (!item) return res.redirect("/akunai");
  res.render("akunai_edit", { data: item, id: req.params.number });
});

// 更新
app.post("/akunai/:number/update", (req, res) => {
  const number = req.params.number;
  if (!aknai[number]) return res.redirect("/akunai");

  aknai[number] = {
    codename: req.body.codename,
    star: req.body.star,
    job: req.body.job,
    job2: req.body.job2,
    birth: req.body.birth,
    CV: req.body.CV,
    image: req.body.image,
    personal_history: req.body.personal_history,
    my_comment: req.body.my_comment
  };
  res.redirect("/akunai/" + number);
});

// 削除
app.post("/akunai/:number/delete", (req, res) => {
  const number = req.params.number;
  if (aknai[number]) aknai.splice(number, 1);
  res.redirect("/akunai");
});

// 最後に詳細ページ
app.get("/akunai/:number", (req, res) => {
  const item = aknai[req.params.number];
  if (!item) return res.send("該当キャラクターが見つかりません。");
  res.render("akunai_detail", { data: item, id: req.params.number });
});


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
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});


  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  if (hand === cpu) {
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
  } else {
    judgement = '負け';
  }

  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  if(judgement === '勝ち'){
    win += 1;
    total += 1;
  } else if(judgement === '負け'){
    total += 1;
  }
  
   const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
  };
  res.render( 'janken', display );}
);

app.listen(8080, () => console.log("Example app listening on port 8080!"));
