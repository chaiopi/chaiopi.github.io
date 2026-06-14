let roots = [
"五靈根",
"四靈根",
"三靈根",
"雙靈根",
"天靈根",
"混沌靈根"
];

const monsters = [

{
name:"野狼",
power:5,
exp:15,
gold:20,
drop:"狼牙"
},

{
name:"山豬",
power:10,
exp:25,
gold:35,
drop:"豬皮"
},

{
name:"蛇妖",
power:20,
exp:50,
gold:60,
drop:"妖丹"
},

{
name:"黑熊妖",
power:40,
exp:100,
gold:120,
drop:"熊膽"
}

];

let player = {

realm:"凡人",

root:roots[Math.floor(Math.random()*roots.length)],

exp:0,

gold:100,

power:10,

weapon:{
name:"木劍",
power:5
},

partner:null,

children:[],

bag:[
{
name:"木劍"
}
],

village:{
level:1,
population:3,
wood:50,
food:50
}

};

function log(msg){

let box=document.getElementById("log");

box.innerHTML+=msg+"<br>";

box.scrollTop=box.scrollHeight;

}

function updateUI(){

document.getElementById("realm").innerText=player.realm;

document.getElementById("root").innerText=player.root;

document.getElementById("exp").innerText=player.exp;

document.getElementById("gold").innerText=player.gold;

document.getElementById("power").innerText=
player.power + (player.weapon ? player.weapon.power : 0);

document.getElementById("weapon").innerText=
player.weapon ? player.weapon.name : "無";

}

function checkRealm(){

if(player.exp>=5000){

player.realm="元嬰";
player.power=1000;

}

else if(player.exp>=1000){

player.realm="金丹";
player.power=300;

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

function cultivate(){

let gain=Math.floor(Math.random()*20)+10;

player.exp+=gain;

log("🧘 修煉成功，修為+"+gain);

checkRealm();

updateUI();

}

function equip(index){

let item = player.bag[index];

if(!item){

log("❌ 無法裝備");

return;

}

if(item.type !== "weapon"){

log("❌ 這不是武器");

return;

}

player.weapon = item;

log("⚔️ 已裝備：" + item.name);

updateUI();

}

function explore(){

let monster=
monsters[
Math.floor(Math.random()*monsters.length)
];

log("⚔️ 遭遇 "+monster.name);

if(
player.power + player.weapon.power
>= monster.power
){

player.exp+=monster.exp;

player.gold+=monster.gold;

player.bag.push({
name:monster.drop,
type:"item"
});

if(Math.random()<0.3){

player.bag.push({
name:"鐵劍",
type:"weapon",
power:10
});

}
  

log("🏆 擊敗 "+monster.name);

log("✨ 修為 +"+monster.exp);

log("💰 靈石 +"+monster.gold);

log("🎁 獲得 "+monster.drop);

}else{

log("💀 不敵 "+monster.name);

}

checkRealm();

updateUI();

}

function showBag(){

let box = document.getElementById("log");

box.innerHTML = "【背包】<br><br>";

player.bag.forEach((item,index)=>{

let btn =
`<button onclick="equip(${index})">
${item.name}
${item.type==="weapon" ? "(武器)" : ""}
</button><br>`;

box.innerHTML += btn;

});

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
"👶 誕生 "+
child.name+
" 資質："+child.talent
);

}

function openVillage(){

let v=player.village;

alert(

"🏠 村莊資訊\n\n"+

"等級："+v.level+"\n"+

"人口："+v.population+"\n"+

"木材："+v.wood+"\n"+

"糧食："+v.food

);

}

function saveGame(){

localStorage.setItem(
"wanjie_save",
JSON.stringify(player)
);

log("💾 存檔成功");

}

function loadGame(){

let save=
localStorage.getItem("wanjie_save");

if(save){

try{

player=JSON.parse(save);

}catch(e){

localStorage.removeItem(
"wanjie_save"
);

}

}

}

loadGame();

updateUI();

log("🌟 歡迎來到萬界仙朝");
