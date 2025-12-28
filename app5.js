"use strict";

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


//ここからアークナイツ🚢
let aknai = [
  { star:6, job:"前衛", codename:"アイリーニ",job2:"剣豪",birth:"1月3日",CV:"釘宮理恵",personal_history:"アイリーニは、イベリアの大審問官ダリオの弟子であり、以前まで自身も審問官の職に就いていた。彼女はイベリアの歴史、法律、人文、地理などに関して豊かな知識を有している。「狂人号」事件以降、アイリーニは審問官の職を辞して、ケルシー直々の推薦により、現在は裁判所のトランスポーターとしてロドスとの協力協定を結び、海からの脅威に備えている。",my_comment:"私が語る一番の魅力は声が大変可愛らしいということです。厳格な審問官というイメージとはかけ離れた可愛い声に骨抜きになり、このゲームを始めました。戦闘面でも敵の防御力を一定数無視して攻撃してくれるのでどこにでも起用できますし、スキル3の高火力は使っていて楽しいです。"},
  { star:6, job:"狙撃", codename:"ウィシャデル",job2:"投擲手",birth:"本人は忘れたと主張",CV:"竹達彩奈",personal_history:"サルカズ傭兵のリーダーであるＷは、正式にウィシャデルと改名した。ロンディニウム戦争中、ロドスロンディニウム特別行動隊と密に協力し、幾度となく軍事委員会の作戦を阻止した。",my_comment:"全キャラの中で最強と言ってもいい環境破壊性能をしています。ウィシャデルがいるだけで大抵のステージはクリアでき、圧倒的な火力と隠密性能でもはやチートです。また、アークナイツの中でも昔からいるキャラクターで愛着が湧いています。また、服装が短パンとそんな装備で大丈夫かと聴きたくなるような姿です。"},
  { star:6, job:"特殊", codename:"血掟テキサス",job2:"執行者",birth:"6月1日",CV:"田所あずさ",personal_history:"ペンギン急便の社員であり、テキサスファミリー最後の生き残り。単独での作戦能力に秀でている。",my_comment:"元々星5キャラクターだったテキサスが星6となって再登場しました。執行者という職分で、短期間の出陣、高速な再配置を繰り返し、スタン・範囲殲滅・対空も可能な大変汎用性が高いキャラクター。困ったときはテキサスをおいておくだけで陣形の立て直しができるチートキャラクターです。二つの剣で戦う姿がかっこいい！"},
  { star:6, job:"前衛", codename:"ウルピアヌス",job2:"重剣士",birth:"4月13日",CV:"小野大輔",personal_history:"エーギル人であるウルピアヌスは、エーギル技術アカデミーの元執政官であり、科学研究プロジェクト・アビサルハンター計画の責任者であり、またエーギルの軍事団体「アビサルハンター」の作戦指揮官の一人である。彼がいつ、どこから陸に上がったのかは不明。現在は、ロドスの海関連の事務対応時に支援を行っている。本人と関連人員による確認後、ウルピアヌスのすべての資料は権限の高いデータベースに移行された。",my_comment:"圧倒的ステータスで敵をコテンパンにします。紙装甲の馬鹿火力です。防御力は他キャラと比べて最低値の0であり打たれ弱いかと思いきやHPが最高値の6000越えでさらにスキル発動で倍ぐらいまで伸びます。また、ダメージを受けるたびHPを回復（？！）するので大抵の局面で戦うことができます。"},
  { star:6, job:"前衛", codename:"エンテレケイア",job2:"鎌撃士",birth:"12月31日",CV:"長谷川育美",personal_history:"カズデルのスパイ組織「ローズ河畔」のメンバー。かつてはバベルに情報提供をしていた。ロンディニウム戦争中、エンテレケイアは自主的にロドスに連絡を取り、現在は訪問者として本艦に滞在している｡エンテレケイアはロドスと正式な契約を結んでいないため、彼女とロドスの協力はすべて個人間の依頼によるものと見なされる点に留意されたし。",my_comment:"アークナイツでも珍しい鎌を扱うオペレーターです。鎌撃士は味方からのHP回復を受けず、敵に攻撃することで回復します。このキャラクターの魅力は魅力的なセリフです。好きなキャラを使っている時がいちばん楽しい！"},
  { star:5, job:"前衛", codename:"ラ・プルマ",job2:"鎌撃士",birth:"8月29日",CV:"高野麻里佳",personal_history:"トゥルーボリバリアン」に所属した某中尉の娘。父親の死後、その戦友だったパンチョに引き取られ、養女として育てられた。その後共に各地を転々とし、やがてドッソレスにたどり着いた。ドッソレス事件後、テキーラと共にロドスにやってきた。特殊な身分であるために会議と審査を経て、ロドスへの加入が許可された。",my_comment:"鎌を扱うオペレーター２人目です。また、今回の紹介において初の星5となります。やっぱりソシャゲの特徴で星が多いい方が強いため、あまり星5は使用しないのですが、ラ・プルマだけは違います。スキル2の高速鎌攻撃がとても楽しい。敵がミンチになります。"},
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

//ここからホラーゲーム💀
let horage = [
  {
    number: "001",
    game_name: "Garten of Banban",
    developer: "Euphoric Brothers Ltd.",
    overview: "秘密が隠された幼稚園に飛び込もう！かつては子供達の笑顔で溢れていたバンバン幼稚園．行方不明の謎を解き明かしながら恐怖から逃げきれ！",
    my_comment2: "ガーテンオブバンバンは一番長く付き合ってきたゲームかもしれません．chapterの更新が不定期であり，時には半年待つこともありました．どんどん明らかになっていく謎と共に結末へのドキドキが止まりません！",
    image: "/images/banban.jpg"
  },
  {
    number: "002",
    game_name: "Manny's",
    developer: "Bonemeal Productions",
    overview: "月のでない夜，無人島に取り残された漂流者の前に，突如ファストフード店が現れる．足を踏み入れたが最後，彼は最悪の運命に巻き込まれていく...！喰うか喰われるか，果たしてあなたは生き残れるか？！",
    my_comment2: "このゲームの一番の魅力はストーリがとっても面白いことです！出てくる登場人物の良さ！！結末にも驚かされました．プレイヤースキルがあまりいらないことも魅力です．",
    image: "/images/mannys.jpg"
  },
  {
    number: "003",
    game_name: "バイオハザード ヴィレッジ",
    developer: "CAPCOM CO., LTD.",
    overview: "ベイカー邸での惨劇から数年…事件から生還したイーサン・ウィンターズは対バイオテロ部隊”BSAA”の庇護の下．妻のミアそして愛娘のローズと平穏な日々を過ごしていた．しかし，幸せな生活はBSAA隊長クリス・レッドフィールドの襲撃によって破られる．奪われた娘を取り戻すため，イーサンは再び死地へと向かう．",
    my_comment2: "私の人生の中でいちばん嫌いなものはゾンビです．昔から怖かった...人生の敵を知るためバイオハザードシリーズを見始めました．今までたくさんの作品がある中，ヴィレッジはついにゾンビっぽくなくなりました．吸血鬼のお姉さんがとても綺麗です．",
    image: "/images/bio8.jpg"
  },
  {
    number: "004",
    game_name: "Baldi's Basics Classic Remastered",
    developer: "Basically Games",
    overview: "バルディの学校から再び脱出せよ！ステルスと戦略を駆使し，7冊のノートをすべて集めて勝利を掴め！",
    my_comment2: "頭が禿げているバルディ先生．狂気の授業と探し続ける出口...このゲームの魅力はさまざまなゲームモードやエンディングがあることです．最初はただの脱出ゲームだったのに...",
    image: "/images/baldi.jpg"
  }
];

// 1. 一覧表示 (廊下)
app.get("/horage", (req, res) => {
  res.render("horage", { horage: horage });
});

// 2. 新規登録画面
app.get("/horage/create", (req, res) => {
  res.render("horage_create");
});

// 新規登録処理
app.post("/horage/create", (req, res) => {
  const newGame = {
    number: req.body.number,
    game_name: req.body.game_name,
    developer: req.body.developer,
    overview: req.body.overview,
    my_comment2: req.body.my_comment2,
    image: req.body.image || "/images/default_horror.jpg" // 画像がなければデフォルト
  };
  horage.push(newGame);
  // 番号順にソートしておくと廊下で綺麗に並びます
  horage.sort((a, b) => a.number.localeCompare(b.number));
  res.redirect("/horage");
});

// 3. 詳細表示 (部屋の中)
app.get("/horage/:number", (req, res) => {
  const number = req.params.number;
  // numberが一致するデータを検索
  const item = horage.find(game => game.number === number);

  if (item) {
    res.render("horage_detail", { data: item });
  } else {
    res.send("その部屋は存在しないようだ...");
  }
});

// 4. 編集画面
app.get("/horage/:number/edit", (req, res) => {
  const number = req.params.number;
  const item = horage.find(game => game.number === number);
  if (item) {
    res.render("horage_edit", { data: item });
  } else {
    res.redirect("/horage");
  }
});

// 更新処理
app.post("/horage/:number/update", (req, res) => {
  const targetNumber = req.params.number;
  const index = horage.findIndex(game => game.number === targetNumber);
  
  if (index !== -1) {
    // 既存データの更新（numberは変更しない想定ですが、必要なら変えてもOK）
    horage[index].game_name = req.body.game_name;
    horage[index].developer = req.body.developer;
    horage[index].overview = req.body.overview;
    horage[index].my_comment2 = req.body.my_comment2;
    horage[index].image = req.body.image;
    
    res.redirect("/horage/" + targetNumber);
  } else {
    res.redirect("/horage");
  }
});

// 5. 削除処理
app.post("/horage/:number/delete", (req, res) => {
  const targetNumber = req.params.number;
  const index = horage.findIndex(game => game.number === targetNumber);
  
  if (index !== -1) {
    horage.splice(index, 1);
  }
  res.redirect("/horage");
});

//📕ここからおすすめ本
let book = [
  {
    id: 0, // 管理用IDを追加
    book_name: "キノの旅（XXIII）",
    writer: "時雨沢恵一(著)，黒星紅白(イラスト)",
    publisher: "株式会社KADOKAWA，電撃文庫",
    year: "2020",
    book_overview: "「あの箱ですか？　私達の永遠の命を守ってくれるものですよ！」国に入る前に，キノとエルメスは答えをもらいました．答えが全然理解できなかったので，キノが訊ねました．背広を着た入国審査官は，とても若い男でした．まだ二十歳前に見えました．彼は，それはそれは嬉しそうに，手続きそっちのけで説明してくれます．「あそこには，たくさんの国民達が眠っています！」「眠っている……？」キノが首を傾げました．「つまりまさか――」エルメスの言葉を，「墓地じゃないですよ！」入国審査官は笑顔で遮りました．「みんな生きています！　ただ――」キノが反対側に首を傾げました．（「眠る国」，他全11話収録）",
    my_comment3: "キノの旅はシリーズものの小説で私が読み始めたのは中学１年生の時からです．とても付き合いの長い本で様々な国を旅するキノたちと一緒に，自分までもがその国を訪れているような気分になれました．この前24巻目が発売されたのでぜひ読みたいです．",
    images2: "/images/キノの旅.jpg"
  },
  {
    id: 1,
    book_name: "オーバーロード1 不死者の王 ",
    writer: "丸山くがね(著)，so-bin(イラスト)",
    publisher: "株式会社KADOKAWA，enterbrain",
    year: "2012",
    book_overview: "その日，一大ブームを起こしたオンラインゲーム，「ユグドラシル」は静かにサービス終了を迎えるはずだった．―しかし，終了時間をすぎてもログアウトしないゲーム．意思を持ち始めたノンプレイヤーキャラクター．なにやらギルドごと，異世界に飛ばされてしまったらしい…．現実世界ではゲーム好きの孤独でさえない青年が，骸骨の見た目を持つ，最強の大魔法使い「モモンガ」となる．彼が率いるギルド『アインズ・ウール・ゴウン』の伝説が，いま始まる!圧倒的人気のWEB小説の書籍化．",
    my_comment3: "オーバーロードを知ったきっかけはアニメを見たことです．そこから続きが知りたい！と思うようになり書店でオーバーロードシリーズを集め始めました．一巻が分厚く重いので学校に持っていく時は苦労した記憶があります．挿絵も美麗で迫力があるのでぜひご一読してみてください！",
    images2: "/images/オーバーロード.jpg"
  },
  {
    id: 2,
    book_name: "ハーモニー",
    writer: "伊藤計劃",
    publisher: "早川書房，ハヤカワ文庫JA",
    year: "2010",
    book_overview: "「大災禍」と呼ばれる世界規模の混沌から復興した世界．かつて起きた「大災禍」の反動で，世界は極端な健康志向と社会の調和を重んじた，超高度医療社会へと移行していた．そんな優しさと慈愛に満ちたまがい物の世界に，立ち向かう術を日々考えている少女がいた．少女の名前は御冷ミァハ．世界への抵抗を示すため，彼女は，自らのカリスマ性に惹かれた二人の少女とともに，ある日自殺を果たす．13年後，霧慧トァンは優しすぎる日本社会を嫌い，戦場の平和維持活動の最前線にいた．霧慧トァンは，かつての自殺事件で生き残った少女．平和に慣れ過ぎた世界に対して，ある犯行グループが数千人規模の命を奪う事件を起こす．犯行グループからの世界に向けて出された「宣言」によって，世界は再び恐怖へと叩き落される．霧慧トァンは，その宣言から，死んだはずの御冷ミァハの息遣いを感じ取る．トァンは，かつてともに死のうとしたミァハの存在を確かめるため立ち上がる．",
    my_comment3: "ハーモニーの世界は未来的で何もかも開示し，健康を意識しすぎた世界です．誰もが優しく穏やかですが全てが管理されていて息苦しさも感じます．そんな中３人の少女が世界に対して反抗していくお話です．読んでみるととっても壮大で新しい感覚になれる小説です！",
    images2: "/images/ハーモニー.jpg"
  },
  {
    id: 3,
    book_name: "死神の精度",
    writer: "伊坂幸太郎",
    publisher: "株式会社文藝春秋，文春文庫",
    year: "2008",
    book_overview: "1，CDショップに入りびたり， 2，苗字が町や市の名前であり， 3，受け答えが微妙にずれていて， 4，素手で他人に触ろうとしない． ――そんな人物が身近に現れたら，それは死神かもしれません．1週間の調査ののち，その人間の死に〈可〉の判断をくだせば，翌8日目には死が実行される．クールでどこか奇妙な死神・千葉が出会う6つの人生． 日本推理作家協会賞(短編部門)を受賞した表題作ほか，「死神と藤田」「吹雪に死神」「恋愛で死神」「恋路を死神」「死神対老女」を収録．",
    my_comment3: "なんと主人公である死神のお名前は「千葉」さんです．死神は地名で名づけられるらしくてもう驚きました．死神特有の人間の味方，感性をこの小説で体験しましょう！一話が短いので読みやすいですよ！もしかしたらあなたの身の回りにも死神が紛れているかも...？",
    images2: "/images/死神の精度.jpg"
  }
];

// ID管理用変数（新規追加時に使用）
let nextId = 4;

// --- ルーティング ---

// 1. 一覧表示 (横スクロールの本棚)
app.get("/books", (req, res) => {
  res.render("books", { books: book });
});

// 2. 新規登録画面
app.get("/books/create", (req, res) => {
  res.render("books_create");
});

// 新規登録処理
app.post("/books/create", (req, res) => {
  const newBook = {
    id: nextId++,
    book_name: req.body.book_name,
    writer: req.body.writer,
    publisher: req.body.publisher,
    year: req.body.year,
    book_overview: req.body.book_overview,
    my_comment3: req.body.my_comment3,
    // 画像がなければデフォルト画像（今回は便宜上キノの旅をデフォルトに設定例として記述）
    images2: req.body.images2 || "/images/キノの旅.jpg" 
  };
  book.push(newBook);
  res.redirect("/books");
});

// 3. 詳細表示
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = book.find(b => b.id === id);

  if (item) {
    res.render("books_detail", { data: item });
  } else {
    res.status(404).send("その本は見つかりませんでした...");
  }
});

// 4. 編集画面
app.get("/books/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const item = book.find(b => b.id === id);
  if (item) {
    res.render("books_edit", { data: item });
  } else {
    res.redirect("/books");
  }
});

// 更新処理
app.post("/books/:id/update", (req, res) => {
  const id = parseInt(req.params.id);
  const index = book.findIndex(b => b.id === id);
  
  if (index !== -1) {
    book[index].book_name = req.body.book_name;
    book[index].writer = req.body.writer;
    book[index].publisher = req.body.publisher;
    book[index].year = req.body.year;
    book[index].book_overview = req.body.book_overview;
    book[index].my_comment3 = req.body.my_comment3;
    book[index].images2 = req.body.images2;
    
    res.redirect("/books/" + id);
  } else {
    res.redirect("/books");
  }
});

// 5. 削除処理
app.post("/books/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const index = book.findIndex(b => b.id === id);
  
  if (index !== -1) {
    book.splice(index, 1);
  }
  res.redirect("/books");
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
