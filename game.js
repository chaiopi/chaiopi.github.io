let player = {
realm:"凡人",
exp:0,
gold:100,
power:10,
weapon:{name:"木劍", power:5},
bag:[]
};
const rarityList = ["普通", "精良", "稀有", "傳說"];

const monsters = [
{name:"野狼", hp:20, power:5, exp:10, gold:10, drop:"狼牙"},
{name:"山豬", hp:40, power:10, exp:20, gold:20, drop:"豬皮"},
{name:"蛇妖", hp:60, power:15, exp:40, gold:40, drop:"蛇膽"}
];

function log(msg){
document.getElementById("log").innerHTML += msg+"<br>";
}

function updateUI(){
document.getElementById("realm").innerText = player.realm;
document.getElementById("exp").innerText = player.exp;
document.getElementById("gold").innerText = player.gold;
document.getElementById("power").innerText = player.power + player.weapon.power;
document.getElementById("weapon").innerText = player.weapon.name;
}

function cultivate(){
let gain = Math.floor(Math.random()*20)+10;
player.exp += gain;
log("修煉 +" + gain);
checkRealm();
updateUI();
}

function checkRealm(){
if(player.exp > 100){
player.realm = "築基";
player.power = 30;
}
if(player.exp > 300){
player.realm = "金丹";
player.power = 80;
}
}

function explore(){

let m = monsters[Math.floor(Math.random()*monsters.length)];

log("遇到 " + m.name);

let total = player.power + player.weapon.power;

if(total >= m.power){

log("擊敗 " + m.name);

player.exp += m.exp;
player.gold += m.gold;

player.bag.push({name:m.drop, type:"item"});

if(Math.random()<0.3){
player.bag.push({name:"鐵劍", type:"weapon", power:10});
log("掉落鐵劍");
}

}else{
log("被擊敗");
}

updateUI();
}

function showBag(){

let html = "背包<br><br>";

player.bag.forEach((item,i)=>{
html += `<button onclick="equip(${i})">${item.name}</button><br>`;
});

document.getElementById("log").innerHTML = html;
}

function equip(i){

let item = player.bag[i];
if(!item){
log("沒有物品");
return;
}

if(item.type !== "weapon"){
log("這不是武器");
return;
}

player.weapon = item;
log("裝備：" + item.name);
updateUI();
}

function saveGame(){
localStorage.setItem("rpg", JSON.stringify(player));
log("已存檔");
}

function loadGame(){
let data = localStorage.getItem("rpg");
if(data){
player = JSON.parse(data);
}
updateUI();
}

loadGame();
updateUI();
