// --- 初期データ定義 ---
const initialData = [
    { 
      star: 6, job: "前衛", codename: "アイリーニ", job2: "剣豪", birth: "1月3日", CV: "釘宮理恵", 
      image: "images/アイリーニ.jpg",
      personal_history: "アイリーニは、イベリアの大審問官ダリオの弟子であり、以前まで自身も審問官の職に就いていた。彼女はイベリアの歴史、法律、人文、地理などに関して豊かな知識を有している。「狂人号」事件以降、アイリーニは審問官の職を辞して、ケルシー直々の推薦により、現在は裁判所のトランスポーターとしてロドスとの協力協定を結び、海からの脅威に備えている。", 
      my_comment: "私が語る一番の魅力は声が大変可愛らしいということです。厳格な審問官というイメージとはかけ離れた可愛い声に骨抜きになり、このゲームを始めました。戦闘面でも敵の防御力を一定数無視して攻撃してくれるのでどこにでも起用できますし、スキル3の高火力は使っていて楽しいです。" 
    },
    { 
      star: 6, job: "狙撃", codename: "ウィシャデル", job2: "投擲手", birth: "本人は忘れたと主張", CV: "竹達彩奈", 
      image: "images/ウィシャデル.jpg",
      personal_history: "サルカズ傭兵のリーダーであるＷは、正式にウィシャデルと改名した。ロンディニウム戦争中、ロドスロンディニウム特別行動隊と密に協力し、幾度となく軍事委員会の作戦を阻止した。", 
      my_comment: "全キャラの中で最強と言ってもいい環境破壊性能をしています。ウィシャデルがいるだけで大抵のステージはクリアでき、圧倒的な火力と隠密性能でもはやチートです。また、アークナイツの中でも昔からいるキャラクターで愛着が湧いています。" 
    },
    { 
      star: 6, job: "特殊", codename: "血掟テキサス", job2: "執行者", birth: "6月1日", CV: "田所あずさ", 
      image: "images/血掟テキサス.jpg",
      personal_history: "ペンギン急便の社員であり、テキサスファミリー最後の生き残り。単独での作戦能力に秀でている。", 
      my_comment: "元々星5キャラクターだったテキサスが星6となって再登場しました。執行者という職分で、短期間の出陣、高速な再配置を繰り返し、スタン・範囲殲滅・対空も可能な大変汎用性が高いキャラクター。" 
    },
    { 
      star: 6, job: "前衛", codename: "ウルピアヌス", job2: "重剣士", birth: "4月13日", CV: "小野大輔", 
      image: "images/ウルピアヌス.jpg",
      personal_history: "エーギル人であるウルピアヌスは、エーギル技術アカデミーの元執政官であり、科学研究プロジェクト・アビサルハンター計画の責任者であり、またエーギルの軍事団体「アビサルハンター」の作戦指揮官の一人である。", 
      my_comment: "圧倒的ステータスで敵をコテンパンにします。紙装甲の馬鹿火力です。防御力は他キャラと比べて最低値の0であり打たれ弱いかと思いきやHPが最高値の6000越えでさらにスキル発動で倍ぐらいまで伸びます。" 
    },
    { 
      star: 6, job: "前衛", codename: "エンテレケイア", job2: "鎌撃士", birth: "12月31日", CV: "長谷川育美", 
      image: "images/エンテレケイア.jpg",
      personal_history: "カズデルのスパイ組織「ローズ河畔」のメンバー。かつてはバベルに情報提供をしていた。ロンディニウム戦争中、エンテレケイアは自主的にロドスに連絡を取り、現在は訪問者として本艦に滞在している｡", 
      my_comment: "アークナイツでも珍しい鎌を扱うオペレーターです。鎌撃士は味方からのHP回復を受けず、敵に攻撃することで回復します。このキャラクターの魅力は魅力的なセリフと太ももです。" 
    },
    { 
      star: 5, job: "前衛", codename: "ラ・プルマ", job2: "鎌撃士", birth: "8月29日", CV: "高野麻里佳", 
      image: "images/ラ・プルマ.jpg",
      personal_history: "トゥルーボリバリアン」に所属した某中尉の娘。父親の死後、その戦友だったパンチョに引き取られ、養女として育てられた。その後共に各地を転々とし、やがてドッソレスにたどり着いた。", 
      my_comment: "鎌を扱うオペレーター２人目です。また、今回の紹介において初の星5となります。やっぱりソシャゲの特徴で星が多いい方が強いため、あまり星5は使用しないのですが、ラ・プルマだけは違います。" 
    }
  ];
  
  // --- データ管理用の変数 ---
  let aknaiData = [];
  
  // --- 初期化処理 ---
  window.onload = function() {
      // LocalStorageからデータを読み込む。なければ初期データを使う
      const savedData = localStorage.getItem('aknaiData');
      if (savedData) {
          aknaiData = JSON.parse(savedData);
      } else {
          aknaiData = JSON.parse(JSON.stringify(initialData));
      }
      
      // 一覧画面を描画
      renderList();
  };
  
  // --- データを保存する関数 ---
  function saveData() {
      localStorage.setItem('aknaiData', JSON.stringify(aknaiData));
      renderList(); // 一覧を再描画
  }
  
  // --- 画面切り替え関数 ---
  function showListView() {
      document.getElementById('list-view').style.display = 'block';
      document.getElementById('detail-view').style.display = 'none';
      document.getElementById('form-view').style.display = 'none';
      window.scrollTo(0, 0);
  }
  
  function showDetailView(index) {
      document.getElementById('list-view').style.display = 'none';
      document.getElementById('detail-view').style.display = 'block';
      document.getElementById('form-view').style.display = 'none';
      
      const data = aknaiData[index];
      
      // 詳細データをDOMにセット
      document.getElementById('detail-codename').textContent = data.codename;
      document.getElementById('detail-image').src = data.image;
      document.getElementById('detail-image').alt = data.codename;
      document.getElementById('detail-star').textContent = '★' + data.star;
      document.getElementById('detail-job').textContent = data.job;
      document.getElementById('detail-job2').textContent = data.job2;
      document.getElementById('detail-birth').textContent = data.birth;
      document.getElementById('detail-cv').textContent = data.CV;
      document.getElementById('detail-history').textContent = data.personal_history;
      document.getElementById('detail-comment').textContent = data.my_comment;
  
      // 編集ボタンにID(インデックス)を紐付ける
      const editBtn = document.getElementById('edit-btn-link');
      editBtn.onclick = function() {
          showEditForm(index);
      };
      
      window.scrollTo(0, 0);
  }
  
  function showCreateForm() {
      document.getElementById('list-view').style.display = 'none';
      document.getElementById('detail-view').style.display = 'none';
      document.getElementById('form-view').style.display = 'block';
  
      // フォームを空にする
      document.getElementById('operator-form').reset();
      document.getElementById('form-mode').value = 'create';
      document.getElementById('form-header-title').textContent = 'OPERATOR REGISTRATION';
      document.getElementById('form-title').textContent = '新規登録';
      document.getElementById('form-submit-btn').textContent = 'REGISTER';
      window.scrollTo(0, 0);
  }
  
  function showEditForm(index) {
      document.getElementById('list-view').style.display = 'none';
      document.getElementById('detail-view').style.display = 'none';
      document.getElementById('form-view').style.display = 'block';
  
      const data = aknaiData[index];
  
      // フォームに値をセット
      document.getElementById('form-mode').value = 'edit';
      document.getElementById('form-id').value = index;
      document.getElementById('input-codename').value = data.codename;
      document.getElementById('input-star').value = data.star;
      document.getElementById('input-job').value = data.job;
      document.getElementById('input-job2').value = data.job2;
      document.getElementById('input-birth').value = data.birth;
      document.getElementById('input-cv').value = data.CV;
      document.getElementById('input-image').value = data.image;
      document.getElementById('input-history').value = data.personal_history;
      document.getElementById('input-comment').value = data.my_comment;
  
      document.getElementById('form-header-title').textContent = 'OPERATOR UPDATE';
      document.getElementById('form-title').textContent = 'データ編集: ' + data.codename;
      document.getElementById('form-submit-btn').textContent = 'UPDATE';
      window.scrollTo(0, 0);
  }
  
  function cancelForm() {
      const mode = document.getElementById('form-mode').value;
      if (mode === 'edit') {
          // 編集キャンセルなら詳細画面に戻る
          const id = document.getElementById('form-id').value;
          showDetailView(id);
      } else {
          // 新規キャンセルなら一覧に戻る
          showListView();
      }
  }
  
  // --- 一覧描画関数 ---
  function renderList() {
      const listContainer = document.getElementById('character-list');
      listContainer.innerHTML = ''; // クリア
  
      aknaiData.forEach((char, index) => {
          // カード生成
          const wrapper = document.createElement('div');
          wrapper.className = 'character-card-wrapper';
  
          // カード本体（クリックで詳細へ）
          const link = document.createElement('a');
          link.href = '#';
          link.className = 'card-link';
          link.onclick = function(e) {
              e.preventDefault();
              showDetailView(index);
          };
  
          link.innerHTML = `
              <div class="character-card">
                  <div class="card-image-wrapper">
                      <img src="${char.image}" alt="${char.codename}" class="card-image" onerror="this.style.display='none'">
                      <div class="rarity-badge">★${char.star}</div>
                  </div>
                  <div class="card-info">
                      <h2 class="card-name">${char.codename}</h2>
                      <div class="card-specs">
                          <span class="spec-tag">${char.job}</span>
                      </div>
                  </div>
              </div>
          `;
  
          // 削除ボタン
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.textContent = '削除';
          deleteBtn.style.marginTop = '5px';
          deleteBtn.onclick = function() {
              if(confirm('本当に削除しますか？')) {
                  deleteCharacter(index);
              }
          };
  
          wrapper.appendChild(link);
          wrapper.appendChild(deleteBtn);
          listContainer.appendChild(wrapper);
      });
  }
  
  // --- データの追加・更新・削除処理 ---
  function handleFormSubmit(e) {
      e.preventDefault();
  
      const mode = document.getElementById('form-mode').value;
      const codename = document.getElementById('input-codename').value;
      const imagePath = document.getElementById('input-image').value || `images/${codename}.jpg`;
  
      const newData = {
          codename: codename,
          star: document.getElementById('input-star').value,
          job: document.getElementById('input-job').value,
          job2: document.getElementById('input-job2').value,
          birth: document.getElementById('input-birth').value,
          CV: document.getElementById('input-cv').value,
          image: imagePath,
          personal_history: document.getElementById('input-history').value,
          my_comment: document.getElementById('input-comment').value
      };
  
      if (mode === 'create') {
          aknaiData.push(newData);
          saveData();
          showListView();
      } else {
          const id = document.getElementById('form-id').value;
          aknaiData[id] = newData;
          saveData();
          showDetailView(id);
      }
  }
  
  function deleteCharacter(index) {
      aknaiData.splice(index, 1);
      saveData();
  }