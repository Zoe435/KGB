// ==UserScript==
// @name         Kraken Aimbot
// @namespace    http://tampermonkey.net/
// @version      0.1.9
// @description  Custom-made aimbot.  Best for free ranger i think.  Hold F for aimbot.  V toggles ESP.  L toggles defensive flicking.  Idk the rest.  WIP.  have fun wrecking
// @match        *://shellshock.io/*
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathdrills.info/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.best/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://softboiled.club/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://zygote.cafe/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

//const params = `{"playType":0,"gameType":1,"playerName":"Ur Mother","mapIdx":-1,"joinCode":"","subdomain":"egs-static-live-uswest-192r5xds","id":"64E8JFR","uuid":"l3ilchap4ytj2pv0"}`
const replace_e = `{"classIdx":2,"hatId":1019,"stampId":2199,"grenadeId":16055,"colorIdx":4,"primaryId":[3101,3601,3442,3801,4001,4201,4501],"secondaryId":[3001,3001,3001,3001,3001,3001,3001]}`
window.XMLHttpRequest = class extends window.XMLHttpRequest {

	open( method, url ) {

		if ( url.indexOf( 'shellshock.js' ) > - 1 ) {

			this.isScript = true;

		}

		return super.open( ...arguments );

	}

	get response() {

		if ( this.isScript ) {

			const code = super.response;

			let babylonVarName,
				playersVarName,
				myPlayerVarName,
                tracerVarName,
				sceneVarName,
				cullFuncName;

			try {

				babylonVarName = /this.origin=new ([a-zA-Z]+)\.Vector3,/.exec( code )[ 1 ];
				playersVarName = /([^,]+)=\[\],{}/.exec( code )[ 1 ];
				myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec( code )[ 1 ];
                tracerVarName = /([a-zA-Z]+)\.rayCollidesWithMap/.exec( code )[ 1 ];
				sceneVarName = /createMapCells\(([^,]+),/.exec( code )[ 1 ];
				cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec( code )[ 1 ];

			} catch ( error ) {

				alert( 'Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify( getVars(), undefined, 2 ) );

				return code;

			}

			function getVars() {
                console.log(babylonVarName);

				return {
					babylonVarName,
					playersVarName,
					myPlayerVarName,
					playersVarName,
                    tracerVarName,
					sceneVarName,
					cullFuncName
				};

			}

			console.log( '%cInjecting code...', 'color: red; background: black; font-size: 2em;', getVars() );
            console.log(cullFuncName);
			return code.replace( sceneVarName + '.render()', `

					window[ '${onUpdateFuncName}' ](
						${babylonVarName},
                        ${tracerVarName},
						${playersVarName},
						${myPlayerVarName},
                        He
					);

				${sceneVarName}.render()` )
				.replace( `function ${cullFuncName}`, `

					function ${cullFuncName}() {

						return true;

					}



				function someFunctionWhichWillNeverBeUsedNow` )
                //.replace(`const t=getStoredNumber("lastPreRoll",Date.now())+e,i=m>1&&ar>1&&Date.now()>t;let r=Oa.timeToPlayVideoAd();`,
                //         `const t=getStoredNumber("lastPreRoll",Date.now())+e,i=0;let r=0;`)
                //.replace(`le&&!pwaBlockAds||Date.now()>t+i&&m>1&&!pwaBlockAds`, `0`)
                //.replace(`!ye)`, `0)`)
                .replace(`vueApp.showLoadingScreenAd(),`,``)
                //.replace(`!0===r||!1`, `!1&&!0`)
                .replace(`!0===r||!1!==r&&!!i`, `!1===!0`)
                .replace(`i>-1||n>-1||a>-1`,`0`)
                .replace(`!pwaBlockAds||`, `0&&`)
                //.replace(`!0===r||!1!==r&&!!i`,`!1`)
                //.replace(`void xi("shellshock.io_preroll",Br)):Hr()`,`Hr()):Hr()`)
                //.replace(`?(sr=!0,void xi("shellshock.io_preroll",Br)):Hr()`,`,Hr()`)
                //.replace(`if(ye)return!1`, `return!1`)
                //.replace(`crazyGamesActive||testCrazy`,`0`)
                //.replace(`function eo(e){console.log("prepareToJoinGame",e),`,`function eo(e){e.uuid=69420;console.log("prepareToJoinGame",e),`)
                .replace(`i.packString(e.playerName),`, `i.packString("(кgв)" + e.playerName),`)
                //  CURSE.replace(`var r=ki.getBuffer();r.packInt8(ze.chat),r.packString(i)`,`var r=ki.getBuffer();var char_map = {"0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","a":"𝔞","b":"𝔟","c":"𝔠","d":"𝔡","e":"𝔢","f":"𝔣","g":"𝔤","h":"𝔥","i":"𝔦","j":"𝔧","k":"𝔨","l":"𝔩","m":"𝔪","n":"𝔫","o":"𝔬","p":"𝔭","q":"𝔮","r":"𝔯","s":"𝔰","t":"𝔱","u":"𝔲","v":"𝔳","w":"𝔴","x":"𝔵","y":"𝔶","z":"𝔷","A":"𝔄","B":"𝔅","C":"ℭ","D":"𝔇","E":"𝔈","F":"𝔉","G":"𝔊","H":"ℌ","I":"ℑ","J":"𝔍","K":"𝔎","L":"𝔏","M":"𝔐","N":"𝔑","O":"𝔒","P":"𝔓","Q":"𝔔","R":"ℜ","S":"𝔖","T":"𝔗","U":"𝔘","V":"𝔙","W":"𝔚","X":"𝔛","Y":"𝔜","Z":"ℨ"};let new_chat="";for(let z=0;z<i.length&&z<32;z++){new_chat+=char_map[i[z]] === undefined ?  i[z] : char_map[i[z]];}r.packInt8(Le.chat),r.packString(new_chat)`)
                //  SERIF.replace(`var r=ki.getBuffer();r.packInt8(ze.chat),r.packString(i)`,`var r=ki.getBuffer();var char_map = {"0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","a":"𝐚","b":"𝐛","c":"𝐜","d":"𝐝","e":"𝐞","f":"𝐟","g":"𝐠","h":"𝐡","i":"𝐢","j":"𝐣","k":"𝐤","l":"𝐥","m":"𝐦","n":"𝐧","o":"𝐨","p":"𝐩","q":"𝐪","r":"𝐫","s":"𝐬","t":"𝐭","u":"𝐮","v":"𝐯","w":"𝐰","x":"𝐱","y":"𝐲","z":"𝐳","A":"𝐀","B":"𝐁","C":"𝐂","D":"𝐃","E":"𝐄","F":"𝐅","G":"𝐆","H":"𝐇","I":"𝐈","J":"𝐉","K":"𝐊","L":"𝐋","M":"𝐌","N":"𝐍","O":"𝐎","P":"𝐏","Q":"𝐐","R":"𝐑","S":"𝐒","T":"𝐓","U":"𝐔","V":"𝐕","W":"𝐖","X":"𝐗","Y":"𝐘","Z":"𝐙"};let new_chat="";for(let z=0;z<i.length&&z<32;z++){new_chat+=char_map[i[z]] === undefined ?  i[z] : char_map[i[z]];}r.packInt8(Le.chat),r.packString(new_chat)`)
                //.replace(`var r=ki.getBuffer();r.packInt8(ze.chat),r.packString(i)`,`var r=ki.getBuffer();var char_map = {"0":"𝟶","1":"𝟷","2":"𝟸","3":"𝟹","4":"𝟺","5":"𝟻","6":"𝟼","7":"𝟽","8":"𝟾","9":"𝟿","a":"𝚊","b":"𝚋","c":"𝚌","d":"𝚍","e":"𝚎","f":"𝚏","g":"𝚐","h":"𝚑","i":"𝚒","j":"𝚓","k":"𝚔","l":"𝚕","m":"𝚖","n":"𝚗","o":"𝚘","p":"𝚙","q":"𝚚","r":"𝚛","s":"𝚜","t":"𝚝","u":"𝚞","v":"𝚟","w":"𝚠","x":"𝚡","y":"𝚢","z":"𝚣","A":"𝙰","B":"𝙱","C":"𝙲","D":"𝙳","E":"𝙴","F":"𝙵","G":"𝙶","H":"𝙷","I":"𝙸","J":"𝙹","K":"𝙺","L":"𝙻","M":"𝙼","N":"𝙽","O":"𝙾","P":"𝙿","Q":"𝚀","R":"𝚁","S":"𝚂","T":"𝚃","U":"𝚄","V":"𝚅","W":"𝚆","X":"𝚇","Y":"𝚈","Z":"𝚉"};let new_chat="";for(let z=0;z<i.length&&z<32;z++){new_chat+=char_map[i[z]] === undefined ?  i[z] : char_map[i[z]];}r.packInt8(Le.chat),r.packString(new_chat)`)
                //  BOLD.replace(`var r=ki.getBuffer();r.packInt8(ze.chat),r.packString(i)`,`var r=ki.getBuffer();var char_map = {"0":"𝟬","1":"𝟭","2":"𝟮","3":"𝟯","4":"𝟰","5":"𝟱","6":"𝟲","7":"𝟳","8":"𝟴","9":"𝟵","a":"𝗮","b":"𝗯","c":"𝗰","d":"𝗱","e":"𝗲","f":"𝗳","g":"𝗴","h":"𝗵","i":"𝗶","j":"𝗷","k":"𝗸","l":"𝗹","m":"𝗺","n":"𝗻","o":"𝗼","p":"𝗽","q":"𝗾","r":"𝗿","s":"𝘀","t":"𝘁","u":"𝘂","v":"𝘃","w":"𝘄","x":"𝘅","y":"𝘆","z":"𝘇","A":"𝗔","B":"𝗕","C":"𝗖","D":"𝗗","E":"𝗘","F":"𝗙","G":"𝗚","H":"𝗛","I":"𝗜","J":"𝗝","K":"𝗞","L":"𝗟","M":"𝗠","N":"𝗡","O":"𝗢","P":"𝗣","Q":"𝗤","R":"𝗥","S":"𝗦","T":"𝗧","U":"𝗨","V":"𝗩","W":"𝗪","X":"𝗫","Y":"𝗬","Z":"𝗭"};let new_chat="";for(let z=0;z<i.length&&z<32;z++){new_chat+=char_map[i[z]] === undefined ?  i[z] : char_map[i[z]];}r.packInt8(Le.chat),r.packString(new_chat)`)
                //.replace(`Et.prototype.getFloat=function(e,t){`,`Et.prototype.getFloat=function(e,t){console.log("randomgenning");`)

                //.replace(`Pi({cmd:"urlRewardParams"`,`console.log("e");console.log(e);Pi({cmd:"urlRewardParams"`)
                //Attempted Color Replace:   .replace(`changeCharacter=function(e,t,i,r,n,a,o,s){var l`, `changeCharacter=function(e,t,i,unused,n,a,o,s){const r = 7;console.log("color is");console.log(r);var l`)
                //.replace(`for(var t=0;t<this.inventory.length;t++)if(this.inventory[t]&&this.inventory[t].id===e.id)`, `for(var t=-1234576;t<3;t++)`)
                //.replace(/inStore:0,/g,`inStore:1,`)
                //.replace(/isActive:!1,/g,` isActive:!0`)
                //.replace(`X.firebaseId&&(i.packInt32(X.session),i.packString(X.firebaseId)),`, `X.firebaseId&&(i.packInt32(X.session),i.packString("N9GyXvkBMmRYK3VVVBNNrtcAa3k0")),`)
                //.replace(`var o=nt.rayCollidesWithMap(a.forwardRay.origin,a.forwardRay.direction,nt.projectileCollidesWithCell);`,
                //         `var o=nt.rayCollidesWithMap(a.forwardRay.origin,a.forwardRay.direction,nt.projectileCollidesWithCell);console.log("collision:");console.log(!(o==false));`)
                //.replace(`rayCollidesWithMap:function(e,t,i){if(isNaN(e.x)||isNaN(e.y)||isNaN(e.z))`,
                //         `rayCollidesWithMap:function(e,t,i){console.log("called:  -------------");console.log(e);console.log(t);console.log(i);console.log(t.length());if(isNaN(e.x)||isNaN(e.y)||isNaN(e.z))`)
                //.replace(`rayCollidesWithPlayer:function(e,t,i,r){fo`, `rayCollidesWithPlayer:function(e,t,i,r){console.log("called:  -------------");console.log(e);console.log(t);console.log(r);fo`)
                //.replace(`let t=40;this.player.activeShellStreaks&We.EggBreaker&&(t=255),`,`let t=255;`)
                //.replaceAll(`,300`, `,0`)
                //𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳
                //𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷
                //.replace("r.packInt8(Le.chat)", "r.packInt8(Le.chat.replaceAll(\"a\",\"𝐚\").replaceAll(\"b\",\"𝐛\").replaceAll(\"c\",\"𝐜\").replaceAll(\"d\",\"𝐝\").replaceAll(\"e\",\"𝐞\").replaceAll(\"f\",\"𝐟\").replaceAll(\"g\",\"𝐠\").replaceAll(\"h\",\"𝐡\").replaceAll(\"i\",\"𝐢\").replaceAll(\"j\",\"𝐣\").replaceAll(\"k\",\"𝐤\").replaceAll(\"l\",\"𝐥\").replaceAll(\"m\",\"𝐦\").replaceAll(\"n\",\"𝐧\").replaceAll(\"o\",\"𝐨\").replaceAll(\"p\",\"𝐩\").replaceAll(\"q\",\"𝐪\").replaceAll(\"r\",\"𝐫\").replaceAll(\"s\",\"𝐬\").replaceAll(\"t\",\"𝐭\").replaceAll(\"u\",\"𝐮\").replaceAll(\"v\",\"𝐯\").replaceAll(\"w\",\"𝐰\").replaceAll(\"x\",\"𝐱\").replaceAll(\"y\",\"𝐲\").replaceAll(\"z\",\"𝐳\"))")
                //.replace(`this.player.shotSpread + this.inaccuracy`, `0`)
                ;
                //
                //.replace(`this.eggBreakerValue=Math.max(0,this.eggBreakerValue-1)`, `this.eggBreakerValue=450`);
                //.replace(`playType:e.playType`, `playType:1`);
                //.replace(`n.onopen=function(t){n.send(JSON.stringify(e)),console.log("servicesWs opened, and "+e.cmd+" request sent")`,
               //          `n.onopen=function(t){n.send((e.cmd=="saveLoadout") ? ` + replace_e + ` : JSON.stringify(e)),` +
               //          `console.log("servicesWs opened, and "+e.cmd+" request sent" + JSON.stringify(e))`);


		}

		return super.response;

	}

};

let espEnabled = true;
let aimbotEnabled = false;
let showLines = false;
let targetID = -1;
let targeted = false;
let autoDefense = true;
let autoFire = false;
let prefix = "XSD";
let suffix = "_5096";
let cull_name = prefix + suffix;
const gravity = 0.006;
const pow = 1.4;
let destruction = false;

const value = parseInt( new URLSearchParams( window.location.search ).get( 'showAd' ), 16 );

const temp = document.createElement( 'div' );

temp.innerHTML = `
<style>

.msg {
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #0E7697;
	font-weight: bolder;
	padding: 15px;
	animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
	z-index: 999999;
	pointer-events: none;
}

@keyframes msg {
	from {
		transform: translate(-120%, 0);
	}

	to {
		transform: none;
	}
}

</style>
<div class="popup_window popup_lg roundme_lg msg" style="display: none;"></div>`;

const msgEl = temp.querySelector( '.msg' );
const infoEl = temp.querySelector( '.info' );

function fire_delayed_bullet(player) {
    return new Promise(resolve => {
        setTimeout(() => {
            player.pullTrigger();
            resolve('firing trigger')
        }, 50)
    })
}

window.addEventListener( 'DOMContentLoaded', async function () {

	while ( temp.children.length > 0 ) {

		document.body.appendChild( temp.children[ 0 ] );

	}


} );


window.addEventListener( 'keyup', function ( event ) {

	if ( document.activeElement && document.activeElement.tagName === 'INPUT' ) {

		return;

	}

	switch ( event.code ) {
        case 'KeyL' :
            autoDefense = ! autoDefense;
            showMsg( 'Defensive Tracking', autoDefense );
            break
        case 'KeyP' :
            destruction = ! destruction;
            showMsg( 'Bye Bye', destruction );
            break
        case 'KeyF' :
			aimbotEnabled = false;
			break;
        case 'KeyE' :
            autoFire = false;
            break;
		case 'KeyV' :
			espEnabled = ! espEnabled;
			showMsg( 'ESP', espEnabled );
			break;
        case 'KeyN' :
			showLines = ! showLines;
			showMsg( 'ESP Lines', showLines );
			break;
		case 'KeyH' :
			infoEl.style.display = infoEl.style.display === '' ? 'none' : '';
			break;
	}
} );
window.addEventListener( 'keydown', function ( event ) {

	if ( document.activeElement && document.activeElement.tagName === 'INPUT' ) {

		return;

	}
	switch ( event.code ) {
        case 'KeyE' :
			autoFire = true;
			break;
        case 'KeyF' :
			aimbotEnabled = true;
			break;
	}

} );

function showMsg( name, bool ) {

	msgEl.innerText = name + ': ' + ( bool ? 'ON' : 'OFF' );

	msgEl.style.display = 'none';

	void msgEl.offsetWidth;

	msgEl.style.display = '';

}

let lineOrigin, lines, linesArray;

const onUpdateFuncName = btoa( Math.random().toString( 32 ) );
const onFireFuncName = btoa( Math.random().toString( 32 ) );

const circularReference = {otherData: 123};
circularReference.myself = circularReference;

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

var set_x = 0.0;
var set_y = 0.0;
var set_z = 0.0;
var toggle = 1;

class raypoint {
    constructor(x, y, z, l) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.l = l;
    }
    length = function() {
        return 1000;
    }
}

window[ onUpdateFuncName ] = function ( BABYLON, tracer, players, myPlayer, crash_class) {
    if ( ! myPlayer ) { return; }
    if ( destruction ) {
        crash_class.respawn = 1;
    }

    //console.log(myPlayer.pitch);
    /*console.log(myPlayer.shotSpread);
    console.log(myPlayer.weapon.inaccuracy);*/


    if ( ! lineOrigin ) {
        lineOrigin = new BABYLON.Vector3();
        linesArray = [];

    }

    lineOrigin.copyFrom( myPlayer.actor.mesh.position );

    const yaw = myPlayer.actor.mesh.rotation.y;

    lineOrigin.x += Math.sin( yaw );
    lineOrigin.z += Math.cos( yaw );
    lineOrigin.y += Math.sin( - myPlayer.pitch );

    for ( let i = 0; i < linesArray.length; i ++ ) {

        linesArray[ i ].playerExists = false;

    }


    for ( let i = 0; i < players.length; i ++ ) {

        const player = players[ i ];

        if ( ! player || player === myPlayer || player.name === cull_name) { continue; }

        //console.log(player.name);

        if ( player.sphere === undefined ) {

            console.log( 'Adding sphere...' );

            const material = new BABYLON.StandardMaterial( 'myMaterial', player.actor.scene );
            material.emissiveColor = material.diffuseColor = new BABYLON.Color3( 1, 0, 0 );
            material.wireframe = true;


            const sphere = BABYLON.MeshBuilder.CreateBox( 'mySphere', { width: 0.5, height: 0.75, depth: 0.5 }, player.actor.scene );

            sphere.material = material;
            sphere.position.y = 0.3;

            sphere.parent = player.actor.mesh;

            player.sphere = sphere;

        }
        if (player.label === undefined ) {
            var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 5, player.actor.scene, false);
            outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
            outputplane.material = new BABYLON.StandardMaterial("outputplane", player.actor.scene);
            var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, player.actor.scene, true);
            outputplane.material.diffuseTexture = outputplaneTexture;
            outputplane.material.diffuseTexture.hasAlpha = true;
            outputplane.useAlphaFromDiffuseTexture = true;
            outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            outputplane.material.backFaceCulling = false;
            outputplane.position.y = -1.5
            outputplane.parent = player.actor.mesh;
            outputplaneTexture.drawText(player.name, null, 14, "bold 14px verdana", "white", "#00000000");
            player.label = outputplane;

        }
        if(player.x != undefined) {

            const old_x = player.x - myPlayer.x;
            const old_y = player.y - myPlayer.y;
            const old_z = player.z - myPlayer.z;
            const distance = Math.hypot( player.x - myPlayer.x, player.y - myPlayer.y, player.z - myPlayer.z );
            let d = distance;


            const mult = 1.56 / myPlayer.weapon.constructor.velocity;
            let t = (d+pow) * mult;
            let v_t = (d+pow) / myPlayer.weapon.constructor.velocity;
            let addend = (player.dy * v_t) - (gravity * (v_t**2));

            if(player.climbing && player.dy > 0) { addend = (player.dy * 4 * t); }
            if(player.climbing && player.dy < 0) { addend = (-player.dy * 4 * t); }


            let x = old_x + (player.dx * t);
            let y = old_y - 0.08;
            let z = old_z + (player.dz * t);

            if(!player.onGround) {
                y += addend;
                const start_ray = new raypoint(player.x, player.y, player.z, addend);
                const end_ray = new raypoint(0, addend, 0, addend);
                const impact_point = tracer.rayCollidesWithMap(start_ray, end_ray, tracer.projectileCollidesWithCell);
                if(impact_point && impact_point.pick.pickedPoint.y > y) {
                    y = (impact_point.pick.pickedPoint.y - 0.08) - myPlayer.y;
                }
            } else if (Math.abs(player.dy) > 0.01) {
                y += (player.dy * t / 1.5);
            }


            const radius = Math.abs(player.yaw - Math.radAdd( Math.atan2( -old_x, -old_z ), 0 )) + Math.abs(player.pitch + Math.atan2( -old_y, Math.hypot( -old_x, -old_z ) ) % 1.5);

            if ( player.lines === undefined ) {

                const options = {
                    points: [ lineOrigin, player.actor.mesh.position ],
                    updatable: true
                };

                const lines = options.instance = BABYLON.MeshBuilder.CreateLines( 'lines', options, player.actor.scene );
                lines.color = new BABYLON.Color3( 1, 0, 0 );
                lines.alwaysSelectAsActiveMesh = true;
                lines.renderingGroupId = 1;

                player.lines = lines;
                player.lineOptions = options;

                linesArray.push( lines );

                console.log( '%cAdding line...', 'color: green; background: black; font-size: 2em;' );

            }

            player.lines.playerExists = true;
            player.lines = BABYLON.MeshBuilder.CreateLines( 'lines', player.lineOptions );

            player.sphere.renderingGroupId = espEnabled ? 1 : 0;
            player.sphere.visibility = ( aimbotEnabled || espEnabled ) && myPlayer !== player && ( myPlayer.team === 0 || myPlayer.team !== player.team );
            player.label.renderingGroupId = espEnabled ? 1 : 0;
            player.label.visibility = ( aimbotEnabled || espEnabled ) && myPlayer !== player && ( myPlayer.team === 0 || myPlayer.team !== player.team );


            player.lines.visibility = player.playing && player.sphere.visibility && showLines;

            const offset = 0.00;
            const rel_distance = Math.hypot(x,y,z);
            const player_ray = new raypoint(myPlayer.x-offset, myPlayer.y+0.4, myPlayer.z-offset, rel_distance);
            const target_ray = new raypoint(x+offset, y+offset, z+offset, rel_distance);
            player.viable = !tracer.rayCollidesWithMap(player_ray, target_ray, tracer.projectileCollidesWithCell);
            //console.log("does it collide?");
            //console.log(viable);

            if(radius < 2 / distance || (player.primaryWeaponItem.category_name == "Eggsploder Primary Weapons" && radius < 0.1) || distance < 2) {
                if (player.viable) {
                    player.sphere.material.emissiveColor = player.sphere.material.diffuseColor = new BABYLON.Color3( 1, 1, 0 );
                    player.lines.color = new BABYLON.Color3( 1, 1, 0 );
                } else {
                    player.sphere.material.emissiveColor = player.sphere.material.diffuseColor = new BABYLON.Color3( 0, 1, 0 );
                    player.lines.color = new BABYLON.Color3( 0, 1, 0 );
                }
            } else {
                if (player.viable) {
                    player.sphere.material.emissiveColor = player.sphere.material.diffuseColor = new BABYLON.Color3( 1, 0, 0 );
                    player.lines.color = new BABYLON.Color3( 1, 0, 0 );
                } else {
                    player.sphere.material.emissiveColor = player.sphere.material.diffuseColor = new BABYLON.Color3( 0.3, 0, 0 );
                    player.lines.color = new BABYLON.Color3( 0.3, 0, 0 );
                }
            }
        }


    }

    for ( let i = 0; i < linesArray.length; i ++ ) {

        if ( ! linesArray[ i ].playerExists ) {

            console.log( '%cRemoving line...', 'color: red; background: black; font-size: 2em;' );

            linesArray[ i ].dispose();
            linesArray.splice( i, 1 );

        }

    }


    if ( myPlayer.playing && aimbotEnabled) {
        let minDistance = Infinity;
        let targetPlayer;

        for ( let i = 0; i < players.length; i ++ ) {
            const player = players[ i ];

            if ( player && player !== myPlayer && player.playing && ( myPlayer.team === 0 || player.team !== myPlayer.team ) && !(player.name === cull_name)) {
                if(player.x != undefined) {

                    const old_x = player.x - myPlayer.x;
                    const old_y = player.y - myPlayer.y;
                    const old_z = player.z - myPlayer.z;
                    const distance = Math.hypot( player.x - myPlayer.x, player.y - myPlayer.y, player.z - myPlayer.z );
                    let d = distance;

                    const mult = 1.56 / myPlayer.weapon.constructor.velocity;
                    let t = (d+pow) * mult;
                    let v_t = (d+pow) / myPlayer.weapon.constructor.velocity;
                    let addend = (player.dy * v_t) - (gravity * (v_t**2));

                    if(player.climbing && player.dy > 0) { addend = (player.dy * 4 * t); }
                    if(player.climbing && player.dy < 0) { addend = (-player.dy * 4 * t); }


                    let x = old_x + (player.dx * t);
                    let y = old_y - 0.08;
                    let z = old_z + (player.dz * t);


                    if(!player.onGround) {
                        y += addend;
                        const start_ray = new raypoint(player.x, player.y, player.z, addend);
                        const end_ray = new raypoint(0, addend, 0, addend);
                        const impact_point = tracer.rayCollidesWithMap(start_ray, end_ray, tracer.projectileCollidesWithCell);
                        if(impact_point && impact_point.pick.pickedPoint.y > y) {
                            y = (impact_point.pick.pickedPoint.y - 0.08) - myPlayer.y;
                        }
                    } else if (Math.abs(player.dy) > 0.01) {
                        y += (player.dy * t);
                    }

                    //console.log(stringified);}


                    const r_distance = ( Math.abs(myPlayer.yaw - Math.radAdd( Math.atan2( x, z ), 0 ))
                                        + Math.abs(myPlayer.pitch + Math.atan2( y, Math.hypot( x, z ) ) % 1.5) );

                    if ( targetID != -1 ) {
                        if ( player.uniqueId == targetID ) {
                            targetPlayer = player;
                            minDistance = r_distance;
                            set_x = x;
                            set_y = y;
                            set_z = z;
                        }
                    }
                    else {
                        if ((r_distance < 0.4 && r_distance < minDistance) &&
                            !(autoFire && !player.viable)) {
                            targetPlayer = player;
                            minDistance = r_distance;
                            set_x = x;
                            set_y = y;
                            set_z = z;
                        }

                        if ( distance * 1000 < minDistance &&
                            !(autoFire && !player.viable)) {

                            minDistance = d * 1000;

                            targetPlayer = player;
                            set_x = x;
                            set_y = y;
                            set_z = z;

                        }
                    }
                    const target_x = myPlayer.x - player.x;
                    const target_y = myPlayer.y - player.y;
                    const target_z = myPlayer.z - player.z;
                    const radius = Math.abs(player.yaw - Math.radAdd( Math.atan2( target_x, target_z ), 0 )) + Math.abs(player.pitch + Math.atan2( target_y, Math.hypot( target_x, target_z ) ) % 1.5);

                    if(autoDefense && player.viable && (radius < 2 / d || (player.primaryWeaponItem.category_name == "Eggsploder Primary Weapons" && radius < 0.1) || d < 2)) {
                        targeted = true;
                        targetPlayer = player;
                        set_x = x;
                        set_y = y;
                        set_z = z;
                        break;
                    } else {
                        targeted = false;
                    }
                }

            }

        }


        if ( targetPlayer ) {
            myPlayer.yaw = Math.radAdd( Math.atan2( set_x, set_z ), 0 );
            myPlayer.pitch = - Math.atan2( set_y, Math.hypot( set_x, set_z ) ) % 1.5;
            const distance = Math.hypot(myPlayer.x - targetPlayer.x, myPlayer.x - targetPlayer.x, myPlayer.x - targetPlayer.x);
            if (!targeted) {
                targetID = targetPlayer.uniqueId;
            }
            if (autoFire && targetPlayer.viable && distance > 0 && myPlayer.shotSpread < 0.15/(distance^2)) {
                fire_delayed_bullet(myPlayer);
            }
            if (!targetPlayer.viable/* && myPlayer.primaryWeaponItem.category_name == "Ranger Primary Weapons"*/) { targetID = -1; }
        }
        else { targetID = -1; }


    }
    else { targetID = -1; }
}

delete localStorage[ 'lastVersionPlayed' ];