let roots = [
"五靈根",
"四靈根",
"三靈根",
"雙靈根",
"天靈根",
"混沌靈根"
];

let player = {

name:"散修",

realm:"凡人",

root:roots[Math.floor(Math.random()*roots.length)],

exp:0,

gold:100,

power:10,

partner:null,

children:[]

};

function log(msg){

let box=document.getElementById("log");

box.innerHTML += msg+"<br>";

box.scrollTop=box.scrollHeight;

}

function updateUI(){

document.getElementById("realm").innerText=player.realm;

document.getElementById("root").innerText=player.root;

document.getElementById("exp").innerText=player.exp;

document.getElementById("gold").innerText=player.gold;

document.getElementById("power").innerText=player.power;

}

function cultivate(){

let gain=Math.floor(Math.random()*20)+10;

player.exp+=gain;

log("🧘 修煉成功，獲得修為 "+gain);

checkRealm();

updateUI();

}

function checkRealm(){

if(player.exp>=1000){

player.realm="金丹";

player.power=500;

}

else if(player.exp>=300){

player.realm="築基";

player.power=100;

}

else if(player.exp>=50){

player.realm="煉氣";

player.power=30;

}

}

function explore(){

let roll=Math.random();

if(roll<0.4){

let stone=Math.floor(Math.random()*50);

player.gold+=stone;

log("💰 發現靈石 "+stone);

}

else{

let gain=Math.floor(Math.random()*30);

player.exp+=gain;

log("🐺 擊敗妖獸，修為+"+gain);

}

updateUI();

}

function showBag(){

alert(
"靈石："+player.gold+
"\n修為："+player.exp
);

}

function findPartner(){

if(player.partner){

log("❤️ 已有道侶："+player.partner);

return;

}

let names=[
"柳如煙",
"蘇璃月",
"白靈兒",
"龍清雪"
];

player.partner=
names[Math.floor(Math.random()*names.length)];

log("💕 遇見道侶："+player.partner);

}

function haveChild(){

if(!player.partner){

log("❌ 尚未擁有道侶");

return;

}

let child={

name:"子嗣"+(player.children.length+1),

talent:Math.floor(Math.random()*100)

};

player.children.push(child);

log(
"👶 誕生子嗣："+child.name+
" 資質："+child.talent
);

}

function openVillage(){

log("🏠 村莊系統開發中");

}

function saveGame(){

localStorage.setItem(
"xiandao",
JSON.stringify(player)
);

log("💾 存檔成功");

}

function loadGame(){

let save=
localStorage.getItem("xiandao");

if(save){

player=JSON.parse(save);

log("📖 讀檔成功");

}

}

loadGame();

updateUI();

log("🌟 歡迎來到萬界仙朝");
