document.getElementsByTagName("h1")[0].style.fontSize = "6vw";/**********************
 * 萬界修仙 V10 架構版
 * Core Data System
 **********************/

/* ======================
   🧍 玩家核心資料
====================== */

let player = {
    id: "player_1",

    // 基礎屬性
    name: "無名修士",
    realm: "凡人",
    exp: 0,
    gold: 100,

    // 戰鬥屬性
    hp: 100,
    atk: 10,
    def: 5,
    crit: 0.05,
    critDmg: 1.5,

    // 成長系統
    root: "未知",
    rootBonus: 1,
    constitution: "凡體",
    luck: 1,

    // 裝備
    weapon: {
        name: "木劍",
        atk: 5,
        rarity: "普通"
    },

    armor: null,

    // 背包
    bag: [
    {
        name:"木劍",
        type:"weapon",
        atk:5,
        rarity:"普通"
    }
],

    // 系統
    skills: [],
    sect: null,
    partner: null,
    children: []
};

/* ======================
   👾 怪物資料
====================== */

const monsters = [
    {
        name: "野狼",
        hp: 30,
        atk: 5,
        exp: 10,
        gold: 10,
        drop: "狼牙"
    },
    {
        name: "山豬",
        hp: 60,
        atk: 10,
        exp: 20,
        gold: 20,
        drop: "豬皮"
    },
    {
        name: "蛇妖",
        hp: 120,
        atk: 20,
        exp: 40,
        gold: 40,
        drop: "蛇膽"
    }
];

const weapons = [

{
    name:"鐵劍",
    atk:10,
    rarity:"普通"
},

{
    name:"鋼劍",
    atk:20,
    rarity:"精良"
},

{
    name:"青鋒劍",
    atk:30,
    rarity:"精良"
},

{
    name:"靈劍",
    atk:50,
    rarity:"稀有"
},

{
    name:"玄冰劍",
    atk:80,
    rarity:"稀有"
},

{
    name:"魔劍",
    atk:120,
    rarity:"史詩"
},

{
    name:"血煞劍",
    atk:180,
    rarity:"史詩"
},

{
    name:"誅仙劍",
    atk:300,
    rarity:"傳說"
},

{
    name:"軒轅劍",
    atk:500,
    rarity:"傳說"
}

];

function getRandomWeapon(){

    const roll = Math.random();

    if(roll < 0.40){
        return weapons[
            Math.floor(Math.random()*2)
        ];
    }

    if(roll < 0.70){
        return weapons[
            2 + Math.floor(Math.random()*2)
        ];
    }

    if(roll < 0.90){
        return weapons[
            4 + Math.floor(Math.random()*2)
        ];
    }

    if(roll < 0.98){
        return weapons[
            6 + Math.floor(Math.random()*2)
        ];
    }

    return weapons[8];
}

/* ======================
   🌱 靈根系統
====================== */

const roots = [
    { name: "廢靈根", bonus: 1 },
    { name: "下品靈根", bonus: 1.2 },
    { name: "中品靈根", bonus: 1.5 },
    { name: "上品靈根", bonus: 2 },
    { name: "天靈根", bonus: 3 },
    { name: "聖靈根", bonus: 5 },
    { name: "混沌靈根", bonus: 10 }
];

/* ======================
   ⚔️ 工具函式（核心）
====================== */

function getRarityColor(rarity){

    switch(rarity){

        case "普通":
            return "#FFFFFF";

        case "精良":
            return "#00FF00";

        case "稀有":
            return "#3399FF";

        case "史詩":
            return "#CC66FF";

        case "傳說":
            return "#FFD700";

        default:
            return "#FFFFFF";
    }
}

function log(msg){
    const box = document.getElementById("log");
    box.innerHTML += msg + "<br>";
    box.scrollTop = box.scrollHeight;
}

/* ======================
   📊 UI 更新系統
====================== */

function updateUI(){

    const set = (id, value) => {
        const el = document.getElementById(id);
        if(el) el.innerText = value;
    };

    set("realm", player.realm);
    set("exp", player.exp);
    set("gold", player.gold);
    set("root", player.root);

    const power =
        player.atk +
        player.weapon.atk;

    set("power", power);

    document.getElementById("weapon").innerHTML =
    `<span style="color:${getRarityColor(player.weapon.rarity)}">
        ${player.weapon.name}【${player.weapon.rarity}】
    </span>`;

    renderBag();
}

/* ======================
   🏆 境界系統
====================== */

function checkRealm(){

    if(player.exp >= 1000){
        player.realm = "元嬰";
        player.atk = 300;
    }
    else if(player.exp >= 300){
        player.realm = "金丹";
        player.atk = 100;
    }
    else if(player.exp >= 100){
        player.realm = "築基";
        player.atk = 30;
    }
}

/* ======================
   🧘 修煉系統
====================== */

function cultivate(){

    let gain = Math.floor(Math.random()*20 + 10);

    gain = Math.floor(gain * player.rootBonus);

    player.exp += gain;

    log("🧘 修煉 +" + gain);

    checkRealm();
    updateUI();
}

/* ======================
   🌱 靈根系統
====================== */

function checkRoot(){

    if(player.root !== "未知"){
        log("🌱 已擁有靈根：" + player.root);
        return;
    }

    const r = roots[Math.floor(Math.random()*roots.length)];

    player.root = r.name;
    player.rootBonus = r.bonus;

    log("🌱 覺醒靈根：" + r.name);

    updateUI();
}

/* ======================
   🗡️ 裝備系統
====================== */

function equip(index){

    const item = player.bag[index];
    if(!item) return;

    if(item.type !== "weapon"){
        log("❌ 不是武器");
        return;
    }

    player.weapon = item;

    log("🗡️ 裝備：" + item.name);

    updateUI();
}

/* ======================
   🎒 背包系統（可擴展UI）
====================== */

function renderBag(){

    const box = document.getElementById("bagBox");
    if(!box) return;

    let html = "<h3>🎒 背包</h3>";

    player.bag.forEach((item,i)=>{

        let text = item.name;

        const color =
        item.rarity
        ? getRarityColor(item.rarity)
        : "#FFFFFF";

        if(item.type === "item" && item.count){
            text += " x" + item.count;
        }

        if(item.rarity){
            text += "【" + item.rarity + "】";
        }
        
        const glow =
        item.rarity === "傳說"
        ? `
        text-shadow:
        0 0 5px gold,
        0 0 10px gold,
        0 0 20px gold,
        0 0 30px gold;
        `
        : "";
        
        html += `
        <button
        onclick="equip(${i})"
        style="
        color:${color};
        ${glow}
        "
        >
        ${
        item.rarity === "傳說"
        ? `<span class="legendary">✨ ${text} ✨</span>`
        : text
        }
        </button>
        `;
    });

    box.innerHTML = html;
}

/* ======================
   ⚔️ 戰鬥系統
====================== */

function explore(){

    const m = monsters[Math.floor(Math.random()*monsters.length)];

    log("⚔️ 遭遇 " + m.name);

    const playerPower = player.atk + player.weapon.atk;

    if(playerPower >= m.atk){

        player.exp += m.exp;
        player.gold += m.gold;

        log("🏆 擊敗 " + m.name);
   if(Math.random() < 0.35){

        const weapon =
        getRandomWeapon();

      player.bag.push({

        name:weapon.name,

        type:"weapon",

        atk:weapon.atk,

        rarity:weapon.rarity

    });

    log(
        "🗡️ 掉落 "
        + weapon.name
        + "【"
        + weapon.rarity
        + "】"
    );
}
        const existItem = player.bag.find(
    item =>
        item.type === "item" &&
        item.name === m.drop
);

if(existItem){

    existItem.count++;

}else{

    player.bag.push({
        name: m.drop,
        type: "item",
        count: 1
    });
}

    } else {
        log("💀 戰敗");
    }

    checkRealm();
    updateUI();
}

/* ======================
   💾 存檔系統
====================== */

function saveGame(){
    localStorage.setItem("wanjie_v10", JSON.stringify(player));
    log("💾 已存檔");
}

function loadGame(){

    const data =
    localStorage.getItem("wanjie_v10");

    if(data){

        const save =
        JSON.parse(data);

        player = {
            ...player,
            ...save
        };
    }
}

/* ======================
   🎮 初始化
====================== */

localStorage.removeItem("wanjie_v10");

loadGame();
updateUI();
log("🌟 萬界修仙 V10 架構啟動");
