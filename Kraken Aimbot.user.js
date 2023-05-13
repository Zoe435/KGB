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
				sceneVarName,
				cullFuncName;

			try {

				babylonVarName = /new ([a-zA-Z]+)\.Vector3/.exec( code )[ 1 ];
				playersVarName = /([^,]+)=\[\],{}/.exec( code )[ 1 ];
				myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec( code )[ 1 ];
				sceneVarName = /createMapCells\(([^,]+),/.exec( code )[ 1 ];
				cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec( code )[ 1 ];

			} catch ( error ) {

				alert( 'Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify( getVars(), undefined, 2 ) );

				return code;

			}

			function getVars() {

				return {
					babylonVarName,
					playersVarName,
					myPlayerVarName,
					playersVarName,
					sceneVarName,
					cullFuncName
				};

			}

			console.log( '%cInjecting code...', 'color: red; background: black; font-size: 2em;', getVars() );
            console.log(cullFuncName);
			return code.replace( sceneVarName + '.render()', `

					window[ '${onUpdateFuncName}' ](
						${"t"},
                        ${"lt"},
                        ${"dr"},
						${playersVarName},
						${myPlayerVarName}
					);

				${sceneVarName}.render()` )
				.replace( `function ${cullFuncName}`, `

					function ${cullFuncName}() {

						return true;

					}

				function someFunctionWhichWillNeverBeUsedNow` )
                .replace(`respawnTime=Li,`, `respawnTime=0,`)
                .replace(`Li=Math.max(e,Li)`,`Li=0`)
                .replace(`const t=getStoredNumber("lastPreRoll",Date.now())+e,i=m>1&&ir>1&&Date.now()>t;let r=Ma.timeToPlayVideoAd();`,
                         `const t=getStoredNumber("lastPreRoll",Date.now())+e,i=0;let r=0;`)
                .replace(`le&&!pwaBlockAds||Date.now()>t+i&&m%2==1&&!pwaBlockAds`, `0`)
                .replace(`i.packString(e.playerName),`, `i.packString("(kgb)" + e.playerName),`)

                //.replace(`var o=nt.rayCollidesWithMap(a.forwardRay.origin,a.forwardRay.direction,nt.projectileCollidesWithCell);`,
                //         `var o=nt.rayCollidesWithMap(a.forwardRay.origin,a.forwardRay.direction,nt.projectileCollidesWithCell);console.log("collision:");console.log(!(o==false));`)
                //.replace(`rayCollidesWithMap:function(e,t,i){if(isNaN(e.x)||isNaN(e.y)||isNaN(e.z))`,
                //         `rayCollidesWithMap:function(e,t,i){console.log("called:  -------------");console.log(e);console.log(t);console.log(i);console.log(t.length());if(isNaN(e.x)||isNaN(e.y)||isNaN(e.z))`)
                //.replace(`rayCollidesWithPlayer:function(e,t,i,r){fo`, `rayCollidesWithPlayer:function(e,t,i,r){console.log("called:  -------------");console.log(e);console.log(t);console.log(r);fo`)
                //.replace(`let t=40;this.player.activeShellStreaks&We.EggBreaker&&(t=255),`,`let t=255;`)
                //.replaceAll(`,300`, `,0`)
                //.replace("r.packInt8(Le.chat)", "r.packInt8(Le.chat.replaceAll(\"a\",\"α\").replaceAll(\"b\",\"Ⴆ\").replaceAll(\"c\",\"ƈ\").replaceAll(\"d\",\"ԃ\").replaceAll(\"e\",\"ҽ\").replaceAll(\"f\",\"ϝ\").replaceAll(\"g\",\"ɠ\").replaceAll(\"h\",\"ԋ\").replaceAll(\"i\",\"ι\").replaceAll(\"j\",\"ʝ\").replaceAll(\"k\",\"ƙ\").replaceAll(\"l\",\"ʅ\").replaceAll(\"m\",\"ɱ\").replaceAll(\"n\",\"ɳ\").replaceAll(\"o\",\"σ\").replaceAll(\"p\",\"ρ\").replaceAll(\"q\",\"ϙ\").replaceAll(\"r\",\"ɾ\").replaceAll(\"s\",\"ʂ\").replaceAll(\"t\",\"ƚ\").replaceAll(\"u\",\"υ\").replaceAll(\"v\",\"ʋ\").replaceAll(\"w\",\"ɯ\").replaceAll(\"x\",\"x\").replaceAll(\"y\",\"ყ\").replaceAll(\"z\",\"ȥ\"))")
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
let cull_name = "[karma]  YEET";


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

function fire_delayed_bullet(fire_class) {
    return new Promise(resolve => {
        setTimeout(() => {
            fire_class.pullTrigger();
            resolve('firing trigger')
        }, 35)
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
	}
    switch ( event.code ) {
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

window[ onUpdateFuncName ] = function ( BABYLON, tracer, fire_class, players, myPlayer ) {
    if ( ! myPlayer ) { return; }

    //console.log(myPlayer.weapon.subClass.velocity);

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


            const gravity = 0.012;
            const mult = 1.56 / myPlayer.weapon.subClass.velocity;
            const pow = 1.4142;
            const t = d^pow + 2;
            //const ty = (d / myPlayer.weapon.subClass.velocity) + 2;
            //const endingY = (player.dy * ty) - (ty^2)*(gravity/2);

            let addend = 0.0;

            if(Math.abs(player.dy) > 0.005) { addend = (player.dy * t * mult) - (gravity * (t^2) * mult); }
            if(player.dy < 0.0131765 && player.dy > 0.0131764) { addend = (player.dy * 4 * t * mult); }
            if(player.dy < -0.0131764 && player.dy > -0.0131765) { addend = (-player.dy * 4 * t * mult); }

            const x = old_x + (player.dx * t * mult);
            const y = old_y + addend -0.08;
            const z = old_z + (player.dz * t * mult);

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


            const player_ray = new raypoint(myPlayer.x, myPlayer.y + 0.4, myPlayer.z, distance);
            const target_ray = new raypoint(x, y, z, distance);
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


                    const gravity = 0.012;
                    const mult = 1.56 / myPlayer.weapon.subClass.velocity;
                    const pow = 1.4142;
                    const t = d^pow + 2;
                    let addend = 0.0;

                    if(Math.abs(player.dy) > 0.005) { addend = (player.dy * t * mult) - (gravity * (t^2) * mult); }
                    if(player.dy < 0.0131765 && player.dy > 0.0131764) { addend = (player.dy * 4 * t * mult); }
                    if(player.dy < -0.0131764 && player.dy > -0.0131765) { addend = (-player.dy * 4 * t * mult); }




                    const x = old_x + (player.dx * t * mult);
                    const y = old_y + addend - 0.1;
                    const z = old_z + (player.dz * t * mult);

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
                        if ((r_distance < 0.2 && r_distance < minDistance) &&
                            !(autoFire && myPlayer.primaryWeaponItem.category_name == "Ranger Primary Weapons" && !player.viable)) {
                            targetPlayer = player;
                            minDistance = r_distance;
                            set_x = x;
                            set_y = y;
                            set_z = z;
                        }

                        if ( distance * 1000 < minDistance &&
                            !(autoFire && myPlayer.primaryWeaponItem.category_name == "Ranger Primary Weapons" && !player.viable)) {

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
            if (!targeted) {
                targetID = targetPlayer.uniqueId;
            }
            if (autoFire && targetPlayer.viable) {
                if(targetPlayer.frame1) {
                    targetPlayer.frame1 = false;
                    fire_delayed_bullet(fire_class);
                } else {
                    targetPlayer.frame1 = true;
                }
            } else { targetPlayer.frame1 = false; }

        }
        else { targetID = -1; }


    }
    else { targetID = -1; }
}

delete localStorage[ 'lastVersionPlayed' ];