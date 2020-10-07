!function(){function t(t,s){var a={};if(t)for(var e in u)a[e]=u[e].stat?Math.floor(t.getValue(u[e].stat)):s&&s[e]||0;else for(var e in u)a[e]=s&&s[e]||0;return a}function s(s,a){return{label:s,values:t(null,a&&a.values)}}function a(s,a,e,i){return{slot:s,label:p("Change {0}").format(DiabloCalc.itemSlots[s].name),pre:a,offhand:e,undo:function(){this.post=DiabloCalc.getSlot(this.slot),DiabloCalc.setSlot(this.slot,this.pre),this.offhand&&DiabloCalc.setSlot("offhand",this.offhand)},redo:function(){"mainhand"==this.slot?(this.offhand=DiabloCalc.getSlot("offhand"),DiabloCalc.setSlot(this.slot,this.post),DiabloCalc.getSlot("offhand")&&(this.offhand=void 0)):DiabloCalc.setSlot(this.slot,this.post)},values:t(DiabloCalc.getStats(),i&&i.values)}}function e(t,a,e){var i={index:t,name:p("Set {0}").format(t+1),line:$('<li class="profiles-set"></li>'),icon:$('<span class="class-icon"></span>'),label:$('<span class="label"></span>'),value:$('<span class="value"></span>'),edit:$('<span class="edit"></span>').attr("title",p("Rename")),del:$('<span class="delete"></span>').attr("title",p("Delete")),pos:0,points:[s(a,e)]};return i.label.text(i.name),i.line.append(i.icon,i.label,i.del,i.edit,i.value),i.line.attr("tabIndex",-1),i.rename=function(t){i.name=t,i.label&&i.label.text(i.name)},i.startedit=function(){i.label&&(i.input=$("<input></input>"),i.input.val(i.name),i.label.replaceWith(i.input),i.label=null,i.input.focus().select(),i.input.focusout(function(t){var s=i.input.val();s.length&&(i.name=s),i.label=$("<span></span>").addClass("label").text(i.name),i.input.replaceWith(i.label),i.input=null}),i.input.click(function(t){t.stopPropagation()}),i.input.keyup(function(t){if(13==t.keyCode||27==t.keyCode){var s=i.input.val();13==t.keyCode&&s.length&&(i.name=s),i.label=$("<span></span>").addClass("label").text(i.name),i.input.replaceWith(i.label),i.input=null}}))},i.line.click(function(){d.changeset(i.index),i.line.focus()}),i.edit.click(function(){return i.startedit(),!1}),i.del.click(function(t){return $(this).hasClass("disabled")||DiabloCalc.popupMenu(t,p.fixkey({"Confirm delete?":function(){d.delset(i.index)}})),!1}),i}function i(t,s){if(t===s)return!0;if(!(t instanceof Object&&s instanceof Object))return!1;for(var a in t){if(t.hasOwnProperty(a)!==s.hasOwnProperty(a))return!1;if(typeof t[a]!=typeof s[a])return!1}for(var a in s){if(t.hasOwnProperty(a)!==s.hasOwnProperty(a))return!1;if(typeof t[a]!=typeof s[a])return!1;if(t[a]instanceof Object){if(!i(t[a],s[a]))return!1}else if(t[a]!==s[a])return!1}return!0}function l(t,s){var e=b[t];if(e||(e=null),b[t]=DiabloCalc.getSlot(t),(e||b[t])&&!i(e,b[t])){var l=d.last();"twohand"==s&&e?d.add(a("mainhand",void 0,e,l)):"offhand"===t&&l.offhand&&!b[t]||(l.slot!==t?d.add(a(t,e,void 0,l)):void 0===l.pre&&(l.pre=e))}}var o,n,r,c,h,p=DiabloCalc.locale("ui-timeline.js"),u=DiabloCalc.localeTable.statList,d={dataOptionsLight:{strokeColor:"#66d",pointColor:"#66d",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"#66d",disabledColor:"#bbb"},dataOptionsDark:{strokeColor:"#aaf",pointColor:"#aaf",pointStrokeColor:"#121212",pointHighlightFill:"#121212",pointHighlightStroke:"#aaf",disabledColor:"#222"},setTheme:function(){if(this.dataOptions=this.dataOptionsLight,$("body").hasClass("theme-light")||(this.dataOptions=this.dataOptionsDark),this.line){for(var t in this.dataOptions)this.line.datasets[0][t]=this.dataOptions[t];for(var s=0;s<this.line.datasets[0].points.length;++s)this.line.datasets[0].points[s].strokeColor=this.dataOptions.pointStrokeColor,this.line.datasets[0].points[s].highlightFill=this.dataOptions.pointHighlightFill,s<=this.curset.pos?(this.line.datasets[0].points[s].fillColor=this.dataOptions.pointColor,this.line.datasets[0].points[s].highlightStroke=this.dataOptions.pointHighlightStroke):(this.line.datasets[0].points[s].fillColor=this.dataOptions.disabledColor,this.line.datasets[0].points[s].highlightStroke=this.dataOptions.disabledColor);this.line.update()}},globalOptions:{showScale:!1,scaleShowLabels:!1,datasetFill:!1,responsive:!0,maintainAspectRatio:!1,pointHitDetectionRadius:15,customTooltips:function(t){if(t){var s=d.line.getIndexAtPoint(t.x,t.y);if(s.length>0){s=s[0];var a=d.curset.points[s].label;if(d.curstatEx&&d.curset.points[s].skillData){var e=d.curstatEx.split("$"),t=d.curset.points[s].skillData[e[0]],i=e[0]+" &mdash; "+e[1]+': <span class="d3-color-green">'+DiabloCalc.formatNumber(t&&t.data[e[1]]||0,0,1e3)+"</span>";if(s!=d.curset.pos){var l=t&&t.data[e[1]]||0,o=d.curset.points[d.curset.pos].skillData[e[0]];if((n=o&&o.data[e[1]]||0)>1){i+=' (<span class="d3-color-green">'+((r=(l-n)/n*100)>=0?"+":"")+DiabloCalc.formatNumber(r,2)+"%</span>)"}}}else{i=u[d.curstat].name+': <span class="d3-color-green">'+DiabloCalc[u[d.curstat].func||"formatNumber"](d.curset.points[s].values[d.curstat],0,1e3)+"</span>";if(s!=d.curset.pos){var l=d.curset.points[s].values[d.curstat],n=d.curset.points[d.curset.pos].values[d.curstat];if(n>1){var r=(l-n)/n*100;i+=' (<span class="d3-color-green">'+(r>=0?"+":"")+DiabloCalc.formatNumber(r,2)+"%</span>)"}}}var c='<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">'+a+"</span><br/>"+i;s<d.curset.pos?c+='<br/><span class="d3-color-gray">'+p("Click to undo")+"</span>":s>d.curset.pos&&(c+='<br/><span class="d3-color-gray">'+p("Click to redo")+"</span>"),c+="</p></div>",DiabloCalc.tooltip.showHtml(d.parent[0],c,t.x,t.y)}}else DiabloCalc.tooltip.hide()}},update:function(){this.line&&this.line.destroy();var t=[],s=[];this.parent.width(50*(this.curset.points.length-1)+10),c.scrollLeft(c.get(0).scrollWidth);for(a=0;a<this.curset.points.length;++a)t.push(this.curset.points[a].values[this.curstat]),s.push(this.curset.points[a].label);this.line=this.chart.Line({labels:s,datasets:[$.extend({data:t},this.dataOptions)]},this.globalOptions);for(a=0;a<this.curset.points.length;++a)this.line.datasets[0].points[a].index=a;for(var a=this.curset.pos+1;a<this.curset.points.length;++a)this.line.datasets[0].points[a].fillColor=this.dataOptions.disabledColor,this.line.datasets[0].points[a].highlightStroke=this.dataOptions.disabledColor;this.line.update()},init:function(t,s){this.setTheme(),this.parent=t,this.canvas=$("<canvas></canvas>"),t.append(this.canvas),this.datasets=[e(0,p("New Profile"))],r.before(this.datasets[0].line.addClass("selected")),this.datasets[0].del.addClass("disabled"),this.curset=this.datasets[0],this.curstat=s,this.ctx=this.canvas.get(0).getContext("2d"),this.chart=new Chart(this.ctx),this.update();var a=this;t.click(function(t){var s=a.line.getIndexAtEvent(t);s.length&&a.undo(s[0])})},add:function(t){this.curset.pos<this.curset.points.length-1&&(this.curset.points=this.curset.points.slice(0,this.curset.pos+1),this.update()),this.curset.pos=this.curset.points.length,this.curset.points.push(t),this.line.addData([t.values[this.curstat]],t.label),this.line.datasets[0].points[this.curset.pos].index=this.curset.pos,this.parent.width(50*(this.curset.points.length-1)+10),c.scrollLeft(c.get(0).scrollWidth),this.line.resize(this.line.render,!0)},addset:function(s,a){var i=e(this.datasets.length,s,this.last());r.before(i.line),a&&(i.profile={items:{},skills:[],passives:[],paragon:{level:0}},i.points[0].values=t(DiabloCalc.getStats())),this.datasets.push(i);for(var l=0;l<this.datasets.length;++l)this.datasets[l].del.removeClass("disabled");this.changeset(i.index),setTimeout(this.curset.startedit,0)},delset:function(t){if(!(t<0||t>=this.datasets.length||this.datasets.length<=1)){this.curset==this.datasets[t]&&(t<this.datasets.length-1?this.changeset(t+1):this.changeset(t-1)),this.datasets[t].line.remove(),this.datasets.splice(t,1);for(var s=t;s<this.datasets.length;++s)this.datasets[s].index=s;1==this.datasets.length&&this.datasets[0].del.addClass("disabled")}},clear:function(){for(var t=0;t<this.datasets.length;++t)this.datasets[t]!==this.curset&&this.datasets[t].line.remove();this.datasets=[this.curset],this.curset.del.addClass("disabled")},addprofile:function(t){var s=e(this.datasets.length,p("Load Profile"),t);r.before(s.line),s.profile=t,s.values=t.values,s.rename(t.name),s.icon.removeClass().addClass("class-icon class-"+t.class+" "+(t.gender||"female")),s.value.text((u[this.curstat].shortName||u[this.curstat].name)+": "+DiabloCalc[u[this.curstat].func||"formatNumber"](s.values[this.curstat]||0,0,1e3)),this.datasets.push(s);for(var a=0;a<this.datasets.length;++a)this.datasets[a].del.removeClass("disabled")},changeset:function(t){this.curset!=this.datasets[t]&&(this.curset.line.removeClass("selected"),this.curset.profile=$.extend(!0,{},DiabloCalc.getProfile()),this.curset=this.datasets[t],this.curset.line.addClass("selected"),this.curset.profile&&(DiabloCalc.setProfile(this.curset.profile,"set"),this.curset.profile=void 0),this.update(),this.fixval())},changestat:function(t){var s=t;u[t]?this.curstat=t:(this.curstatEx=t,t=this.curstat);for(var a=0;a<this.datasets.length;++a)this.datasets[a].values&&this.datasets[a].value.text((u[t].shortName||u[t].name)+": "+DiabloCalc[u[t].func||"formatNumber"](this.datasets[a].values[t],0,1e3));if(this.update(),!u[s]){var e=s.split("$");if(2===e.length)return e[0]+" &mdash; "+e[1]}},fixval:function(){var s=this.curset.pos;this.curset.points[s].values=this.curset.values=t(DiabloCalc.getStats(),this.curset.points[s].values);var a=this.curset.values[this.curstat];this.curset.icon.removeClass().addClass("class-icon class-"+DiabloCalc.charClass+" "+(DiabloCalc.gender||"female")),this.curset.value.text((u[this.curstat].shortName||u[this.curstat].name)+": "+DiabloCalc[u[this.curstat].func||"formatNumber"](a||0,0,1e3)),this.curstatEx||(this.line.datasets[0].points[s].value=a,this.line.update())},fixdata:function(t){var s=this.curset.pos;if(this.curset.points[s].skillData=t,this.curstatEx){var a=this.curstatEx.split("$");2===a.length&&t[a[0]]&&a[1]in t[a[0]].data?(this.line.datasets[0].points[s].value=t[a[0]].data[a[1]],this.line.update()):(delete this.curstatEx,this.fixval())}},generateList:function(t){var s=t.val();t.empty();for(var a in u)t.append('<option value="'+a+(s===a?'" selected="selected':"")+'">'+u[a].name+"</option>");var e=this.last().skillData;if(e)for(var i in e)if(!$.isEmptyObject(e[i].data)){var l='<optgroup label="'+i+'">';for(var o in e[i].data)l+='<option value="'+i+"$"+o+(s===i+"$"+o?'" selected="selected':"")+'">'+o+"</option>";t.append(l+"</optgroup>")}},last:function(){return this.curset.points[this.curset.pos]},reset:function(t,a){this.curset.points=[s(t,{values:a})],this.curset.values=a,this.curset.pos=0,this.update()},undo:function(t){for(DiabloCalc.importStart(),this.line.update();this.curset.pos>t;)this.curset.points[this.curset.pos].undo(),this.line.datasets[0].points[this.curset.pos].fillColor=this.dataOptions.disabledColor,this.line.datasets[0].points[this.curset.pos]._saved.fillColor=this.dataOptions.disabledColor,this.line.datasets[0].points[this.curset.pos].highlightStroke=this.dataOptions.disabledColor,--this.curset.pos;for(;this.curset.pos<t;)++this.curset.pos,this.curset.points[this.curset.pos].redo(),this.line.datasets[0].points[this.curset.pos].fillColor=this.dataOptions.pointColor,this.line.datasets[0].points[this.curset.pos]._saved.fillColor=this.dataOptions.pointColor,this.line.datasets[0].points[this.curset.pos].highlightStroke=this.dataOptions.pointHighlightStroke;this.line.update(),DiabloCalc.importEnd("undo",this.curset.points[this.curset.pos].values)},getProfiles:function(){var t=[],s=$.extend([],this.datasets);s.sort(function(t,s){return t.line.index()-s.line.index()});for(var a=0;a<s.length;++a)if(s[a]===this.curset||s[a].profile){var e={name:s[a].name};(e=s[a]===this.curset?$.extend(e,DiabloCalc.getProfile()):$.extend(e,s[a].profile)).values=s[a].values,t.push(e)}return t}};DiabloCalc.getAllProfiles=function(){var t={};return t.profiles=d.getProfiles(),t.profiles.length?(t.curstat=d.curstat,t.class=t.profiles[0].class,t.mainset=t.profiles[0].mainset,t.active=DiabloCalc.getActive("global"),t):DiabloCalc.getProfile()},DiabloCalc.setAllProfiles=function(t,s){if(t.profiles){if(DiabloCalc.importStart(),d.clear(),t.curstat&&(h.val(t.curstat),h.trigger("chosen:updated"),d.curstat=t.curstat),t.active){DiabloCalc.setActive("global",t.active);for(e=0;e<t.profiles.length;++e)if(!t.profiles[e].active){t.profiles[e].active={};for(var a in t.active)0===a.indexOf("buff")&&(t.active[a]instanceof Object?t.profiles[e].active[a]=$.extend([],t.active[a]):t.profiles[e].active[a]=t.active[a])}}d.curset.rename(t.profiles[0].name),DiabloCalc.setProfile(t.profiles[0],s);for(var e=1;e<t.profiles.length;++e)d.addprofile(t.profiles[e]);DiabloCalc.importEnd(t,s)}else DiabloCalc.setProfile(t,s)},DiabloCalc.isModified=function(){return d.curset.pos>0},DiabloCalc.recordDPS=function(t){d.last().values.simdps=t,d.fixval()},DiabloCalc.register("changeGender",function(){d.fixval()});var f,v,b={},g=$(".profiles-frame");o=$('<ul class="profiles-list"></ul>'),g.append(o),n=$(".timeline-frame"),g.resizable({handles:"n",minHeight:120,maxHeight:400,resize:function(t,s){g.css("top","")}}),(r=$('<li class="profiles-set newset"><b>'+p("New set")+"</b></li>")).click(function(t){DiabloCalc.popupMenu(t,p.fixkey({"Blank set":function(){d.addset(p("New Set"),!0)},"Clone current set":function(){d.addset(p("New Set"))}}))}),o.append(r),o.sortable({items:"li:not(.newset)",distance:4,containment:"parent",axis:"y"}),h=$("<select></select>").addClass("timeline-stat");for(var C in u)h.append('<option value="'+C+'">'+u[C].name+"</option>");n.append(h),h.chosen({disable_search:!0,inherit_select_classes:!0,populate_func:function(){d.generateList(h)}}).change(function(){var t=d.changestat($(this).val());t&&h.next().find(".chosen-single span").html(t)}),c=$("<div></div>").addClass("canvas-frame"),n.append(c);var m=$("<div></div>").addClass("canvas-container");c.append(m),d.init(m,"damage"),DiabloCalc.register("updateStats",function(){d.fixval()}),DiabloCalc.register("skillData",function(t){d.fixdata(t)}),DiabloCalc.register("importEnd",function(s,a){var e=b;b={};for(var i in DiabloCalc.itemSlots)b[i]=DiabloCalc.getSlot(i);switch(f=DiabloCalc.getSkills(),v=DiabloCalc.getParagonLevels(),s){case"import":d.reset(p("Import Profile"),a);break;case"class":d.reset(p("Change Class"));break;case"load":d.reset(p("Load Profile"),a);break;case"global":d.add(function(s,a){return{label:p("Global operation"),pre:s,undo:function(){this.post={};for(var t in DiabloCalc.itemSlots)this.post[t]=DiabloCalc.getSlot(t),DiabloCalc.setSlot(t,this.pre[t])},redo:function(){this.pre={};for(var t in DiabloCalc.itemSlots)this.pre[t]=DiabloCalc.getSlot(t),DiabloCalc.setSlot(t,this.post[t])},values:t(DiabloCalc.getStats(),a&&a.values)}}(e,d.last()))}}),DiabloCalc.register("updateSlotItem",l),DiabloCalc.register("updateSlotStats",l),DiabloCalc.register("updateSkills",function(s){if(s){var a=f;f=DiabloCalc.getSkills();var e=d.last();!0!==e.skills&&d.add(function(s,a){return{skills:!0,label:p("Change Skills"),pre:s,undo:function(){this.post=DiabloCalc.getSkills(),DiabloCalc.setSkills(this.pre)},redo:function(){this.pre=DiabloCalc.getSkills(),DiabloCalc.setSkills(this.post)},values:t(DiabloCalc.getStats(),a&&a.values)}}(a,e))}}),DiabloCalc.register("updateParagon",function(){var s=v;v=DiabloCalc.getParagonLevels();var a=d.last();!0!==a.paragon&&d.add(function(s,a){return{paragon:!0,label:p("Change Paragon"),pre:s,undo:function(){this.post=DiabloCalc.getParagonLevels(),DiabloCalc.setParagon(this.pre)},redo:function(){this.pre=DiabloCalc.getParagonLevels(),DiabloCalc.setParagon(this.post)},values:t(DiabloCalc.getStats(),a&&a.values)}}(s,a))}),DiabloCalc.register("changeTheme",function(){d.setTheme()}),DiabloCalc.tipStatList=u}();