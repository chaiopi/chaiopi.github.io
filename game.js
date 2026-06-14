let player = {

    realm:"凡人",

    exp:0,

    gold:100,

    power:10,

    weapon:{
        name:"木劍",
        power:5,
        rarity:"普通"
    },

    bag:[
        {
            name:"木劍",
            type:"weapon",
            power:5,
            rarity:"普通"
        }
    ]
};

const monsters = [

{
name:"野狼",
power:5,
exp:10,
gold:10,
drop:"狼牙"
},

{
name:"山豬",
power:10,
exp:20,
gold:20,
drop:"豬皮"
},

{
name:"蛇妖",
power:20,
exp:40,
gold:40,
drop:"蛇膽"
}

];

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

    let box =
    document.getElementById("log");

    box.innerHTML += msg + "<br>";

    box.scrollTop =
    box.scrollHeight;
}

function updateUI(){

    document.getElementById("realm").innerText =
    player.realm;

    document.getElementById("exp").innerText =
    player.exp;

    document.getElementById("gold").innerText =
    player.gold;

    document.getElementById("power").innerText =
    player.power +
    player.weapon.power;

    document.getElementById("weapon").innerHTML =
    `<span style="color:${getRarityColor(player.weapon.rarity)}">
    ${player.weapon.name}
    【${player.weapon.rarity}】
    </span>`;

    showBag();
}

function checkRealm(){

    if(player.exp >= 1000){

        player.realm = "元嬰";
        player.power = 300;
    }

    else if(player.exp >= 300){

        player.realm = "金丹";
        player.power = 100;
    }

    else if(player.exp >= 100){

        player.realm = "築基";
        player.power = 30;
    }
}

function cultivate(){

    let gain =
    Math.floor(Math.random()*20)+10;

    player.exp += gain;

    log("🧘 修煉成功 +" + gain);

    checkRealm();

    updateUI();
}

function getRandomWeapon(){

    let roll = Math.random();

    if(roll < 0.60){

        return{
            name:"鐵劍",
            type:"weapon",
            power:10,
            rarity:"普通"
        };
    }

    if(roll < 0.85){

        return{
            name:"鋼劍",
            type:"weapon",
            power:20,
            rarity:"精良"
        };
    }

    if(roll < 0.97){

        return{
            name:"靈劍",
            type:"weapon",
            power:35,
            rarity:"稀有"
        };
    }

    if(roll < 0.995){

        return{
            name:"魔劍",
            type:"weapon",
            power:55,
            rarity:"史詩"
        };
    }

    return{
        name:"仙劍",
        type:"weapon",
        power:80,
        rarity:"傳說"
    };
}

function explore(){

    let monster =
    monsters[
    Math.floor(
    Math.random()*monsters.length
    )];

    log("⚔️ 遭遇 " + monster.name);

    let totalPower =
    player.power +
    player.weapon.power;

    if(totalPower >= monster.power){

        player.exp += monster.exp;

        player.gold += monster.gold;

        log("🏆 擊敗 " + monster.name);

        log("✨ 修為 +" + monster.exp);

        log("💰 靈石 +" + monster.gold);

        player.bag.push({

            name:monster.drop,

            type:"item"
        });

        log("🎁 獲得 " + monster.drop);

        if(Math.random() < 0.4){

            let weapon =
            getRandomWeapon();

            player.bag.push(weapon);

            log(
            "🗡️ 掉落 "
            + weapon.name
            + "【"
            + weapon.rarity
            + "】"
            );
        }

    }else{

        log("💀 不敵 " + monster.name);
    }

    checkRealm();

    updateUI();
}

window.equip = function(index){

    let item =
    player.bag[index];

    if(!item){

        return;
    }

    if(item.type !== "weapon"){

        log("❌ 這不是武器");

        return;
    }

    player.weapon = item;

    log(
    "🗡️ 裝備 "
    + item.name
    + "【"
    + item.rarity
    + "】"
    );

    updateUI();
}

function showBag(){

    let html =
    "<h3>🎒 背包</h3>";

    player.bag.forEach(

    (item,index)=>{

    html += `
    <div class="bagItem">

    <button onclick="equip(${index})">

    <span style="
    color:${getRarityColor(item.rarity)}
    ">

    ${item.name}

    ${
    item.rarity
    ? "【"+item.rarity+"】"
    : ""
    }

    </span>

    </button>

    </div>
    `;
    });

    document.getElementById("bagBox")
    .innerHTML = html;
}

function saveGame(){

    localStorage.setItem(
    "wanjie_v3",
    JSON.stringify(player)
    );

    log("💾 存檔成功");
}

function loadGame(){

    let save =
    localStorage.getItem(
    "wanjie_v3"
    );

    if(save){

        player =
        JSON.parse(save);
    }
}

loadGame();

updateUI();

log("🌟 歡迎來到萬界修仙 V3");
