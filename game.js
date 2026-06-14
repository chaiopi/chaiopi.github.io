let player = {
    realm: "凡人",
    exp: 0,
    gold: 100,
    power: 10,

    weapon: {
        name: "木劍",
        power: 5,
        rarity: "普通"
    },

    bag: [
        {
            name: "木劍",
            type: "weapon",
            power: 5,
            rarity: "普通"
        }
    ]
};

const monsters = [
    {
        name: "野狼",
        hp: 20,
        power: 5,
        exp: 10,
        gold: 10,
        drop: "狼牙"
    },
    {
        name: "山豬",
        hp: 40,
        power: 10,
        exp: 20,
        gold: 20,
        drop: "豬皮"
    },
    {
        name: "蛇妖",
        hp: 60,
        power: 15,
        exp: 40,
        gold: 40,
        drop: "蛇膽"
    }
];

function log(msg){
    let box = document.getElementById("log");
    box.innerHTML += msg + "<br>";
    box.scrollTop = box.scrollHeight;
}

function updateUI(){

    document.getElementById("realm").innerText =
        player.realm;

    document.getElementById("exp").innerText =
        player.exp;

    document.getElementById("gold").innerText =
        player.gold;

    document.getElementById("power").innerText =
        player.power + player.weapon.power;

    document.getElementById("weapon").innerText =
        player.weapon.name + "【" + player.weapon.rarity + "】";
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

    log("🧘 修煉成功 +"+gain);

    checkRealm();

    updateUI();
}

function getRandomWeapon(){

    let roll = Math.random();

    if(roll < 0.60){
        return {
            name:"鐵劍",
            type:"weapon",
            power:10,
            rarity:"普通"
        };
    }

    if(roll < 0.85){
        return {
            name:"鋼劍",
            type:"weapon",
            power:20,
            rarity:"精良"
        };
    }

    if(roll < 0.97){
        return {
            name:"靈劍",
            type:"weapon",
            power:35,
            rarity:"稀有"
        };
    }

    return {
        name:"仙劍",
        type:"weapon",
        power:60,
        rarity:"傳說"
    };
}

function explore(){

    let monster =
        monsters[
            Math.floor(
                Math.random()*monsters.length
            )
        ];

    log("⚔️ 遭遇 "+monster.name);

    let totalPower =
        player.power +
        player.weapon.power;

    if(totalPower >= monster.power){

        player.exp += monster.exp;
        player.gold += monster.gold;

        log("🏆 擊敗 "+monster.name);
        log("✨ 修為 +"+monster.exp);
        log("💰 靈石 +"+monster.gold);

        player.bag.push({
            name:monster.drop,
            type:"item"
        });

        log("🎁 獲得 "+monster.drop);

        if(Math.random() < 0.4){

            let weapon =
                getRandomWeapon();

            player.bag.push(weapon);

            log(
                "🗡️ 掉落 " +
                weapon.name +
                "【" +
                weapon.rarity +
                "】"
            );
        }

    }else{

        log("💀 不敵 "+monster.name);
    }

    checkRealm();

    updateUI();
}

window.equip = function(index){

    let item =
        player.bag[index];

    if(!item){

        log("❌ 找不到物品");
        return;
    }

    if(item.type !== "weapon"){

        log("❌ 這不是武器");
        return;
    }

    player.weapon = item;

    log(
        "🗡️ 裝備 " +
        item.name +
        "【" +
        item.rarity +
        "】"
    );

    updateUI();
}

function showBag(){

    let box =
        document.getElementById("log");

    let html =
        "<b>【背包】</b><br><br>";

    player.bag.forEach(
        (item,index)=>{

        html += `
        <button onclick="equip(${index})">
            ${item.name}
            ${
                item.rarity
                ? "【"+item.rarity+"】"
                : ""
            }
        </button>
        <br><br>
        `;
    });

    box.innerHTML = html;
}

function saveGame(){

    localStorage.setItem(
        "wanjie_save",
        JSON.stringify(player)
    );

    log("💾 存檔成功");
}

function loadGame(){

    let save =
        localStorage.getItem(
            "wanjie_save"
        );

    if(save){

        player =
            JSON.parse(save);
    }
}

loadGame();

updateUI();

log("🌟 歡迎來到萬界修仙");
console.log("GAME OK");
