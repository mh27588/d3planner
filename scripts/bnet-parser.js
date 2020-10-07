DiabloCalc.slotMap={mainHand:"mainhand",offHand:"offhand",leftFinger:"leftfinger",rightFinger:"rightfinger",bracers:"wrists",special:"follower"},DiabloCalc.typeMap={legs:"pants",ceremonialdagger:"ceremonialknife",flail1H:"flail",mightyweapon1h:"mightyweapon",combatstaff:"daibo",handxbow:"handcrossbow",genericbelt:"belt",belt_barbarian:"mightybelt",orb:"source"},DiabloCalc.classMap={"witch-doctor":"witchdoctor","demon-hunter":"demonhunter"},DiabloCalc.parseItemData=function(a,t){function e(a){var t=parseFloat(a.replace(/,/g,""));return isNaN(t)?0:t}function i(a){function t(t){if(t.base)return null;if(t.caldesanns)return null;t.regex||(t.regex=DiabloCalc.getStatRegex(t));var i=t.regex.exec(a);if(!i&&(t.altformat&&(t.altregex||(t.altregex=DiabloCalc.getStatRegex(t,t.altformat)),i=t.altregex.exec(a)),!i))return null;for(var r=[],s=0;s<t.args;s++)r.push(e(i[s+1]));if(t.args<0){var n=DiabloCalc.allPassives;for(var l in n)if(i[1]==n[l].origname){r.push(l);break}}return r}a=a.trim().replace(/\u2013|\u2014/g,"-");for(var i in DiabloCalc.stats){if(s=t(DiabloCalc.stats[i]))return r.stats[i]=s,i}if(n){var s=t(n);if(s)return r.stats.custom=s,"custom"}}if(a.type){var r={id:a.id,stats:{}};if(a.transmog&&(r.transmog=a.transmog.id),a.dye&&(r.dye=a.dye.id),!DiabloCalc.itemById[a.id]){var s=a.type.id.toLowerCase();s=(s=DiabloCalc.typeMap[s]||s).replace(/(generic|_.*)/g,""),s=DiabloCalc.typeMap[s]||s,DiabloCalc.itemTypes[s]&&(r.id=DiabloCalc.itemTypes[s].generic)}a.typeName.indexOf("Primal Ancient")>=0?r.ancient="primal":a.typeName.indexOf("Ancient")>=0&&(r.ancient=!0);var n,l={};if(DiabloCalc.itemById[r.id]&&(l=DiabloCalc.getItemAffixesById(r.id,r.ancient,"only")||{}).custom&&void 0===(n=$.extend({},l.custom)).args&&(n.args=1),a.attributes)for(var o in a.attributes)for(m=0;m<a.attributes[o].length;++m){var c=i(a.attributes[o][m]);a.attributesHtml&&a.attributesHtml[o]&&a.attributesHtml[o][m]&&a.attributesHtml[o][m].indexOf("tooltip-icon-enchant")>=0&&(r.enchant=c)}if(r.gems=[],a.gems){for(var m=0;m<a.gems.length;++m){var b=a.gems[m];if(b.isGem||b.isJewel){var g=DiabloCalc.gemById[b.item.id];g&&b.isJewel&&(g[1]=b.jewelRank),g&&r.gems.push(g)}}r.stats.sockets=[a.gems.length]}if(a.armor?r.stats.basearmor=[Math.floor(a.armor)]:l.basearmor&&(r.stats.basearmor=[l.basearmor.max]),a.blockChance){var d=a.blockChance.match(/\+([\d,\.]+)% Chance to Block\n([\d,]+)-([\d,]+) Block Amount/);d&&(r.stats.blockamount=[e(d[2]),e(d[3])],r.stats.baseblock=[e(d[1])],r.stats.block&&(r.stats.baseblock[0]-=r.stats.block[0]))}else l.blockamount&&l.baseblock&&(r.stats.blockamount=[l.blockamount.max,l.blockamount.max2],r.stats.blockamount=[l.baseblock.max]);if(a.augmentation){var f={caldesanns_vit:/\+(\d+) Vitality/,caldesanns_dex:/\+(\d+) Dexterity/,caldesanns_str:/\+(\d+) Strength/,caldesanns_int:/\+(\d+) Intelligence/};for(var o in f){var u=a.augmentation.match(f[o]);u&&(r.stats[o]=[e(u[1])])}}return r.imported={enchant:r.enchant,stats:$.extend(!0,{},r.stats)},r}};