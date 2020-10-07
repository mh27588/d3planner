!function() {
  var t = DiabloCalc;
  t.popupMenu = function(t, e, s) {
      if (!$.isEmptyObject(e)) {
          var i = $('<ul class="popup-menu"></ul>').css("position", "absolute");
          i.css("left", t.pageX + 15),
          i.css("top", t.pageY - 20),
          i.attr("tabIndex", -1),
          $("body").append(i);
          for (var a in e) {
              var n = $("<li>" + a + "</li>");
              n.click(function(t) {
                  return function(e) {
                      i.remove(),
                      t(e)
                  }
              }(e[a])),
              i.append(n)
          }
          i.menu(),
          i.focus(),
          i.focusout(function() {
              s && s(),
              i.remove()
          })
      }
  }
  ,
  t.addTip = function(e, s) {
      return "SELECT" !== e[0].tagName || e.is(":visible") || (e = e.next()),
      e.hover(function() {
          var e = s;
          if ("function" == typeof s && (e = s.call(this)),
          e) {
              var i = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + e + "</span></p></div>";
              t.tooltip && t.tooltip.showHtml(this, i)
          }
      }, function() {
          t.tooltip && t.tooltip.hide()
      }),
      e
  }
  ,
  t.chosenTips = function(e, s) {
      var i = e.data("chosen");
      i && i.search_results.on("mouseover", "li", e.data("chosen"), function(e) {
          var i = e.data
            , a = this.getAttribute("data-option-array-index");
          a && i && i.results_data && i.results_data[a] && t.tooltip && s.call(this, i.results_data[a].value, this)
      }).on("mouseleave", "li", function(e) {
          t.tooltip && t.tooltip.hide()
      })
  }
  ,
  $.widget("ui.custommouse", $.ui.mouse, {
      options: {},
      widgetEventPrefix: "custommouse",
      _init: function() {
          return this._mouseInit()
      },
      _create: function() {
          return this.element.addClass("ui-custommouse")
      },
      _destroy: function() {
          return this._mouseDestroy(),
          this.element.removeClass("ui-custommouse")
      },
      _mouseStart: function() {
          return !1
      }
  }),
  t.enableTouch = function(t) {
      var e = void 0;
      t.draggable("instance") || t.custommouse(),
      (t = t[0]).addEventListener("touchstart", function(t) {
          e = t.originalEvent.touches[0],
          setTimeout(function() {
              e = void 0
          }, 750)
      }, {
          passive: !0
      }),
      t.addEventListener("touchcancel", function(t) {
          e = void 0,
          t.preventDefault()
      }, {
          passive: !0
      }),
      t.addEventListener("touchend", function(s) {
          e && ((s = $.extend({}, s)).type = "click",
          e && (s.pageX = e.pageX,
          s.pageY = e.pageY),
          e = void 0,
          setTimeout(function() {
              t.triggerHandler(s)
          }, 0)),
          s.preventDefault()
      }, {
          passive: !0
      })
  }
  ,
  t.simpleDialog = function(t) {
      var e = $("<div><p>" + t.text + "</p></div>")
        , s = [];
      (t.buttons || [_L("Ok")]).forEach(function(e, i) {
          s.push({
              text: e,
              click: function() {
                  t.callback && !1 === t.callback(i) || $(this).dialog("close")
              }
          })
      }),
      e.dialog({
          resizable: !1,
          title: t.title,
          height: "auto",
          width: 400,
          modal: !0,
          buttons: s,
          close: function() {
              e.remove()
          }
      })
  }
  ;
  var e, s;
  t.showPopup = function(t, i) {
      e && e !== t && e.hide(),
      e = t,
      s = i
  }
  ,
  t.hidePopup = function(t) {
      e === t && (e = void 0)
  }
  ,
  t.shiftKey = !1,
  $(document).mouseup(function(t) {
      e && t.target && $.contains(document.documentElement, t.target) && !e.contains(t.target) && !$(t.target).closest(".popup-menu").length && e.hide()
  }).keydown(function(i) {
      e && s && 27 === i.which && e.hide(),
      16 === i.which && (t.shiftKey = !0)
  }).keyup(function(e) {
      16 === e.which && (t.shiftKey = !1)
  }),
  t.formatNumber = function(t, e, s) {
      if (void 0 === s)
          return t.toFixed(e || 0);
      var i = t.toFixed(e || 0).split(".");
      return parseFloat(t) >= s && (i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
      i.join(".")
  }
  ,
  t.formatDamage = function(e) {
      return e > 1e13 ? t.formatNumber(e / 1e12, 3, 1e4) + " T" : e > 1e10 ? t.formatNumber(e / 1e9, 3, 1e4) + " B" : e > 1e7 ? t.formatNumber(e / 1e6, 3, 1e4) + " M" : t.formatNumber(e, 0, 1e4)
  }
  ,
  t.validateNumber = function() {
      var t = parseFloat($(this).val());
      isNaN(t) && (t = 0);
      var e = parseFloat($(this).attr("step"));
      $(this).attr("min") && (t = Math.max(t, $(this).attr("min"))),
      $(this).attr("max") && (t = Math.min(t, $(this).attr("max"))),
      isNaN(e) || (t = Math.round(t / e) * e,
      t = parseFloat(t.toFixed(2))),
      $(this).val(t),
      $(this).trigger("input")
  }
  ,
  t.SearchResults = function(t, e, s) {
      this.action = t,
      this.emptytip = s || _L("No results."),
      this.div = $("<div></div>"),
      this.message = $("<span></span>").hide(),
      this.results = $('<ul class="search-results"></ul>').hide(),
      this.navbar = $('<div class="search-navbar"></div>').hide(),
      this.navtip = $("<span></span>"),
      this.navfirst = $('<span class="search-navlink">&lt;&lt;</span>'),
      this.navprev = $('<span class="search-navlink">&lt;</span>'),
      this.navnext = $('<span class="search-navlink">&gt;</span>'),
      this.navlast = $('<span class="search-navlink">&gt;&gt;</span>'),
      this.navbox = $("<select></select>"),
      this.navbar.append(this.navtip).append($('<span class="search-navbuttons"></span>').append(this.navfirst).append(this.navprev).append(this.navbox).append(this.navnext).append(this.navlast)),
      this.div.append(this.message).append(this.results).append(this.navbar),
      this.makeResults = e;
      var i = this
        , a = 10;
      this.navfirst.click(function() {
          i.query && i.query.start > 0 && i.search(i.query.term, 0)
      }),
      this.navprev.click(function() {
          i.query && i.query.start > 0 && i.search(i.query.term, Math.max(0, i.query.start - a))
      }),
      this.navnext.click(function() {
          i.query && i.query.start + a < i.query.count && i.search(i.query.term, i.query.start + a)
      }),
      this.navlast.click(function() {
          i.query && i.query.start + a < i.query.count && i.search(i.query.term, Math.floor((i.query.count - 1) / a) * a)
      }),
      this.navbox.change(function() {
          i.query && i.search(i.query.term, i.navbox.val())
      }),
      this.setError = function(t) {
          this.query = void 0,
          this.message.text(t).show(),
          this.results.hide(),
          this.navbar.hide()
      }
      ,
      this.onSuccess = function(t) {
          if (t.errors && t.errors.length)
              this.setError(t.errors);
          else if (t.results && (t.count || t.results.length)) {
              this.message.hide(),
              this.results.empty();
              var e = this;
              $.each(t.results, function(s, i) {
                  var a = e.makeResults(t, i);
                  e.results.append(a)
              }),
              a = t.step || 10,
              this.query.start = t.start || 0,
              this.query.count = t.count || t.results.length,
              this.navtip.text(_L("Showing {0} to {1} of {2}").format(this.query.start + 1, this.query.start + t.results.length, this.query.count)),
              this.navfirst.toggleClass("disabled", this.query.start <= 0),
              this.navprev.toggleClass("disabled", this.query.start <= 0),
              this.navnext.toggleClass("disabled", this.query.start + t.results.length >= this.query.count),
              this.navlast.toggleClass("disabled", this.query.start + t.results.length >= this.query.count),
              this.navbox.prop("disabled", this.query.count <= a),
              this.navbox.empty();
              for (var s = 0; s * a < this.query.count; ++s)
                  this.navbox.append('<option value="' + s * a + '">' + (s + 1) + "</option>");
              this.navbox.val(this.query.start),
              this.navbar.find(".navbuttons").toggle(this.query.count > a),
              this.results.show(),
              this.navbar.show()
          } else
              0 === t.count ? this.setError(this.emptytip) : this.setError(_L("Query failed."))
      }
      ,
      this.onError = function(t) {
          this.setError(_L("Query failed."))
      }
      ,
      this.search = function(t, e) {
          this.query = {
              term: t
          };
          var s = this;
          $.ajax({
              url: this.action,
              data: $.extend({
                  start: e
              }, t),
              type: "GET",
              dataType: "json",
              success: function(t) {
                  s.onSuccess(t)
              },
              error: function(t) {
                  s.onError(t)
              }
          })
      }
  }
}();
DiabloCalc.slotMap = {
  mainHand: "mainhand",
  offHand: "offhand",
  leftFinger: "leftfinger",
  rightFinger: "rightfinger",
  bracers: "wrists",
  special: "follower"
},
DiabloCalc.typeMap = {
  legs: "pants",
  ceremonialdagger: "ceremonialknife",
  flail1H: "flail",
  mightyweapon1h: "mightyweapon",
  combatstaff: "daibo",
  handxbow: "handcrossbow",
  genericbelt: "belt",
  belt_barbarian: "mightybelt",
  orb: "source"
},
DiabloCalc.classMap = {
  "witch-doctor": "witchdoctor",
  "demon-hunter": "demonhunter"
},
DiabloCalc.parseItemData = function(a, t) {
  function e(a) {
      var t = parseFloat(a.replace(/,/g, ""));
      return isNaN(t) ? 0 : t
  }
  function i(a) {
      function t(t) {
          if (t.base)
              return null;
          if (t.caldesanns)
              return null;
          t.regex || (t.regex = DiabloCalc.getStatRegex(t));
          var i = t.regex.exec(a);
          if (!i && (t.altformat && (t.altregex || (t.altregex = DiabloCalc.getStatRegex(t, t.altformat)),
          i = t.altregex.exec(a)),
          !i))
              return null;
          for (var r = [], s = 0; s < t.args; s++)
              r.push(e(i[s + 1]));
          if (t.args < 0) {
              var n = DiabloCalc.allPassives;
              for (var l in n)
                  if (i[1] == n[l].origname) {
                      r.push(l);
                      break
                  }
          }
          return r
      }
      a = a.trim().replace(/\u2013|\u2014/g, "-");
      for (var i in DiabloCalc.stats) {
          if (s = t(DiabloCalc.stats[i]))
              return r.stats[i] = s,
              i
      }
      if (n) {
          var s = t(n);
          if (s)
              return r.stats.custom = s,
              "custom"
      }
  }
  if (a.type) {
      var r = {
          id: a.id,
          stats: {}
      };
      if (a.transmog && (r.transmog = a.transmog.id),
      a.dye && (r.dye = a.dye.id),
      !DiabloCalc.itemById[a.id]) {
          var s = a.type.id.toLowerCase();
          s = (s = DiabloCalc.typeMap[s] || s).replace(/(generic|_.*)/g, ""),
          s = DiabloCalc.typeMap[s] || s,
          DiabloCalc.itemTypes[s] && (r.id = DiabloCalc.itemTypes[s].generic)
      }
      a.typeName.indexOf("Primal Ancient") >= 0 ? r.ancient = "primal" : a.typeName.indexOf("Ancient") >= 0 && (r.ancient = !0);
      var n, l = {};
      if (DiabloCalc.itemById[r.id] && (l = DiabloCalc.getItemAffixesById(r.id, r.ancient, "only") || {}).custom && void 0 === (n = $.extend({}, l.custom)).args && (n.args = 1),
      a.attributes)
          for (var o in a.attributes)
              for (m = 0; m < a.attributes[o].length; ++m) {
                  var c = i(a.attributes[o][m]);
                  a.attributesHtml && a.attributesHtml[o] && a.attributesHtml[o][m] && a.attributesHtml[o][m].indexOf("tooltip-icon-enchant") >= 0 && (r.enchant = c)
              }
      if (r.gems = [],
      a.gems) {
          for (var m = 0; m < a.gems.length; ++m) {
              var b = a.gems[m];
              if (b.isGem || b.isJewel) {
                  var g = DiabloCalc.gemById[b.item.id];
                  g && b.isJewel && (g[1] = b.jewelRank),
                  g && r.gems.push(g)
              }
          }
          r.stats.sockets = [a.gems.length]
      }
      if (a.armor ? r.stats.basearmor = [Math.floor(a.armor)] : l.basearmor && (r.stats.basearmor = [l.basearmor.max]),
      a.blockChance) {
          var d = a.blockChance.match(/\+([\d,\.]+)% Chance to Block\n([\d,]+)-([\d,]+) Block Amount/);
          d && (r.stats.blockamount = [e(d[2]), e(d[3])],
          r.stats.baseblock = [e(d[1])],
          r.stats.block && (r.stats.baseblock[0] -= r.stats.block[0]))
      } else
          l.blockamount && l.baseblock && (r.stats.blockamount = [l.blockamount.max, l.blockamount.max2],
          r.stats.blockamount = [l.baseblock.max]);
      if (a.augmentation) {
          var f = {
              caldesanns_vit: /\+(\d+) Vitality/,
              caldesanns_dex: /\+(\d+) Dexterity/,
              caldesanns_str: /\+(\d+) Strength/,
              caldesanns_int: /\+(\d+) Intelligence/
          };
          for (var o in f) {
              var u = a.augmentation.match(f[o]);
              u && (r.stats[o] = [e(u[1])])
          }
      }
      return r.imported = {
          enchant: r.enchant,
          stats: $.extend(!0, {}, r.stats)
      },
      r
  }
}
;
!function() {
  function a(t) {
      for (m = 0; m < t.length; ++m) {
          var e = 0
            , r = void 0
            , c = 0
            , d = 0;
          for (h = 0; h < t[m].length && (e <= 800 || void 0 === r); ++h)
              "$" == t[m][h] && o[t[m][h + 1]] ? d = t[m][++h] : (" " == t[m][h] && (r = h,
              c = d),
              e += n[t[m].charCodeAt(h)]);
          h < t[m].length && void 0 !== r && (t.splice(m + 1, 0, (c ? "$" + c : "") + t[m].substr(r + 1)),
          t[m] = t[m].substr(0, r))
      }
      if (!window.ImageData) {
          for (var p = $("<div></div>"), m = 0; m < t.length; ++m)
              if (t[m].length) {
                  for (var f = "", u = 0, h = 0; h < t[m].length; ++h)
                      "$" == t[m][h] && o[t[m][h + 1]] ? (u && (f += "</span>"),
                      (u = parseInt(t[m][++h])) && (f += '<span style="color: ' + o[u] + '">')) : f += t[m][h];
                  u && (f += "</span>"),
                  p.append("<div>" + f + "</div>")
              } else
                  p.append("<br/>");
          return p
      }
      if (!l.loaded) {
          var v = $("<div>loading...</div>");
          return s = function() {
              v.replaceWith(a(t))
          }
          ,
          v
      }
      for (var b = 0, g = 0, C = [], m = 0; m < t.length; ++m) {
          g += 16;
          for (var e = 0, h = 0; h < t[m].length; ++h)
              "$" == t[m][h] && o[t[m][h + 1]] ? ++h : e += n[t[m].charCodeAt(h)];
          C.push(e),
          e > b && (b = e)
      }
      b += 8;
      var D = $("<canvas></canvas>");
      D[0].width = b,
      D[0].height = g;
      for (var x = D[0].getContext("2d"), m = 0; m < t.length; ++m)
          for (var w = 16 * m, y = Math.max(0, Math.floor((b - C[m]) / 2)), k = i[0], h = 0; h < t[m].length; ++h)
              if ("$" == t[m][h] && i[t[m][h + 1]])
                  k = i[t[m][++h]];
              else {
                  var S = t[m].charCodeAt(h);
                  x.drawImage(k, S % 2 * 14, 16 * Math.floor(S / 2), 14, 16, y, w, 14, 16),
                  y += n[S]
              }
      return D
  }
  function t(a) {
      var t = {
          magic: "blue",
          rare: "yellow",
          epic: "purple",
          legendary: "orange"
      };
      return a.replace(/{c_\w+}|{\/c}|\n/g, function(a) {
          var s = a.match(/^{c_(\w+)}$/);
          return s ? '<span class="d3-color-' + (t[s[1]] || s[1]) + '">' : "{/c}" === a ? "</span>" : "\n" === a ? "<br/>" : a
      })
  }
  var s, e = DiabloCalc.locale("bnet-tooltips.js"), l = new Image, i = [], o = ["#FFFFFF", "#FF4D4D", "#00FF00", "#6969FF", "#C7B377", "#696969", "#000000", "#D0C27D", "#FFA800", "#FFFF64"];
  DiabloCalc.enableD2 = function() {
      l.onload = function() {
          if (window.ImageData) {
              e = document.createElement("canvas");
              e.width = this.width,
              e.height = this.height;
              l = e.getContext("2d");
              l.drawImage(this, 0, 0),
              i.push(e);
              for (var a = l.getImageData(0, 0, this.width, this.height), t = 1; t < o.length; ++t) {
                  var e;
                  (e = document.createElement("canvas")).width = this.width,
                  e.height = this.height;
                  for (var l, n = (l = e.getContext("2d")).createImageData(this.width, this.height), r = parseInt(o[t].substr(1, 2), 16) / 255, c = parseInt(o[t].substr(3, 2), 16) / 255, d = parseInt(o[t].substr(5, 2), 16) / 255, p = 0; p < a.data.length; p += 4)
                      n.data[p] = Math.round(a.data[p] * r),
                      n.data[p + 1] = Math.round(a.data[p + 1] * c),
                      n.data[p + 2] = Math.round(a.data[p + 2] * d),
                      n.data[p + 3] = a.data[p + 3];
                  l.putImageData(n, 0, 0),
                  i.push(e)
              }
              this.loaded = !0,
              s && s()
          }
      }
      ,
      l.src = "/css/fonts/font16.png",
      DiabloCalc.d2tips = !0
  }
  ;
  var n = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 8, 7, 8, 8, 13, 12, 4, 5, 5, 6, 8, 5, 5, 5, 9, 12, 5, 9, 8, 9, 9, 8, 8, 7, 8, 5, 5, 6, 7, 6, 8, 11, 12, 7, 9, 10, 8, 8, 10, 9, 5, 5, 9, 8, 12, 10, 11, 9, 12, 10, 7, 11, 12, 13, 16, 12, 12, 10, 5, 9, 5, 5, 9, 5, 10, 7, 8, 8, 7, 7, 9, 7, 4, 4, 8, 7, 10, 9, 10, 7, 10, 9, 7, 9, 10, 10, 13, 10, 10, 7, 6, 3, 6, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 5, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 8, 7, 8, 7, 12, 3, 6, 6, 11, 9, 7, 10, 4, 11, 9, 7, 9, 7, 7, 5, 13, 9, 7, 7, 3, 8, 8, 11, 13, 12, 8, 12, 12, 12, 12, 12, 12, 11, 10, 8, 7, 8, 8, 5, 5, 5, 7, 11, 11, 11, 11, 11, 12, 11, 10, 11, 13, 13, 13, 12, 12, 8, 9, 11, 10, 10, 10, 10, 10, 10, 8, 7, 6, 7, 7, 4, 5, 4, 5, 8, 9, 10, 9, 9, 10, 10, 8, 10, 10, 10, 10, 10, 10, 7, 10];
  DiabloCalc.itemPerfection = function(a) {
      var t;
      if ("string" == typeof a)
          t = a,
          a = DiabloCalc.getSlot(t);
      else if (a) {
          var s = [];
          for (var e in DiabloCalc.itemSlots) {
              if (DiabloCalc.itemSlots[e].item && DiabloCalc.itemSlots[e].item.id === a.id) {
                  s = [e];
                  break
              }
              DiabloCalc.isItemAllowed(e, a.id) && s.push(e)
          }
          if (!s.length)
              return;
          t = s[0]
      }
      if (a) {
          var l = DiabloCalc.getItemAffixesById(a.id, a.ancient, !1)
            , i = DiabloCalc.getItemAffixesById(a.id, a.ancient, "only")
            , o = {
              stats: {},
              total: 0
          }
            , n = $.extend(!0, {}, a)
            , r = $.extend(!0, {}, a)
            , c = 0;
          for (var d in a.stats) {
              var p = i[d];
              if (p || (p = l[d]),
              p && void 0 !== p.max && p.min !== p.max) {
                  p.noblock && l[d] && a.stats[d][0] > p.max && (p = $.extend({}, p),
                  DiabloCalc.stats[d] && DiabloCalc.stats[d].dr ? (p.min = 100 - .01 * (100 - p.min) * (100 - l[d].min),
                  p.max = 100 - .01 * (100 - p.max) * (100 - l[d].max)) : (p.min += l[d].min,
                  p.max += l[d].max));
                  var m = (a.stats[d][0] - p.min) / (p.max - p.min);
                  "min" === p.best ? (m = 1 - m,
                  n.stats[d][0] = p.max,
                  r.stats[d][0] = p.min) : (n.stats[d][0] = p.min,
                  r.stats[d][0] = p.max),
                  void 0 !== p.max2 && p.min2 !== p.max2 && (m = .5 * (m + ((a.stats[d][1] || 0) - p.min2) / (p.max2 - p.min2)),
                  n.stats[d][1] = p.min2,
                  r.stats[d][2] = p.max2),
                  o.stats[d] = m;
                  var f = DiabloCalc.stats[d];
                  f && (f.base || f.secondary) && "custom" !== d || (o.total += m,
                  ++c)
              }
          }
          c ? o.total /= c : o.total = 1;
          var u = DiabloCalc.computeStats(function(s) {
              return s === t ? a : DiabloCalc.getSlot(s)
          })
            , h = DiabloCalc.computeStats(function(a) {
              return a === t ? n : DiabloCalc.getSlot(a)
          })
            , v = DiabloCalc.computeStats(function(a) {
              return a === t ? r : DiabloCalc.getSlot(a)
          });
          return o.dps = v.info.dps > h.info.dps + 1 ? (u.info.dps - h.info.dps) / (v.info.dps - h.info.dps) : 1,
          o.dpsDelta = Math.max(0, v.info.dps - u.info.dps),
          o.toughness = v.info.toughness > h.info.toughness + 1 ? (u.info.toughness - h.info.toughness) / (v.info.toughness - h.info.toughness) : 1,
          o.toughnessDelta = Math.max(0, v.info.toughness - u.info.toughness),
          o
      }
  }
  ,
  DiabloCalc.tooltip = new function() {
      function s() {
          h || (h = $('<div class="tooltip-body"></div>'),
          $("body").append(h)),
          f = $("<div></div>").addClass("d3-tooltip-wrapper").hide(),
          u = $("<div></div>"),
          $(h).append(f.append(u))
      }
      function l() {
          h || (h = $('<div class="tooltip-body"></div>'),
          $("body").append(h)),
          v = $("<div></div>").addClass("d3-tooltip-wrapper").hide(),
          b = $("<div></div>"),
          $(h).append(v.append(b))
      }
      function i(a) {
          function t(a, t, s) {
              return a < t && (a = t,
              o = !0),
              a > s && (a = s,
              o = !0),
              a
          }
          if (D && y) {
              var s = $(window)
                , e = {
                  left: 5,
                  top: 5,
                  right: s.width() - 5,
                  bottom: s.height() - 5
              }
                , l = (D.left,
              D.top,
              D.right - D.left)
                , i = D.bottom - D.top
                , o = !1;
              l > e.right - e.left && (D.left = t(D.left + a.deltaX * a.deltaFactor, e.right - l, e.left),
              D.right = D.left + l),
              i > e.bottom - e.top && (D.top = t(D.top + a.deltaY * a.deltaFactor, e.bottom - i, e.top),
              D.bottom = D.top + i),
              f.css({
                  left: D.left,
                  top: D.top,
                  visibility: "visible"
              }),
              o || (a.preventDefault(),
              a.stopPropagation())
          }
      }
      function o(a, t, e, l) {
          l || n(),
          g && $(g).unmousewheel(i),
          g = a,
          clearTimeout(w),
          null == f && s(),
          f.css({
              left: 0,
              top: 0,
              visibility: "hidden"
          }).show(),
          a = $(a);
          var o = $(window)
            , r = a.offset()
            , c = {
              left: r.left - o.scrollLeft(),
              top: r.top - o.scrollTop()
          };
          c.right = c.left + a.outerWidth(),
          c.bottom = c.top + a.outerHeight();
          var d = {
              left: 50,
              top: 5,
              right: o.width() - 50,
              bottom: o.height() - 5
          }
            , p = ["right", "left", "top", "bottom"];
          if ("string" == typeof t) {
              var m = p.indexOf(t);
              m > 0 && (p[m] = p[0],
              p[0] = t),
              t = void 0
          }
          void 0 !== t && (c.left = c.right = c.left + t),
          void 0 !== e && (c.top = c.bottom = c.top + e),
          void 0 === t && void 0 === e && window.touchEvent && window.touchEvent.touches.length && (c.left = window.touchEvent.touches[0].pageX - o.scrollLeft() - 30,
          c.top = window.touchEvent.touches[0].pageY - o.scrollTop() - 20,
          c.right = c.left + 60,
          c.bottom = c.top + 40);
          var u = Math.max(5, 20 - (c.right - c.left))
            , h = f.outerWidth()
            , v = f.outerHeight();
          l && (d.left += h - 40,
          d.right -= h - 40);
          var b = Math.max(d.top, c.top - v)
            , C = (c.left + c.right - h) / 2;
          C = Math.min(C, d.right - h),
          C = Math.max(C, d.left);
          for (var k, S; 0 < p.length; ++p)
              if ("right" === p[0]) {
                  if (c.right + u + h <= d.right) {
                      k = c.right + u,
                      S = b,
                      x = "right";
                      break
                  }
              } else if ("left" === p[0]) {
                  if (c.left - u - h >= d.left) {
                      k = c.left - u - h,
                      S = b,
                      x = "left";
                      break
                  }
              } else if ("top" === p[0]) {
                  if (c.top - 25 - v >= d.top) {
                      k = C,
                      S = c.top - 25 - v,
                      x = "top";
                      break
                  }
              } else if ("bottom" === p[0] && c.bottom + 25 + v <= d.bottom) {
                  k = C,
                  S = c.bottom + 25,
                  x = "bottom";
                  break
              }
          void 0 === k && (d.right - c.right > c.left - d.left ? (k = c.right + u,
          S = b,
          x = "right") : (k = c.left - u - h,
          S = b,
          x = "left")),
          D = {
              left: k,
              top: S,
              right: k + h,
              bottom: S + v
          },
          function(a, t) {
              if (y) {
                  $(window);
                  f.css({
                      left: a,
                      top: t,
                      visibility: "visible"
                  })
              }
          }(k, S),
          v > d.bottom - d.top && a.mousewheel(i)
      }
      function n() {
          v && v.hide()
      }
      function r() {
          n(),
          g && $(g).unmousewheel(i),
          g = void 0,
          C = void 0,
          D = void 0,
          clearTimeout(w),
          f && f.hide()
      }
      function c(a, t) {
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", ""),
          u.removeClass().addClass("d3-tooltip-wrapper-inner");
          var e = '<div class="d3-tooltip d3-tooltip-skill">';
          e += '<div class="tooltip-skill-effect effect-phy"><div class="tooltip-head"><h3>' + t.name + "</h3></div></div>",
          e += '<div class="tooltip-body"><span class="d3-icon d3-icon-skill d3-icon-skill-64 skill-icon-attack ' + t.id + '">',
          e += '<span class="frame"></span></span> <div class="description"><p>' + t.tip + "</p></div></div></div>",
          u.html(e),
          o(a)
      }
      function d(a, t, s, l) {
          function i(a, t) {
              if ("number" == typeof a)
                  return DiabloCalc.formatNumber(a, t, 1e4);
              if (a && a.min && a.max === a.min)
                  return DiabloCalc.formatNumber(a.min, t, 1e4);
              if (a && a.min && a.max) {
                  var e = DiabloCalc.formatNumber(a.min || 0, t, 1e4) + (s ? "&#x2013;" : "-") + DiabloCalc.formatNumber(a.max || 0, t, 1e4);
                  return o && (e = "(" + e + ")"),
                  e
              }
              return "0"
          }
          t instanceof Array || (tmp = t,
          t = [],
          tmp.min && tmp.max && t.push({
              min: tmp.min,
              max: tmp.max
          }),
          tmp.min2 && tmp.max2 && t.push({
              min: tmp.min2,
              max: tmp.max2
          })),
          t.length <= 1 && (a = a.replace(/%d-%d/g, "%d"));
          var o = a.indexOf("%d-%d") >= 0;
          s && (a = (a = (a = (a = a.replace(/%d-%d/g, "%d&#x2013;%d")).replace(/\+?(?:%(?:\{[0-9]+\})?(?:d|\.[0-9]f))(?:%%)?/g, s > 1 ? '<span class="d3-color-blue"><span class="value">$&</span></span>' : '<span class="value">$&</span>')).replace(/[0-9]+(?:\.[0-9]+)?(?:-[0-9]+)?%%/g, '<span class="value">$&</span>')).replace(/\n\*|\r\n/g, '<br/><span class="tooltip-icon-bullet"/>'));
          var n = 0;
          if (a = a.replace(/%(\+?)(?:\{([0-9]+)\})?(d|p|\.[0-9]f|%)/g, function(a, s, e, l) {
              if ("%" == l)
                  return "%";
              var o = (e = e ? parseInt(e) : n++) >= t.length ? 0 : t[e];
              if ("d" === l)
                  return (s && o >= 0 ? "+" : "") + i(o, 0);
              if ("p" === l) {
                  var r = DiabloCalc.allPassives[o];
                  return r && r.name || "unknown"
              }
              return (s && o >= 0 ? "+" : "") + i(o, l[1])
          }),
          s && (a = a.replace(/([0-9])-([0-9])/g, "$1&#x2013;$2")),
          s) {
              var r;
              l && DiabloCalc.stats[l] && DiabloCalc.stats[l].class ? r = DiabloCalc.stats[l].class : l && DiabloCalc.itemPowerClasses[l] && (r = DiabloCalc.itemPowerClasses[l]),
              r && DiabloCalc.charClass !== r ? a += ' <span class="d3-color-red">' + e("({0} Only)").format(DiabloCalc.classes[r].name) + "</span>" : r && DiabloCalc.stats[l] && (a += " " + e("({0} Only)").format(DiabloCalc.classes[r].name)),
              l && DiabloCalc.stats[l] && DiabloCalc.stats[l].caldesanns && (a += ' <span class="d3-color-orange">' + e("(Caldesann's Despair Rank {0})").format((t[0] / 5).toFixed(0)) + "</span>")
          }
          return a
      }
      function p(a, t) {
          var s = Math.round(255 * (a > .5 ? 2 - 2 * a : 1))
            , e = Math.round(255 * (a > .5 ? 1 : 2 * a));
          s = Math.max(0, Math.min(255, s)),
          e = Math.max(0, Math.min(255, e));
          var l = '<span style="color: ' + ("#" + ("0" + s.toString(16)).slice(-2) + ("0" + e.toString(16)).slice(-2) + "00") + '"';
          return (l += t ? ' class="' + t + '"> (' : ">") + parseFloat((100 * a).toFixed(1)) + "%" + (t ? ")" : "") + "</span>"
      }
      function m(i, n, r) {
          var c, h, g = !1;
          if ("string" == typeof n) {
              if (DiabloCalc.itemSlots[n]) {
                  c = DiabloCalc.getSlot(n);
                  U = DiabloCalc.getOffhandTypes && "offhand" === n ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[n].types;
                  for (var w in U)
                      if (!(U[w].classes && U[w].classes.indexOf(DiabloCalc.charClass) < 0)) {
                          q.custom = q.customwpn = q[DiabloCalc.itemTypes[w].slot];
                          break
                      }
                  h = DiabloCalc.itemPerfection(n)
              } else if (DiabloCalc.itemById[n]) {
                  if (c = {
                      id: n,
                      template: !0
                  },
                  n = void 0,
                  "string" == typeof r) {
                      n = r;
                      U = DiabloCalc.getOffhandTypes && "offhand" === n ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[n].types;
                      for (var w in U)
                          if (!(U[w].classes && U[w].classes.indexOf(DiabloCalc.charClass) < 0)) {
                              q.custom = q.customwpn = q[DiabloCalc.itemTypes[w].slot];
                              break
                          }
                  } else
                      c.custom = r,
                      q.custom = q.customwpn = "square";
                  r = void 0
              }
          } else
              g = !r,
              c = n,
              n = void 0,
              q.custom = q.customwpn = "square",
              h = DiabloCalc.itemPerfection(c);
          if (c && DiabloCalc.itemById[c.id]) {
              var M;
              if (g && DiabloCalc.tipStatList) {
                  C = c;
                  var F = [];
                  for (var I in DiabloCalc.itemSlots) {
                      if (DiabloCalc.itemSlots[I].item && DiabloCalc.itemSlots[I].item.id === c.id) {
                          F = [I];
                          break
                      }
                      DiabloCalc.itemSlots[I].item && DiabloCalc.isItemAllowed(I, c.id) && F.push(I)
                  }
                  F.length ? (M = F[0],
                  F.length > 1 && S && (M = F[1])) : g = void 0
              } else
                  g = void 0;
              r && !v && l(),
              r || f || s();
              var A = r ? b : u
                , T = r ? v : f
                , O = DiabloCalc.itemById[c.id]
                , P = DiabloCalc.qualities[O.quality].color
                , B = DiabloCalc.getItemAffixesById(c.id, c.ancient, !0);
              A.empty();
              var L = !!DiabloCalc.d2tips
                , E = [];
              T.toggleClass("d2tip", !!L),
              T.css("max-width", ""),
              A.removeClass().addClass("d3-tooltip-wrapper-inner");
              $(".char-class").val();
              if (c.template) {
                  c.stats = {},
                  c.varies = [];
                  var G = DiabloCalc.getItemAffixesById(c.id, c.ancient, "only")
                    , N = DiabloCalc.getStatCount(c.id);
                  N = N[0] + N[1];
                  for (var R in G)
                      c.stats[R] = G[R],
                      DiabloCalc.stats[R].base || --N;
                  for (var H = DiabloCalc.getItemPreset(c.id), j = 0; j < H.length; ++j) {
                      1 === (La = DiabloCalc.smartListStats(H[j], B)).length ? (c.stats[La[0]] = B[La[0]],
                      --N) : La.length > 1 && (c.varies.push(La),
                      --N)
                  }
                  if (c.stats.custom && c.custom && (c.stats.custom = c.custom),
                  c.stats.sockets) {
                      c.stats.sockets = $.extend({}, c.stats.sockets);
                      var W = 3;
                      "sockets" === R && "chestarmor" !== O.type && "cloak" !== O.type && (W = 1),
                      c.stats.sockets.max = Math.min(c.stats.sockets.max, W)
                  }
                  c.random = Math.max(0, N)
              }
              if (("custom" == (_a = c.id) || "customwpn" == _a) && n) {
                  var U = DiabloCalc.getOffhandTypes && "offhand" === n ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[n].types;
                  for (var w in U)
                      if (!(U[w].classes && U[w].classes.indexOf(DiabloCalc.charClass) < 0) && ("customwpn" === _a || !DiabloCalc.itemTypes[w].weapon) && ("customwpn" !== _a || DiabloCalc.itemTypes[w].weapon)) {
                          _a = DiabloCalc.itemTypes[w].generic;
                          break
                      }
              }
              _a = DiabloCalc.getItemIcon(_a);
              var Y = DiabloCalc.itemTypes[O.type]
                , _ = null;
              for (var R in c.stats)
                  if (DiabloCalc.stats[R].elemental) {
                      _ = DiabloCalc.stats[R].elemental;
                      break
                  }
              var V = "";
              _ && Y && "square" != q[Y.slot] ? V = " effect-bg effect-bg-" + _ : c.stats.basearmor && (V = " effect-bg effect-bg-armor",
              Y && "default" != q[Y.slot] && (V += " effect-bg-armor-" + q[Y.slot]));
              var X;
              if (L) {
                  if (E.push("$" + ({
                      white: 0,
                      red: 1,
                      green: 2,
                      blue: 3,
                      orange: 4,
                      gray: 5,
                      yellow: 9
                  }[P] || 0) + O.name),
                  c.rwbase) {
                      var z = DiabloCalc.itemById[c.rwbase.id];
                      z && E.push("$5" + z.name)
                  } else if (O.d2base)
                      E.push("$5" + O.d2base);
                  else {
                      var J = DiabloCalc.itemTypes[O.type.replace("2h", "")] || Y
                        , K = DiabloCalc.qualities[O.quality];
                      E.push("$5" + DiabloCalc.GenderPair("primal" === c.ancient && K.primal || c.ancient && K.ancient || K.prefix, J.name))
                  }
                  var Q = "";
                  if (c.gems && DiabloCalc.runes)
                      for (j = 0; j < c.gems.length; ++j)
                          c.gems[j] && DiabloCalc.runes[c.gems[j][0]] && (Q += c.gems[j][0]);
                  Q && E.push("$4'" + Q + "'")
              } else {
                  X = $('<div class="d3-tooltip d3-tooltip-item"></div>'),
                  A.append(X);
                  var Z = "d3-tooltip-item-wrapper";
                  "primal" === c.ancient ? Z += " d3-tooltip-item-wrapper-PrimalAncientLegendary" : c.ancient && (Z += " d3-tooltip-item-wrapper-AncientLegendary");
                  var aa = $('<div class="' + Z + '"></div>');
                  X.append(aa),
                  (X = aa).append('<div class="d3-tooltip-item-border d3-tooltip-item-border-left"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-right"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-top"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-bottom"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-top-left"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-top-right"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-bottom-left"></div>'),
                  X.append('<div class="d3-tooltip-item-border d3-tooltip-item-border-bottom-right"></div>');
                  var ta = "";
                  O.name.length > 35 ? ta = " smallest" : O.name.length > 25 && (ta = " smaller"),
                  X.append('<div class="tooltip-head tooltip-head-' + P + '"><h3 class="d3-color-' + P + ta + '">' + O.name + "</h3></div>");
                  var sa = $('<div class="tooltip-body' + V + '"></div>');
                  X.append(sa);
                  var ea = "purple" === P ? "white" : "teal" === P ? "yellow" : P;
                  sa.append('<span class="d3-icon d3-icon-item d3-icon-item-large d3-icon-item-' + ea + '"><span class="icon-item-gradient"><span class="icon-item-inner icon-item-' + (O.size || Y && q[Y.slot] || "square") + (c.ancient ? " ancient" : "") + '" style="background-image: url(' + _a + ');"></span></span></span>');
                  var la = $('<div class="d3-item-properties"></div>');
                  sa.append(la);
                  var ia = Y && (DiabloCalc.metaSlots[Y.slot] || DiabloCalc.itemSlots[Y.slot])
                    , oa = "";
                  (O.class || Y && Y.class) && (oa = '<li class="item-class-specific d3-color-white">' + DiabloCalc.classes[O.class || Y.class].name + "</li>"),
                  la.append('<ul class="item-type-right">' + (ia ? '<li class="item-slot">' + ia.name + "</li>" : "") + oa + "</ul>");
                  K = DiabloCalc.qualities[O.quality];
                  (Y || DiabloCalc.extraTypes[O.type]) && la.append('<ul class="item-type"><li class="d3-color-' + P + '">' + DiabloCalc.GenderPair("primal" === c.ancient && K.primal || c.ancient && K.ancient || K.prefix, Y ? Y.name : DiabloCalc.extraTypes[O.type]) + "</li></ul>")
              }
              if (c.stats.basearmor) {
                  var na, ra;
                  if (c.stats.basearmor instanceof Array ? na = c.stats.basearmor[0] : (na = c.stats.basearmor.min || 0,
                  ra = c.stats.basearmor.max || 0),
                  c.stats.armor && (c.stats.armor instanceof Array ? na += c.stats.armor[0] : (ra = (ra || na) + (c.stats.armor.max || 0),
                  na += c.stats.armor.min || 0)),
                  L) {
                      var ca = na
                        , da = ra || na;
                      c.stats.d2stat0062 && (c.stats.d2stat0062 instanceof Array ? (na += c.stats.d2stat0062[0],
                      ra && (ra += c.stats.d2stat0062[0])) : (ra = (ra || na) + c.stats.d2stat0062.max,
                      na += c.stats.d2stat0062.min)),
                      c.stats.d2stat0000 && (c.stats.d2stat0000 instanceof Array ? (na = Math.floor(na * (1 + .01 * c.stats.d2stat0000[0])),
                      ra && (ra = Math.floor(ra * (1 + .01 * c.stats.d2stat0000[0])))) : (ra = Math.floor((ra || na) * (1 + .01 * c.stats.d2stat0000.max)),
                      na = Math.floor(na * (1 + .01 * c.stats.d2stat0000.min))));
                      Ia = na > ca || ra && ra > da;
                      ra && (na += "-" + ra),
                      Ia && (na = "$3" + na + "$0"),
                      E.push("Defense: " + na)
                  } else
                      ra && (na += "&#x2013;" + ra),
                      la.append('<ul class="item-armor-weapon item-armor-armor"><li class="big"><p><span class="value">' + na + "</span></p></li><li>" + e("Armor") + "</li></ul>")
              }
              if (Y && Y.weapon) {
                  var pa = Y.weapon;
                  O.weapon && (pa = $.extend({}, pa, O.weapon));
                  var ma, fa, ua, ha = pa.speed, va = pa.min, ba = pa.max;
                  if (c.gems)
                      for (j = 0; j < c.gems.length; ++j)
                          "ruby" === c.gems[j][1] && (va += DiabloCalc.gemColors.ruby.weapon.amount[c.gems[j][0]],
                          ba += DiabloCalc.gemColors.ruby.weapon.amount[c.gems[j][0]]);
                  for (var R in c.stats)
                      DiabloCalc.stats[R].damage && (c.stats[R]instanceof Array ? (va += c.stats[R][0],
                      ba += c.stats[R][1]) : (ma = (ma || va) + (c.stats[R].max || 0),
                      va += c.stats[R].min || 0,
                      fa = (fa || ba) + (c.stats[R].max2 || 0),
                      ba += c.stats[R].min2 || 0));
                  c.stats.damage && (c.stats.damage instanceof Array ? (va *= 1 + .01 * c.stats.damage[0],
                  ba *= 1 + .01 * c.stats.damage[0]) : (ma = (ma || va) * (1 + .01 * (c.stats.damage.max || 0)),
                  va *= 1 + .01 * (c.stats.damage.min || 0),
                  fa = (fa || ba) * (1 + .01 * (c.stats.damage.max2 || 0)),
                  ba *= 1 + .01 * (c.stats.damage.min2 || 0))),
                  c.stats.weaponias && (c.stats.weaponias instanceof Array ? ha *= 1 + .01 * c.stats.weaponias[0] : (ua = (ua || ha) * (1 + .01 * (c.stats.weaponias.max || 0)),
                  ha *= 1 + .01 * (c.stats.weaponias.min || 0)));
                  var ga = ((va + ba) * ha / 2).toFixed(1)
                    , Ca = "big";
                  if ((ma || fa || ua) && (ga += "&#x2013;" + (((ma || va) + (fa || ba)) * (ua || ha) / 2).toFixed(1),
                  Ca = "med"),
                  va = Math.round(va),
                  ba = Math.round(ba),
                  ha = ha.toFixed(2),
                  ua && (ha += "&#x2013;" + ua.toFixed(2)),
                  L) {
                      var Da = va
                        , xa = ma || va
                        , wa = ba
                        , ya = fa || ba;
                      c.stats.d2stat0217 && (c.stats.d2stat0217 instanceof Array ? (va += c.stats.d2stat0217[0],
                      ba += c.stats.d2stat0217[0],
                      ma && (ma += c.stats.d2stat0217[0]),
                      fa && (fa += c.stats.d2stat0217[0])) : (ma = (ma || va) + c.stats.d2stat0217.max,
                      va += c.stats.d2stat0217.min,
                      fa = (fa || ba) + c.stats.d2stat0217.max,
                      ba += c.stats.d2stat0217.min)),
                      c.stats.d2stat0058 && (c.stats.d2stat0058 instanceof Array ? (va += c.stats.d2stat0058[0],
                      ma && (ma += c.stats.d2stat0058[0])) : (ma = (ma || va) + c.stats.d2stat0058.max,
                      va += c.stats.d2stat0058.min)),
                      c.stats.d2stat0023 && (c.stats.d2stat0023 instanceof Array ? (ba += c.stats.d2stat0023[0],
                      fa && (fa += c.stats.d2stat0023[0])) : (fa = (fa || ba) + c.stats.d2stat0023.max,
                      ba += c.stats.d2stat0023.min)),
                      c.stats.d2stat0031 && (c.stats.d2stat0031 instanceof Array ? (va += c.stats.d2stat0031[0],
                      ba += c.stats.d2stat0031[1],
                      ma && (ma += c.stats.d2stat0031[0]),
                      fa && (fa += c.stats.d2stat0031[1])) : (ma = (ma || va) + c.stats.d2stat0031.max,
                      va += c.stats.d2stat0031.min,
                      fa = (fa || ba) + c.stats.d2stat0031.max2,
                      ba += c.stats.d2stat0031.min2)),
                      c.stats.d2stat0007 && (c.stats.d2stat0007 instanceof Array ? (va = Math.floor(va * (1 + .01 * c.stats.d2stat0007[0])),
                      ba = Math.floor(ba * (1 + .01 * c.stats.d2stat0007[0])),
                      ma && (ma = Math.floor(ma * (1 + .01 * c.stats.d2stat0007[0]))),
                      fa && (fa = Math.floor(fa * (1 + .01 * c.stats.d2stat0007[0])))) : (ma = Math.floor((ma || va) * (1 + .01 * c.stats.d2stat0007.max)),
                      va = Math.floor(va * (1 + .01 * c.stats.d2stat0007.min)),
                      fa = Math.floor((fa || ba) * (1 + .01 * c.stats.d2stat0007.max)),
                      ba = Math.floor(ba * (1 + .01 * c.stats.d2stat0007.min))));
                      var ka = va > Da || ma && ma > xa
                        , $a = ba > wa || fa && fa > ya;
                      ma && (va = "(" + va + "-" + Math.round(ma) + ")"),
                      fa && (ba = "(" + ba + "-" + Math.round(fa) + ")"),
                      ka && (va = "$3" + va + "$0"),
                      $a && (ba = "$3" + ba + "$0"),
                      E.push(("twohand" === Y.slot ? "Two-Hand " : "One-Hand ") + "Damage: " + va + " to " + ba);
                      J = DiabloCalc.itemTypes[O.type.replace("2h", "")] || Y;
                      E.push(J.name + " Class - " + (c.stats.weaponias ? "$3" : "") + ha + " Attack Speed")
                  } else
                      ma && (va = "(" + va + "&#x2013;" + Math.round(ma) + ")"),
                      fa && (ba = "(" + ba + "&#x2013;" + Math.round(fa) + ")"),
                      la.append('<ul class="item-armor-weapon item-weapon-dps"><li class="' + Ca + '"><span class="value">' + ga + "</span></li><li>" + e("Damage Per Second") + "</li></ul>"),
                      la.append('<ul class="item-armor-weapon item-weapon-damage"><li><p><span class="value">' + va + '</span>&#x2013;<span class="value">' + ba + '</span> <span class="d3-color-FF888888">' + e("Damage") + '</span></p></li><li><p><span class="value">' + ha + '</span> <span class="d3-color-FF888888">' + e("Attacks per Second") + "</span></p></li></ul>")
              }
              if (c.stats.baseblock && c.stats.blockamount) {
                  var Sa, qa;
                  if (c.stats.baseblock instanceof Array ? Sa = c.stats.baseblock[0] : (Sa = c.stats.baseblock.min || 0,
                  qa = c.stats.baseblock.max || 0),
                  c.stats.block && (c.stats.block instanceof Array ? Sa += c.stats.block[0] : (qa = (qa || Sa) + (c.stats.block.max || 0),
                  Sa += c.stats.block.min || 0)),
                  L) {
                      var Ma = Sa
                        , Fa = qa || Sa;
                      c.stats.d2stat0068 && (c.stats.d2stat0068 instanceof Array ? (Sa += c.stats.d2stat0068[0],
                      qa && (qa += c.stats.d2stat0068[0])) : (qa = (qa || Sa) + c.stats.d2stat0068.max,
                      Sa += c.stats.d2stat0068.min));
                      var Ia = Sa > Ma || qa && qa > Fa;
                      Sa = Sa.toFixed(1),
                      qa && (Sa += "-" + qa.toFixed(1)),
                      Sa += "%",
                      Ia && (Sa = "$3" + Sa + "$0"),
                      E.push("Chance to Block: " + Sa)
                  } else {
                      Sa = Sa.toFixed(1),
                      qa && (Sa += "&#x2013;" + qa.toFixed(1));
                      var Aa;
                      c.stats.blockamount instanceof Array ? Aa = c.stats.blockamount[0].toFixed(0) + '</span>&#x2013;<span class="value">' + c.stats.blockamount[1].toFixed(0) : (Aa = "(" + (c.stats.blockamount.min || 0).toFixed(0) + "&#x2013;" + (c.stats.blockamount.max || 0).toFixed(0) + ")",
                      Aa += '</span>&#x2013;<span class="value">',
                      Aa += "(" + (c.stats.blockamount.min2 || 0).toFixed(0) + "&#x2013;" + (c.stats.blockamount.max2 || 0).toFixed(0) + ")"),
                      la.append('<ul class="item-armor-weapon item-armor-shield"><li><p><span class="value">+' + Sa + '%</span> <span class="d3-color-FF888888">' + e("Chance to Block") + '</span></p></li><li><p><span class="value">' + Aa + '</span> <span class="d3-color-FF888888">' + e("Block Amount") + "</span></p></li></ul>")
                  }
              }
              "potion" === O.type && la.append('<div class="item-description d3-color-white"><p>' + e("Instantly restores {0} Life.").format('<span class="d3-color-green">60%</span>') + "</p></div>"),
              O.description && la.append('<div class="item-description d3-color-white"><p>' + t(O.description) + "</p></div>");
              oa = "";
              if (L && (O.class || Y.class)) {
                  Ca = O.class || Y.class;
                  E.push((Ca == DiabloCalc.charClass ? "" : "$1") + "({0} Only)".format(DiabloCalc.classes[Ca].name))
              }
              L && E.push("Required Level: 70"),
              L || la.append('<div class="item-before-effects"></div>');
              var Ta;
              L ? Ta = X : (Ta = $('<ul class="item-effects"></ul>'),
              la.append(Ta));
              for (var Oa = 0; Oa < 2; ++Oa) {
                  var Pa = null
                    , Ba = Object.keys(c.stats).filter(function(a) {
                      return "sockets" !== a && !DiabloCalc.stats[a].base && ((0 != Oa || !DiabloCalc.stats[a].secondary) && !(1 == Oa && !DiabloCalc.stats[a].secondary))
                  });
                  Ba.sort(function(a, t) {
                      return DiabloCalc.stats[a].prio - DiabloCalc.stats[t].prio
                  }),
                  Ba.forEach(function(a) {
                      Pa || "potion" === O.type || (L ? Pa = Ta : (Pa = $('<p class="item-property-category">' + e(0 == Oa ? "Primary" : "Secondary") + "</p>"),
                      Ta.append(Pa)));
                      var t = "default";
                      DiabloCalc.stats[a].utility && (t = "utility"),
                      c.enchant === a && (t = "enchant");
                      var s = "custom" == a ? "orange" : "blue"
                        , l = DiabloCalc.stats[a].format;
                      "custom" == a && O.required && O.required.custom && (l = O.required.custom.format);
                      var i = "";
                      if (!c.template && B[a] && B[a].min && B[a].max) {
                          var o = B[a].min
                            , n = B[a].max;
                          B[a].max2 && DiabloCalc.stats[a].damage && (n = B[a].max2);
                          for (var r = o, m = n, f = 0; f < 2 && (Math.floor(r - 1e-6) == Math.floor(r + 1e-6) || Math.floor(m - 1e-6) == Math.floor(m + 1e-6)); )
                              r *= 10,
                              m *= 10,
                              f += 1;
                          i = '<span class="d3-color-gray d3-tooltip-range"> [' + DiabloCalc.formatNumber(o, f, 1e4) + " - " + DiabloCalc.formatNumber(n, f, 1e4) + "]" + (l.match(/%(d|\.[0-9]f)%%/g) ? "%" : "") + "</span>"
                      }
                      !g && h && void 0 !== h.stats[a] && (i += p(h.stats[a], "d3-perfection-value")),
                      L ? (l = d(l, c.stats[a], 0, "custom" == a ? O.required && O.required.custom && O.required.custom.id : a),
                      E.push("$3" + l)) : (l = d(l, c.stats[a], "custom" == a ? 2 : 1, "custom" == a ? O.required && O.required.custom && O.required.custom.id : a),
                      Ta.append('<li class="d3-color-' + s + " d3-item-property-" + t + '"><p>' + l + i + "</p></li>"))
                  })
              }
              if (!L && (c.varies && c.varies.length || c.random)) {
                  if (Ta.append("<br/>"),
                  c.varies)
                      for (j = 0; j < c.varies.length; ++j) {
                          var La = c.varies[j]
                            , Ea = $('<li class="item-effects-choice"></li>');
                          Ea.append('<span class="d3-color-blue">' + e("One of {0} Magic Properties (varies)").format('<span class="value">' + La.length + "</span>") + "</span>");
                          for (var Ga = $("<ul></ul>"), Na = 0; Na < La.length; ++Na) {
                              var Ra = d(DiabloCalc.stats[La[Na]].format, B[La[Na]], 1, La[Na]);
                              Ga.append('<li><span class="d3-color-blue"><p>' + Ra + "</p></span></li>")
                          }
                          Ea.append(Ga),
                          Ta.append(Ea)
                      }
                  c.random && Ta.append('<li class="d3-color-blue"><span class="value">+' + c.random + "</span> " + e("Random Magic Properties") + "</li>")
              }
              if (!L && c.stats.sockets) {
                  var Ha = ia.socketType;
                  "weapon" != Ha && "head" != Ha && (Ha = "other");
                  for (var ja = c.stats.sockets.max || c.stats.sockets[0], Wa = 0; Wa < ja; ++Wa)
                      if (c.gems && Wa < c.gems.length) {
                          var Ua = c.gems[Wa];
                          if (DiabloCalc.legendaryGems[Ua[0]] && DiabloCalc.legendaryGems[Ua[0]].effects) {
                              for (var Ya = DiabloCalc.legendaryGems[Ua[0]], _a = DiabloCalc.getItemIcon(Ua[0], "small"), Va = Ya.effects[0].value.slice(), j = 0; j < Va.length; ++j)
                                  Va[j] += Ua[1] * Ya.effects[0].delta[j];
                              var Xa = d(Ya.effects[0].format || DiabloCalc.stats[Ya.effects[0].stat].format, Va, 2, Ya.effects[0].stat)
                                , za = d(Ya.effects[1].format || DiabloCalc.stats[Ya.effects[1].stat].format, Ya.effects[1].value || [], Ua[1] < 25 ? 1 : 2, Ya.effects[1].stat);
                              Ua[1] < 25 && (za += ' <span class="d3-color-red">' + e("(Requires Rank {0})").format(25) + "</span>");
                              var Ja = $('<li class="full-socket"></li>');
                              Ja.append('<img class="gem" src="' + _a + '" />'),
                              Ja.append('<span class="d3-color-orange">' + Ya.name + "</span>"),
                              Ua[1] && Ja.append(' <span class="item-jewel-rank">&#x2013; ' + e("Rank {0}").format(Ua[1]) + "</span>");
                              (Qa = $("<ul></ul>")).append('<li class="jewel-effect d3-color-orange"><p>' + Xa + "</p></li>"),
                              Qa.append('<li class="jewel-effect d3-color-' + (Ua[1] < 25 ? "gray" : "orange") + '"><p>' + za + "</p></li>"),
                              Ta.append(Ja.append(Qa))
                          } else if (DiabloCalc.gemColors[Ua[1]]) {
                              var Ya = DiabloCalc.gemColors[Ua[1]]
                                , _a = DiabloCalc.getItemIcon(Ua, "small")
                                , Ka = d(DiabloCalc.stats[Ya[Ha].stat].format, [Ya[Ha].amount[Ua[0]]], Ya[Ha].stat);
                              Ta.append('<li class="d3-color-white full-socket"><img class="gem" src="' + _a + '" /><span class="socket-effect">' + Ka + "</span></li>")
                          }
                      } else
                          Ta.append('<li class="empty-socket d3-color-blue">' + e("Empty Socket") + "</li>")
              }
              if ("potion" === O.type && Ta.append('<div class="item-description d3-color-white"><p>' + e("Cooldown: {0} Sec.").format(30) + "</p></div>"),
              L && c.stats.sockets && E.push("$3Socketed (" + c.stats.sockets + ")"),
              O.set) {
                  var Qa;
                  L ? (E.push(""),
                  Qa = X) : (Qa = $('<ul class="item-itemset"></ul>'),
                  la.append(Qa));
                  for (var Za = DiabloCalc.itemSets[O.set], at = {}, tt = [], st = 0, j = 0; j < Za.items.length; ++j)
                      at[Za.items[j].id] = j,
                      tt.push("gray");
                  for (var et in DiabloCalc.itemSlots) {
                      var lt = DiabloCalc.getSlotId(et);
                      lt && void 0 !== at[lt] && (tt[at[lt]] = "white",
                      st++)
                  }
                  if (st > 1 && !!DiabloCalc.getStats().leg_ringofroyalgrandeur && st++,
                  L) {
                      var it = 0;
                      for (var ot in Za.bonuses)
                          if (!(parseInt(ot) > st))
                              for (j = 0; j < Za.bonuses[ot].length; ++j) {
                                  Ka = d((rt = Za.bonuses[ot][j]).stat ? DiabloCalc.stats[rt.stat].format : rt.format, rt.value || [], 0, rt.stat);
                                  E.push("$4" + Ka),
                                  ++it
                              }
                      it && E.push(""),
                      E.push("$4" + Za.name);
                      for (j = 0; j < Za.items.length; ++j) {
                          var w = DiabloCalc.itemTypes[Za.items[j].type]
                            , n = DiabloCalc.itemSlots[w.slot] || DiabloCalc.metaSlots[w.slot];
                          E.push(("white" === tt[j] ? "$2" : "$1") + Za.items[j].name)
                      }
                  } else {
                      Qa.append('<li class="item-itemset-name"><span class="d3-color-green">' + Za.name + "</span></li>");
                      for (j = 0; j < Za.items.length; ++j) {
                          var w = DiabloCalc.itemTypes[Za.items[j].type]
                            , n = DiabloCalc.itemSlots[w.slot] || DiabloCalc.metaSlots[w.slot];
                          Qa.append('<li class="item-itemset-piece indent"><span class="d3-color-' + tt[j] + '">' + Za.items[j].name + " (" + n.name + ")</span></li>")
                      }
                      for (var ot in Za.bonuses) {
                          var nt = parseInt(ot) <= st ? "green" : "gray";
                          Qa.append('<li class="d3-color-' + nt + ' item-itemset-bonus-amount">' + e("({0}) Set:").format('<span class="value">' + ot + "</span>") + "</li>");
                          for (j = 0; j < Za.bonuses[ot].length; ++j) {
                              var rt = Za.bonuses[ot][j]
                                , Ka = d(rt.stat ? DiabloCalc.stats[rt.stat].format : rt.format, rt.value || [], 1, rt.stat);
                              Qa.append('<li class="d3-color-' + nt + ' item-itemset-bonus-desc indent">' + Ka + "</li>")
                          }
                      }
                  }
              }
              var ct = Y ? '<span class="item-unique-equipped">' + e("Unique Equipped") + "</span>" : "";
              if (h && void 0 !== h.total && (ct = '<span class="item-unique-equipped">' + e("Perfection: ") + p(h.total),
              g || r || (k || (ct += ' <span class="d3-perfection-tip">' + e("(hold shift for details)") + "</span>"),
              ct += '</span><span class="d3-perfection-section item-unique-equipped">',
              ct += e(h.dpsDelta ? "Damage: {0} (max {1})" : "Damage: {0}").format(p(h.dps), '<span class="d3-color-white">+' + DiabloCalc.formatNumber(h.dpsDelta, 0, 1e4) + "</span>"),
              ct += '</span><span class="d3-perfection-section item-unique-equipped">',
              ct += e(h.toughnessDelta ? "Toughness: {0} (max {1})" : "Toughness: {0}").format(p(h.toughness), '<span class="d3-color-white">+' + DiabloCalc.formatNumber(h.toughnessDelta, 0, 1e4) + "</span>"),
              ct += "</span>")),
              !L) {
                  dt = "";
                  if (Y || "potion" === O.type)
                      var dt = '<li class="item-reqlevel"><span class="d3-color-gold">' + e("Required Level: ") + '</span><span class="value">' + (Y ? 70 : 61) + "</span></li>";
                  la.append('<ul class="item-extras">' + dt + "<li>" + e("Account Bound") + "</li></ul>" + ct + '<span class="clear">\x3c!--   --\x3e</span>')
              }
              if (g && M) {
                  var pt = DiabloCalc.getStats();
                  k && DiabloCalc.itemSlots[M].item && DiabloCalc.itemSlots[M].item.gems && (pt = DiabloCalc.computeStats(function(a) {
                      if (a === M) {
                          var t = $.extend({}, DiabloCalc.itemSlots[M].item);
                          return t.gems = [],
                          t
                      }
                      return DiabloCalc.getSlot(a)
                  }));
                  var mt = DiabloCalc.computeStats(function(a) {
                      if (a === M) {
                          if (k) {
                              var t = $.extend({}, c);
                              return t.gems = [],
                              t
                          }
                          return c
                      }
                      return DiabloCalc.getSlot(a)
                  })
                    , ft = [];
                  for (var ut in DiabloCalc.tipStatList)
                      if (DiabloCalc.tipStatList[ut].stat) {
                          var Va = pt.getValue(DiabloCalc.tipStatList[ut].stat)
                            , ht = mt.getValue(DiabloCalc.tipStatList[ut].stat)
                            , vt = ht - Va
                            , bt = Va < .01 ? 1e5 : 100 * vt / Va;
                          ft.push([bt, '<li><span class="tooltip-icon-bullet"></span> <span class="d3-color-white">' + (DiabloCalc.tipStatList[ut].shortName || DiabloCalc.tipStatList[ut].name) + '</span>: <span class="d3-color-' + (0 === vt ? "gray" : vt > 0 ? "green" : "red") + '">' + (Va > .01 ? DiabloCalc.formatNumber(bt, 2) + "%" : "+&#8734;") + "</span></li>"])
                      }
                  ft.sort(function(a, t) {
                      return t[0] - a[0] + .001 * a[1].localeCompare(t[1])
                  });
                  for (var gt = '<div class="tooltip-extension"><ul class="item-type"><li><span class="d3-color-gold">' + e("Stat Changes if Equipped:") + "</span></li>", j = 0; j < ft.length; ++j)
                      gt += ft[j][1];
                  L || X.append(gt + "</ul></div>")
              }
              L || !O.flavor || g || X.append('<div class="tooltip-extension"><div class="flavor">' + O.flavor + "</div></div>"),
              L && A.append(a(E)),
              r ? function() {
                  null == v && l(),
                  v.css({
                      left: 0,
                      top: 0,
                      visibility: "hidden"
                  }).show();
                  var a, t, s = $(window), e = {
                      left: 50,
                      top: 5,
                      right: s.width() - 50,
                      bottom: s.height() - 5
                  }, i = v.outerWidth(), o = v.outerHeight(), n = Math.max(Math.min(D.top, e.bottom - o), e.top), r = e.right - D.right > D.left - e.left ? D.right + 2 : D.left - i - 2;
                  "right" === x ? (a = D.right + 2,
                  t = n) : "left" === x ? (a = D.left - i - 2,
                  t = n) : "top" === x ? (a = r,
                  t = Math.max(D.bottom - o, e.top)) : (a = r,
                  t = vertY),
                  y && v.css({
                      left: a,
                      top: t,
                      visibility: "visible"
                  })
              }() : (o(i, void 0, void 0, g),
              g && m(i, M, !0))
          }
      }
      var f, u, h, v, b, g, C, D, x, w, y = !0, k = !1, S = !1, q = {
          head: "default",
          shoulders: "default",
          neck: "square",
          torso: "big",
          waist: "square",
          hands: "default",
          wrists: "default",
          legs: "default",
          feet: "default",
          finger: "square",
          onehand: "default",
          twohand: "default",
          offhand: "default",
          follower: "square",
          custom: "square",
          customwpn: "square"
      };
      $(document).keydown(function(a) {
          if (17 == a.which && f && f.addClass("d3-tooltip-showrange"),
          16 == a.which && f && f.addClass("d3-tooltip-perfection"),
          (16 === a.which || 18 === a.which) && (16 === a.which && (k = !0),
          18 === a.which && (S = !0),
          g && C))
              return m(g, C),
              !1
      }).keyup(function(a) {
          if (17 == a.which && f && f.removeClass("d3-tooltip-showrange"),
          16 == a.which && f && f.removeClass("d3-tooltip-perfection"),
          (16 === a.which || 18 === a.which) && (16 === a.which && (k = !1),
          18 === a.which && (S = !1),
          g && C))
              return m(g, C),
              !1
      }),
      this.show = o,
      this.hide = r,
      this.showItem = m,
      this.showHtml = function(a, t, e, l) {
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", "none"),
          u.removeClass().addClass("tooltip-content"),
          u.html(t),
          o(a, e, l)
      }
      ,
      this.showSkill = function(a, t, e, l, i) {
          if ("attack" === t && DiabloCalc.skills.attack && DiabloCalc.skills.attack[e])
              return c(a, DiabloCalc.skills.attack[e]);
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", ""),
          u.removeClass().addClass("d3-tooltip-wrapper-inner");
          var n, r = DiabloCalc.skilltips[t][e];
          if (r) {
              l && "x" != l || (i = !1);
              var d = r.elements ? r.elements[l || "x"] : "phy";
              if (n = '<div class="d3-tooltip d3-tooltip-' + (i ? "rune" : "skill") + '">',
              n += '<div class="tooltip-skill-effect effect-' + d + '"><div class="tooltip-head"><h3>',
              i) {
                  n += DiabloCalc.skills[t][e].runes[l] + "</h3></div></div>",
                  n += '<div class="tooltip-body"><span class="d3-icon d3-icon-rune d3-icon-rune-medium"><span class="rune-' + l + '"></span></span>',
                  n += '<div class="description">';
                  var p = r[l]
                    , m = p.indexOf('<p class="subtle">');
                  m >= 0 && (p = p.slice(0, m) + '<p class="special">' + DiabloCalc.skills[t][e].name + "</p>" + p.slice(m)),
                  n += p,
                  n += '</div><span class="clear">\x3c!--   --\x3e</span></div>'
              } else
                  n += DiabloCalc.skills[t][e].name + "</h3></div></div>",
                  n += r.x,
                  l && "x" != l && (n += '<div class="tooltip-extension rune-extension"><span class="d3-icon d3-icon-rune d3-icon-rune-large"><span class="rune-' + l + '"></span></span>',
                  n += '<h3 class="header-3">' + DiabloCalc.skills[t][e].runes[l] + "</h3>",
                  n += r[l],
                  n += "</div>");
              n += "</div>"
          } else
              DiabloCalc.passives[t][e] ? (n = '<div class="d3-tooltip d3-tooltip-trait"><div class="tooltip-head"><h3>' + DiabloCalc.passives[t][e].name + "</h3></div>",
              n += DiabloCalc.passivetips[t][e],
              n += "</div>") : DiabloCalc.extraskills && DiabloCalc.extraskills[t][e] && (n = '<div class="d3-tooltip d3-tooltip-skill">',
              n += '<div class="tooltip-head"><h3>' + (r = DiabloCalc.extraskills[t][e]).name + "</h3></div>" + r.tip + "</div>");
          u.html(n),
          o(a)
      }
      ,
      this.showCustomSkill = function(a, t) {
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", ""),
          u.removeClass().addClass("d3-tooltip-wrapper-inner");
          var l = '<div class="d3-tooltip d3-tooltip-skill">';
          if (l += '<div class="tooltip-head"><h3>' + t.name + "</h3></div>",
          l += '<div class="tooltip-body">',
          l += '<span class="d3-icon d3-icon-skill d3-icon-skill-64 miscbuffs-icon" style="background-position: -' + 64 * t.icon + 'px 0; width: 64px; height: 64px"><span class="frame"></span></span>',
          l += '<div class="description">',
          t.desc instanceof Array)
              for (var i = 0; i < t.desc.length; ++i)
                  l += "<p>" + t.desc[i].replace(/\+?[0-9]+(?:\.[0-9]+)?%?/g, '<span class="d3-color-green">$&</span>') + "</p>";
          else
              l += "<p>" + t.desc + "</p>";
          t.level && (l += '<p class="subtle">' + e("Unlocked at level {0}.").format("<em>" + t.level + "</em>") + "</p>"),
          l += "</div></div></div>",
          u.html(l),
          o(a)
      }
      ,
      this.showFollowerSkill = function(a, t) {
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", ""),
          u.removeClass().addClass("d3-tooltip-wrapper-inner");
          var l = DiabloCalc.followerSkills[t];
          if (l) {
              var i = location.protocol + "//" + location.hostname + DiabloCalc.relPath + "webgl/icons/" + l.icon
                , n = '<div class="d3-tooltip d3-tooltip-skill">';
              n += '<div class="tooltip-head"><h3>' + l.name + "</h3></div>",
              n += '<div class="tooltip-body">',
              n += '<span class="d3-icon d3-icon-skill d3-icon-skill-64" style="background-image: url(' + i + '); width: 64px; height: 64px"><span class="frame"></span></span>',
              n += '<div class="description">',
              n += "<p>" + l.description.replace(/<\/p> <p>Requires <span class="value"><\/span>$/, "") + "</p>",
              n += '<p class="subtle">' + e("Unlocked at level {0}.").format("<em>" + l.level + "</em>") + "</p>",
              n += "</div></div></div>",
              u.html(n),
              o(a)
          }
      }
      ,
      this.showShrineBuff = function(a, e) {
          null == f && s(),
          f.removeClass("d2tip"),
          f.css("max-width", ""),
          u.removeClass().addClass("d3-tooltip-wrapper-inner");
          var l = DiabloCalc.shrineBuffs[e];
          if (l) {
              var i = location.protocol + "//" + location.hostname + DiabloCalc.relPath + "webgl/icons/" + l.icon
                , n = '<div class="d3-tooltip d3-tooltip-skill">';
              n += '<div class="tooltip-head"><h3>' + l.name + "</h3></div>",
              n += '<div class="tooltip-body">',
              n += '<span class="d3-icon d3-icon-skill d3-icon-skill-64" style="background-image: url(' + i + '); width: 64px; height: 64px"><span class="frame"></span></span>',
              n += '<div class="description">';
              for (var r = 0; r < l.description.length; ++r)
                  n += "<p>" + t(l.description[r]) + "</p>";
              n += "</div></div></div>",
              u.html(n),
              o(a)
          }
      }
      ,
      this.showGem = function(a, t, l, i) {
          function n(a, s) {
              var e = d(DiabloCalc.stats[a.stat].format, [a.amount[t[0]]]);
              return s || (e = '<span class="d3-color-gray">' + e + "</span>"),
              e
          }
          var r = t instanceof Array ? void 0 : DiabloCalc.legendaryGems[t]
            , c = t instanceof Array ? DiabloCalc.gemColors[t[1]] : void 0;
          if (r || c) {
              l = l || 0,
              null == f && s(),
              u.empty(),
              f.removeClass("d2tip"),
              f.css("max-width", ""),
              u.removeClass().addClass("d3-tooltip-wrapper-inner"),
              $(".char-class").val();
              var p = DiabloCalc.getItemIcon(t)
                , m = $('<div class="d3-tooltip d3-tooltip-item"></div>');
              u.append(m);
              var h = r ? "orange" : "blue";
              m.append('<div class="tooltip-head tooltip-head-' + h + '"><h3 class="d3-color-' + h + '">' + (r ? r.name : c.names[t[0]]) + "</h3></div>");
              var v = $('<div class="tooltip-body"></div>');
              m.append(v),
              v.append('<span class="d3-icon d3-icon-item d3-icon-item-large d3-icon-item-' + h + '"><span class="icon-item-gradient"><span class="icon-item-inner icon-item-square" style="background-image: url(' + p + ');"></span></span></span>');
              var b = $('<div class="d3-item-properties"></div>');
              v.append(b),
              r ? (l && b.append('<ul class="item-type-right"><li class="item-jewel-rank">' + e("Rank {0}").format(l) + "</li></ul>"),
              b.append('<ul class="item-type"><li><span class="d3-color-orange">' + DiabloCalc.GenderPair(DiabloCalc.qualities.legendary.prefix, e("Gem")) + "</span></li></ul>"),
              b.append('<div class="item-description d3-color-white"><p></p></div>')) : b.append('<ul class="item-type"><li><span class="d3-color-default">' + DiabloCalc.GenderString(e("Gem")) + "</span></li></ul>"),
              b.append('<div class="item-before-effects"></div>');
              var g = $('<ul class="item-effects"></ul>');
              if (b.append(g),
              r) {
                  for (var C = r.effects[0].value.slice(), D = 0; D < C.length; ++D)
                      C[D] += l * r.effects[0].delta[D];
                  var x = d(r.effects[0].format || DiabloCalc.stats[r.effects[0].stat].format, C, 2, r.effects[0].stat)
                    , w = d(r.effects[1].format || DiabloCalc.stats[r.effects[1].stat].format, r.effects[1].value || [], l < 25 ? 1 : 2, r.effects[1].stat);
                  l < 25 && (w += ' <span class="d3-color-red">' + e("(Requires Rank {0})").format(25) + "</span>"),
                  g.append('<li class="d3-color-orange d3-item-property-default"><p>' + x + "</p></li>"),
                  g.append('<li class="d3-color-' + (l < 25 ? "gray" : "orange") + ' d3-item-property-default"><p>' + w + "</p></li>"),
                  b.append('<ul class="item-extras"><li>' + e("Account Bound") + '</li></ul><span class="item-unique-equipped">' + e("Unique Equipped") + '</span><span class="clear">\x3c!--   --\x3e</span>')
              } else
                  g.append('<li class="d3-color-white">' + e("Can be inserted into equipment with sockets.") + "</li>"),
                  g.append('<li class="gem-effect"><span class="d3-color-gray">' + e("Helm:") + "</span> " + n(c.head, !i || "head" === i) + "</li>"),
                  g.append('<li class="gem-effect"><span class="d3-color-gray">' + e("Weapon:") + "</span> " + n(c.weapon, !i || "weapon" === i) + "</li>"),
                  g.append('<li class="gem-effect"><span class="d3-color-gray">' + e("Other:") + "</span> " + n(c.other, "head" !== i && "weapon" !== i) + "</li>"),
                  b.append('<ul class="item-extras"><li>' + e("Account Bound") + '</li></ul><span class="clear">\x3c!--   --\x3e</span>');
              r && r.flavor && m.append('<div class="tooltip-extension"><div class="flavor">' + r.flavor + "</div></div>"),
              o(a)
          }
      }
      ,
      this.showAttack = c,
      this.getNode = function() {
          return g
      }
      ,
      this.enable = function() {
          y = !0
      }
      ,
      this.disable = function() {
          y = !1,
          r()
      }
  }
}();
!function() {
  function addStat(t, s, i, e, a) {
      if (i) {
          if (i.source)
              return addStat(t, s, i.value, e, i.source);
          var n = statInfo[s];
          if (e || (e = 1),
          n && n.special && t.special && a) {
              if (t.special[s] || (t.special[s] = {}),
              t.special[s][a] || (t.special[s][a] = []),
              i instanceof Array)
                  t.special[s][a].push({
                      percent: i[0] * e
                  }),
                  i = i[0];
              else if ("number" == typeof i)
                  t.special[s][a].push({
                      percent: i * e
                  });
              else {
                  if (i.list) {
                      for (f = 0; f < i.list.length; ++f)
                          addStat(t, s, i.list[f], e, a);
                      return
                  }
                  var h = $.extend({}, i);
                  h.percent *= e,
                  t.special[s][a].push(h),
                  i = void 0 === i.elems && void 0 === i.pet && void 0 === i.skills ? i.percent : void 0
              }
              i && (n.mult ? t[s] = (t[s] || 1) * (1 + .01 * i * e) : t[s] = (t[s] || 0) + i * e)
          } else {
              if (a && t.sources) {
                  var r = ("number" == typeof i ? i : i[0]) * e;
                  r && (t.sources[s] || (t.sources[s] = {}),
                  t.sources[s][a] = (t.sources[s][a] || 0) + r)
              }
              if (n && 0 == n.args)
                  t[s] = 1;
              else if (n && 1 != n.args)
                  if (-1 == n.args)
                      t[s] = i.length > 0 ? i[0] : "";
                  else {
                      void 0 === t[s] && (t[s] = {});
                      var o = n.argnames || ["min", "max"];
                      if (n && n.dr) {
                          t[s][o[0]] = 100 - .01 * (100 - (t[s][o[0]] || 0)) * Math.max(0, 100 - (void 0 !== i[0] ? i[0] : i[o[0]]) * e);
                          for (f = 1; f < n.args; ++f)
                              t[s][o[f]] = Math.max(t[s][o[f]] || 0, (void 0 !== i[f] ? i[f] : i[o[f]]) * e)
                      } else
                          for (var f = 0; f < n.args; ++f)
                              t[s][o[f]] = (!n.nostack && t[s][o[f]] || 0) + (void 0 !== i[f] ? i[f] : i[o[f]]) * e
                  }
              else
                  "number" != typeof i && (i = i[0]),
                  void 0 === t[s] || n && n.nostack ? t[s] = i * e : n && n.dr ? t[s] = 100 - .01 * (100 - t[s]) * Math.max(0, 100 - i * e) : t[s] += i * e
          }
      }
  }
  function Stats(t) {
      switch (this.info = {
          level: parseInt($(".char-level").val()),
          gems: 0,
          legendaries: 0,
          ancients: 0
      },
      this.charClass = t || DC.charClass,
      this.primary = DC.classes[this.charClass].primary,
      this.str = 7 + this.info.level,
      this.dex = 7 + this.info.level,
      this.int = 7 + this.info.level,
      this.vit = 7 + 2 * this.info.level,
      this.chc = 5,
      this.chd = 50,
      this.ias = 0,
      this.gems = {},
      this.sources = {},
      this.special = {},
      this.skills = {},
      this.passives = {},
      this[this.primary] += 2 * this.info.level,
      this.info.mainhand = {
          speed: 1,
          wpnphy: {
              min: 2,
              max: 3
          }
      },
      this.info.sets = {},
      this.info.itemregen = 0,
      this.affixes = {},
      this.charClass) {
      case "wizard":
          this.maxap = 100,
          this.apregen = 10;
          break;
      case "demonhunter":
          this.maxhatred = 125,
          this.hatredregen = 5,
          this.maxdisc = 30,
          this.discregen = 1;
          break;
      case "witchdoctor":
          this.maxmana = 750,
          this.manaregen = 50;
          break;
      case "barbarian":
          this.maxfury = 100;
          break;
      case "monk":
          this.maxspirit = 250;
          break;
      case "crusader":
          this.maxwrath = 100,
          this.wrathregen = 2.5;
          break;
      case "necromancer":
          this.maxessence = 200
      }
  }
  function invalidate() {
      statCache = null,
      DC.trigger("updateStats")
  }
  function computeStats(t, s) {
      var i = new Stats;
      return s && (statCache = i),
      i.loadItems(t),
      i.applyGems(),
      DC.addSkillBonuses && DC.addSkillBonuses(i),
      i.finalize(),
      finCache = i,
      i
  }
  var DC = DiabloCalc
    , statInfo = $.extend({}, DC.stats);
  Stats.prototype.addAbsolute = function(t, s) {
      if (this[s]) {
          var i = statInfo[t];
          this.sources[s],
          this[s];
          if (this.sources[s]) {
              this.sources[t] || (this.sources[t] = {});
              for (var e in this.sources[s])
                  this.sources[t][e] && i && i.dr ? this.sources[t][e] = 100 - .01 * (100 - this.sources[t][e]) * (100 - this.sources[s][e]) : this.sources[t][e] = (this.sources[t][e] || 0) + this.sources[s][e]
          }
          this[t] && i && i.dr ? this[t] = 100 - .01 * (100 - this[t]) * (100 - this[s]) : this[t] = (this[t] || 0) + this[s]
      }
  }
  ,
  Stats.prototype.addPercent = function(t, s, i) {
      var e, a;
      if ("string" == typeof s) {
          if (!this[s])
              return;
          e = this.sources[s],
          a = this[s]
      } else {
          e = {},
          a = 0;
          for (var n = 0; n < s.length; ++n)
              if (this[s[n]]) {
                  a += this[s[n]];
                  var h = this.sources[s[n]];
                  if (h)
                      for (var r in h)
                          e[r] = (e[r] || 0) + h[r]
              }
          if (!a)
              return
      }
      if (void 0 === i) {
          if (!this[t])
              return;
          i = this[t]
      }
      if (e) {
          this.sources[t] || (this.sources[t] = {});
          for (var r in e)
              if ("number" == typeof i) {
                  f = .01 * i * e[r];
                  this.sources[t][r] = (this.sources[t][r] || 0) + f
              } else
                  for (var o in i) {
                      var f = .01 * i[o] * e[r];
                      this.sources[t][r] = (this.sources[t][r] || 0) + f;
                      break
                  }
      }
      if ("number" == typeof i)
          this[t] = (this[t] || 0) + .01 * i * a;
      else {
          this[t] || (this[t] = {});
          for (var o in i)
              this[t][o] = (this[t][o] || 0) + .01 * i[o] * a
      }
  }
  ,
  Stats.prototype.add = function(t, s, i, e) {
      addStat(this, t, s, i, e)
  }
  ,
  Stats.prototype.getValue = function(t) {
      for (var s = this, i = t.split("."); "object" == typeof s && i.length; )
          s = s[i.shift()];
      return s || 0
  }
  ,
  Stats.prototype.execString = function(expr) {
      var self = this;
      return expr = expr.replace(/[a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*)*/g, function(t) {
          var s = self.getValue(t);
          return "number" != typeof s ? "(" + JSON.stringify(s) + ")" : s
      }),
      eval(expr)
  }
  ,
  Stats.prototype.getAffixSource = function(t) {
      var s = this.affixes[t];
      if (s)
          return s.set ? s.set : s.slot ? DC.getSlotId(s.slot) : s.kanai ? DC.getSkills().kanai[s.kanai] : void 0
  }
  ,
  Stats.prototype.getSpecial = function(t, s, i, e, a) {
      if (!this.special[t])
          return {};
      var n = [];
      for (var h in this.special[t])
          for (var r = 0; r < this.special[t][h].length; ++r) {
              var o = this.special[t][h][r];
              if (o.percent && !(a && a.indexOf(h) >= 0 || o.elems && o.elems.indexOf(s) < 0 || void 0 !== o.pet && o.pet != (i || !1) || o.skills && o.skills.indexOf(e) < 0)) {
                  var f;
                  f = o.name ? o.name : DC.sourceNames[h] || h,
                  n.push([f, o.percent])
              }
          }
      return n
  }
  ,
  Stats.prototype.getTotalSpecial = function(t, s, i, e, a) {
      var n = statInfo[t].mult ? 1 : 0;
      if (!this.special[t])
          return n;
      for (var h in this.special[t])
          for (var r = 0; r < this.special[t][h].length; ++r) {
              var o = this.special[t][h][r];
              a && a.indexOf(h) >= 0 || (o.elems && o.elems.indexOf(s) < 0 || void 0 !== o.pet && o.pet != (i || !1) || o.skills && o.skills.indexOf(e) < 0 || (statInfo[t].mult ? n *= 1 + .01 * o.percent : n += o.percent))
          }
      return n
  }
  ,
  Stats.prototype.startLoad = function() {
      this.extraFx = {},
      DiabloCalc.addExtraAffixes && DiabloCalc.addExtraAffixes(this.extraFx),
      this.setSlots = {}
  }
  ,
  Stats.prototype.addItem = function(t, s) {
      if (s && DC.itemById[s.id]) {
          var i = DC.itemById[s.id]
            , e = DC.itemTypes[i.type];
          if ("offhand" === t && (this.info.ohtype = i.type),
          "set" !== i.quality && "legendary" !== i.quality || ++this.info.legendaries,
          s.ancient && ++this.info.ancients,
          e.weapon) {
              var a = e.weapon;
              i.weapon && (a = $.extend({}, a, i.weapon)),
              this.info[t] = {
                  speed: a.speed * (1 + .01 * (s.stats.weaponias || [0])[0]),
                  ias: (s.stats.weaponias || [0])[0],
                  wpnphy: {
                      min: a.min,
                      max: a.max
                  },
                  damage: (s.stats.damage || [0])[0],
                  type: i.type,
                  slot: e.slot,
                  weaponClass: a.type
              }
          }
          i.set && (this.info.sets[i.set] = (this.info.sets[i.set] || 0) + 1,
          this.setSlots[i.set] || (this.setSlots[i.set] = t));
          for (var n in s.stats) {
              var h = n;
              "custom" == n && (h = i.required.custom.id,
              statInfo[h] = i.required.custom,
              statInfo[h].nostack = !0,
              void 0 === statInfo[h].args && (statInfo[h].args = 1),
              this.affixes[h] = {
                  slot: t,
                  value: s.stats[n]
              }),
              statInfo[h].damage && e.weapon ? ("mainhand" === t && (this.info.mhelement = DiabloCalc.stats[n].elem),
              addStat(this.info[t], "wpnphy", s.stats[n])) : ("damage" != h && "weaponias" != h || !e.weapon) && addStat(this, h, s.stats[n], 1, t),
              "regen" == n && (this.info.itemregen += s.stats[n][0])
          }
          if (s.gems) {
              var r = 1;
              s.stats.custom && "leg_leoricscrown" == i.required.custom.id && (r = 1 + .01 * s.stats.custom[0]),
              "head" === t && this.extraFx.leg_leoricscrown && (r = 1 + .01 * this.extraFx.leg_leoricscrown);
              var o = (DC.metaSlots[e.slot] || DC.itemSlots[e.slot]).socketType;
              "weapon" != o && "head" != o && (o = "other"),
              this.info.gems += s.gems.length;
              for (var f = 0; f < s.gems.length; ++f)
                  if (DC.legendaryGems[s.gems[f][0]])
                      this.gems[s.gems[f][0]] = s.gems[f][1];
                  else if (DC.gemColors[s.gems[f][1]]) {
                      var d = DC.gemColors[s.gems[f][1]][o]
                        , l = [d.amount[s.gems[f][0]]];
                      "wpnphy" == d.stat && l.push(l[0]),
                      statInfo[d.stat].damage && e.weapon ? addStat(this.info[t], "wpnphy", l, r) : this.add(d.stat, l, r, "gems")
                  }
          }
      }
  }
  ,
  Stats.prototype.finishLoad = function() {
      for (var t in this.extraFx)
          this.add(t, this.extraFx[t]);
      delete this.extraFx;
      for (var s in this.info.sets) {
          var i = DC.itemSets[s]
            , e = this.info.sets[s];
          e >= 2 && this.leg_ringofroyalgrandeur && (e += 1);
          for (var a in i.bonuses)
              if (e >= parseInt(a)) {
                  statInfo[r = "set_" + s + "_" + a + "pc"] = {
                      args: 0
                  },
                  this.add(r, !0);
                  for (var n = 0; n < i.bonuses[a].length; ++n)
                      i.bonuses[a][n].stat && this.add(i.bonuses[a][n].stat, i.bonuses[a][n].value, 1, s);
                  this.affixes[r] = {
                      slot: this.setSlots[s],
                      set: s,
                      pieces: a,
                      value: []
                  }
              }
      }
      delete this.setSlots;
      var h = DC.getParagon();
      if (h)
          for (var r in h)
              this.add(r, h[r], 1, "paragon"),
              "regen" === r && (this.info.itemregen += h[r][0]);
      this.info.offhand ? "fist" === this.info.offhand.weaponClass ? this.info.weaponClass = "dualwield" + ("fist" === this.info.mainhand.weaponClass ? "_ff" : "_sf") : this.info.weaponClass = "dualwield" : this.info.weaponClass = this.info.mainhand.weaponClass
  }
  ,
  Stats.prototype.loadItems = function(t) {
      t || (t = DC.getSlot),
      this.startLoad(),
      17 === DiabloCalc.seasonal ? (this.info.sets.nightmares = 2,
      this.setSlots.nightmares = "leftfinger") : DiabloCalc.seasonal;
      for (var s in DC.itemSlots)
          this.addItem(s, t(s));
      this.finishLoad()
  }
  ,
  Stats.prototype.applyGems = function() {
      function t(t, s) {
          var i, e;
          if (t.realvalue ? (i = t.realvalue.slice(),
          e = t.realdelta) : t.value && (i = t.value.slice(),
          e = t.delta),
          !i)
              return [];
          if (e)
              for (var a = 0; a < e.length; ++a)
                  i[a] += e[a] * s;
          return i
      }
      var s = this;
      $.each(this.gems, function(i, e) {
          var a = DC.legendaryGems[i];
          if (a) {
              var n = DC.isGemActive && DC.isGemActive(i);
              if (n && a.buffs) {
                  r = a.buffs(e, s);
                  for (var h in r)
                      s.add(h, r[h], 1, i)
              } else {
                  if (n) {
                      (o = a.effects[0].stat) || (statInfo[o = "gem_" + i] = a.effects[0]),
                      s.add(o, t(a.effects[0], e), 1, i)
                  } else if (a.inactive) {
                      var r = a.inactive(e, s);
                      for (var h in r)
                          s.add(h, r[h], 1, i)
                  }
                  if (e >= 25 && (n || "powerful" == i)) {
                      var o = a.effects[1].stat;
                      o || (statInfo[o = "gem_" + i + "_25"] = a.effects[1]),
                      s.add(o, t(a.effects[1], e), 1, i)
                  }
              }
          }
      })
  }
  ,
  Stats.prototype.finalize = function(t, s) {
      if (this.chc = Math.min(75, this.chc),
      this.addAbsolute("chc", "extrachc"),
      this.chc = Math.min(100, this.chc),
      this.expmul && (this.expmul *= .1),
      this.addAbsolute("str", "caldesanns_str"),
      this.addAbsolute("dex", "caldesanns_dex"),
      this.addAbsolute("int", "caldesanns_int"),
      this.addAbsolute("vit", "caldesanns_vit"),
      this.addPercent("str", "str_percent"),
      this.addPercent("dex", "dex_percent"),
      this.addPercent("int", "int_percent"),
      !t) {
          addStat(this, "armor", this.str, 1, "str"),
          addStat(this, "armor", this.dex, 1, "dex"),
          addStat(this, "resall", this.int, .1, "int"),
          this.armor += this.basearmor || 0,
          this.addPercent("armor", "armor_percent"),
          this.passives.holdyourground && this.dodge && (this.sources.dodge.holdyourground = -this.dodge,
          this.dodge = 0),
          addStat(this, "blockamount", [0, 0]),
          this.addPercent("blockamount", "blockamount_percent"),
          addStat(this, "block", this.baseblock, 1, "baseblock"),
          this.block = Math.min(75, this.block || 0),
          this.addAbsolute("block", "extra_block"),
          this.addPercent("block", "block_percent"),
          this.block = Math.min(100, this.block),
          this.leg_justicelantern && this.add("dmgred", this.block * this.leg_justicelantern * .01, 1, "P4_Unique_Ring_03");
          var i = 10;
          70 == this.info.level ? i = 100 : this.info.level > 65 ? i = 5 * this.info.level - 270 : this.info.level > 60 ? i = 4 * this.info.level - 205 : this.info.level > 35 && (i = this.info.level - 25),
          this.info.hppervit = i,
          this.info.hp = 36 + 4 * this.info.level + this.vit * i,
          this.info.hp *= 1 + .01 * (this.life || 0);
          for (var e = ["resphy", "resfir", "rescol", "reslit", "respsn", "resarc"], a = 0; a < e.length; ++a)
              addStat(this, e[a], this.resall);
          for (a = 0; a < e.length; ++a)
              this.addPercent(e[a], ["resist_percent", e[a] + "_percent"]);
          this.info.resavg = 0,
          this.info.resmin = 0;
          for (a = 0; a < e.length; ++a)
              this.info.resmin += (this[e[a]] < 0 ? -1 : 1) * Math.sqrt(Math.abs(this[e[a]])),
              this.info.resavg += this[e[a]];
          this.info.resavg /= 6,
          this.info.resmin = (this.info.resmin < 0 ? -1 : 1) * (this.info.resmin * this.info.resmin) / 36,
          this.info.defavg = 1 - .01 * ((this.meleedef || 0) + (this.rangedef || 0)) * .333333;
          var n = .01 * (this.nonphys || 0);
          this.info.defavg *= 1 - .01 * (this.physdef || 0) * .16663,
          this.info.defavg *= 1 - .16663 * (1 - (1 - n) * (1 - .01 * (this.colddef || 0))),
          this.info.defavg *= 1 - .16663 * n,
          this.info.defavg *= 1 - .16663 * n,
          this.info.defavg *= 1 - .16663 * n,
          this.info.defavg *= 1 - .16663 * (1 - (1 - n) * (1 + .01 * (this.firetaken || 0))),
          this.info.defavg *= 1 - .01 * (this.dmgred || 0),
          this.info.armor_factor = 1 / (1 + this.armor / (50 * this.info.level)),
          this.info.res_factor = 1 / (1 + this.info.resavg / (5 * this.info.level)),
          this.info.resmin_factor = 1 / (1 + this.info.resmin / (5 * this.info.level)),
          this.info.defense_factor = this.info.armor_factor * this.info.res_factor * (1 - .01 * (this.edef || 0) / 2) * this.info.defavg,
          this.info.defensemin_factor = this.info.armor_factor * this.info.resmin_factor * (1 - .01 * (this.edef || 0) / 2) * this.info.defavg,
          this.info.toughness = this.info.hp / this.info.defense_factor / (1 - .01 * (this.dodge || 0)),
          this.info.toughnessmin = this.info.hp / this.info.defensemin_factor / (1 - .01 * (this.dodge || 0)),
          this.info.toughpervit = this.info.toughness / this.info.hp * 100 * i * (1 + .01 * (this.life || 0)),
          this.info.toughperlife = .01 * this.info.toughness / (1 + .01 * (this.life || 0)),
          this.info.toughperarmor = 100 * this.info.toughness / (50 * this.info.level) * this.info.armor_factor * (1 + .01 * (this.armor_percent || 0));
          var h = 1 + .01 * (this.resist_percent || 0) + .01 * ((this.resphy_percent || 0) + (this.resfir_percent || 0) + (this.rescol_percent || 0) + (this.reslit_percent || 0) + (this.respsn_percent || 0) + (this.resarc_percent || 0)) / 6;
          this.info.toughperres = 100 * this.info.toughness / (5 * this.info.level) * this.info.res_factor * h,
          this.info.toughper650vit = 100 * this.info.toughpervit * 6.5 / this.info.toughness,
          this.info.toughper15life = 100 * this.info.toughperlife * 15 / this.info.toughness,
          this.info.toughper775armor = 100 * this.info.toughperarmor * 7.75 / this.info.toughness,
          this.info.toughper130res = 100 * this.info.toughperres * 1.3 / this.info.toughness,
          this.info.resphy_factor = 1 / (1 + this.resphy / (5 * this.info.level)),
          this.info.resfir_factor = 1 / (1 + this.resfir / (5 * this.info.level)),
          this.info.rescol_factor = 1 / (1 + this.rescol / (5 * this.info.level)),
          this.info.reslit_factor = 1 / (1 + this.reslit / (5 * this.info.level)),
          this.info.respsn_factor = 1 / (1 + this.respsn / (5 * this.info.level)),
          this.info.resarc_factor = 1 / (1 + this.resarc / (5 * this.info.level))
      }
      this.addAbsolute("thorns", "firethorns"),
      this.addPercent("thorns", "vit_to_thorns", this.vit),
      this.addPercent("thorns", "thorns_multiply"),
      this.addPercent("thorns", "thorns_percent"),
      this.info.thorns = (this.thorns || 0) * (1 + this[this.primary] / 100),
      this.calcWeapon = function(t) {
          t.speed += this.weaponaps || 0,
          t.speed *= 1 + .01 * (this.weaponaps_percent || 0);
          var s = 1 + .01 * (t.damage || 0);
          t.wpnphy.min *= s,
          t.wpnphy.max *= s,
          this.wpnphy && (t.wpnphy.min += this.wpnphy.min,
          t.wpnphy.max += this.wpnphy.max),
          t.wpnbase = $.extend({}, t.wpnphy),
          s = (1 + .01 * this[this.primary]) * (1 + .01 * (this.damage || 0)),
          t.wpnphy.min *= s,
          t.wpnphy.max *= s,
          t.damage = .5 * (t.wpnphy.min + t.wpnphy.max),
          t.speed *= 1 + .01 * this.ias,
          t.speed = Math.min(5, t.speed),
          t.dps = t.damage * this.info.critfactor * t.speed,
          t.dph = t.damage * this.info.critfactor
      }
      ,
      this.info.offhand && this.add("ias", 15, 1, "dualwield"),
      this.info.critfactor = 1 + .01 * this.chc * (.01 * this.chd),
      this.calcWeapon(this.info.mainhand),
      this.info.offhand ? (this.calcWeapon(this.info.offhand),
      this.info.aps = 2 / (1 / this.info.mainhand.speed + 1 / this.info.offhand.speed),
      this.info.dps = (this.info.mainhand.dph + this.info.offhand.dph) * this.info.aps / 2) : (this.info.dps = this.info.mainhand.dps,
      this.info.aps = this.info.mainhand.speed),
      this.info.maxelem = "arc",
      this.info.elemental = this.dmgarc || 0;
      for (var r in DC.elements) {
          var o = this["dmg" + r] || 0;
          o > this.info.elemental && (this.info.maxelem = r,
          this.info.elemental = o)
      }
      t || (this.addAbsolute("regen", "post_regen"),
      this.addPercent("regen", "post_regen_bonus", this.info.itemregen),
      this.addPercent("regen", "regen_bonus"),
      this.info.healing = (this.regen || 0) + .01 * (this.regen_percent || 0) * this.info.hp + (this.lph || 0) * this.info.aps + .16 * (this.laek || 0) + .08 * (this.healbonus || 0),
      this.info.recovery = this.info.healing * this.info.toughness / this.info.hp,
      this.info.recoverymin = this.info.healing * this.info.toughnessmin / this.info.hp),
      this.info.edps = this.info.dps * (1 + .01 * (this.edmg || 0)),
      this.info.elementaldps = this.info.dps * (1 + .01 * this.info.elemental),
      this.info.dph = this.info.dps / this.info.aps,
      this.info.primary = this[this.primary];
      this.info.dmgmul = 100 * ((this.dmgmul || 1) - 1),
      this.final = {},
      this.final.addbase = 1 + .01 * (this.damage || 0) + .01 * (this.dmgtaken || 0),
      this.final.chc = this.chc + (this.chctaken || 0),
      this.final.chc *= 1 + .01 * (this.chctaken_percent || 0);
      var f = (this.dmgmul || 1) * this.final.addbase / (1 + .01 * (this.damage || 0));
      if (f *= (1e4 + this.final.chc * this.chd) / (1e4 + this.chc * this.chd),
      this.final.dps = this.info.dps * f,
      this.final.dph = this.info.dph * f,
      this.final.elemdps = this.final.dps * (1 + .01 * this.info.elemental),
      this.final.elemdph = this.final.dph * (1 + .01 * this.info.elemental),
      this.final.elemedps = this.final.elemdps * (1 + .01 * (this.edmg || 0)),
      this.final.elemedph = this.final.elemdph * (1 + .01 * (this.edmg || 0)),
      !t) {
          this.ms = Math.min(25, this.ms || 0),
          this.addAbsolute("ms", "extrams"),
          this.mf = Math.min(300, this.mf || 0),
          this.info["dpsper" + this.primary] = this.info.elementaldps / (1 + .01 * this[this.primary]),
          this.info.dpsperchc = 1e-4 * this.info.elementaldps * this.chd / this.info.critfactor,
          this.info.dpsperchd = 1e-4 * this.info.elementaldps * this.chc / this.info.critfactor,
          this.info.dpsperias = .01 * this.info.elementaldps / (1 + .01 * this.ias),
          this.info.dpsperelem = .01 * this.info.elementaldps / (1 + .01 * this.info.elemental),
          this.info["dpsper650" + this.primary] = 100 * this.info["dpsper" + this.primary] * 6.5 / this.info.elementaldps,
          this.info.dpsper6chc = 100 * this.info.dpsperchc * 6 / this.info.elementaldps,
          this.info.dpsper50chd = 100 * this.info.dpsperchd * 50 / this.info.elementaldps,
          this.info.dpsper7ias = 100 * this.info.dpsperias * 7 / this.info.elementaldps,
          this.info.dpsper20elem = 100 * this.info.dpsperelem * 20 / this.info.elementaldps;
          var d = .5 * (this.info.mainhand.wpnbase.min + this.info.mainhand.wpnbase.max);
          if (this.info.offhand) {
              var l = this.info.mainhand.dph
                , c = this.info.offhand.dph
                , p = .5 * (this.info.offhand.wpnbase.min + this.info.offhand.wpnbase.max);
              this.info.dpsperdmg = this.info.elementaldps * (l / d + c / p) / (l + c)
          } else
              this.info.dpsperdmg = this.info.elementaldps / d;
          this.info.dpsper105210dmg = 100 * this.info.dpsperdmg * 315 / 2 / this.info.elementaldps
      }
      switch (this.charClass) {
      case "wizard":
          this.addPercent("apregen", "resourcegen"),
          this.addAbsolute("rcr_ap", "rcr");
          break;
      case "demonhunter":
          this.addPercent("hatredregen", "resourcegen"),
          this.addPercent("discregen", "resourcegen"),
          this.addAbsolute("rcr_hatred", "rcr"),
          this.addAbsolute("rcr_disc", "rcr");
          break;
      case "witchdoctor":
          this.addPercent("maxmana", "maxmana_percent"),
          this.addPercent("manaregen", "manaregen_percent", this.maxmana),
          this.addPercent("manaregen", "resourcegen"),
          this.addAbsolute("rcr_mana", "rcr");
          break;
      case "barbarian":
          this.addPercent("furyregen", "resourcegen"),
          this.addPercent("lifefury", "lpfs_percent"),
          this.addAbsolute("rcr_fury", "rcr");
          break;
      case "monk":
          this.addPercent("spiritregen", "resourcegen"),
          this.addAbsolute("rcr_spirit", "rcr");
          break;
      case "crusader":
          this.addPercent("wrathregen", "resourcegen"),
          this.addAbsolute("rcr_wrath", "rcr");
          break;
      case "necromancer":
          this.addPercent("maxessence", "maxessence_percent"),
          this.addPercent("essenceregen", "resourcegen"),
          this.addAbsolute("rcr_essence", "rcr")
      }
  }
  ,
  Stats.prototype.clone = function() {
      var t = new Stats(this.charClass);
      for (var s in this)
          if (this.hasOwnProperty(s)) {
              var i = this[s];
              null == i || (i instanceof Array ? t[s] = $.extend(!0, [], i) : i instanceof Object ? t[s] = $.extend(!0, {}, i) : void 0 !== i && (t[s] = i))
          }
      return t
  }
  ,
  Stats.prototype.flatten = function() {
      delete this.sources;
      var t = {};
      for (var s in this.special) {
          var i = [];
          for (var e in this.special[s])
              i = i.concat(this.special[s][e]);
          t[s] = i
      }
      this.special = t
  }
  ;
  var statCache = null
    , finCache = null;
  DC.getStats = function(t) {
      return t && finCache ? finCache : statCache || (computeStats(void 0, !0),
      computeStats(void 0, !0),
      statCache)
  }
  ,
  DC.computeStats = computeStats,
  DC.register("updateSlotStats", invalidate),
  DC.register("updateParagon", invalidate),
  DC.register("updateSkills", invalidate),
  DC.register("importEnd", invalidate),
  DC.register("updateSlotItem", function() {
      statCache = null
  }),
  DC.Stats = Stats
}();
!function() {
  function t(t) {
      t.hover(function() {
          var s = t.attr("min")
            , e = t.attr("max");
          if (s && e && f.tooltip) {
              for (var i = parseFloat(t.attr("step") || 1) || 1, a = 0; a < 2 && Math.floor(i - 1e-6) == Math.floor(i + 1e-6); )
                  a += 1,
                  i *= 10;
              var o = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-green">' + f.formatNumber(parseFloat(s), a, 1e3) + '</span>-<span class="d3-color-green">' + f.formatNumber(parseFloat(e), a, 1e3) + "</span></p><div>";
              f.tooltip.showHtml(t[0], o)
          }
      }, function() {
          f.tooltip.hide()
      })
  }
  function s(t, s, e, i, a) {
      void 0 !== s ? (t.attr("min", s),
      "min" === a && t.val(s)) : t.removeAttr("min"),
      void 0 !== e ? (t.attr("max", e),
      a && "min" !== a && t.val(e)) : t.removeAttr("max"),
      t.prop("disabled", s === e && void 0 !== s),
      t.attr("step", i || 1)
  }
  function e(t) {
      var s = parseFloat(t.attr("min"))
        , e = parseFloat(t.attr("max"));
      return !isNaN(s) && !isNaN(e) && s === e
  }
  function i(t, s, e) {
      var i = f.extendStats([], t);
      if (0 == i.length)
          return i;
      for (var a = [], o = 0; o < i.length; ++o)
          f.stats[i[o]] && e && f.stats[i[o]].classes && !(f.stats[i[o]].classes.indexOf(e) >= 0) || s && !s[i[o]] || a.push(i[o]);
      return 0 == a.length && a.push(i[0]),
      a
  }
  function a(t, s, e) {
      if (e)
          for (var i in e) {
              var a = e[i];
              "string" == typeof a && (a = s[a]),
              $.each(f.extendStats([], i), function(s, e) {
                  t[e] = a
              })
          }
      return t
  }
  function o(t, s, e, i) {
      return i ? "only" === i ? a(t, s, e.required) : (a(t, s, e.affixes),
      a(t, s, e.required)) : a(t, s, e.affixes)
  }
  function n(t, s, e) {
      if (s)
          for (var i = 0; i < s.length; ++i) {
              for (var a = s[i]; f.statGroups[a]; )
                  a = f.statGroups[a][0];
              e[a = f.stats[a] && f.stats[a].group || a] || (t[s[i]] = !0,
              e[a] = !0)
          }
  }
  function r(t) {
      var s = t.type.val();
      return f.legendaryGems[s] ? (t.level.show(),
      t.colorSpan.hide(),
      t.level) : f.gemQualities[s] ? (t.level.hide(),
      t.colorSpan.show(),
      t.color) : (t.level.hide(),
      void t.colorSpan.hide())
  }
  function l(t, s) {
      var e = f.statLimits.legendary;
      return t && f.itemById[t] ? ("rare" === f.itemById[t].quality && (e = f.statLimits.rare),
      f.qualities[f.itemById[t].quality].ancient && s && (e = f.statLimits.ancient)) : e = f.statLimits.rare,
      e
  }
  function p(t) {
      if (!t || !f.itemById[t])
          return [];
      var s = f.itemById[t].type
        , e = {}
        , i = {};
      if (n(e, f.itemById[t].preset, i),
      f.itemTypes[s]) {
          n(e, f.itemTypes[s].preset, i);
          var a = f.itemTypes[s].slot;
          f.metaSlots[a] ? n(e, f.metaSlots[a].preset, i) : n(e, f.itemSlots[a].preset, i)
      }
      return Object.keys(e)
  }
  function h(t, s, e) {
      if (!t || !f.itemById[t])
          return {};
      var i = f.itemById[t].type
        , n = l(t, s)
        , r = {};
      if (f.itemTypes[i]) {
          var p = f.itemTypes[i].slot;
          f.metaSlots[p] ? o(r, n, f.metaSlots[p], e) : o(r, n, f.itemSlots[p], e),
          o(r, n, f.itemTypes[i], e)
      }
      if (o(r, n, f.itemById[t], e),
      "primal" === s)
          for (var h in r)
              (r[h].max && r[h].min < r[h].max || r[h].max2 && r[h].min2 < r[h].max2) && (r[h] = $.extend({}, r[h]),
              "min" === r[h].best ? (r[h].max && (r[h].max = r[h].min),
              r[h].max2 && (r[h].max2 = r[h].min2)) : (r[h].max && (r[h].min = r[h].max),
              r[h].max2 && (r[h].min2 = r[h].max2)));
      return s && "only" !== e && a(r, n, {
          caldesanns: {
              step: 5,
              min: 5,
              max: 1e3
          }
      }),
      r
  }
  function d(t, s, e) {
      var i = t.data("chosen");
      if (i) {
          var a = i.result_add_option;
          i.result_add_option = function(t) {
              var i = s.call(e || this, t.value);
              return i && ((t = $.extend({}, t)).search_text = '<div class="icon-wrap">' + i + "</div>" + t.search_text),
              a.call(this, t)
          }
      }
  }
  function c(t, s, e) {
      var i = t.data("chosen");
      if (i) {
          var a = i.search_string_match;
          i.search_string_match = function(t, o, n) {
              return s.call(e || this, n, function(t) {
                  return a.call(i, t, o)
              })
          }
      }
  }
  function m(s, e, i, a) {
      this.box = s,
      this.type = e,
      this.required = i,
      this.line = $("<li></li>"),
      this.inner = $("<div></div>"),
      this.remove = $('<span class="item-info-stat-remove" title="' + v("Remove stat") + '"></span>'),
      this.list = $('<select class="item-info-stat-list"></select>'),
      this.value = $('<input class="item-info-stat-value" type="number"></input>').hide(),
      this.value2 = $('<input class="item-info-stat-value" type="number"></input>').hide(),
      this.inner.append($('<span style="position: absolute"></span>').append(this.remove, '<span class="item-info-stat-enchanted" title="' + v("Enchanted") + '"></span>')),
      this.inner.append(this.list, this.value, this.value2),
      this.line.append(this.inner),
      s.statsDiv.append(this.line),
      s.stats.push(this);
      var o = this;
      this.remove.click(function() {
          o.onRemove()
      }),
      i && this.remove.hide(),
      t(this.value),
      t(this.value2),
      this.updateList(a),
      this.list.chosen({
          disable_search_threshold: 10,
          inherit_select_classes: !0,
          search_contains: !0,
          placeholder_text_single: v("Select a Stat"),
          populate_func: function() {
              o.generateList()
          }
      }).change(function() {
          var t = !!o.sockets;
          o.onChangeStat(),
          o.value.is(":visible") && o.value.focus().select(),
          t || o.sockets || o.box.slot && f.itemSlots[o.box.slot].flourish ? o.box.updateItem(!0) : o.box.updateStats(!0)
      }),
      f.chosenTips(this.list, function(t) {
          if (f.tooltip) {
              var s = o.conflicts && o.conflicts[t];
              if (s && s !== t && f.stats[s]) {
                  e = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + v("Conflicts with:") + "</span>";
                  e += '</br><span class="tooltip-icon-bullet"></span>' + f.stats[s].name + "</p></div>",
                  f.tooltip.showHtml(this, e)
              } else if (s === t) {
                  e = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + v("Already present on the item.") + "</span></p></div>";
                  f.tooltip.showHtml(this, e)
              } else if ("_resall" === s) {
                  var e = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + v("Conflicts with preset stat:") + '</span></br><span class="tooltip-icon-bullet"></span>' + f.stats.resall.name + "</p></div>";
                  f.tooltip.showHtml(this, e)
              }
          }
      }),
      this.value.blur(f.validateNumber),
      this.value2.blur(f.validateNumber),
      this.value.on("input", function() {
          var t = !!o.sockets;
          o.onChangeValue(),
          t || o.sockets ? o.box.updateItem(!0) : o.box.updateStats(!0)
      }),
      this.value2.on("input", function() {
          o.box.updateStats(!0)
      }),
      this.onChangeStat()
  }
  function u(t, s) {
      var e = t.list.val()
        , i = s.list.val()
        , a = f.stats[e] ? "sockets" === e ? 4 : f.stats[e].secondary ? 2 : 0 : "secondary" === t.type ? 3 : "socket" === t.type ? 5 : 1
        , o = f.stats[i] ? "sockets" === i ? 4 : f.stats[i].secondary ? 2 : 0 : "secondary" === s.type ? 3 : "socket" === s.type ? 5 : 1;
      return a != o ? a - o : f.stats[e] && f.stats[i] ? f.stats[e].prio - f.stats[i].prio : 0
  }
  var v = DiabloCalc.locale("ui-equipment.js")
    , f = DiabloCalc;
  f.getStatCount = function(t) {
      var s = f.itemById[t]
        , e = 4
        , i = 2;
      return void 0 !== s.primary ? e = s.primary : ["quiver", "source", "mojo", "phylactery"].indexOf(s.type) >= 0 ? e = 5 : f.itemTypes[s.type] || (e = 0),
      void 0 !== s.secondary ? i = s.secondary : f.itemTypes[s.type] || (i = 0),
      [e, i]
  }
  ,
  f.smartListStats = i,
  f.getItemPreset = p,
  f.getItemAffixesById = function(t, s, e) {
      function i(s, e) {
          return f.stats[t] && f.stats[t].dr ? 100 - (100 - s) * (100 - e) / 100 : s + e
      }
      if (!e || "only" === e)
          return h(t, s, e);
      var a = h(t, s, !1)
        , o = h(t, s, "only")
        , n = {};
      for (var t in o)
          t in a && o[t].noblock ? (n[t] = $.extend({}, o[t]),
          a[t].max && (n[t].max = i(n[t].max, a[t].max)),
          a[t].max2 && (n[t].max2 = i(n[t].max2, a[t].max2))) : n[t] = o[t];
      for (var t in a)
          t in o || (n[t] = a[t]);
      return n
  }
  ,
  f.makeItem = function(t, s, e) {
      function a(t, s) {
          if (!s[t])
              return [0];
          var e = [];
          return s[t].max && e.push(s[t].max),
          s[t].max2 && e.push(s[t].max2),
          s[t].args < 0 && e.push("powerhungry"),
          e
      }
      var o = {
          id: t,
          stats: {},
          ancient: e || !1
      }
        , n = p(t)
        , r = f.getItemAffixesById(t, o.ancient, !1)
        , l = f.getItemAffixesById(t, o.ancient, "only");
      for (var h in l)
          o.stats[h] = "custom" === h && s || a(h, l);
      for (var d = 0; d < n.length; ++d) {
          var c = i(n[d], r, f.charClass);
          c.length && !o.stats[c[0]] && (o.stats[c[0]] = a(c[0], r))
      }
      return o.stats.sockets && (o.gems = []),
      o
  }
  ,
  f.getOffhandTypes = function(t) {
      var s = !f.classes[f.charClass].dualwield
        , e = !1;
      if ("crusader" !== f.charClass && (t || f.itemSlots.mainhand.item && f.itemById[f.itemSlots.mainhand.item.id])) {
          var i = t || f.itemById[f.itemSlots.mainhand.item.id].type;
          f.itemTypes[i] && "twohand" == f.itemTypes[i].slot && (e = !0)
      }
      var a = f.itemSlots.offhand.types
        , o = {}
        , n = !1;
      for (var r in a) {
          var l = a[r];
          e && "quiver" !== r || (s && "onehand" === l.slot && "handcrossbow" !== r || (o[r] = l,
          l.classes && l.classes.indexOf(f.charClass) < 0 || "customwpn" !== r && l.weapon && (n = !0)))
      }
      return n || delete o.customwpn,
      o
  }
  ,
  f.isItemAllowed = function(t, s, e) {
      if (!s || !f.itemById[s] || f.itemSlots[t].drop.inactive)
          return !1;
      var i = f.itemById[s]
        , a = i.type;
      f.itemTypes[a].slot;
      if (i.classes && i.classes.indexOf(f.charClass) < 0)
          return !1;
      var o = f.itemSlots[t].types;
      return "offhand" === t && (o = f.getOffhandTypes(e)),
      !(!o[a] || o[a].classes && o[a].classes.indexOf(f.charClass) < 0)
  }
  ,
  f.trimStats = function(t) {
      var s = f.getItemAffixesById(t.id, t.ancient, !0);
      for (var e in t.stats)
          if (s[e]) {
              var i = t.stats[e];
              i.length >= 1 && (s[e].min && (i[0] = Math.max(i[0], s[e].min)),
              s[e].max && (i[0] = Math.min(i[0], s[e].max))),
              i.length >= 2 && (s[e].min2 && (i[1] = Math.max(i[1], s[e].min2)),
              s[e].max2 && (i[1] = Math.min(i[1], s[e].max2))),
              t.stats[e] = i
          } else
              delete t.stats[e]
  }
  ,
  f.trimItem = function(t, s, e) {
      if (s && f.itemById[s.id] && !f.itemSlots[t].drop.inactive) {
          var i = f.itemById[s.id].type
            , a = f.itemTypes[i].generic;
          if (f.isItemAllowed(t, a, e)) {
              var o = {
                  id: a,
                  stats: $.extend(!0, {}, s.stats)
              };
              if (f.trimStats(o),
              s.gems && o.stats.sockets) {
                  o.gems = [];
                  for (var n = 0; n < s.gems.length && n < o.stats.sockets[0]; ++n)
                      o.gems.push(s.gems[n])
              }
              return o
          }
      }
  }
  ,
  DiabloCalc.chosen_addIcons = d,
  DiabloCalc.chosen_fixSearch = c,
  m.prototype.enable = function(t) {
      this.list.prop("disabled", !t || !!this.required),
      this.list.trigger("chosen:updated"),
      this.value.prop("disabled", !!e(this.value) || !t),
      this.value2.prop("disabled", !!e(this.value2) || !t)
  }
  ,
  m.prototype.updateList = function(t) {
      if (this.required) {
          this.list.prop("disabled", !0),
          this.list.empty();
          var s = '<option value="' + this.required + '">';
          if ("custom" == this.required) {
              var e = this.box.getItemAffixes(!0);
              e.custom && (s += e.custom.name)
          } else
              s += f.stats[this.required].name;
          this.list.append(s + "</option>")
      } else {
          this.list.prop("disabled", !1);
          var i = t || this.list.val();
          f.noChosen ? this.fillList(t) : (this.list.empty(),
          this.list.append("<option></option>"),
          f.stats[i] && this.list.append('<option value="' + i + '" selected="selected">' + f.stats[i].name + "</option>"))
      }
  }
  ,
  m.prototype.fillList = function(t) {
      var s = this.box.getItemAffixes()
        , e = t || this.list.val()
        , i = f.options.limitStats ? this.box.charClass : null;
      if (!i) {
          (l = this.box.getId()) && !(i = f.itemTypes[f.itemById[l].type].class) && f.itemById[l].set && (i = f.itemSets[f.itemById[l].set].class)
      }
      if (this.list.empty(),
      this.list.append('<option value="">' + (f.noChosen ? v("Select a Stat") : "") + "</option>"),
      "socket" !== this.type)
          if ("caldesanns" !== this.type) {
              for (var a in f.statList)
                  if (!("primary" === this.type && "primary" !== a || "secondary" === this.type && "secondary" !== a))
                      for (var o in f.statList[a]) {
                          var n = o;
                          "secondary" === a && "secondary" !== this.type && (n += v(" (Secondary)"));
                          f.statList[a][o];
                          var r = "";
                          $.each(f.extendStats([], f.statList[a][o]), function(a, o) {
                              i && f.stats[o].classes && f.stats[o].classes.indexOf(i) < 0 && o !== t || s.hasOwnProperty(o) && (r += '<option value="' + o + (o == e ? '" selected="selected' : "") + '">' + f.stats[o].name + "</option>")
                          }),
                          r && this.list.append('<optgroup label="' + n + '">' + r + "</optgroup>")
                      }
          } else
              for (var l in f.stats)
                  f.stats[l].caldesanns && s.hasOwnProperty(l) && this.list.append('<option value="' + l + '"' + (e === l ? ' selected="selected"' : "") + ">" + f.stats[l].name + "</option>");
      else
          s.sockets && this.list.append('<option value="sockets"' + ("sockets" === e ? ' selected="selected"' : "") + ">" + f.stats.sockets.name + "</option>")
  }
  ,
  m.prototype.generateList = function() {
      var t = this.box.getId();
      if (t && !this.required) {
          for (var s = this.box.getItemAffixes(!0), e = {}, i = 0; i < this.box.stats.length; ++i) {
              o = this.box.stats[i].list.val();
              f.stats[o] && (s[o] && s[o].noblock || (e[f.stats[o].group || o] = o))
          }
          if (p(t).indexOf("resall") >= 0)
              for (var a = f.extendStats([], "resist"), i = 0; i < a.length; ++i)
                  e[a[i]] || (e[a[i]] = "_resall");
          var o = this.list.val();
          this.fillList(o),
          f.stats[o] && (o = f.stats[o].group || o),
          this.conflicts = {};
          var n = this;
          this.list.find("option").each(function() {
              var t = $(this).val();
              if (f.stats[t]) {
                  var s = t;
                  t = f.stats[t].group || t,
                  "_resall" === e[s] ? ($(this).prop("disabled", !0),
                  n.conflicts[s] = "_resall") : t == o || !e[t] && !e[s] ? $(this).removeAttr("disabled") : ($(this).prop("disabled", !0),
                  n.conflicts[s] = e[t] || e[s])
              }
          })
      }
  }
  ,
  m.prototype.onRemove = function() {
      if (!this.required) {
          var t = this.line.index();
          this.box.removeStat(t, this.merged)
      }
  }
  ,
  m.prototype.generatePassives = function(t, s) {
      var e;
      t && (e = this.passiveBox.val()),
      this.passiveBox.empty();
      var i = f.options.limitStats ? this.box.charClass : null;
      if (i) {
          r = f.passives[i];
          for (var a in r)
              this.passiveBox.append('<option value="' + a + (a === e ? '" selected="selected' : "") + '">' + r[a].name + "</option>"),
              a === e && (e = void 0)
      } else
          for (var o in f.classes)
              if (f.passives[o]) {
                  var n = '<optgroup label="' + f.classes[o].name + '">'
                    , r = f.passives[o];
                  for (var a in r)
                      n += '<option value="' + a + (a === e ? '" selected="selected' : "") + '">' + r[a].name + "</option>",
                      a === e && (e = void 0);
                  this.passiveBox.append(n + "</optgroup>")
              }
      s && e && f.allPassives[e] && this.passiveBox.append('<option value="' + e + '" selected="selected">' + f.allPassives[e].name + "</option>")
  }
  ,
  m.prototype.onChangeValue = function() {
      if ("sockets" == this.list.val()) {
          this.socketList || (this.socketList = $('<ul class="item-info-gemlist"></ul>'),
          this.sockets = [],
          this.line.append(this.socketList));
          var t = parseInt(this.value.val());
          for (t = Math.max(t, 1),
          t = Math.min(t, 3); this.sockets.length > t; )
              this.sockets.pop().line.remove();
          for (; this.sockets.length < t; )
              !function(t, s) {
                  var e = {
                      line: $("<li></li>"),
                      type: $('<select class="item-info-gem-type"></select>'),
                      colorSpan: $("<span></span>"),
                      color: $('<select class="item-info-gem-color"></select>'),
                      level: $('<input class="item-info-gem-level" type="number" min="0" max="200"></input>')
                  };
                  e.type.append('<option value="">' + (f.noChosen ? v("Empty Socket") : "") + "</option>");
                  var i = s.box.type.val();
                  i = f.itemTypes[i] ? f.itemTypes[i].slot : null;
                  var a = 0;
                  for (var o in f.legendaryGems)
                      f.legendaryGems[o].types && f.legendaryGems[o].types.indexOf(i) >= 0 && ++a;
                  if (a) {
                      var n = '<optgroup label="' + v("Legendary Gems") + '">';
                      for (var o in f.legendaryGems)
                          f.legendaryGems[o].types && f.legendaryGems[o].types.indexOf(i) >= 0 && (n += '<option class="quality-legendary" value="' + o + '">' + f.legendaryGems[o].name + "</option>");
                      n += '</optgroup><optgroup label="' + v("Normal Gems") + '">';
                      for (l = f.gemQualities.length - 1; l >= 0; --l)
                          n += '<option value="' + l + '">' + f.gemQualities[l] + "</option>";
                      e.type.append(n + "</optgroup>")
                  } else
                      for (var l = f.gemQualities.length - 1; l >= 0; --l)
                          e.type.append('<option value="' + l + '">' + f.gemQualities[l] + "</option>");
                  for (var o in f.gemColors)
                      e.color.append('<option value="' + o + '">' + f.gemColors[o].name + "</option>");
                  e.line.append(e.type).append(e.colorSpan.append(e.color)).append(e.level),
                  s.socketList.append(e.line),
                  e.type.chosen({
                      disable_search_threshold: 10,
                      inherit_select_classes: !0,
                      search_contains: !0,
                      allow_single_deselect: !0,
                      placeholder_text_single: v("Empty Socket")
                  }).change(function() {
                      var t = r(e);
                      t === e.level ? t.focus().select() : t == e.color && setTimeout(function() {
                          t.trigger("chosen:open")
                      }, 0)
                  }).change(function() {
                      s.box.updateItem(!0)
                  }),
                  f.chosenTips(e.type, function(t) {
                      f.tooltip && f.legendaryGems[t] && f.tooltip.showGem(this, t)
                  }),
                  d(e.type, function(t) {
                      if (isNaN(t)) {
                          var s = f.legendaryGems[t];
                          if (s && s.id in f.itemIcons)
                              return '<span style="background: url(css/items/gemleg.png) 0 -' + 24 * f.itemIcons[s.id][0] + 'px no-repeat"></span>'
                      } else if ((t = parseInt(t)) >= 0 && t < f.gemQualities.length)
                          return '<span style="background: url(css/items/gems.png) -' + 24 * t + 'px -120px no-repeat"></span>'
                  }),
                  e.color.chosen({
                      disable_search: !0,
                      inherit_select_classes: !0
                  }).change(function() {
                      if (0 === t) {
                          for (var e = !0, i = 1; i < s.sockets.length; ++i)
                              s.sockets[i].type.val() && (e = !1);
                          if (e)
                              for (var a = s.sockets[0].type.val(), o = $(this).val(), i = 1; i < s.sockets.length; ++i)
                                  s.sockets[i].type.val(a),
                                  s.sockets[i].type.trigger("chosen:updated"),
                                  r(s.sockets[i]),
                                  s.sockets[i].color.val(o),
                                  s.sockets[i].color.trigger("chosen:updated")
                      }
                      s.box.updateItem(!0)
                  }),
                  f.chosenTips(e.color, function(t) {
                      if (f.tooltip && f.gemColors[t]) {
                          var s = i && (f.itemSlots[i] || f.metaSlots[i]) || {};
                          f.tooltip.showGem(this, [parseInt(e.type.val()), t], void 0, s.socketType || "other")
                      }
                  }),
                  d(e.color, function(t) {
                      var s = f.gemColors[t];
                      if (s && s.id in f.itemIcons) {
                          return '<span style="background: url(css/items/gems.png) -' + 24 * parseInt(e.type.val()) + "px -" + 24 * f.itemIcons[s.id][0] + 'px no-repeat"></span>'
                      }
                  }),
                  r(e),
                  e.level.blur(f.validateNumber).blur().on("input", function() {
                      s.box.updateStats(!0)
                  }),
                  s.sockets.push(e)
              }(this.sockets.length, this)
      } else
          this.socketList && (this.socketList.remove(),
          delete this.socketList,
          delete this.sockets);
      this.box.updateEnchant()
  }
  ,
  m.prototype.updateLimits = function(t) {
      var e = this.list.val()
        , i = this
        , a = this.box.getItemAffixes(!!this.required)
        , o = a[e];
      if ("string" == typeof o) {
          o = (r = this.box.getLimits())[o]
      }
      if (this.merged) {
          var n = this.box.getItemAffixes("only")[e];
          if ("string" == typeof n) {
              var r = this.box.getLimits();
              n = r[n]
          }
          o = $.extend({}, o),
          f.stats[e] && f.stats[e].dr ? (o.min = 100 - .01 * (100 - (o.min || 0)) * (100 - (n.min || 0)),
          o.max = 100 - .01 * (100 - (o.max || 0)) * (100 - (n.max || 0)),
          o.step = "any") : (o.min = (o.min || 0) + (n.min || 0),
          o.max = (o.max || 0) + (n.max || 0))
      }
      var l = 0;
      "custom" === this.required ? l = void 0 === a.custom.args ? 1 : a.custom.args : f.stats[e] && (l = f.stats[e].args);
      var p = !this.prevStat || !o;
      this.prevStat && o && (this.prevStat.min !== o.min && (p = !0),
      this.prevStat.max !== o.max && (p = !0),
      this.prevStat.step !== o.step && (p = !0)),
      l >= 1 ? (this.value.show(),
      s(this.value, o ? o.min : void 0, o ? o.max : void 0, o ? o.step : 1, p && !t && (o && o.best || "max")),
      this.value.blur()) : this.value.hide(),
      l >= 2 ? (this.value2.show(),
      s(this.value2, o ? o.min2 : void 0, o ? o.max2 : void 0, o ? o.step2 : 1, p && !t && (o && o.best || "max")),
      this.value2.blur()) : this.value2.hide(),
      l < 0 ? (this.passive || (this.passiveBox = $('<select class="item-info-stat-passive"><option value=""></option></select>'),
      f.noChosen && this.passiveBox.find("option").text(v("Select a Passive Skill")),
      this.passive = $("<span></span>"),
      this.passive.append(this.passiveBox),
      this.inner.append(this.passive),
      this.passiveBox.chosen({
          inherit_select_classes: !0,
          search_contains: !0,
          placeholder_text_single: v("Select a Passive Skill"),
          populate_func: function() {
              i.generatePassives(!0)
          }
      }).change(function() {
          i.box.updateStats(!0)
      }),
      f.chosenTips(this.passiveBox, function(t) {
          f.tooltip && f.passives[f.charClass][t] && f.tooltip.showSkill(this, f.charClass, t)
      }),
      d(this.passiveBox, function(t) {
          var s = f.passives[f.charClass][t];
          if (s)
              return '<span style="background: url(css/images/class-' + f.charClass + "-passive.png) " + -20 * s.index + 'px 0 / auto 40px no-repeat"></div>'
      })),
      this.generatePassives(this.prevStat === o, !0),
      this.passiveBox.trigger("chosen:updated"),
      this.passive.show()) : this.passive && this.passive.hide(),
      this.prevStat = o,
      this.onChangeValue()
  }
  ,
  m.prototype.onChangeStat = function(t) {
      this.box.getId();
      var s = this.list.val()
        , e = "";
      f.stats[s] ? "sockets" === s ? (e = "stat-socket",
      this.type || (this.type = "primary")) : f.stats[s].secondary ? (e = "stat-secondary",
      this.type || (this.type = "secondary")) : (e = "stat-primary",
      this.type || (this.type = "primary")) : ("primary" === this.type && (e = "stat-primary"),
      "secondary" === this.type && (e = "stat-secondary"),
      "socket" === this.type && (e = "stat-socket")),
      this.line.attr("class", e);
      var i = this.box.getItemAffixes("only");
      if (!this.required && i[s]) {
          this.merged = s;
          for (var a = 0; a < this.box.stats.length; ++a)
              this.box.stats[a].required === s && (this.box.stats[a].line.remove(),
              this.box.stats.splice(a--, 1))
      } else if (this.merged) {
          if (i[this.merged]) {
              this.box.onAddStat(this.merged, this.merged).list.val(this.merged)
          }
          delete this.merged
      }
      this.box.reorderStats(this.box.stats.indexOf(this)),
      this.box.updateStatCounts(),
      this.updateLimits()
  }
  ,
  f.ItemBox = function(t, s) {
      var e = this;
      this.doUpdate = function() {
          delete e.upd_timeout,
          e.onUpdate(e.upd_itemChanged, e.upd_reason),
          delete e.upd_itemChanged,
          delete e.upd_reason
      }
      ,
      $.extend(this, s),
      this.type = $('<select class="item-info-type"></select>'),
      this.item = $('<select class="item-info-item"></select>'),
      this.equipSet = $('<span class="item-info-equipset">' + v("Equip full set") + "</span>").hide(),
      this.ancientSel = $('<select class="item-info-ancient"><option value="false">' + v("Normal") + '</option><option value="true">' + v("Ancient") + '</option><option value="primal">' + v("Primal Ancient") + "</option></select>"),
      Object.defineProperty(this, "ancient", {
          get: function() {
              var t = this.ancientSel.val();
              return "primal" === t ? t : "true" === t
          },
          set: function(t) {
              t = "primal" === t ? "primal" : t ? "true" : "false",
              this.ancientSel.val(t)
          }
      }),
      this.statsDiv = $('<ul class="item-info-statlist chosen-noframe"></ul>'),
      this.typeSpan = $('<span style="display: inline-block; vertical-align: top"></span>'),
      this.itemSpan = $('<span style="display: inline-block; vertical-align: top"></span>'),
      this.importDiv = $('<div class="item-info-imported">' + v("Imported item ({0}, {1})").format('<span class="link-like item-imported-reset">' + v("reset") + "</span>", '<span class="link-like item-imported-unlock">' + v("unlock") + "</span>") + "</div>"),
      this.unimportDiv = $('<div class="item-info-unimport"><span class="link-like item-imported-lock">' + v("Lock item") + "</span></div>"),
      this.stats = [],
      this.importReset = this.importDiv.find(".item-imported-reset"),
      this.importUnlock = this.importDiv.find(".item-imported-unlock"),
      this.importLock = this.unimportDiv.find(".item-imported-lock"),
      this.importReset.click(function() {
          var t = e.getData();
          t.imported && (t.enchant = t.imported.enchant,
          t.stats = $.extend(!0, {}, t.imported.stats)),
          e.setItem(t)
      }),
      this.importReset.hover(function() {
          var t = e.getData();
          t.imported && (t.enchant = t.imported.enchant,
          t.stats = t.imported.stats),
          f.tooltip.showItem(this, t)
      }, function() {
          f.tooltip.hide()
      }),
      this.importUnlock.click(function() {
          var t = e.getData();
          delete t.imported,
          delete t.enchant,
          e.setItem(t)
      }),
      this.importLock.click(function() {
          e.lockItem()
      }),
      this.div = $('<div class="item-info"></div>'),
      this.slot && this.div.append("<h3>" + f.itemSlots[this.slot].name + "</h3>"),
      this.div.append($("<div></div>").append(this.typeSpan.append(this.type)).append(this.itemSpan.append(this.item))),
      this.typeSpan.append(this.equipSet),
      this.itemSpan.append(this.ancientSel),
      this.div.append(this.importDiv, this.statsDiv),
      this.equipSet.click(function() {
          e.onEquipSet()
      }),
      f.register("updateSlotItem", function() {
          e.updateEquipSet()
      }),
      f.register("importEnd", function() {
          e.updateEquipSet()
      }),
      t.append(this.div),
      this.add = $('<div class="item-info-add-stat">' + v("Add stat") + "</div>").click(function() {
          var t = e.onAddStat();
          e.updateStats(),
          setTimeout(function() {
              t.list.trigger("chosen:open")
          }, 0)
      }),
      this.div.append(this.add),
      this.badstats = $('<span class="item-info-badstats"></span>').hide(),
      this.div.append(this.badstats),
      this.div.append(this.unimportDiv),
      this.ancientSel.change(function() {
          e.updateItem(),
          e.updateLimits()
      }),
      this.type.append('<option value="">' + (f.noChosen ? v("Empty Slot") : "") + "</option>"),
      this.type.change(function() {
          e.type.val() ? (e.onChangeType(),
          setTimeout(function() {
              e.item.trigger("chosen:open")
          }, 0)) : (e.item.val(""),
          e.onChangeType())
      }),
      this.type.chosen({
          disable_search_threshold: 10,
          inherit_select_classes: !0,
          allow_single_deselect: !0,
          placeholder_text_single: v("Empty Slot")
      }),
      this.item.append('<option value="">' + (f.noChosen ? v("Empty Slot") : "") + "</option>"),
      this.item.change(function() {
          e.onChangeItem()
      }),
      this.item.chosen({
          disable_search_threshold: 10,
          inherit_select_classes: !0,
          allow_single_deselect: !0,
          search_contains: !0,
          placeholder_text_single: v("Empty Slot"),
          populate_func: function() {
              e.populateItems()
          }
      }),
      d(this.item, function(t) {
          var s = this.type.val() || f.itemById[t] && f.itemById[t].type
            , e = f.itemIcons[t];
          if (("custom" === s || "customwpn" == s) && this.slot) {
              var i = f.getOffhandTypes && "offhand" === this.slot ? f.getOffhandTypes() : f.itemSlots[this.slot].types;
              for (var a in i)
                  if (!(i[a].classes && i[a].classes.indexOf(f.charClass) < 0)) {
                      s = a,
                      e = f.itemIcons[f.itemTypes[s].generic];
                      break
                  }
          }
          if (void 0 !== e)
              return '<span style="background: url(css/items/' + s + ".png) 0 -" + 24 * e[0] + 'px no-repeat"></span>'
      }, this),
      c(this.item, function(t, s) {
          var e = f.itemById[t];
          if (e)
              return !!s(e.name) || (!!(e.required && e.required.custom && s(e.required.custom.format)) || void 0)
      }, this),
      f.chosenTips(this.item, function(t) {
          f.tooltip && f.itemById[t] && f.tooltip.showItem(this, t, e.slot)
      })
  }
  ,
  f.ItemBox.prototype.removeStat = function(t, s) {
      var e = this.stats[t].list.val();
      if (this.stats[t].line.remove(),
      this.stats.splice(t, 1),
      s) {
          this.onAddStat(s, s).list.val(s)
      }
      f.stats[e] ? this.updateStatCounts() : this.updateWarning(),
      this.updateItem(!0)
  }
  ,
  f.ItemBox.prototype.updateItem = function(t) {
      this.suppress || (f.importActive ? this.onUpdate(!0, t) : (this.upd_itemChanged = this.upd_itemChanged || !0,
      this.upd_reason = t,
      this.upd_timeout || (this.upd_timeout = setTimeout(this.doUpdate, 0))))
  }
  ,
  f.ItemBox.prototype.updateStats = function(t) {
      this.suppress || (f.importActive ? this.onUpdate(!1, t) : (this.upd_itemChanged = this.upd_itemChanged || !1,
      this.upd_reason = t,
      this.upd_timeout || (this.upd_timeout = setTimeout(this.doUpdate, 0))))
  }
  ,
  f.ItemBox.prototype.onUpdate = function(t, s) {
      this.slot && f.trigger(t ? "updateSlotItem" : "updateSlotStats", this.slot, s)
  }
  ,
  f.ItemBox.prototype.getLimits = function() {
      return l(this.item.val(), this.ancient)
  }
  ,
  f.ItemBox.prototype.getItemAffixes = function(t) {
      return f.getItemAffixesById(this.item.val(), this.ancient, t)
  }
  ,
  f.ItemBox.prototype.updateStatCounts = function() {
      if (!this.nonRecursive) {
          this.nonRecursive = !0;
          var t = this.item.val();
          if (t && f.itemById[t]) {
              var s = f.getStatCount(t);
              if ("Unique_Ring_021_x1" === t)
                  for (p = 0; p < this.stats.length; ++p) {
                      "spiritregen" !== (h = this.stats[p].list.val()) && "wrathregen" !== h || (++s[0],
                      --s[1])
                  }
              for (var e = 0, i = 0, a = 0, o = [], n = [], r = [], l = !1, p = 0; p < this.stats.length; ++p) {
                  var h = this.stats[p].list.val();
                  if (!f.stats[h] || !f.stats[h].base) {
                      var d = 1;
                      this.stats[p].merged && ++d,
                      f.stats[h] && f.stats[h].caldesanns && (d = 0,
                      l = !0),
                      (f.stats[h] ? f.stats[h].secondary : "secondary" === this.stats[p].type) ? i += d : (f.stats[h] || "socket" !== this.stats[p].type) && (e += d),
                      f.stats[h] || ("secondary" === this.stats[p].type ? n.push(this.stats[p]) : "socket" === this.stats[p].type ? r.push(this.stats[p]) : "primary" === this.stats[p].type && o.push(this.stats[p])),
                      "sockets" === h && ++a
                  }
              }
              var c = this.type.val();
              if ("onehand" === (c = f.itemTypes[c] ? f.itemTypes[c].slot : null) || "twohand" === c)
                  a || 0 !== r.length ? e -= a : this.onAddStat("socket");
              else if (r.length) {
                  (m = this.stats.indexOf(r[0])) >= 0 && (this.stats[m].line.remove(),
                  this.stats.splice(m, 1))
              }
              for (this.imported && this.ancient && !l && this.onAddStat("caldesanns"); e < s[0]; )
                  this.onAddStat("primary"),
                  ++e;
              for (; e > s[0] && o.length; ) {
                  (m = this.stats.indexOf(o.pop())) >= 0 && (this.stats[m].line.remove(),
                  this.stats.splice(m, 1)),
                  --e
              }
              for (; i < s[1]; )
                  this.onAddStat("secondary"),
                  ++i;
              for (; i > s[0] && n.length; ) {
                  var m = this.stats.indexOf(n.pop());
                  m >= 0 && (this.stats[m].line.remove(),
                  this.stats.splice(m, 1)),
                  --i
              }
              this.updateWarning(),
              this.updateEnchant(),
              delete this.nonRecursive
          }
      }
  }
  ,
  f.ItemBox.prototype.updateEnchant = function() {
      if (delete this.enchant,
      this.imported) {
          for (s = 0; s < this.stats.length; ++s) {
              e = this.stats[s].list.val();
              if (!this.stats[s].required && (!f.stats[e] || !f.stats[e].caldesanns)) {
                  if (!(e in this.imported.stats)) {
                      this.enchant = e;
                      break
                  }
                  if (this.imported.stats[e].length >= 1 && parseFloat(this.stats[s].value.val()) !== this.imported.stats[e][0]) {
                      this.enchant = e;
                      break
                  }
                  if (this.imported.stats[e].length >= 2 && parseFloat(this.stats[s].value2.val()) !== this.imported.stats[e][1]) {
                      this.enchant = e;
                      break
                  }
              }
          }
          this.enchant || (this.enchant = this.imported.enchant)
      }
      var t = !1;
      "source" !== this.type.val() && "mojo" !== this.type.val() || !this.ancient || (t = "wpnphy");
      for (var s = 0; s < this.stats.length; ++s) {
          var e = this.stats[s].list.val();
          this.stats[s].line.toggleClass("stat-enchanted", e === this.enchant),
          this.stats[s].line.toggleClass("stat-caldesanns", "caldesanns" === this.stats[s].type),
          this.stats[s].enable(!this.stats[s].required && e === this.enchant || !this.enchant || this.stats[s].required === t || "caldesanns" === this.stats[s].type)
      }
  }
  ,
  f.ItemBox.prototype.updateWarning = function() {
      var t = this.item.val();
      if (t && f.itemById[t]) {
          for (var s = this.getItemAffixes(!0), e = p(t), a = f.getStatCount(t), o = {}, n = 0, r = 0, l = 0, h = 0, d = 0; d < this.stats.length; ++d) {
              var c = this.stats[d].list.val();
              if (c ? o[c] = !0 : h += 1,
              f.stats[c] && !f.stats[c].base) {
                  var m = 1;
                  this.stats[d].merged && ++m,
                  f.stats[c].caldesanns && (m = 0),
                  f.stats[c].secondary ? r += m : n += m,
                  "sockets" == c && (l = 1)
              }
          }
          var u = this.type.val();
          "onehand" != (u = f.itemTypes[u] ? f.itemTypes[u].slot : null) && "twohand" != u && (l = 0),
          f.options.moreWarnings && (h = 0);
          var y = "";
          n + h < a[0] ? y += '</br><span class="tooltip-icon-bullet"></span>' + v("Add more primary stats") : n - l > a[0] && (y += '</br><span class="tooltip-icon-bullet"></span>' + v("Too many primary stats")),
          r > a[1] ? y += '</br><span class="tooltip-icon-bullet"></span>' + v("Too many secondary stats") : f.options.moreWarnings && r < a[1] && (y += '</br><span class="tooltip-icon-bullet"></span>' + v("Add more secondary stats"));
          for (var g = [], d = 0; d < e.length; ++d) {
              var x = i(e[d], s);
              if (x.length) {
                  for (var b = !1, S = 0; S < x.length; ++S)
                      if (o[x[S]]) {
                          b = !0;
                          break
                      }
                  b || g.push(e[d])
              }
          }
          if (g.length > 1) {
              y += '<br/><span class="tooltip-icon-bullet"></span>' + v("More than one preset stat is missing");
              for (d = 0; d < e.length; ++d) {
                  var I = e[d];
                  f.stats[e[d]] ? I = f.stats[e[d]].name : f.statGroupNames[e[d]] ? I = f.statGroupNames[e[d]] : 0 == e[d].indexOf("skill_") && (I = v("Skill Damage")),
                  y += '<br/><span class="tooltip-icon-nobullet"></span><span class="d3-color-white">',
                  g.indexOf(e[d]) >= 0 ? y += "<s>" + I + "</s>" : y += I,
                  y += "</span>"
              }
          }
          y ? (y = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + v("Impossible stat combination") + "</span>" + y + "</p></div>",
          this.badstats.hover(function() {
              f.tooltip.showHtml(this, y)
          }, function() {
              f.tooltip.hide()
          }),
          this.badstats.show()) : this.badstats.hide()
      } else
          this.badstats.hide()
  }
  ,
  f.ItemBox.prototype.reorderStats = function(t) {
      for (var s = t, e = this.stats[t]; s < this.stats.length && u(e, this.stats[s]) >= 0; )
          s++;
      for (; s > 0 && u(e, this.stats[s - 1]) <= 0; )
          s--;
      t != s && t + 1 != s && (s == this.stats.length ? this.statsDiv.append(e.line) : this.stats[s].line.before(e.line),
      this.stats.splice(t, 1),
      s > t && (s -= 1),
      this.stats.splice(s, 0, e))
  }
  ,
  f.ItemBox.prototype.updateLimits = function() {
      for (var t = this.ancient, s = 0; s < this.stats.length; ++s) {
          var e = this.stats[s].list.val();
          !t && f.stats[e] && f.stats[e].caldesanns ? this.removeStat(s--) : this.stats[s].updateLimits()
      }
      this.updateStatCounts()
  }
  ,
  f.ItemBox.prototype.onAddStat = function(t, s, e) {
      if ("primary" !== t && "secondary" !== t && "socket" !== t && "caldesanns" !== t && (s || e)) {
          e = s,
          s = t,
          t = void 0;
          var i = s || e;
          if (f.stats[i]) {
              var a = this.type.val();
              t = "onehand" !== (a = f.itemTypes[a] ? f.itemTypes[a].slot : null) && "twohand" !== a || "sockets" !== i ? f.stats[i].secondary ? "secondary" : this.imported && f.stats[i].caldesanns ? "caldesanns" : "primary" : "socket"
          }
      }
      return new m(this,t,s,e)
  }
  ,
  f.ItemBox.prototype.onEquipSet = function(t) {
      l = this.item.val();
      if (!l || !f.itemById[l] || !f.itemById[l].set)
          return !1;
      var s, e = f.itemById[l], i = f.itemSets[e.set], a = {}, o = {};
      if (f.itemSlots.mainhand && f.itemSlots.mainhand.item) {
          var n = f.itemSlots.mainhand.item.id;
          n && f.itemById[n] && (s = f.itemById[n].type)
      }
      for (var r in f.itemSlots) {
          var l;
          (l = f.getSlotId(r)) && (o[l] = r)
      }
      for (var p = 0; p < i.items.length; ++p) {
          var h = i.items[p];
          if (!o[h.id]) {
              var d = h.type
                , c = [r = f.itemTypes[d].slot];
              f.metaSlots[r] && (c = f.metaSlots[r].slots);
              for (var m = 0; m < c.length; ++m)
                  if (!a[c[m]] && !f.getSlotId(c[m]) && f.isItemAllowed(c[m], h.id, s)) {
                      a[c[m]] = h.id;
                      break
                  }
          }
      }
      if ($.isEmptyObject(a))
          return !1;
      if (t)
          return !0;
      var u = this.ancient;
      for (var r in a)
          f.setSlot(r, f.makeItem(a[r], void 0, u));
      return !0
  }
  ,
  f.ItemBox.prototype.updateEquipSet = function() {
      this.equipSet.toggle(this.onEquipSet(!0))
  }
  ,
  f.ItemBox.prototype.onChangeItem = function() {
      delete this.enchant,
      delete this.imported,
      this.div.removeClass("item-imported");
      var t = this.item.val()
        , s = f.itemById[t];
      if (s && s.type !== this.type.val())
          return this.type.val(s.type),
          this.type.trigger("chosen:updated"),
          void this.onChangeType();
      t ? (this.itemSpan.show(),
      this.statsDiv.show(),
      this.add.show(),
      this.unimportDiv.show()) : (this.itemSpan.show(),
      this.statsDiv.hide(),
      this.add.hide(),
      this.unimportDiv.hide());
      var e = this;
      if ("mainhand" === this.slot && f.itemSlots.offhand.item && f.itemById[f.itemSlots.offhand.item.id]) {
          var a = this.type.val()
            , o = f.itemById[f.itemSlots.offhand.item.id].type;
          f.itemTypes[a] && "twohand" == f.itemTypes[a].slot && "crusader" != f.charClass && o && "quiver" != o && f.trigger("updateSlotItem", "offhand", "twohand")
      }
      if (this.updateItem(),
      this.updateEquipSet(),
      !t)
          return this.statsDiv.empty(),
          this.stats = [],
          this.badstats.hide(),
          void this.ancientSel.hide();
      this.nonRecursive = !0;
      this.getItemAffixes(!1);
      var n = this.getItemAffixes("only")
        , r = this.getItemAffixes(!0)
        , l = [];
      $.each(p(t), function(t, s) {
          l.push({
              list: i(s, r, e.charClass)
          })
      });
      for (var h in n)
          l.push({
              list: [h],
              required: h
          });
      var d = f.getStatCount(t);
      f.qualities[f.itemById[t].quality].ancient ? this.ancientSel.show() : this.ancientSel.hide();
      for (var c = [], m = 0; m < this.stats.length; ++m) {
          var u = !1
            , h = this.stats[m].required || this.stats[m].list.val();
          if (r[h]) {
              for (b = 0; b < l.length; ++b)
                  if (l[b].list.indexOf(h) >= 0) {
                      l[b].required ? (this.stats[m].required = l[b].required,
                      this.stats[m].remove.hide()) : (delete this.stats[m].required,
                      this.stats[m].remove.show()),
                      this.stats[m].updateList(),
                      this.stats[m].list.trigger("chosen:updated"),
                      l.splice(b, 1),
                      u = !0;
                      break
                  }
              u || (this.stats[m].required ? r[this.stats[m].required] ? (delete this.stats[m].required,
              this.stats[m].remove.show(),
              c.push(this.stats[m])) : (this.stats[m].line.remove(),
              this.stats.splice(m--, 1)) : c.push(this.stats[m]))
          } else
              this.stats[m].line.remove(),
              this.stats.splice(m--, 1)
      }
      for (var v = 0, m = 0; m < this.stats.length; ++m) {
          h = this.stats[m].required || this.stats[m].list.val();
          f.stats[h] && f.stats[h].secondary ? d[1]-- : f.stats[h] && f.stats[h].base || d[0]--,
          "socket" === h && ++v
      }
      var y = this.type.val();
      "onehand" != (y = f.itemTypes[y] ? f.itemTypes[y].slot : null) && "twohand" != y && (d[0] += v),
      c.sort(function(t, s) {
          return (t.list.val() || "").length - (s.list.val() || "").length
      });
      for (m = 0; m < l.length; ++m)
          if (0 != l[m].list.length) {
              var g = h = l[m].list[0];
              r[S] && r[S].noblock || (g = f.stats[h].group || h);
              for (b = 0; b < c.length; ++b) {
                  if ((S = c[b].list.val()) === g || f.stats[S] && f.stats[S].group === g) {
                      I = this.stats.indexOf(c[b]);
                      c[b].line.remove(),
                      c.splice(b--, 1),
                      I >= 0 && this.stats.splice(I, 1)
                  }
              }
              if (f.stats[h]) {
                  var x = void 0;
                  if (f.stats[h].secondary ? --d[1] < 0 && (x = !0) : f.stats[h].base || --d[0] < 0 && (x = !1),
                  void 0 !== x)
                      for (var b = 0; b < c.length; ++b) {
                          var S = c[b].list.val();
                          if (!f.stats[S] || !f.stats[S].base) {
                              if (!(!f.stats[S] || !f.stats[S].secondary) === x) {
                                  var I = this.stats.indexOf(c[b]);
                                  c[b].line.remove(),
                                  c.splice(b--, 1),
                                  I >= 0 && this.stats.splice(I, 1);
                                  break
                              }
                          }
                      }
              }
              this.onAddStat(l[m].required, h).list.val(h)
          }
      for (m = 0; m < c.length; ++m)
          c[m].updateList(),
          c[m].list.trigger("chosen:updated");
      c = this.stats.slice();
      for (m = 0; m < c.length; ++m)
          c[m].onChangeStat();
      delete this.nonRecursive,
      this.updateStatCounts()
  }
  ,
  f.ItemBox.prototype.setItem = function(t) {
      if (this.updateItem(),
      this.div.removeClass("item-imported"),
      !t || !f.itemById[t.id])
          return this.type.val(""),
          this.item.val(""),
          this.type.trigger("chosen:updated"),
          this.onChangeType(),
          !1;
      var s = f.itemById[t.id];
      if (this.type.val(s.type),
      this.type.val() !== s.type)
          return !1;
      if (this.type.trigger("chosen:updated"),
      this.onChangeType(t.id),
      this.item.val(t.id),
      this.item.val() !== t.id)
          return !1;
      this.ancient = t.ancient,
      f.qualities[s.quality].ancient ? this.ancientSel.show() : this.ancientSel.hide(),
      this.item.trigger("chosen:updated"),
      this.statsDiv.empty(),
      this.stats = [];
      var e = this.getItemAffixes(!1)
        , i = this.getItemAffixes(!0)
        , a = this.getItemAffixes("only");
      a.basearmor && !t.stats.basearmor && (t.stats.basearmor = [a.basearmor.max]),
      a.baseblock && !t.stats.baseblock && (t.stats.baseblock = [a.baseblock.max]),
      a.blockamount && !t.stats.blockamount && (t.stats.blockamount = [a.blockamount.max, a.blockamount.max2]),
      this.nonRecursive = !0;
      t.empty;
      this.enchant = t.enchant,
      this.imported = t.imported;
      for (var o in t.stats)
          if (i[o]) {
              var n = a[o] ? o : void 0;
              n && a[o].noblock && e[o] && t.stats[o].length >= 1 && "string" != typeof t.stats[o][0] && a[o].max && t.stats[o][0] > a[o].max && (n = !1);
              var l = this.onAddStat(n, o);
              l.list.val(o);
              f.stats[o];
              if (t.stats[o].length >= 1 && "string" != typeof t.stats[o][0] && l.value.val(t.stats[o][0]),
              t.stats[o].length >= 2 && l.value2.val(t.stats[o][1]),
              l.onChangeStat(!0),
              t.stats[o].length >= 1 && "string" == typeof t.stats[o][0] && l.passive && (l.passiveBox.val(t.stats[o][0]),
              l.passiveBox.trigger("chosen:updated")),
              "sockets" === o && t.gems && l.sockets)
                  for (var p = 0; p < t.gems.length && p < l.sockets.length; ++p)
                      l.sockets[p].type.val(t.gems[p][0]),
                      l.sockets[p].type.trigger("chosen:updated"),
                      r(l.sockets[p]),
                      f.legendaryGems[t.gems[p][0]] ? l.sockets[p].level.val(t.gems[p][1]) : (l.sockets[p].color.val(t.gems[p][1]),
                      l.sockets[p].color.trigger("chosen:updated"))
          } else
              0;
      return delete this.nonRecursive,
      this.imported ? this.div.addClass("item-imported") : delete this.enchant,
      this.updateStatCounts(),
      this.updateEquipSet(),
      !0
  }
  ,
  f.ItemBox.prototype.getId = function() {
      if (f.itemTypes[this.type.val()]) {
          var t = this.item.val();
          return f.itemById[t] ? t : void 0
      }
  }
  ,
  f.ItemBox.prototype.getData = function() {
      if (f.itemTypes[this.type.val()]) {
          var t = this.item.val()
            , s = f.itemById[t]
            , e = 0;
          if (s) {
              var i = {
                  id: t,
                  stats: {}
              };
              f.qualities[s.quality].ancient && (i.ancient = this.ancient);
              for (var a = 0; a < this.stats.length; ++a) {
                  var o = this.stats[a].list.val();
                  if (o) {
                      if (f.stats[o]) {
                          i.stats[o] = [];
                          var n = f.stats[o].args;
                          if ("custom" == o && s.required && s.required.custom && (n = void 0 === s.required.custom.args ? 1 : s.required.custom.args),
                          n >= 1 && i.stats[o].push(parseFloat(this.stats[a].value.val()) || 0),
                          n >= 2 && i.stats[o].push(parseFloat(this.stats[a].value2.val()) || 0),
                          n < 0 && this.stats[a].passive && i.stats[o].push(this.stats[a].passiveBox.val()),
                          "sockets" === o && this.stats[a].sockets) {
                              i.gems = [];
                              for (var r = 0; r < this.stats[a].sockets.length; ++r) {
                                  var l = this.stats[a].sockets[r]
                                    , p = [l.type.val(), 0];
                                  f.legendaryGems[p[0]] ? p[1] = parseInt(l.level.val()) : f.gemQualities[p[0]] ? (p[0] = parseInt(p[0]),
                                  p[1] = l.color.val()) : p = null,
                                  p && i.gems.push(p)
                              }
                          }
                      }
                  } else
                      ++e
              }
              return this.enchant && i.stats[this.enchant] && (i.enchant = this.enchant),
              i.imported = this.imported,
              e && (i.empty = e),
              i
          }
      }
  }
  ,
  f.ItemBox.prototype.updateTypes = function(t) {
      var s = this.type.val();
      this.type.empty(),
      this.type.append('<option value="">' + (f.noChosen ? v("Empty Slot") : "") + "</option>");
      var e = this.slot ? f.itemSlots[this.slot].types : f.itemTypes;
      "offhand" === this.slot && (e = f.getOffhandTypes());
      var i = {};
      for (var a in e) {
          var o = e[a];
          this.charClass && o.classes && o.classes.indexOf(this.charClass) < 0 || (i[e[a].slot] || (i[e[a].slot] = []),
          i[e[a].slot].push(a))
      }
      for (var n in i) {
          var r = this.type;
          Object.keys(i).length > 1 && i[n].length > 1 && (r = $("<optgroup></optgroup>"),
          f.metaSlots[n] ? r.attr("label", f.metaSlots[n].name) : r.attr("label", f.itemSlots[n].name),
          this.type.append(r));
          for (var l = 0; l < i[n].length; ++l) {
              var p = '<option value="' + (a = i[n][l]) + (s == a ? '" selected="selected' : "") + '">' + f.GenderString(e[a].name) + "</option>";
              r.append(p)
          }
      }
      this.type.children().length > 1 ? this.type.removeAttr("disabled") : this.type.prop("disabled", !0),
      this.type.trigger("chosen:updated"),
      !t && this.type.val() === s && s || this.onChangeType()
  }
  ,
  f.ItemBox.prototype.addItemToList = function(t, s) {
      if (!(this.charClass && t.classes && t.classes.indexOf(this.charClass) < 0)) {
          if (!s) {
              if (f.options.hideLegacy && t.suffix === v("Legacy"))
                  return;
              if (f.options.hideCrossClass && this.charClass && f.itemPowerClasses && t.required && t.required.custom && f.itemPowerClasses[t.required.custom.id] && f.itemPowerClasses[t.required.custom.id] !== this.charClass)
                  return;
              if (f.options.hideCrossClass && this.charClass && t.set) {
                  var e = f.itemSets[t.set];
                  if (e && e.tclass && e.tclass !== this.charClass)
                      return
              }
          }
          var i = '<option value="' + t.id + '" class="item-info-icon quality-' + (t.quality || "rare") + (s ? '" selected="selected' : "") + '">' + t.name + (t.suffix ? " (" + t.suffix + ")" : "") + "</option>";
          this.item.append(i)
      }
  }
  ,
  f.ItemBox.prototype.populateItems = function(t) {
      var s = this.type.val()
        , e = t || this.item.val();
      if (this.item.empty(),
      this.item.append('<option value="">' + (f.noChosen ? v("Empty Slot") : "") + "</option>"),
      s && f.itemTypes[s])
          for (r = 0; r < f.itemTypes[s].items.length; ++r) {
              var i = f.itemTypes[s].items[r];
              this.addItemToList(i, i.id === e)
          }
      else {
          var a = this.slot ? f.itemSlots[this.slot].types : f.itemTypes;
          "offhand" === this.slot && (a = f.getOffhandTypes());
          var o = [];
          for (var s in a) {
              var n = a[s];
              if ("custom" !== s && "customwpn" !== s && !(this.charClass && n.classes && n.classes.indexOf(this.charClass) < 0))
                  for (r = 0; r < n.items.length; ++r)
                      o.push(n.items[r])
          }
          o.sort(function(t, s) {
              var e = "rare" === t.quality ? "" : t.quality
                , i = "rare" === s.quality ? "" : s.quality;
              if (e != i)
                  return e.localeCompare(i);
              var a = t.name.toLowerCase().replace(/^(?:the|a) /, "")
                , o = s.name.toLowerCase().replace(/^(?:the|a) /, "");
              return a.localeCompare(o)
          });
          for (var r = 0; r < o.length; ++r)
              this.addItemToList(o[r], o[r].id === e)
      }
  }
  ,
  f.ItemBox.prototype.refreshItems = function(t) {
      this.populateItems(t)
  }
  ,
  f.ItemBox.prototype.onChangeType = function(t) {
      var s = this.type.val();
      this.refreshItems(t),
      this.item.trigger("chosen:updated"),
      this.onChangeItem(),
      "mainhand" === this.slot && f.itemSlots.offhand.drop.updateTypes(void 0, s)
  }
  ,
  f.ItemBox.prototype.setClass = function(t, s) {
      this.charClass = t,
      void 0 !== s && (this.slot = s),
      this.updateTypes(!0)
  }
  ,
  f.ItemBox.prototype.accept = function(t) {
      if (!t || !f.itemById[t])
          return !1;
      var s = f.itemById[t].type
        , e = (this.slot ? f.itemSlots[this.slot].types : f.itemTypes)[s];
      if (!e)
          return !1;
      var i = !1
        , a = "offhand" === this.slot && this.charClass && !f.classes[this.charClass].dualwield;
      if ("offhand" === this.slot && "crusader" !== this.charClass && f.itemSlots.mainhand.item && f.itemById[f.itemSlots.mainhand.item.id]) {
          var o = f.itemById[f.itemSlots.mainhand.item.id].type;
          f.itemTypes[o] && "twohand" == f.itemTypes[o].slot && (i = !0)
      }
      return (!i || "quiver" == s) && ((!a || "onehand" != e.slot || "handcrossbow" == s) && !(this.charClass && e.classes && e.classes.indexOf(this.charClass) < 0))
  }
  ,
  f.ItemBox.prototype.lockItem = function() {
      var t = this
        , s = this.getData()
        , e = $('<div class="optimize-dialog"><p><i>' + v("Locking an item allows only one stat to be enchanted, which can be useful for optimizing your gear when you can't import it from your profile.") + "</i></p></div>");
      e.append("<div>" + v("Enchant: {0}").format("<select></select>") + "</div>");
      var i = e.find("select");
      i.append('<option value="">' + v("Not enchanted") + "</option>");
      var a = f.getItemAffixesById(s.id, s.ancient, !1)
        , o = f.getItemAffixesById(s.id, s.ancient, "only");
      for (var n in s.stats)
          !f.stats[n] || f.stats[n].base || f.stats[n].caldesanns || !a[n] || a[n].args < 0 || o[n] && (o[n].args <= 0 || s.stats[n][0] <= o[n].max) || i.append('<option value="' + n + '">' + f.stats[n].name + "</option>");
      var r = [{
          text: v("Lock"),
          click: function() {
              var e = i.val();
              e || (e = void 0),
              s.imported = {
                  enchant: e,
                  stats: $.extend(!0, {}, s.stats)
              },
              s.enchant = e,
              t.setItem(s),
              $(this).dialog("close")
          }
      }];
      e.dialog({
          resizable: !1,
          title: v("Lock item"),
          height: "auto",
          width: 350,
          modal: !0,
          buttons: r,
          close: function() {
              e.remove()
          },
          open: function() {
              e.parent().css("overflow", "visible")
          }
      })
  }
}();
!function() {
  function e(e, a, t, s) {
      return e ? "string" != typeof e ? e : (t ? e = e.replace(/\$([1-9])/g, function(e, s) {
          return a.affixes[t] ? a.affixes[t].value[parseInt(s) - 1] : 1 === parseInt(s) ? a[t] : void 0
      }) : s && (e = e.replace(/\$([1-9])/g, function(e, a) {
          return s[parseInt(a) - 1].val
      })),
      a.execString(e)) : 0
  }
  function a(e, a) {
      function t(e) {
          return i(e, o, a.affix, a.params)
      }
      var s, n, o = (a = a || {}).stats || r.getStats();
      if (e.thorns)
          s = {
              min: n = o.thorns || 0,
              max: n
          };
      else if (e.weapon) {
          if (!o.info[e.weapon])
              return;
          n = .5 * ((s = $.extend({}, o.info[e.weapon].wpnbase)).min + s.max)
      } else
          n = .5 * ((s = $.extend({}, o.info.mainhand.wpnbase)).min + s.max),
          o.info.offhand && (s.min = Math.min(s.min, o.info.offhand.wpnbase.min),
          s.max = Math.max(s.max, o.info.offhand.wpnbase.max),
          n = .5 * n + .25 * (o.info.offhand.wpnbase.min + o.info.offhand.wpnbase.max));
      var f = 1
        , d = 0
        , l = [];
      if (l.push({
          name: r.stats[r.classes[r.charClass].primary].name,
          percent: ("bad" === e.thorns ? .25 : 1) * o.info.primary
      }),
      e.aps && l.push({
          name: "Attack speed",
          factor: (e.weapon ? o.info[e.weapon].speed : o.info.aps) * (!0 === e.aps ? 1 : t(e.aps))
      }),
      e.coeff || e.addcoeff) {
          var p = e.coeff ? t(e.coeff) : 0
            , c = p
            , h = void 0;
          if (f = p,
          e.addcoeff) {
              h = [];
              for (P = 0; P < e.addcoeff.length; ++P) {
                  var m, u = e.addcoeff[P];
                  "object" == typeof u ? ((u = [t(u[0]), t(u[1])])[0] && u[1] && h.push([100 * u[0], u[1]]),
                  m = u[0] * u[1]) : ((u = t(u)) && h.push(100 * u),
                  m = u),
                  "number" != typeof e.total || P < e.total ? f += m : d += m,
                  p += m
              }
          }
          l.push({
              name: "Skill multiplier",
              factor: p,
              percent: 100 * c,
              extra: h,
              coeff: !0
          })
      }
      if (e.factors)
          for (var v in e.factors) {
              1 != (E = t(e.factors[v])) && l.push({
                  name: v,
                  factor: E
              })
          }
      if (e.divide)
          for (var v in e.divide) {
              1 != (E = t(e.divide[v])) && l.push({
                  name: v,
                  factor: 1 / E,
                  divide: E
              })
          }
      if (e.percent)
          for (var v in e.percent) {
              (E = t(e.percent[v])) && l.push({
                  name: v,
                  percent: E
              })
          }
      if (e.passives)
          for (var b in e.passives)
              if (o.passives[b]) {
                  (E = t(e.passives[b])) && l.push({
                      name: r.passives[r.charClass][b].name,
                      percent: E
                  })
              }
      var w = {}
        , g = e.skill || a.skill && a.skill[0];
      if (g && "special" !== e.thorns && !e.manald) {
          var x = o["skill_" + r.charClass + "_" + g];
          x && (w["Skill %"] = x)
      }
      if (e.bonuses)
          for (var _ in e.bonuses) {
              (E = t(e.bonuses[_])) && (w[_] = E)
          }
      if (e.addpassives)
          for (var b in e.addpassives)
              if (o.passives[b]) {
                  (E = t(e.addpassives[b])) && (w[r.passives[r.charClass][b].name] = E)
              }
      e.pet && !$.isEmptyObject(w) && (l.push({
          name: "Skill damage",
          percent: w
      }),
      w = {});
      var y = "max" == e.elem ? o.info.maxelem : e.elem
        , k = ("max" == e.srcelem ? o.info.maxelem : e.srcelem) || y
        , M = o.getTotalSpecial("damage", y, e.pet, g, e.exclude);
      M && (w.Buffs = M);
      if ((M = o.getTotalSpecial("dmgtaken", y, e.pet, g, e.exclude)) && "normal" !== e.thorns && "bad" !== e.thorns && "special" !== e.thorns && (w.Debuffs = M),
      $.isEmptyObject(w) || l.push({
          name: e.pet ? "Buffs/debuffs" : "Damage increased by skills",
          percent: w
      }),
      !M || "normal" !== e.thorns && "bad" !== e.thorns && "special" !== e.thorns || l.push({
          name: r.stats.dmgtaken.name,
          percent: M
      }),
      "normal" !== e.thorns && "bad" !== e.thorns || !o.thorns_taken || l.push({
          name: r.itemById.Unique_Shield_104_x1.name,
          percent: o.thorns_taken
      }),
      (k && o["dmg" + k] || e.pet && o.petdamage) && !e.manald) {
          w = {};
          k && o["dmg" + k] && (w[r.elements[k]] = o["dmg" + k]),
          e.pet && o.petdamage && (w.Pets = o.petdamage),
          l.push({
              name: "Elemental damage",
              percent: w
          })
      }
      if (r.options.showElites && o.edmg) {
          var S = o.edmg;
          e.manald && (S -= o.leg_thefurnace || 0,
          o.gem_powerful_25 && (S -= 15)),
          S && l.push({
              name: r.stats.edmg.name,
              percent: S
          })
      }
      r.options.targetBoss && r.options.showElites && o.bossdmg && l.push({
          name: r.stats.bossdmg.name,
          percent: o.bossdmg
      });
      var F = r.options.targetType;
      F && o["damage_" + F] && l.push({
          name: r.stats["damage_" + F].name,
          percent: o["damage_" + F]
      }),
      $.each(o.getSpecial("dmgmul", y, e.pet, g, e.exclude), function(e, a) {
          l.push({
              name: a[0],
              percent: a[1]
          })
      });
      for (var A = 1, P = 0; P < l.length; ++P) {
          if (!l[P].factor) {
              var N = 0;
              if ("number" == typeof l[P].percent)
                  N = l[P].percent;
              else
                  for (var C in l[P].percent)
                      N += l[P].percent[C];
              l[P].factor = 1 + .01 * N
          }
          A *= l[P].factor
      }
      var j = t(e.chc)
        , D = t(e.chd)
        , B = Math.min(1, .01 * (o.final.chc + j * (1 + .01 * (o.chctaken_percent || 0))))
        , I = .01 * (o.chd + D);
      e.thorns && (B = I = j = 0);
      var E = n * A * (1 + B * I);
      return {
          factors: l,
          total_factor: A * f / (f + d),
          extra_factor: A * d / (f + d),
          value: E,
          base: s,
          chc: B,
          chd: I,
          bonus_chc: j
      }
  }
  function t(e, a) {
      this.header_ = "",
      this.body_ = "",
      e && this.header(e, a)
  }
  function s(e, a, t, s) {
      var n = ("" + parseFloat(e.toFixed(a || 0))).split(".");
      return Math.abs(parseFloat(e)) >= 1e4 && (n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
      e = n.join("."),
      s && s.indexOf("+") >= 0 && (e > 0 && (e = "+" + e),
      s = s.replace("+", "")),
      '<span class="d3-color-' + (t || "green") + '">' + e + (s || "") + "</span>"
  }
  function n(e, a, t) {
      return e = Math.floor(e),
      a = Math.floor(a),
      s(e, 0, t) + (e == a ? "" : "-" + s(a, 0, t))
  }
  var r = DiabloCalc
    , o = r.locale("ui-skills.js", "skilldata");
  r.getSkillBonus = function(e, a, t) {
      if (e) {
          t = t || "buffs";
          var s = r.skills[r.charClass][e[0]]
            , n = null;
          return s && s[t] && (n = "function" == typeof s[t] ? s[t](e[1], a) : s[t][e[1]]),
          n
      }
  }
  ,
  r.getPassiveBonus = function(e, a) {
      var t = r.passives[r.charClass][e]
        , s = null;
      return t && t.buffs && (s = "function" == typeof t.buffs ? t.buffs(a) : t.buffs),
      s
  }
  ,
  r.execString = e;
  var i = e;
  r.calcFramesFull = function(e, a, t, s, n, o) {
      !0 !== t && !1 !== t && (n = s,
      s = t,
      t = void 0);
      var i = "up" === n ? 1 : 0
        , o = o || r.getStats()
        , f = {
          fpa: e,
          dspeed: s || 1,
          fpadelta: i
      };
      return !a && o.info.offhand ? t ? (f.basespeed = Math.min(o.info.mainhand.speed, o.info.offhand.speed),
      f.frames = Math.floor(e / (f.dspeed * f.basespeed)) + i) : (f.framesmh = Math.floor(e / (f.dspeed * o.info.mainhand.speed)) + i,
      f.framesoh = Math.floor(e / (f.dspeed * o.info.offhand.speed)) + i,
      f.frames = .5 * (f.framesmh + f.framesoh)) : (f.basespeed = o.info[a || "mainhand"].speed,
      f.frames = Math.floor(e / (f.dspeed * f.basespeed)) + i),
      f
  }
  ,
  r.calcFrames = function(e, a, t, s, n, o) {
      return r.calcFramesFull.apply(r, arguments).frames
  }
  ,
  t.prototype.html = function() {
      return '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p>' + this.header_ + this.body_ + "</p></div>"
  }
  ,
  t.prototype.empty = function() {
      return 0 == this.body_.length
  }
  ,
  t.prototype.header = function(e, a) {
      return e = o(e),
      void 0 !== a && (e += ': <span class="d3-color-green">' + a + "</span>"),
      this.header_ = '<span class="d3-color-gold">' + e + "</span>",
      this
  }
  ,
  t.prototype.line = function(e, a) {
      var t = 2
        , s = a;
      return !0 !== e && !1 !== e && (s = e,
      e = !0,
      t = 1),
      this.body_ += '<br/><span class="tooltip-icon-' + (!1 === e ? "nobullet" : "bullet") + '"></span>' + String.prototype.format.apply(o(s), Array.prototype.slice.call(arguments, t)),
      this
  }
  ,
  t.prototype.add = function(e) {
      if (!e)
          return this;
      if ("string" == typeof e) {
          var a = !0;
          "@" === e[0] && (e = e.substring(1),
          a = !1),
          this.line(a, e)
      } else if (e instanceof Array)
          for (var s = 0; s < e.length; ++s)
              this.add(e[s]);
      else
          e instanceof t && (this.body_ += e.body_);
      return this
  }
  ,
  t.prototype.breakpoints = function(e, a) {
      function t(e, t) {
          var s;
          return (s = a.framesmh && a.framesoh ? .5 * (Math.floor(a.fpa / (a.dspeed * e)) + Math.floor(a.fpa / (a.dspeed * t))) + a.fpadelta : Math.floor(a.fpa / (a.dspeed * e)) + a.fpadelta) < a.frames ? '<span class="d3-color-green">+' + r.formatNumber(100 * (a.frames / s - 1), 1) + "%</span>" : s > a.frames ? '<span class="d3-color-red">-' + r.formatNumber(100 * (1 - a.frames / s), 1) + "%</span>" : '<span class="d3-color-gray">+0%</span>'
      }
      function s(e) {
          var a = e[0] === b || e[0] === w ? ' class="current"' : "";
          return "<td" + a + ">" + e[0] + "</td><td" + a + ">" + e[1] + "</td>"
      }
      if (a.pet) {
          if (a.frames > 6) {
              var n = e.info.mainhand.speed / (1 + .01 * (e.ias || 0))
                , i = a.fpa / (a.frames - 5) / a.speed
                , f = Math.ceil(10 * (100 * i / n - 100 - (e.ias || 0))) / 10;
              this.line(!1, "IAS to next breakpoint: {0}", '<span class="d3-color-white">' + f + "%</span>")
          }
          this.body_ += "</p><table><tr><th>" + ["FPA", "APS", "Pet APS", "Delta"].map(o).join("</th><th>") + "</th></tr>";
          for (_ = 6 * Math.ceil(Math.floor(a.fpa) / 6); _ >= 6; _ -= 6) {
              y = Math.max(1, a.fpa / (_ + 1) / a.speed + 51e-6);
              if (a.speed / (_ + 1) > 5)
                  break;
              this.body_ += "<tr" + (_ === a.frames ? ' class="current"' : "") + "><td>" + _ + "</td>",
              this.body_ += "<td>" + y.toFixed(4) + "</td><td>" + Math.max(1, a.fpa / (_ + 1) + 51e-6).toFixed(4) + "</td>";
              var d = 100 * (a.frames / _ - 1);
              this.body_ += '<td class="' + (d < 0 ? "d3-color-red" : d > 0 ? "d3-color-green" : "d3-color-gray") + '">',
              this.body_ += (d < 0 ? d.toFixed(1) : "+" + d.toFixed(1)) + "%</td></tr>"
          }
          this.body_ += "</table><p>"
      } else {
          if (a.framesmh && a.framesoh) {
              if (a.framesmh > 1 && a.framesoh > 1) {
                  var l = a.fpa / (a.framesmh - a.fpadelta) / a.dspeed + 51e-6
                    , p = a.fpa / (a.framesoh - a.fpadelta) / a.dspeed + 51e-6;
                  l = (m = Math.min(l / e.info.mainhand.speed, p / e.info.offhand.speed)) * e.info.mainhand.speed,
                  p = m * e.info.offhand.speed;
                  f = Math.ceil(10 * (m * (100 + (e.ias || 0)) - 100 - (e.ias || 0))) / 10;
                  this.line(!1, "Next breakpoint: {0} APS ({1} IAS)" + (!1 !== a.dps ? ", {2} DPS" : ""), '<span class="d3-color-white">' + r.formatNumber(l, 4, 1e4) + '</span>/<span class="d3-color-white">' + r.formatNumber(p, 4, 1e4) + "</span>", '<span class="d3-color-white">+' + f + "%</span>", t(l, p))
              }
              var c = a.fpa / (a.framesmh + 1 - a.fpadelta) / a.dspeed - 51e-6
                , h = a.fpa / (a.framesoh + 1 - a.fpadelta) / a.dspeed - 51e-6;
              c = (u = Math.max(c / e.info.mainhand.speed, h / e.info.offhand.speed)) * e.info.mainhand.speed,
              h = u * e.info.offhand.speed;
              f = Math.ceil(10 * (u * (100 + (e.ias || 0)) - 100 - (e.ias || 0))) / 10;
              this.line(!1, "Previous breakpoint: {0} APS ({1} IAS)" + (!1 !== a.dps ? ", {2} DPS" : ""), '<span class="d3-color-white">' + r.formatNumber(c, 4, 1e4) + '</span>/<span class="d3-color-white">' + r.formatNumber(h, 4, 1e4) + "</span>", '<span class="d3-color-white">' + f + "%</span>", t(c, h))
          } else {
              if (a.frames > 1) {
                  var m = a.fpa / (a.frames - a.fpadelta) / a.dspeed + 51e-6
                    , n = a.basespeed / (1 + .01 * (e.ias || 0))
                    , f = Math.ceil(10 * (100 * m / n - 100 - (e.ias || 0))) / 10;
                  this.line(!1, "Next breakpoint: {0} APS ({1} IAS)" + (!1 !== a.dps ? ", {2} DPS" : ""), '<span class="d3-color-white">' + r.formatNumber(m, 4, 1e4) + "</span>", '<span class="d3-color-white">+' + f + "%</span>", t(m))
              }
              var u = a.fpa / (a.frames + 1 - a.fpadelta) / a.dspeed - 51e-6
                , n = a.basespeed / (1 + .01 * (e.ias || 0))
                , f = Math.ceil(10 * (100 * u / n - 100 - (e.ias || 0))) / 10;
              this.line(!1, "Previous breakpoint: {0} APS ({1} IAS)" + (!1 !== a.dps ? ", {2} DPS" : ""), '<span class="d3-color-white">' + r.formatNumber(u, 4, 1e4) + "</span>", '<span class="d3-color-white">' + f + "%</span>", t(u))
          }
          if (!a.sequence) {
              var v = "<th>" + o("FPA") + "</th><th>" + o("APS") + "</th>";
              this.body_ += '</p><table class="col2"><tr>' + v + "<th></th>" + v + "<th></th>" + v + "</tr>";
              var b = a.frames
                , w = a.frames;
              a.framesmh && a.framesoh && (b = a.framesmh,
              w = a.framesoh);
              var g = []
                , x = Math.max(3, e.info.mainhand.speed);
              a.framesoh && (x = Math.max(x, e.info.offhand.speed)),
              x = Math.max(1.2 * x, x + .5);
              for (var _ = Math.floor(a.fpa) + a.fpadelta; _ >= 1; _ -= 1) {
                  var y;
                  if ((y = Math.max(1, a.fpa / (_ + 1 - a.fpadelta) / a.dspeed + 51e-6)) > x && g.length % 3 == 0)
                      break;
                  g.push([_, y.toFixed(4)])
              }
              for (var k = Math.ceil(g.length / 3), M = 0; M < k; ++M)
                  this.body_ += "<tr>" + s(g[M]),
                  M + k < g.length && (this.body_ += "<td></td>" + s(g[M + k])),
                  M + k + k < g.length && (this.body_ += "<td></td>" + s(g[M + k + k])),
                  this.body_ += "</tr>";
              this.body_ += "</table><p>"
          }
      }
  }
  ,
  r.skill_formatObject = a,
  r.skill_processInfo = function(e, f) {
      function d(e) {
          return i(e, h, f.affix, f.params)
      }
      var l = {}
        , p = []
        , c = (f = f || {}).notip
        , h = f.stats || r.getStats()
        , m = new t
        , u = [];
      $.each(e, function(e, i) {
          function v(e, a) {
              return a ? v(a, e % a) : e
          }
          if (i)
              if (l[e] = {},
              "object" != typeof i)
                  "number" == typeof i ? results[e].value = i : c || (l[e].text = i);
              else if (i.sum)
                  p.push(e);
              else if (void 0 !== i.cooldown && void 0 !== i.duration) {
                  var b = d(i.duration)
                    , w = d(i.cooldown);
                  (F = i.skill || f.skill && f.skill[0]) && (w -= h["skill_" + r.charClass + "_" + F + "_cooldown"] || 0),
                  w -= h.cdrint || 0,
                  i.cdr && (w *= 1 - .01 * d(i.cdr)),
                  S = (w = Math.max(.5, w * (1 - .01 * (h.cdr || 0)))) <= .01 ? 100 : Math.min(100, 100 * b / (w + (i.after ? b : 0))),
                  l[e].value = S,
                  c || (l[e].text = r.formatNumber(S, 0, 1e4) + "%",
                  (O = new t(e,l[e].text)).add(i.tip),
                  O.line("Duration: {0} seconds", s(b, 0, "white")),
                  O.line("Cooldown: {0} seconds", s(w, 2, "white")),
                  i.after ? (O.line("Downtime: {0}", s(100 - S, 2, "white", "%")),
                  O.line("Cooldown does not start until the effect expires.")) : O.line("Downtime: {0} ({1} seconds)", s(100 - S, 2, "white", "%"), s(Math.max(0, w - b), 2, "white")),
                  l[e].tip = O.html())
              } else if (void 0 !== i.cooldown) {
                  if (!(w = d(i.cooldown)))
                      return void delete l[e];
                  (F = i.skill || f.skill && f.skill[0]) && (w -= h["skill_" + r.charClass + "_" + F + "_cooldown"] || 0),
                  w -= h.cdrint || 0,
                  i.cdr && (w *= 1 - .01 * d(i.cdr)),
                  w = Math.max(.5, w * (1 - .01 * (h.cdr || 0))),
                  l[e].value = w,
                  c || (l[e].text = o("{0} seconds").format(parseFloat(w.toFixed(2))))
              } else if (void 0 !== i.duration)
                  b = d(i.duration),
                  l[e].value = b,
                  c || (l[e].text = o("{0} seconds").format(parseFloat(b.toFixed(2))));
              else if (void 0 !== i.cost) {
                  var g = i.resource || r.classes[r.charClass].resources[0]
                    , x = d(i.cost)
                    , _ = x
                    , y = {}
                    , k = {};
                  if (x *= 1 - .01 * (h["rcr_" + g] || 0),
                  i.rcr)
                      if ("object" == typeof i.rcr)
                          for (var M in i.rcr)
                              (S = d(i.rcr[M])) && (x *= 1 - .01 * S,
                              c || (h.affixes[M] && (M = h.getAffixSource(M)),
                              y[r.sourceNames[M] || M] = S));
                      else {
                          var S;
                          (S = d(i.rcr)) && (x *= 1 - .01 * S,
                          c || (y[o("Unknown")] = S))
                      }
                  if (f.skill && f.skill[0]) {
                      var F = r.skilltips[r.charClass][f.skill[0]];
                      F && "fir" === F.elements[f.skill[1]] && (x *= 1 - .01 * (h.leg_cindercoat || 0),
                      !c && h.leg_cindercoat && h.affixes.leg_cindercoat && (y[r.sourceNames[h.getAffixSource("leg_cindercoat")]] = h.leg_cindercoat))
                  }
                  var A = i.skill || f.skill && f.skill[0];
                  if (A && (M = "skill_" + r.charClass + "_" + A + "_cost",
                  h[M] && (x = Math.max(0, x - (h[M] || 0)),
                  !c && h[M] && (k[r.sourceNames[M] || M] = h[M]))),
                  x = Math.max(0, x - (h.rcrint || 0)),
                  !c && h.sources.rcrint)
                      for (var M in h.sources.rcrint)
                          r.sourceNames[M] && (k[r.sourceNames[M]] = h.sources.rcrint[M]);
                  if (0 === x)
                      return void delete l[e];
                  if (!c) {
                      var P = [s(_, 2, "white")]
                        , N = [o("Base cost: {0}").format(s(_, 2, "white"))];
                      if (h["rcr_" + g]) {
                          j = h["rcr_" + g] > 0 ? "green" : "red",
                          P.push(s(1 - .01 * h["rcr_" + g], 4, j));
                          var C = h["rcr_" + g] === h.rcr ? "rcr" : "rcr_" + g;
                          N.push("{0}: {1}".format(r.stats[C].name, s(-h["rcr_" + g], 2, j, "+%")))
                      }
                      for (var M in y)
                          j = y[M] > 0 ? "green" : "red",
                          P.push(s(1 - .01 * y[M], 4, j)),
                          N.push("{0}: {1}".format(M, s(-y[M], 2, j, "+%")));
                      P = P.join(" &#215; ");
                      for (var M in k) {
                          var j = k[M] > 0 ? "green" : "red";
                          P += (k[M] > 0 ? " - " : " + ") + s(Math.abs(k[M]), 2, j),
                          N.push("{0}: {1}".format(M, s(-k[M], 2, j, "+")))
                      }
                  }
                  if (i.speed || i.fpa) {
                      var D, B, I = (d(i.speed) || 1) * (1 + .01 * d(i.ias));
                      if (i.fpa ? (D = 60 / (B = i.slowest ? r.calcFramesFull(i.fpa, i.weapon, !0, I, i.round, h) : r.calcFramesFull(i.fpa, i.weapon, I, i.round, void 0, h)).frames,
                      x *= i.fpa / 60) : D = I * (i.weapon ? h.info[i.weapon].speed : h.info.aps),
                      l[e].value = x * D,
                      !c && (l[e].text = o("{0} {1} per second").format(parseFloat((x * D).toFixed(2)), r.resources[g]),
                      i.fpa)) {
                          (O = new t(e,l[e].text)).add(i.tip),
                          O.line("Cost per tick: {0} {1}", s(x, 2, "white"), r.resources[g]);
                          var $ = v(60, i.fpa);
                          Object.keys(k).length && (P = "(" + P + ")"),
                          i.fpa > $ && (P += " &#215; " + s(i.fpa / $, 0, "white")),
                          P += " / " + s(60 / $, 0, "white"),
                          O.line("Formula: {0}", P),
                          N.forEach(function(e) {
                              O.line(!1, e)
                          }),
                          O.line(!1, "Base tick rate factor: {0}", s(i.fpa / $, 0, "white") + " / " + s(60 / $, 0, "white")),
                          O.line("Breakpoint: {0} frames ({1} APS)", B.frames, s(D, 2, "white")),
                          l[e].tip = O.html(),
                          i.bp && (m.line("{0}: {1} frames ({2} APS)", o("Tick rate"), s(B.frames, 0, "white"), s(D, 2, "white")),
                          B.dps = !1,
                          m.breakpoints(h, B),
                          u.push(B.frames))
                      }
                  } else
                      l[e].value = x,
                      c || (l[e].text = o(i.persecond ? "{0} {1} per second" : "{0} {1}").format(parseFloat(x.toFixed(2)), r.resources[g]),
                      (O = new t(e,l[e].text)).add(i.tip),
                      O.line("Formula: {0}", P),
                      N.forEach(function(e) {
                          O.line(!1, e)
                      }),
                      l[e].tip = O.html())
              } else if (void 0 !== i.value)
                  "number" == typeof i.value ? (l[e].value = i.value,
                  c || (l[e].text = r.formatNumber(i.value, 0, 1e4))) : c || (l[e].text = o(i.value)),
                  i.tip && !c && (l[e].tip = new t(e,l[e].text).add(i.tip).html());
              else {
                  var E = a(i, f);
                  if (!E)
                      return void delete l[e];
                  if (l[e].value = E.value,
                  !c) {
                      l[e].text = r.formatNumber(E.value, 0, 1e4);
                      var O = new t(!0 === i.total ? e : o("Average {0}").format(o(e)),l[e].text);
                      O.add(i.tip),
                      !i.weapon && h.info.mainhand && h.info.offhand && O.line("Alternates weapons"),
                      i.thorns || !0 === i.total || (i.nocrit ? O.line("Damage range: {0}", n(E.base.min * E.total_factor * (1 + E.chc * E.chd), E.base.max * E.total_factor * (1 + E.chc * E.chd), "white")) : !i.weapon && h.info.mainhand && h.info.offhand ? (O.line("Mainhand white damage: {0}", n(h.info.mainhand.wpnbase.min * E.total_factor, h.info.mainhand.wpnbase.max * E.total_factor, "white")),
                      O.line("Offhand white damage: {0}", n(h.info.offhand.wpnbase.min * E.total_factor, h.info.offhand.wpnbase.max * E.total_factor, "white")),
                      E.bonus_chc && O.line("Critical chance: {0}", s(100 * E.chc, 2, "green", "%")),
                      O.line("Mainhand critical damage: {0}", n(h.info.mainhand.wpnbase.min * E.total_factor * (1 + E.chd), h.info.mainhand.wpnbase.max * E.total_factor * (1 + E.chd), "white")),
                      O.line("Offhand critical damage: {0}", n(h.info.offhand.wpnbase.min * E.total_factor * (1 + E.chd), h.info.offhand.wpnbase.max * E.total_factor * (1 + E.chd), "white"))) : (O.line("White damage: {0}", n(E.base.min * E.total_factor, E.base.max * E.total_factor, "white")),
                      E.bonus_chc && O.line("Critical chance: {0}", s(100 * E.chc, 2, "green", "%")),
                      O.line("Critical damage: {0}", n(E.base.min * E.total_factor * (1 + E.chd), E.base.max * E.total_factor * (1 + E.chd), "white")))),
                      "number" == typeof i.total && O.line("Extra damage: {0}", s(.5 * (E.base.min + E.base.max) * E.extra_factor * (1 + E.chc * E.chd), 0, "white")),
                      O.line(o("Formula: ") + '<span class="d3-color-gray">' + o(i.thorns ? "[Thorns]" : "[Weapon]") + "</span>" + (i.nocrit || i.total ? " &#215; " + s(1 + E.chc * E.chd, 2) : "") + E.factors.map(function(e) {
                          return e.divide ? " / " + s(e.divide, 2) : " &#215; " + s(e.factor, 2)
                      }).join("")),
                      i.thorns ? O.line(!1, "Thorns damage: {0}", s(h.thorns || 0, 0, "white")) : ("offhand" !== i.weapon && (i.avg ? O.line(!1, "Average main hand damage: {0}", s(.5 * (h.info.mainhand.wpnbase.min + h.info.mainhand.wpnbase.max), 0, "white")) : O.line(!1, "Main hand damage: {0}", n(h.info.mainhand.wpnbase.min, h.info.mainhand.wpnbase.max, "white"))),
                      "mainhand" !== i.weapon && h.info.offhand && O.line(!1, "Off hand damage: {0}", n(h.info.offhand.wpnbase.min, h.info.offhand.wpnbase.max, "white"))),
                      E.chd && (i.nocrit || i.total ? O.line(!1, "Critical multiplier: {0}", s(1, 0, "white") + " + " + s(E.chc, 2, "green") + " &#215; " + s(E.chd, 2, "green")) : O.line(!1, "Critical damage: {0}", s(100 * E.chd, 1, "white", "%"))),
                      E.factors.forEach(function(e) {
                          var a = [];
                          if (e.divide)
                              a.push(s(1, 0, "white") + " / " + s(e.divide, 2));
                          else if (void 0 !== e.percent)
                              if ("number" == typeof e.percent)
                                  e.percent && a.push(s(e.percent, 2, "green", "%"));
                              else
                                  for (var t in e.percent)
                                      a.push(s(e.percent[t], 2, "green", "%") + ' <span class="d3-color-gray">(' + o(t) + ")</span>");
                          else
                              a.push(s(e.factor, 2));
                          if (e.extra)
                              for (var n = 0; n < e.extra.length; ++n)
                                  "object" == typeof e.extra[n] ? a.push(s(e.extra[n][0], 2, "green", "%") + " &#215; " + s(e.extra[n][1], 2, "green")) : a.push(s(e.extra[n], 2, "green", "%"));
                          O.line(!1, o(e.name) + ": " + a.join(" + "))
                      }),
                      l[e].tip = O.html()
                  }
              }
      });
      for (var v = {}; p.length; ) {
          for (var b = [], w = 0; w < p.length; ++w) {
              var g = p[w]
                , x = !0
                , _ = 0
                , y = new t
                , k = new t
                , M = []
                , S = "sequence" === e[g].sum
                , F = 0;
              if ($.each(e[g], function(a, t) {
                  if (l[a] || "object" == typeof t && "tip" != a) {
                      var n = a;
                      if ("object" == typeof t && "tip" != a && (n = t.src || a),
                      l[n] && void 0 !== l[n].value || "object" == typeof t && t.value) {
                          t = "object" == typeof t ? $.extend({}, t) : {
                              speed: t
                          };
                          var i = o(t.name || a) + ": "
                            , f = 1;
                          t.count && (t.count = d(t.count),
                          t.count && 1 != t.count && (f *= t.count,
                          i += parseFloat(t.count.toFixed(2)) + "x "));
                          var p = t.value ? d(t.value) : l[n].value;
                          if (i += s(p, 0, "white"),
                          t.factor && (t.factor = d(t.factor),
                          1 != t.factor && (f *= t.factor,
                          i += " &#215; " + s(t.factor, 2, "white"))),
                          t.divide && (t.divide = d(t.divide),
                          1 != t.divide && (f /= t.divide,
                          i += " / " + s(t.divide, 0, "white"))),
                          y.line(i),
                          t.cd && (t.cd = d(t.cd),
                          !1 !== t.cdr && (t.cd -= h.cdrint || 0,
                          t.cd *= 1 - .01 * (h.cdr || 0)),
                          t.cd = Math.max(.5, t.cd),
                          y.line(!1, "Cooldown: {0} seconds", s(t.cd, 2, "white")),
                          f /= t.cd),
                          t.pet) {
                              var m = void 0
                                , u = t.speed ? d(t.speed) * h.info.mainhand.speed : t.aps ? d(t.aps) : 1
                                , b = h.petias || 0;
                              !1 === t.area && (b = h.leg_taskerandtheo || 0);
                              var w = 1 + .01 * d(t.ias) + .01 * b;
                              u *= w,
                              "number" == typeof t.pet && (u = 60 / (m = 6 * Math.ceil(Math.floor(t.pet / u) / 6))),
                              c || (N = '<span class="d3-color-white">' + r.formatNumber(u, 2, 1e4) + "</span>",
                              m ? (y.line(!1, "Speed: {0} ({1} frames)", N, s(m, 0, "white")),
                              t.nobp || (M.push(m),
                              k.line("{0}: {1} frames ({2} APS)", o(t.name || a), s(m, 0, "white"), N),
                              t.speed && k.breakpoints(h, {
                                  pet: !0,
                                  fpa: t.pet,
                                  frames: m,
                                  speed: w * d(t.speed)
                              }))) : y.line(!1, "Speed: {0}", N)),
                              S ? F += 1 / u : t.cd ? f *= Math.min(1, t.cd * u) : f *= u
                          } else if (t.speed || t.aps || t.fpa) {
                              var g, u = 1;
                              if (t.speed ? (g = "object" == typeof e[n] && e[n].weapon,
                              dspeed = d(t.speed),
                              u = dspeed * (g ? h.info[g].speed : h.info.aps)) : t.aps && (u = d(t.aps)),
                              t.ias) {
                                  var A = 1 + .01 * d(t.ias);
                                  u *= A,
                                  dspeed && (dspeed *= A)
                              }
                              var P = void 0;
                              if (t.fpa && (u = 60 / (P = t.speed ? r.calcFramesFull(t.fpa, g, !!t.slowest, dspeed, t.round, h) : {
                                  frames: Math.floor(t.fpa / u) + ("up" === t.round ? 1 : 0)
                              }).frames),
                              !c) {
                                  var N = '<span class="d3-color-white">' + r.formatNumber(u, 2, 1e4) + "</span>";
                                  if (P) {
                                      if (y.line(!1, "Speed: {0} ({1} frames)", N, s(P.frames, 1, "white")),
                                      !t.nobp && (M.push(P.frames),
                                      k.line("{0}: {1} frames ({2} APS)", o(t.name || a), s(P.frames, 0, "white"), N),
                                      t.speed && (P.sequence = S,
                                      k.breakpoints(h, P)),
                                      t.total)) {
                                          var C;
                                          if (P.framesmh && P.framesoh) {
                                              var j = Math.floor(t.total / (P.framesmh + P.framesoh))
                                                , D = t.total - j * (P.framesmh + P.framesoh);
                                              C = 2 * j,
                                              D && (C += (D > P.framesmh ? 1 : .5) + (D > P.framesoh ? 1 : .5))
                                          } else
                                              C = Math.ceil(t.total / P.frames);
                                          y.line(!1, "Total ticks: {0} ({1} damage)", s(C, 1, "white"), '<span class="d3-color-green">' + r.formatNumber(p * (f * (t.cd || 1)) * C, 0, 1e4) + "</span>")
                                      }
                                  } else
                                      y.line(!1, "Speed: {0}", N)
                              }
                              S ? F += 1 / u : t.cd ? f *= Math.min(1, t.cd * u) : f *= u
                          } else
                              t.refspeed && (void 0 === v[t.refspeed] ? x = !1 : (t.cd ? f *= Math.min(1, t.cd / v[t.refspeed]) : f /= v[t.refspeed],
                              y.line(!1, "Speed: {0}", s(1 / v[t.refspeed], 2, "white"))));
                          _ += p * f
                      } else
                          x = !1
                  }
              }),
              S && x && (F > .1 ? (_ /= F,
              v[g] = F,
              (A = new t).line("Sequence length: {0} seconds", s(F, 2, "white")),
              y = A.add(y)) : x = !1),
              x) {
                  if (l[g].value = _,
                  !c) {
                      l[g].text = r.formatNumber(_, 0, 1e4);
                      var A = new t(o(g).replace("DPS", o("Damage Per Second")),l[g].text);
                      A.add(e[g].tip),
                      A.add(y),
                      l[g].tip = A.html(),
                      e[g].nobp || (m.add(k),
                      u = u.concat(M))
                  }
              } else
                  b.push(g)
          }
          if (b.length >= p.length)
              break;
          p = b
      }
      for (w = 0; w < p.length; ++w)
          delete l[p[w]];
      if (u.length && !c) {
          for (var P = [], N = 0; N < u.length; ++N)
              P.push(o("{0} frames").format(u[N]));
          var C = "Breakpoint" + (P.length > 1 ? "s" : "")
            , P = P.join(" / ");
          m.header(C, P),
          l[C] = {
              value: u,
              text: P,
              tip: m.html()
          }
      }
      return l
  }
}();
!function() {
  function i(i, s) {
      var e = s.constructor;
      e || (e = function() {
          this.parent.apply(this, arguments)
      }
      ),
      delete s.constructor;
      var t = function() {};
      t.prototype = i.prototype,
      e.prototype = new t,
      e.prototype.uber = i;
      for (var a in s)
          e.prototype[a] = s[a];
      return e
  }
  function s(i) {
      function s(i, s, a, n, o) {
          i.data("box", t);
          var l = !1;
          i.draggable({
              zIndex: 100,
              cursor: "-webkit-grabbing",
              appendTo: "body",
              tolerance: o || "intersect",
              distance: 4,
              helper: a,
              start: function(i, s) {
                  if (!t[t.type])
                      return setTimeout(function() {
                          $("body").css("cursor", "")
                      }),
                      !1;
                  n(!0),
                  e.tooltip && e.tooltip.disable()
              },
              revert: function(i) {
                  return e.tooltip && e.tooltip.enable(),
                  !i
              },
              stop: function() {
                  if (l)
                      return !1;
                  setTimeout(function() {
                      n(!1)
                  }, 0)
              }
          }),
          s.droppable({
              hoverClass: "selected",
              accept: function(i) {
                  var s = i.data("box");
                  return !(!s || s.type !== t.type || !s[s.type] || s === t) && (t.accept(s[s.type]) && s.accept(t[t.type]))
              },
              drop: function(i, s) {
                  var a = s.draggable.data("box");
                  if (!a || a.type !== t.type || a === t)
                      return !1;
                  var n = a[a.type];
                  n && t.accept(n) && a.accept(t[t.type]) && (a._set(t[t.type]),
                  t._set(n),
                  e.trigger("updateSkills", !0))
              }
          })
      }
      if (this.paramList = [],
      this.line = $('<div class="skill-line"></div>'),
      i && i.append(this.line),
      this.initHeader(),
      this.readonly && this.header.addClass("readonly"),
      this.level && this.icon.append('<span class="skill-text">' + this.level + "</span>"),
      this.desc = $('<span class="skill-description"></span>'),
      this.line.append(this.header.append(this.icon, this.desc)),
      this.applybox = $('<input type="checkbox"></input>'),
      this.params = $('<ul class="skill-info"></ul>').hide(),
      this.initName(),
      this.apply.prepend(this.applybox),
      this.init && this.init(),
      this.header.mouseleave(function() {
          e.tooltip.hide()
      }),
      this.apply.click(function(i) {
          i.stopPropagation()
      }),
      this.updateParams(),
      !this.readonly) {
          var t = this;
          this.accept = function(i) {
              if (!i)
                  return !0;
              if ("skill" === this.type && 0 === this.index) {
                  var s = e.skills[e.charClass][i[0]];
                  if (!s || s.nolmb)
                      return !1
              }
              return !0
          }
          ,
          s(this.header, this.line, function() {
              return t.header.clone().addClass("class-" + e.charClass)
          }, function(i) {
              t.header.css("visibility", i ? "hidden" : "")
          });
          var a = "skill" === this.type ? e.getDollSkill : e.getDollPassive;
          a && (a = a(this.index)),
          a && s(a, a, function() {
              return $('<div class="class-' + e.charClass + '" style="width: 42px; height: 42px; position: absolute"></div>').append(a.clone().css("left", 0))
          }, function(i) {
              a.toggleClass("empty", i || !t[t.type])
          }, "pointer")
      }
      e.enableTouch(this.header)
  }
  var e = DiabloCalc
    , t = e.locale("ui-skills.js", "skilldata")
    , a = {
      weapon: {
          name: t("Weapon"),
          filter: function(i) {
              if (20 === e.seasonal)
                  return !0;
              var s = e.itemTypes[i] && e.itemTypes[i].slot;
              return "onehand" === s || "twohand" === s || "offhand" === s
          }
      },
      armor: {
          name: t("Armor"),
          filter: function(i) {
              return 20 === e.seasonal || !a.weapon.filter(i) && !a.jewelry.filter(i)
          }
      },
      jewelry: {
          name: t("Jewelry"),
          filter: function(i) {
              return 20 === e.seasonal || ("ring" === i || "amulet" === i)
          }
      },
      extra: {
          name: t("Extra"),
          valid: function() {
              return 22 === e.seasonal
          },
          filter: function(i) {
              return !0
          }
      }
  };
  e.getKanaiType = function(i) {
      var s = e.itemById[i];
      if (s)
          for (var i in a)
              if (a[i].filter(s.type))
                  return i
  }
  ;
  var n = {};
  s.prototype.initHeader = function() {
      this.header = $('<span class="passive-header readonly"></span>'),
      this.icon = $('<span class="item-icon"></span>')
  }
  ,
  s.prototype.initName = function() {
      this.name = $('<span class="skill-name"></span>'),
      this.desc.append(this.name, '<span class="skill-separator"></span>'),
      this.apply = $('<label class="passive-apply">' + t("Include in stats") + "</label>"),
      this.desc.append(this.apply),
      this.desc.append(this.params)
  }
  ,
  s.prototype.updateParams = function() {
      this.params.empty(),
      this.paramList = [];
      var i = this.getInfo();
      if (i && i.params) {
          var s = this;
          $.each(i.params, function(a, n) {
              n = i.params[a];
              if (!("skill" === s.type && n.rune && n.rune.indexOf(s.skill[1]) < 0)) {
                  var o = $('<span class="param-value"></span>').text(n.val + (n.percent ? "%" : ""))
                    , l = $("<div></div>").slider({
                      value: n.val,
                      min: n.min,
                      max: n.max,
                      step: n.step || 1,
                      slide: function(i, t) {
                          n.val = t.value,
                          o.text(t.value + (n.percent ? "%" : "")),
                          e.trigger("updateSkills"),
                          s.onChangeParam && s.onChangeParam()
                      }
                  }).click(function(i) {
                      i.stopPropagation(!0)
                  })
                    , r = (n.max - n.min) / (n.step || 1);
                  r <= 5 ? l.css("width", 40 * r) : l.css("width", "");
                  var h = $("<li></li>");
                  h.append('<span class="param-name"><b>' + t(n.name) + ":</b></span>", o, $('<div class="param-slider"></div>').append(l)),
                  s.paramList.push({
                      param: n,
                      value: o,
                      slider: l,
                      line: h
                  }),
                  s.params.append(h)
              }
          })
      }
  }
  ,
  s.prototype.getCurInfo = function(i, s) {
      var t = this.getCurInfo_ && this.getCurInfo_(i, s)
        , a = e.options.showElites ? 1 + .01 * (s.edmg || 0) : 1;
      if ("function" == typeof i.info) {
          if (t) {
              t = $.extend({}, t);
              for (var n in t)
                  "number" == typeof t[n] && (t[n] = e.formatNumber(t[n] * a, 0, 1e4))
          }
      } else if (i.info && t) {
          t = $.extend({}, t);
          for (var n in t)
              if ("string" == typeof t[n]) {
                  var o = t[n]
                    , l = void 0;
                  "@" != o[0] && "%" != o[0] || (l = o[0],
                  o = o.substring(1)),
                  "number" == typeof (o = e.execString(o, s, i.affixid || this.affix, i.params)) ? (l || (o *= a),
                  t[n] = "%" == l ? Math.floor(o) + "%" : e.formatNumber(o, 0, 1e4)) : t[n] = o
              }
      }
      return t
  }
  ,
  s.prototype.update = function() {
      var i = this.getInfo();
      if (!i)
          return this.apply.hide(),
          void (this.info && (this.info.remove(),
          this.info = void 0));
      var s = e.getStats()
        , a = !1;
      this.updateBox && !0 === this.updateBox(i, s) && (a = !0),
      this.apply[0].lastChild.nodeValue = t(i.activetip) || t("Include in stats");
      var n = !1
        , o = this;
      $.each(this.paramList, function(e, t) {
          var l = {
              min: t.param.min,
              max: t.param.max,
              val: t.param.val
          };
          t.value.text(l.val + (t.param.percent ? "%" : "")),
          t.slider.slider({
              value: l.val,
              min: l.min,
              max: l.max
          });
          var r = (l.max - l.min) / (t.param.step || 1);
          r <= 5 ? t.slider.css("width", 40 * r) : t.slider.css("width", "");
          var h = l.min !== l.max && (!1 !== i.active || !1 === t.param.buffs) && !a;
          n = n || h,
          h && t.param.show && (h = "skill" === o.type ? t.param.show.call(i, o.skill[1], s) : t.param.show.call(i, s)),
          t.line.toggle(!!h)
      }),
      this.params.toggle(n);
      var l;
      if (l = this.getCurInfo(i, s)) {
          var r = e.skill_processInfo(l, {
              affix: i.affixid || this.affix,
              params: i.params,
              skill: this.skill
          });
          this.skillData = r,
          this.info || (this.info = $("<ul></ul>").addClass("skill-info"),
          "skill" === this.type && this.skill ? this.line.append(this.info) : this.desc.append(this.info),
          this.info.click(function() {
              return !1
          })),
          this.info.empty(),
          $.each(r, function(i, s) {
              var a = $("<span><b>" + t(i) + ":</b> " + s.text + "</span>");
              s.tip && a.mouseover(function() {
                  return e.tooltip.showHtml(this, s.tip),
                  !1
              }).mouseleave(function() {
                  e.tooltip.hide()
              }),
              o.info.append($("<li></li>").append(a))
          })
      } else
          this.info && (this.info.remove(),
          delete this.info,
          delete this.skillData)
  }
  ,
  e.SkillBox = {},
  e.SkillBox.skill = i(s, {
      constructor: function(i, s) {
          this.type = "skill",
          this.index = s,
          this.level = [1, 2, 4, 9, 14, 19][s],
          this.uber(i)
      },
      initHeader: function() {
          void 0 !== this.index && this.line.append('<span class="skill-key skill-key-' + this.index + '"></span>'),
          this.header = $('<span class="skill-header"></span>'),
          this.icon = $('<span class="skill-icon"></span>'),
          this.icon.append('<span class="skill-frame"></span>')
      },
      initName: function() {
          this.apply = $('<label class="skill-bonus">' + t("Include in stats") + "</label>"),
          this.header.after(this.apply),
          this.line.append(this.params)
      },
      init: function() {
          this.setSkill();
          var i = this;
          this.header.mouseover(function() {
              if (i.skill && e.skills[e.charClass][i.skill[0]])
                  e.tooltip.showSkill(this, e.charClass, i.skill[0], i.skill[1]);
              else {
                  var s = i.getInfo();
                  s && e.tooltip.showAttack(this, s)
              }
          }),
          this.applybox.change(function() {
              var s = i.skill && e.skills[e.charClass][i.skill[0]];
              s && (s.active = this.checked,
              e.trigger("updateSkills"))
          })
      },
      getInfo: function() {
          if (!this.skill && void 0 !== this.index && this.index <= 1) {
              var i = e.itemSlots.mainhand.item;
              return i = i && e.itemById[i.id] && e.itemById[i.id].type,
              i = i && e.itemTypes[i].attack || "hand",
              e.skills.attack[i]
          }
          return this.skill && e.skills[e.charClass][this.skill[0]]
      },
      setSkill: function(i) {
          this.skill = i,
          this.desc.empty();
          var s = this.getInfo();
          this.info && this.line.append(this.info),
          s ? (this.icon.removeClass("empty"),
          void 0 !== s.row ? (this.icon.removeClass("skill-icon-attack"),
          this.icon.css("background-position", 42 * -s.col + "px " + 84 * -s.row + "px")) : (this.icon.addClass("skill-icon-attack").addClass(s.id),
          this.icon.css("background-position", "")),
          this.desc.append('<span class="skill-name">' + s.name + "</span>"),
          this.desc.append('<span class="skill-separator"></span>'),
          i ? this.desc.append('<span class="skill-rune"><span class="skill-rune-' + i[1] + '"></span> ' + ("x" === i[1] ? t("No Rune") : s.runes[i[1]]) + "</span>") : this.desc.append(this.info)) : (this.icon.addClass("empty"),
          this.icon.removeClass("skill-icon-attack"),
          this.desc.append('<span class="skill-none">' + t("Choose Skill") + "</span>"),
          this.desc.append('<span class="skill-separator"></span>')),
          this.updateParams()
      },
      _set: function(i) {
          this.setSkill(i)
      },
      updateBox: function(i, s) {
          this.applybox.prop("checked", !1 !== i.active),
          this.apply.toggle(!!(i.activeshow ? i.activeshow(this.skill[1], s) : e.getSkillBonus(this.skill, s)))
      },
      getCurInfo_: function(i, s) {
          if ("function" == typeof i.info)
              return i.info(this.skill[1], s);
          if (i.info && this.skill) {
              var e = i.info[this.skill[1]];
              return i.info["*"] && (e = $.extend({}, i.info["*"], e)),
              e
          }
          return i.info ? i.info : void 0
      }
  }),
  e.SkillBox.passive = i(s, {
      constructor: function(i, s) {
          this.type = "passive",
          this.index = s,
          s >= 0 ? this.level = [10, 20, 30, 70][s] : this.readonly = !0,
          this.uber(i)
      },
      initHeader: function() {
          this.header = $('<span class="passive-header"></span>'),
          this.icon = $('<span class="passive-icon"></span>'),
          this.icon.append('<span class="passive-frame"></span>')
      },
      init: function() {
          this.setPassive();
          var i = this;
          this.header.mouseover(function() {
              i.passive && e.passives[e.charClass][i.passive] && e.tooltip.showSkill(this, e.charClass, i.passive)
          }),
          this.applybox.click(function(s) {
              var t = i.passive && e.passives[e.charClass][i.passive];
              t && (t.active = this.checked,
              e.trigger("updateSkills")),
              s.stopPropagation()
          })
      },
      getInfo: function() {
          return this.passive && e.passives[e.charClass][this.passive]
      },
      setPassive: function(i) {
          this.passive = i;
          var s = i && e.passives[e.charClass][i];
          s ? (this.applybox.prop("checked", !1 !== s.active),
          this.icon.removeClass("empty"),
          this.icon.css("background-position", 42 * -s.index + "px 0"),
          this.name.removeClass().addClass("skill-name").text(s.name)) : (this.icon.addClass("empty"),
          this.name.removeClass().addClass("skill-none").text(t("Choose Skill"))),
          this.updateParams()
      },
      _set: function(i) {
          this.setPassive(i)
      },
      updateBox: function(i, s) {
          var t = e.getPassiveBonus(this.passive, s);
          this.apply.toggleClass("always", void 0 === i.active),
          this.applybox.prop("disabled", void 0 === i.active),
          this.applybox.prop("checked", !1 !== i.active),
          this.apply.toggle(!!t)
      },
      getCurInfo_: function(i, s) {
          return "function" == typeof i.info ? i.info(s) : i.info
      }
  }),
  e.SkillBox.gem = i(s, {
      constructor: function(i, s) {
          this.type = "gem",
          this.gem = s,
          this.readonly = !0,
          this.uber(i)
      },
      getInfo: function() {
          return this.gem && e.legendaryGems[this.gem]
      },
      init: function() {
          var i = e.legendaryGems[this.gem];
          this.applybox.prop("disabled", !!i.always),
          this.apply.toggleClass("always", !!i.always),
          this.apply.toggle(i.always || void 0 !== i.active),
          this.icon.css("background-image", "url(" + e.getItemIcon(this.gem) + ")");
          var s = this;
          this.header.mouseover(function() {
              s.gem && e.tooltip.showGem(this, s.gem, e.getStats().gems[s.gem])
          }),
          this.applybox.click(function(i) {
              var t = s.gem && e.legendaryGems[s.gem];
              t && (t.active = this.checked,
              e.trigger("updateSkills")),
              i.stopPropagation()
          })
      },
      updateBox: function(i, s) {
          var e = !1;
          if (i.check && "function" == typeof i.buffs) {
              var a = i.buffs(s.gems[this.gem] || 0, s);
              this.apply.toggle(!!a),
              a || (e = !0)
          } else {
              var n = !!i.effects[0].stat;
              s.gems[this.gem] && s.gems[this.gem] >= 25 && (n = n || !!i.effects[1].stat),
              this.apply.toggle(n)
          }
          return this.applybox.prop("checked", !(!i.always && !i.active)),
          this.name.html(i.name + (s.gems[this.gem] ? ' <span class="gem-rank">&#x2013; ' + t("Rank {0}").format(s.gems[this.gem]) + "</span>" : "")),
          e
      },
      getCurInfo_: function(i, s) {
          return "function" == typeof i.info ? i.info(s.gems[this.gem], s) : i.info
      }
  }),
  e.SkillBox.affix = i(s, {
      constructor: function(i, s) {
          this.type = "affix",
          this.affix = s,
          this.readonly = !0,
          this.uber(i)
      },
      init: function() {
          var i = e.itemaffixes[this.affix];
          this.apply.toggle(void 0 !== i.active);
          var s = this;
          if (this.header.mouseover(function() {
              var i = e.getStats();
              i.affixes[s.affix] && e.tooltip.showItem(this, i.affixes[s.affix].slot)
          }),
          this.applybox.click(function(i) {
              var t = s.affix && e.itemaffixes[s.affix];
              t && (t.active = this.checked,
              e.trigger("updateSkills")),
              i.stopPropagation()
          }),
          i.boxnames) {
              this.boxes = [],
              this.boxlabels = [];
              for (var a = 0; a < i.boxnames.length; ++a) {
                  var n = $('<input type="checkbox"></input>')
                    , o = $('<label class="passive-apply">' + t(i.boxnames[a]) + "</label>").prepend(n);
                  this.boxes.push(n),
                  this.boxlabels.push(o),
                  this.params.before(o),
                  o.toggle(!1 !== i.active),
                  n.click(function(s) {
                      return function() {
                          i.boxvals[s] = $(this).prop("checked"),
                          e.trigger("updateSkills")
                      }
                  }(a))
              }
          }
      },
      getInfo: function() {
          return this.affix && e.itemaffixes[this.affix]
      },
      updateBox: function(i, s) {
          this.applybox.prop("checked", !0 === i.active);
          var a = e.getSlotId(s.affixes[this.affix].slot)
            , n = e.itemById[a];
          if (n && this.icon.css("background-image", "url(" + e.getItemIcon(n.id) + ")"),
          s.affixes[this.affix].set) {
              var o = e.itemSets[s.affixes[this.affix].set].name;
              s.affixes[this.affix].pieces && (o += ' <span class="gem-rank">&#x2013; ' + t("{0} pieces").format(s.affixes[this.affix].pieces) + "</span>"),
              this.name.html(o)
          } else
              n && this.name.text(n.name);
          if (this.boxlabels)
              for (var l = 0; l < this.boxlabels.length; ++l)
                  this.boxlabels[l].toggle(!1 !== i.active)
      },
      getCurInfo_: function(i, s) {
          return "function" == typeof i.info ? i.info(s.affixes[this.affix].value, s) : i.info
      }
  }),
  e.SkillBox.kanai = i(s, {
      constructor: function(i, s) {
          this.type = "kanai",
          this.kanai = s,
          this.readonly = !0,
          this.uber(i)
      },
      valid: function() {
          return !a[this.kanai].valid || a[this.kanai].valid()
      },
      init: function() {
          var i = this;
          this.onInner = !1,
          this.namebox = $('<select class="skill-namelist empty"></select>'),
          this.fillnames(),
          this.desc.addClass("chosen-noframe"),
          this.name.replaceWith(this.namebox),
          this.namebox.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              allow_single_deselect: !0,
              search_contains: !0,
              placeholder_text_single: t("Choose {0}").format(a[this.kanai].name),
              populate_func: function() {
                  i.fillnames()
              }
          }).change().change(function() {
              i.onChangeItem(),
              e.trigger("updateSkills")
          }),
          e.chosenTips(this.namebox, function(s) {
              if (e.itemById[s]) {
                  i.onInner = !0;
                  var t = e.itemById[s]
                    , a = t.required.custom.args;
                  void 0 === a && (a = 1),
                  a = 1 === a ? "min" === t.required.custom.best ? [t.required.custom.min || 1] : [t.required.custom.max || 1] : void 0,
                  e.tooltip.showItem(this, s, a)
              }
          }),
          e.chosen_addIcons(this.namebox, function(i) {
              var s = e.itemById[i];
              if (s) {
                  var t = e.itemIcons
                    , a = t ? t[i] : void 0;
                  return void 0 !== a ? '<span style="background: url(css/items/' + s.type + ".png) 0 -" + 24 * a[0] + 'px no-repeat"></span>' : void 0
              }
          }),
          e.chosen_fixSearch(this.namebox, function(i, s) {
              var t = e.itemById[i];
              if (t)
                  return !!s(t.name) || (!!(t.required && t.required.custom && s(t.required.custom.format)) || void 0)
          }),
          this.setItemEffect(),
          this.header.mouseover(function() {
              if (i.onInner)
                  return i.onInner = !1,
                  !0;
              var s = i.namebox.val();
              if (e.itemById[s]) {
                  var t = e.itemById[s]
                    , a = t.required.custom.args;
                  void 0 === a && (a = 1),
                  a = 1 === a ? "min" === t.required.custom.best ? [t.required.custom.min || 1] : [t.required.custom.max || 1] : void 0,
                  e.tooltip.showItem(this, s, a)
              }
          }),
          this.applybox.click(function(s) {
              var t = i.getInfo();
              t && (t.active = this.checked,
              e.trigger("updateSkills")),
              s.stopPropagation()
          })
      },
      fillnames: function() {
          var i = this
            , s = this.namebox.val();
          this.namebox.empty(),
          this.namebox.append('<option value="">' + (e.noChosen ? t("Choose {0}").format(a[this.kanai].name) : "") + "</option>");
          var n = {};
          $.each(e.items, function(s, o) {
              if (o.required && o.required.custom && !1 !== o.required.custom.cube && (!e.options.hideLegacy || o.suffix !== t("Legacy"))) {
                  var l = o.required.custom.id;
                  if (!(o.classes && o.classes.indexOf(e.charClass) < 0)) {
                      var r = e.itemTypes[o.type];
                      r.classes && r.classes.indexOf(e.charClass) < 0 || e.itemPowerClasses && e.itemPowerClasses[l] && e.itemPowerClasses[l] !== e.charClass || a[i.kanai].filter(o.type) && (o.required.custom.args < 0 || (n[o.type] || (n[o.type] = []),
                      n[o.type].push(o)))
                  }
              }
          });
          for (var o in n) {
              var l = '<optgroup label="' + e.itemTypes[o].name + '">';
              n[o].sort(function(i, s) {
                  return i.name.localeCompare(s.name)
              });
              for (var r = 0; r < n[o].length; ++r) {
                  var h = n[o][r]
                    , p = "";
                  h.id === s && (p = '" selected="selected'),
                  l += '<option class="item-info-icon quality-' + (h.quality || "rare") + '" value="' + h.id + p + '">' + h.name + (h.suffix ? " (" + h.suffix + ")" : "") + "</option>"
              }
              this.namebox.append(l + "</optgroup")
          }
      },
      getInfo: function() {
          return n[this.namebox.val()]
      },
      onChangeItem: function() {
          if (this.boxlabels) {
              for (r = 0; r < this.boxlabels.length; ++r)
                  this.boxlabels[r].remove();
              delete this.boxlabels
          }
          var i = this.namebox.val()
            , s = e.itemById[i]
            , a = this.namebox;
          if (e.noChosen || (a = a.next()),
          a.toggleClass("empty", !s),
          !s)
              return this.icon.hide(),
              this.apply.hide(),
              void this.updateParams();
          this.icon.css("background-image", "url(" + e.getItemIcon(i) + ")"),
          this.icon.show();
          var o = s.required && s.required.custom;
          o && e.itemaffixes[o.id] && this.apply.toggle(void 0 !== e.itemaffixes[o.id].active);
          var l = n[i];
          if (l || (l = {},
          o && e.itemaffixes[o.id] && ((l = e.itemaffixes[o.id]).affixid = o.id),
          n[i] = l),
          l.boxnames) {
              this.boxes = [],
              this.boxlabels = [];
              for (var r = 0; r < l.boxnames.length; ++r) {
                  var a = $('<input type="checkbox"></input>')
                    , h = $('<label class="passive-apply">' + t(l.boxnames[r]) + "</label>").prepend(a);
                  this.boxes.push(a),
                  this.boxlabels.push(h),
                  this.params.before(h),
                  h.toggle(!1 !== l.active),
                  a.click(function(i) {
                      return function() {
                          l.boxvals[i] = $(this).prop("checked"),
                          e.trigger("updateSkills")
                      }
                  }(r))
              }
          }
          this.updateParams()
      },
      setItemEffect: function(i) {
          this.namebox.val(i),
          this.namebox.trigger("chosen:updated"),
          this.onChangeItem()
      },
      getItemPair: function() {
          var i = this.namebox.val();
          if (e.itemById[i])
              return i
      },
      setItemPair: function(i) {
          i instanceof Array ? this.setItemEffect(i[0]) : this.setItemEffect(i)
      },
      getItemAffix: function() {
          var i = e.itemById[this.namebox.val()];
          return i && i.required && i.required.custom && i.required.custom.id
      },
      getItemAffixValue: function() {
          var i = e.itemById[this.namebox.val()]
            , s = i.required.custom.args;
          return void 0 === s && (s = 1),
          1 === s ? "min" === i.required.custom.best ? i.required.custom.min || 1 : i.required.custom.max || 1 : 1
      },
      updateBox: function(i, s) {
          if (this.applybox.prop("checked", !0 === i.active),
          this.shown = !0,
          i.info || void 0 !== i.active || i.params || (this.shown = !1),
          i.check) {
              this.shown = !1;
              var e = [this.getItemAffixValue()];
              "function" == typeof i.info ? i.info(e, s) && (this.shown = !0) : i.info && (this.shown = !0),
              (void 0 !== i.active || i.params) && ("function" == typeof i.buffs ? i.buffs(e, s) && (this.shown = !0) : i.buffs && (this.shown = !0))
          }
          if (this.apply.toggle(this.shown && void 0 !== i.active),
          !this.shown)
              return this.params.hide(),
              void (this.info && (this.info.remove(),
              delete this.info));
          if (this.boxlabels)
              for (var t = 0; t < this.boxlabels.length; ++t)
                  this.boxlabels[t].toggle(!1 !== i.active)
      },
      getCurInfo_: function(i, s) {
          return "function" == typeof i.info ? i.info(s[i.affixid], s) : i.info
      }
  }),
  e.SkillBox.buff = i(s, {
      constructor: function(i, s) {
          this.type = "buff",
          this.buff = s,
          this.readonly = !0,
          this.uber(i)
      },
      initHeader: function() {
          "skill" === this.buff.type || "custom" === this.buff.type ? e.SkillBox.skill.prototype.initHeader.call(this) : "passive" === this.buff.type ? e.SkillBox.passive.prototype.initHeader.call(this) : this.uber.prototype.initHeader.call(this)
      },
      initName: function() {
          "skill" === this.buff.type ? e.SkillBox.skill.prototype.initName.call(this) : this.uber.prototype.initName.call(this)
      },
      init: function() {
          var i = !1
            , s = this;
          if ("skill" === this.buff.type) {
              o = e.skills[this.buff.charClass][this.buff.id];
              if (this.icon.removeClass("empty"),
              this.icon.css("background-position", 42 * -o.col + "px " + 84 * -o.row + "px"),
              this.desc.append('<span class="skill-name">' + o.name + "</span>"),
              this.desc.append('<span class="skill-separator"></span>'),
              this.buff.multiple) {
                  this.header.removeClass("skill-header").addClass("passive-header"),
                  this.runebox = {};
                  for (var a in this.buff.runes)
                      this.runebox[a] = $('<input type="checkbox"></input>').click(function(i) {
                          return function() {
                              s.buff.runevals[i] = $(this).prop("checked"),
                              e.trigger("updateSkills")
                          }
                      }(a)),
                      this.desc.append($('<label class="rune-box"></label>').append(this.runebox[a], '<span class="skill-rune"><span class="skill-rune-' + this.buff.runelist + '"></span> ' + this.buff.runes[a] + "</span>").mouseover(function(i) {
                          return function() {
                              return e.tooltip.showSkill(this, s.buff.charClass, s.buff.id, i, !0),
                              !1
                          }
                      }(a)).mouseleave(function() {
                          e.tooltip.hide()
                      }));
                  this.apply.hide()
              } else if (this.buff.runelist.length > 1 || "*" === this.buff.runelist) {
                  this.runebox = $('<select class="skill-runelist"></select>');
                  for (var a in this.buff.runes)
                      this.runebox.append('<option class="skill-rune-option rune-' + a + '" value="' + a + '">' + this.buff.runes[a] + "</option>");
                  this.desc.addClass("chosen-noframe"),
                  this.desc.append(this.runebox);
                  var n = void 0;
                  this.runebox.chosen({
                      disable_search: !0,
                      inherit_select_classes: !0
                  }).change(function() {
                      var i = $(this).next().find("span").first();
                      n && i.removeClass(n),
                      n = "rune-" + $(this).val(),
                      i.addClass("skill-rune-option " + n)
                  }).change().change(function() {
                      s.buff.runevals = $(this).val(),
                      e.trigger("updateSkills")
                  }),
                  e.chosenTips(this.runebox, function(t) {
                      "*" != t && (i = !0,
                      e.tooltip.showSkill(this, s.buff.charClass, s.buff.id, t, !0))
                  })
              } else
                  this.desc.append('<span class="skill-rune"><span class="skill-rune-' + this.buff.runelist + '"></span> ' + this.buff.runes[this.buff.runelist] + "</span>");
              this.header.mouseover(function() {
                  if (s.buff.multiple)
                      e.tooltip.showSkill(this, s.buff.charClass, s.buff.id);
                  else {
                      if (i)
                          return i = !1,
                          !0;
                      e.tooltip.showSkill(this, s.buff.charClass, s.buff.id, s.runebox ? s.runebox.val() : s.buff.runelist)
                  }
              })
          } else if ("passive" === this.buff.type) {
              var o = e.passives[this.buff.charClass][this.buff.id];
              this.icon.removeClass("empty"),
              this.icon.css("background-position", 42 * -o.index + "px 0"),
              this.name.removeClass().addClass("skill-name").text(o.name),
              this.header.mouseover(function() {
                  e.tooltip.showSkill(this, s.buff.charClass, s.buff.id)
              })
          } else if ("affix" === this.buff.type) {
              var l = e.itemById[this.buff.item];
              l && (this.icon.css("background-image", "url(" + e.getItemIcon(l.id) + ")"),
              this.name.text(l.name),
              this.header.mouseover(function() {
                  var i = void 0;
                  s.buff.params && (i = [s.buff.params[0].val]),
                  e.tooltip.showItem(this, l.id, i)
              }))
          } else
              "gem" === this.buff.type ? (this.icon.css("background-image", "url(" + e.getItemIcon(this.buff.id) + ")"),
              this.name.text(e.legendaryGems[this.buff.id].name),
              this.header.mouseover(function() {
                  e.tooltip.showGem(this, s.buff.id, 25)
              })) : "custom" === this.buff.type && (this.icon.removeClass("empty"),
              this.icon.css("background-position", 42 * -this.buff.icon + "px 0"),
              this.name.removeClass().addClass("skill-name").text(this.buff.name),
              this.header.mouseover(function() {
                  e.tooltip.showCustomSkill(this, s.buff)
              }));
          if (this.applybox.prop("checked", this.buff.active),
          this.applybox.change(function() {
              if (s.buff.active = this.checked,
              s.boxlabels)
                  for (var i = 0; i < s.boxlabels.length; ++i)
                      s.boxlabels[i].toggle(this.checked);
              s.buff.params && s.params.toggle(this.checked),
              e.trigger("updateSkills")
          }),
          this.buff.boxnames) {
              this.boxes = [],
              this.boxlabels = [];
              for (var r = 0; r < this.buff.boxnames.length; ++r) {
                  var h = $('<input type="checkbox"></input>')
                    , p = $('<label class="' + ("skill" === this.buff.type ? "skill-bonus" : "passive-apply") + '">' + t(this.buff.boxnames[r]) + "</label>").prepend(h);
                  this.boxes.push(h),
                  this.boxlabels.push(p),
                  this.params.before(p),
                  p.toggle(!1 !== this.buff.active || this.buff.multiple),
                  h.click(function(i) {
                      return function() {
                          s.buff.boxvals[i] = $(this).prop("checked"),
                          e.trigger("updateSkills")
                      }
                  }(r))
              }
          }
          this.updateBoxes()
      },
      updateBoxes: function() {
          if (this.apply.toggle(!this.buff.multiple && void 0 !== this.buff.active),
          this.buff.multiple)
              for (var i in this.runebox)
                  this.runebox[i].prop("checked", !!this.buff.runevals[i]);
          else
              this.applybox.prop("checked", !!this.buff.active),
              this.runebox && this.runebox.val(this.buff.runevals).trigger("chosen:updated");
          if (this.boxlabels)
              for (s = 0; s < this.boxlabels.length; ++s)
                  this.boxlabels[s].toggle(!1 !== this.buff.active || !!this.buff.multiple);
          if (this.boxes)
              for (var s = 0; s < this.boxes.length; ++s)
                  this.boxes[s].prop("checked", !(!this.buff.boxvals || !this.buff.boxvals[s]));
          this.buff.params && this.params.toggle(!1 !== this.buff.active || !!this.buff.multiple),
          this.updateParams()
      },
      getInfo: function() {
          return this.buff
      },
      onChangeParam: function() {
          this.buff && "affix" === this.buff.type && e.tooltip.getNode() === this.header[0] && e.tooltip.showItem(this.header[0], this.buff.item, [this.buff.params[0].val])
      }
  })
}();
!function() {
  function e(e) {
      e.signin = void 0,
      e.signout = void 0,
      e.register = void 0,
      e.options = void 0,
      $.cookie("user_name") ? (e.signout = $("<span>" + t("sign&nbsp;out") + "</span>"),
      e.signout.click(function() {
          $.ajax({
              url: "account",
              data: {
                  action: "signout"
              },
              type: "POST",
              dataType: "json",
              success: function(e) {
                  s()
              },
              error: function(e) {
                  s()
              }
          })
      }),
      e.options = $("<span>" + t("settings") + "</span>"),
      e.options.click(function() {
          i.open("options")
      }),
      e.div.empty().append(t("Welcome, {0}").format($.cookie("user_name")) + " (", e.signout, ", ", e.options, ")"),
      e.updater && e.updater.call(e.div, !0)) : (e.signin = $("<span>" + t("Sign in") + "</span>"),
      e.signin.click(function() {
          i.open("signin")
      }),
      e.register = $("<span>" + t("register") + "</span>"),
      e.register.click(function() {
          i.open("register")
      }),
      e.div.empty().append(e.signin, t(" or "), e.register, (e.suffix || "") + "."),
      e.updater && e.updater.call(e.div, !1))
  }
  function s() {
      $("body").toggleClass("logged-in", !!$.cookie("user_name")),
      $.cookie("user_name") ? (console.log("signed in"),
      DiabloCalc.session.signedin = !0,
      DiabloCalc.session.user_level = $.cookie("user_level") || 0) : (DiabloCalc.session.signedin = !1,
      DiabloCalc.session.user_level = 0);
      for (var s = 0; s < a.length; ++s)
          e(a[s]);
      DiabloCalc.trigger("login", DiabloCalc.session.user_level)
  }
  var t = DiabloCalc.locale("account.js")
    , i = new function() {
      this.div = $('<div class="signin-dialog"></div>'),
      this.tip = $('<p class="tip"></p>'),
      this.name = $('<input type="text" name="user_name" class="text"></input>'),
      this.email = $('<input type="text" name="user_email" class="text"></input>'),
      this.reset_code = $('<input type="text" name="user_reset_code" class="text"></input>'),
      this.password = $('<input type="password" name="user_password" class="text"></input>'),
      this.password_old = $('<input type="password" name="user_password_old" class="text"></input>'),
      this.password_repeat = $('<input type="password" name="user_password_repeat" class="text"></input>'),
      this.remember = $('<input type="checkbox" name="user_remember" class="checkbox"></input>'),
      this.div.append(this.tip),
      this.fieldset = $("<fieldset></fieldset>"),
      this.form = $("<form></form>").append(this.fieldset),
      this.div.append(this.form);
      var e = DiabloCalc.localeTable.account
        , i = this;
      this.reset_fields = function(e) {
          this.name.val(""),
          this.email.val("options" === this.mode ? $.cookie("user_email") || "" : ""),
          this.reset_code.val("reset" === this.mode ? e : ""),
          this.password.val(""),
          this.password_old.val(""),
          this.password_repeat.val("")
      }
      ,
      this.open = function(s, t) {
          this.mode = s,
          this.reset_fields(t),
          this.fieldset.empty();
          var a = 210;
          for (var o in e[s].fields) {
              var n = $("<label>" + e[s].fields[o] + "</label>");
              "checkbox" === this[o].attr("type") ? (n.prepend(this[o]),
              a += 5) : (n.append(this[o]),
              a += 55),
              this.fieldset.append(n)
          }
          this.fieldset.append('<input type="submit" tabindex="-1" style="position:absolute; top:-1000px"></input>'),
          this.tip.text(e[s].tip);
          var r = {};
          for (var l in e[s].buttons)
              r[e[s].buttons[l]] = function(e) {
                  return function() {
                      i.handlers[e].call(i)
                  }
              }(l);
          this.div.dialog({
              height: a,
              title: e[s].title,
              buttons: r
          }).dialog("open")
      }
      ,
      this.all_fields = $([]).add(this.name).add(this.email).add(this.reset_code).add(this.password).add(this.password_repeat).add(this.password_old),
      this.all_fields.focus(function() {
          $(this).removeClass("error")
      }),
      this.set_tip = function(e) {
          this.tip.text(e).addClass("highlight"),
          setTimeout(function() {
              i.tip.removeClass("highlight", 1500)
          }, 500)
      }
      ,
      this.check_length = function(e, s, i, a) {
          return !(e.val().length < i || e.val().length > a) || (e.addClass("error"),
          this.set_tip(t("Length of {0} must be between {1} and {2}.").format(s, i, a)),
          !1)
      }
      ,
      this.check_regexp = function(e, s, t) {
          return !!t.test(e.val()) || (e.addClass("error"),
          this.set_tip(s),
          !1)
      }
      ,
      this.validate = function() {
          var s = !0;
          this.all_fields.removeClass("error");
          var i = e[this.mode].fields;
          if (i.name && (s = (s = s && this.check_length(this.name, "username", 2, 16)) && this.check_regexp(this.name, t("Username may only consist of a-z and 0-9."), /^[a-z0-9._]+$/i)),
          i.reset_code && (s = s && this.check_regexp(this.reset_code, t("Invalid reset code"), /^[0-9a-f]{32}$/)),
          i.email && (this.email.val() || "recover" === this.mode) && (s = (s = s && this.check_length(this.email, "e-mail", 4, 128)) && this.check_regexp(this.email, t("Specify a valid e-mail address"), /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)),
          i.password && (this.password.val() || "options" !== this.mode) && (s = s && this.check_length(this.password, "password", 6, 64),
          i.password_repeat && s && this.password.val() !== this.password_repeat.val() && (this.password_repeat.addClass("error"),
          this.set_tip(t("Passwords do not match.")),
          s = !1)),
          i.password_old && (s = s && this.check_length(this.password_old, "password", 6, 64)),
          s) {
              var a = {
                  action: this.mode
              };
              return i.name && (a.user_name = this.name.val()),
              i.email && this.email.val() && (a.user_email = this.email.val()),
              i.reset_code && (a.reset_code = this.reset_code.val()),
              i.password && (this.password.val() || "options" !== this.mode) && (a.password_hash = MD5("SmartSalt" + this.password.val())),
              i.password_old && (a.password_old_hash = MD5("SmartSalt" + this.password_old.val())),
              i.remember && this.remember.prop("checked") && (a.user_remember = !0),
              i.password_old && (a.user_name = $.cookie("user_name")),
              a
          }
      }
      ,
      this.hostname = "",
      this.handlers = {},
      this.default_handler = function() {
          var e = this.validate();
          e && $.ajax({
              url: "account",
              data: e,
              type: "POST",
              dataType: "json",
              success: function(e) {
                  "OK" === e.code ? (s(),
                  "options" === i.mode || "recover" === i.mode ? ("recover" === i.mode ? i.set_tip(t("Password reset link sent.")) : i.set_tip(t("Settings updated.")),
                  i.reset_fields()) : i.div.dialog("close")) : e.errors && e.errors.length ? i.set_tip(e.errors[0]) : i.set_tip(t("Unknown error."))
              },
              error: function(e) {
                  i.set_tip(t("Unknown error."))
              }
          })
      }
      ,
      this.handlers.register = this.default_handler,
      this.handlers.signin = this.default_handler,
      this.handlers.cancel = function() {
          this.div.dialog("close")
      }
      ,
      this.handlers.lostpassword = function() {
          setTimeout(function() {
              i.open("recover")
          }, 0)
      }
      ,
      this.handlers.already = function() {
          setTimeout(function() {
              i.open("reset")
          }, 0)
      }
      ,
      this.handlers.recover = this.default_handler,
      this.handlers.reset = this.default_handler,
      this.handlers.update = this.default_handler,
      this.form.on("submit", function(e) {
          e.preventDefault(),
          i.default_handler()
      }),
      this.div.dialog({
          autoOpen: !1,
          height: 400,
          width: 400,
          modal: !0,
          close: function() {
              i.form[0].reset(),
              i.all_fields.removeClass("error")
          }
      })
  }
    , a = [];
  s(),
  DiabloCalc.account = {
      makeLine: function(s, t) {
          var i = {
              div: $('<div class="signin-line"></div>'),
              suffix: s,
              updater: t
          };
          return e(i),
          a.push(i),
          i.div
      },
      reset: function(e) {
          i.open("reset", e)
      },
      userName: function() {
          return $.cookie("user_name")
      }
  }
}();
!function() {
  function t(t) {
      var e = [];
      if (t.max) {
          var s = t.min
            , i = t.max;
          "min" === t.best && (s = t.max,
          i = t.min);
          (a = Math.round((s + (i - s) * p.Optimizer.perfection) / (t.step || 1)) * (t.step || 1)) < t.min && (a = t.min),
          a > t.max && (a = t.max),
          e.push(a)
      }
      if (t.max2) {
          var a = Math.round(t.min2 + (t.max2 - t.min2) * p.Optimizer.perfection);
          a < t.min2 && (a = t.min2),
          a > t.max2 && (a = t.max2),
          e.push(a)
      }
      if (t.args < 0)
          for (var o in p.passives[p.charClass]) {
              e.push(o);
              break
          }
      return e
  }
  function e(t, e, s) {
      if (!t.affixes.all[e])
          return !1;
      var i = p.stats[e];
      if (!i)
          return !1;
      if (i.secondary && t.state.secondary >= t.affixes.secondary)
          return !1;
      if (!i.secondary && t.state.primary >= t.affixes.primary)
          return !1;
      if (t.state.groups[i.group || e])
          return !1;
      i.secondary ? t.state.secondary += 1 : t.state.primary += 1,
      t.state.groups[i.group || e] = !0;
      var a = s || t.affixes.all[e];
      if (t.imported && t.imported.stats && t.imported.stats[e]) {
          for (var o = !1, n = 0; n < a.length; ++n)
              a[n] > t.imported.stats[e][n] && (o = !0);
          o || (a = $.extend([], t.imported.stats[e]))
      }
      if (t.stats[e])
          if (i.dr)
              for (n = 0; n < a.length; ++n)
                  t.stats[e][n] = 100 - (100 - (t.stats[e][n] || 0)) * (100 - a[n]) / 100;
          else
              for (n = 0; n < a.length; ++n)
                  t.stats[e][n] = (t.stats[e][n] || 0) + a[n];
      else
          t.stats[e] = a;
      return !0
  }
  function s(s) {
      function i(e, s) {
          var i = {};
          for (var a in e) {
              var n = p.stats[n];
              n && o && n.classes && n.classes.indexOf(o) < 0 || (s && s[a] ? i[a] = s[a] : i[a] = "sockets" === a ? [e[a].max] : t(e[a]))
          }
          return i
      }
      var a = p.getSlot(s);
      if (a) {
          (a = $.extend(!0, {}, a)).info = p.itemById[a.id];
          var o = p.itemTypes[a.info.type].class;
          !o && a.info.set && (o = p.itemSets[a.info.set].class);
          var n = p.getStatCount(a.id);
          a.affixes = {
              primary: n[0],
              secondary: n[1],
              all: i(p.getItemAffixesById(a.id, a.ancient, !1))
          },
          a.state = {
              primary: 0,
              secondary: 0,
              groups: {}
          };
          for (var r = p.getItemPreset(a.id), l = 0; l < r.length; ++l)
              r[l] = p.smartListStats(r[l], a.affixes.all, o);
          a.affixes.preset = r;
          var c = p.getItemAffixesById(a.id, a.ancient, "only")
            , f = a.stats;
          a.stats = i(c, f);
          for (var d in c) {
              (h = p.stats[d]) && (h.secondary ? a.state.secondary += 1 : h.base || (a.state.primary += 1),
              c[d].noblock || (a.state.groups[h.group || d] = !0))
          }
          if (p.Optimizer.unlock && (delete a.enchant,
          delete a.imported),
          a.affixes.all.sockets) {
              a.gems = [];
              if ("onehand" === (s = p.itemTypes[a.info.type].slot) || "twohand" === s) {
                  var m = p.Optimizer.useGift;
                  if (!m && a.imported && f.sockets) {
                      var u = 0;
                      for (var d in f)
                          !p.stats[d] || p.stats[d].secondary || p.stats[d].caldesanns || p.stats[d].base || (u += 1);
                      u > a.affixes.primary && (m = !0)
                  }
                  m && (a.stats.sockets = a.affixes.all.sockets,
                  a.state.groups.sockets = !0)
              }
          }
          a.imported && (a.enchant ? a.affixes.preset = [[a.enchant]] : a.affixes.preset = []);
          for (var d in f) {
              var h = p.stats[d];
              h && (h.caldesanns ? a.stats[d] = f[d] : !a.imported || h.base || c[d] || "sockets" === d && a.stats.sockets || (a.enchant && a.enchant !== d ? e(a, d, f[d]) : a.enchant || a.affixes.preset.push([d])))
          }
          return a
      }
  }
  function i(t, e) {
      var s = p.getSlot(t);
      if (s) {
          if (s = $.extend(!0, {}, s),
          s.stats = {},
          Object.keys(e.stats).sort(function(t, e) {
              return (p.stats[t] && p.stats[t].prio || 0) - (p.stats[e] && p.stats[e].prio || 0)
          }).forEach(function(t) {
              s.stats[t] = e.stats[t]
          }),
          s.gems && s.stats.sockets && s.stats.sockets[0]) {
              e.gems || (e.gems = []);
              for (var i = 0; i < s.gems.length && e.gems.length < s.stats.sockets[0]; ++i)
                  s.gems[i] && p.legendaryGems[s.gems[i][0]] && e.gems.push(s.gems[i])
          }
          if (s.gems = e.gems,
          s.imported = e.imported,
          s.imported) {
              for (var a in s.stats)
                  if (e.affixes.all[a] && (!p.stats[a] || !p.stats[a].caldesanns)) {
                      if (!(a in s.imported.stats)) {
                          s.enchant = a;
                          break
                      }
                      if (s.imported.stats[a].length >= 1 && s.stats[a][0] !== s.imported.stats[a][0]) {
                          s.enchant = a;
                          break
                      }
                      if (s.imported.stats[a].length >= 2 && s.stats[a][1] !== s.imported.stats[a][1]) {
                          s.enchant = a;
                          break
                      }
                  }
              s.enchant || (s.enchant = s.imported.enchant)
          } else
              delete s.enchant;
          p.setSlot(t, s)
      }
  }
  function a(t) {
      return t = $.extend({}, t),
      t.stats = $.extend(!0, {}, t.stats),
      t.state = $.extend(!0, {}, t.state),
      t.gems && (t.gems = $.extend(!0, [], t.gems)),
      t
  }
  function o(t) {
      t = a(t);
      for (var s = 0, i = 0; i < t.affixes.preset.length; ++i) {
          var o = t.affixes.preset[i];
          if (o.length) {
              for (var n = !1, r = void 0, l = 0; l < o.length; ++l) {
                  if (t.stats[o[l]]) {
                      if (t.imported && t.imported.stats && t.imported.stats[o[l]]) {
                          n = !0;
                          for (var c = 0; c < t.stats[o[l]].length; ++c)
                              t.stats[o[l]][c] !== t.imported.stats[o[l]][c] && (n = !1)
                      } else
                          n = !0;
                      if (n)
                          break
                  }
                  r || p.stats[o[l]].classes && !(p.stats[o[l]].classes.indexOf(p.charClass) >= 0) || (r = o[l])
              }
              if (!n && !e(t, r || o[0], t.imported && t.imported.stats && t.imported.stats[r || o[0]]) && ++s > 1)
                  return !1
          }
      }
      return t
  }
  function n(t) {
      return t.finishLoad(),
      p.addSkillBonuses && p.addSkillBonuses(t),
      t.finalize(),
      t
  }
  function r(t, s, i, r, l) {
      function c(t, i, l) {
          if (t = a(t),
          e(t, i, l) && o(t)) {
              var p = u.clone();
              p.addItem(s, t),
              n(p);
              return (l = d.value(r, p)) > k && (k = l,
              y = t),
              t
          }
      }
      var d = f[i]
        , m = t[s]
        , u = new p.Stats(p.charClass);
      u.startLoad();
      for (var h in t)
          h !== s && u.addItem(h, t[h]);
      if (l)
          d.stats(r, m).forEach(function(t) {
              var s = a(m);
              e(s, t) && (m = s)
          }),
          t[s] = m;
      else {
          for (var v = d.stats(r, m).filter(function(t) {
              return e(a(m), t)
          }), g = {
              0: m
          }, k = 0, y = m, x = 1; x < 1 << v.length; ++x) {
              var b = -1;
              if (m.imported && !m.enchant)
                  for (j = 0; j < v.length; ++j)
                      x & 1 << j && !m.imported.stats[v[j]] && (b = j);
              if (b < 0)
                  for (b = 0; !(x & 1 << b); )
                      ++b;
              var S = x - (1 << b);
              if (g[S])
                  if (m.imported && !m.enchant && m.imported.stats[v[b]]) {
                      g[x] = c(g[S], v[b], m.imported.stats[v[b]]);
                      for (j = 0; j < v.length; ++j)
                          x & 1 << j && g[S = x - (1 << j)] && c(g[S], v[j])
                  } else {
                      var z = c(g[S], v[b]);
                      m.imported && !m.enchant || (g[x] = z)
                  }
          }
          m = t[s] = y
      }
      if (m.stats.sockets && m.gems.length < m.stats.sockets[0]) {
          var $ = p.itemTypes[m.info.type].slot
            , C = $ && (p.itemSlots[$] || p.metaSlots[$]) || {};
          if ("jewelry" !== C.socketType) {
              var O = "weapon" === C.socketType || "head" === C.socketType ? C.socketType : "other"
                , _ = m.gems.length
                , I = m.stats.sockets[0]
                , T = void 0;
              for (var w in p.gemColors) {
                  for (j = _; j < I; ++j)
                      m.gems[j] = [p.gemColors[w][O].amount.length - 1, w];
                  var E = u.clone();
                  E.addItem(s, m),
                  n(E);
                  var B = d.value(r, E);
                  B > k && (k = B,
                  T = w)
              }
              if (T)
                  for (var j = _; j < I; ++j)
                      m.gems[j] = [p.gemColors[T][O].amount.length - 1, T];
              else
                  m.gems.length = _
          }
      }
      return m
  }
  function l(t, s, i, n) {
      var r = t[s]
        , l = a(t[s]);
      if (e(l, i) && o(l) && (r = t[s] = l),
      r.stats.sockets && r.gems.length < r.stats.sockets[0]) {
          var c = p.itemTypes[r.info.type].slot
            , f = c && (p.itemSlots[c] || p.metaSlots[c]) || {};
          if ("jewelry" !== f.socketType) {
              var d = "weapon" === f.socketType || "head" === f.socketType ? f.socketType : "other"
                , m = void 0;
              for (var u in p.gemColors)
                  if (p.gemColors[u][d].stat === i) {
                      m = u;
                      break
                  }
              if (m)
                  for (; r.gems.length < r.stats.sockets[0]; )
                      r.gems.push([p.gemColors[m][d].amount.length - 1, m])
          }
      }
      return r
  }
  var p = DiabloCalc
    , c = DiabloCalc.locale("ui-equipment.js", "ui-skills.js", "skilldata");
  p.Optimizer = {
      perfection: 1,
      useGift: !0,
      unlock: !1
  };
  var f = {
      dps: {
          name: c("Damage"),
          options: {
              speed: {
                  type: "checkbox",
                  name: c("Attack speed")
              },
              elem: {
                  type: "select",
                  options: function() {
                      var t = {
                          "": c("No Element")
                      };
                      for (var e in {
                          phy: 1,
                          fir: 1,
                          col: 1,
                          psn: 1,
                          arc: 1,
                          lit: 1,
                          hol: 1
                      })
                          (!p.stats["dmg" + e].classes || p.stats["dmg" + e].classes.indexOf(p.charClass) >= 0) && (t["dmg" + e] = p.elements[e]);
                      return t
                  }
              },
              skill: {
                  type: "select",
                  options: function() {
                      var t = {
                          "": c("No Skill")
                      }
                        , e = p.extendStats([], "skill_" + p.charClass);
                      for (var s in p.skills[p.charClass])
                          e.indexOf("skill_" + p.charClass + "_" + s) >= 0 && (t["skill_" + p.charClass + "_" + s] = p.skills[p.charClass][s].name);
                      return t
                  }
              },
              elite: {
                  type: "checkbox",
                  name: c("vs Elites")
              }
          },
          stats: function(t, e) {
              var s = ["wpnphy", "damage", "chc", "chd", p.classes[p.charClass].primary];
              if (t.elem && s.push(t.elem),
              t.skill && s.push(t.skill),
              e) {
                  for (var i = void 0, a = 0; a < e.affixes.preset.length && !i; ++a)
                      for (var o = 0; o < e.affixes.preset[a].length; ++o) {
                          var n = e.affixes.preset[a][o];
                          if (p.stats[n] && p.stats[n].damage) {
                              i = n;
                              break
                          }
                      }
                  i && (s[0] = i)
              }
              var r = e && p.itemTypes[e.info.type].slot;
              return t.speed && s.push("onehand" === r || "twohand" === r ? "weaponias" : "ias"),
              t.elite && s.push("edmg"),
              s
          },
          value: function(t, e) {
              var s = t.speed ? e.info.dps : e.info.dph;
              return t.elem && (s *= 1 + .01 * (e[t.elem] || 0)),
              t.elite && (s *= 1 + .01 * (e.edmg || 0)),
              t.skill && (s *= (1 + .01 * ((e.damage || 0) + (e[t.skill] || 0))) / (1 + .01 * (e.damage || 0))),
              s
          }
      },
      toughness: {
          name: c("Toughness"),
          options: {},
          stats: function(t, e) {
              return ["vit", "life", "resall", "armor", "str", "dex", "int", "resphy", "resfir", "rescol", "respsn", "resarc", "reslit", "edef", "meleedef", "rangedef"]
          },
          value: function(t, e) {
              return e.info.toughnessmin
          }
      },
      healing: {
          name: c("Healing"),
          options: {},
          stats: function(t, e) {
              var s = e && p.itemTypes[e.info.type].slot
                , i = ["regen", "lph", "laek", "healbonus"];
              return t.speed && i.push("onehand" === s || "twohand" === s ? "weaponias" : "ias"),
              i
          },
          value: function(t, e) {
              return e.info.recoverymin
          }
      }
  }
    , d = $.extend({}, f);
  p.Optimizer.priority = [{
      stat: "sockets",
      options: {}
  }, {
      stat: "dps",
      options: {}
  }, {
      stat: "toughness",
      options: {}
  }],
  p.Optimizer.getOptions = function(t) {
      for (var e = 0; e < this.priority.length; ++e)
          if (this.priority[e].stat === t)
              return this.priority[e].options
  }
  ,
  p.Optimizer.optimizeAll = function() {
      p.importStart();
      var t = {};
      for (var e in p.itemSlots) {
          var a = s(e);
          a && (t[e] = a)
      }
      p.Optimizer.priority.forEach(function(e) {
          s = $.extend({}, t);
          if (f[e.stat]) {
              for (var s = $.extend({}, t), i = 0; i < 2; ++i)
                  for (var a in t)
                      s[a] = t[a],
                      r(s, a, e.stat, e.options, 0 == i);
              t = s
          } else
              for (var a in t)
                  "sockets" === e.stat && "offhand" === p.itemTypes[t[a].info.type].slot || l(t, a, e.stat, e.options)
      });
      for (var n in t)
          t[n] = o(t[n]) || t[n];
      for (var n in t)
          i(n, t[n]);
      DiabloCalc.importEnd("global")
  }
  ,
  p.Optimizer.dialog = function() {
      function t() {
          p.Optimizer.priority = [],
          a.find(".optimize-priority-item").each(function() {
              p.Optimizer.priority.push($(this).data("item"))
          }),
          p.trigger("updateStatPriority")
      }
      function e(t, e) {
          t.empty();
          var s = "";
          $.each(d, function(t, e) {
              s += '<option value="' + t + '">' + e.name + "</option>"
          }),
          t.append('<optgroup label="' + c("Composite Stats") + '">' + s + "</optgroup>"),
          p.getSkills && (s = "",
          p.getSkills().skills.forEach(function(t) {
              if (t) {
                  var e = "skillinfo_" + p.charClass + "_" + t[0];
                  f[e] || (f[e] = function(t, e) {
                      function s(t) {
                          var s = {
                              stats: t,
                              skill: [e, t.skills[e] || "x"],
                              affix: i.affixid,
                              params: i.params,
                              getCurInfo_: p.SkillBox.skill.prototype.getCurInfo_,
                              notip: !0
                          }
                            , a = p.SkillBox.skill.prototype.getCurInfo.call(s, i, t)
                            , o = p.skill_processInfo(a, s)
                            , n = {};
                          for (var r in o)
                              (!a[r] || "object" == typeof a[r] && void 0 === a[r].cooldown && void 0 === a[r].duration && void 0 === a[r].cost && void 0 === a[r].value) && void 0 !== o[r].value && (n[r] = o[r].value);
                          return n
                      }
                      var i = p.skills[t][e];
                      return {
                          name: i.name,
                          options: {
                              value: {
                                  type: "select",
                                  options: function() {
                                      var t = s(p.getStats())
                                        , e = {};
                                      for (var i in t)
                                          e[i] = c(i);
                                      return e
                                  }
                              }
                          },
                          stats: function(s, a) {
                              function o(t) {
                                  d.indexOf(t) < 0 && d.push(t)
                              }
                              function n(s) {
                                  if (s && "object" == typeof s)
                                      if (s.sum)
                                          for (var i in s)
                                              n(c[i]);
                                      else
                                          o("skill_" + t + "_" + (s && s.skill || e)),
                                          s && s.elem && o("max" === s.elem ? "dmg" + (r.info.maxelem || "fir") : "dmg" + s.elem)
                              }
                              if (!a)
                                  return [];
                              var r = p.getStats()
                                , l = {
                                  skill: [e, r.skills[e] || "x"],
                                  affix: i.affixid,
                                  params: i.params,
                                  getCurInfo_: p.SkillBox.skill.prototype.getCurInfo_,
                                  notip: !0
                              }
                                , c = p.SkillBox.skill.prototype.getCurInfo.call(l, i, r)
                                , d = f.dps.stats({
                                  speed: !0,
                                  elite: !0
                              }, a);
                              return n(c[s.value]),
                              d.push("cdr", "rcr"),
                              d
                          },
                          value: function(t, e) {
                              return s(e)[t.value] || 0
                          }
                      }
                  }(p.charClass, t[0])),
                  s += '<option value="' + e + '">' + f[e].name + "</option>"
              }
          }),
          s.length && t.append('<optgroup label="' + c("Skill Values") + '">' + s + "</optgroup>"));
          var i = p.options.limitStats ? p.charClass : null;
          $.each(p.statList, function(s, a) {
              $.each(a, function(a, o) {
                  "secondary" === s && (a += c(" (Secondary)"));
                  var n = "";
                  p.extendStats([], o).forEach(function(t) {
                      p.stats[t].caldesanns || i && p.stats[t].classes && p.stats[t].classes.indexOf(i) < 0 && t !== e || (n += '<option value="' + t + '">' + p.stats[t].name + "</option>")
                  }),
                  n && t.append('<optgroup label="' + a + '">' + n + "</optgroup>")
              })
          }),
          t.val(e)
      }
      function s(t) {
          var s = $('<li class="optimize-priority-item"></li>');
          s.data("item", t),
          a.find(".optimize-priority-list").append(s),
          s.append('<div class="header"><span class="btn-remove"></span><select class="optimize-stat"></select></div>');
          var i = $("<div></div>");
          s.append(i);
          var o = s.find("select");
          return e(o, t.stat),
          o.change(function() {
              t.stat = $(this).val(),
              i.empty(),
              f[t.stat] && $.each(f[t.stat].options, function(e, s) {
                  if ("checkbox" === s.type) {
                      (a = $('<label class="option-box"><input type="checkbox"></input>' + s.name + "</label>")).find("input").prop("checked", !!t.options[e]).click(function() {
                          t.options[e] = !!$(this).prop("checked"),
                          p.trigger("updateStatPriority")
                      }),
                      i.append(a)
                  } else {
                      var a = $('<select class="option-drop"></select>')
                        , o = s.options();
                      $.each(o, function(t, e) {
                          a.append('<option value="' + t + '">' + e + "</option>")
                      }),
                      (t.options[e] || "")in o || (t.options[e] = Object.keys(o)[0] || ""),
                      a.val(t.options[e]).change(function() {
                          t.options[e] = $(this).val(),
                          p.trigger("updateStatPriority")
                      }),
                      i.append(a)
                  }
              })
          }).change().change(function() {
              p.trigger("updateStatPriority")
          }),
          o.chosen({
              width: "300px",
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0,
              placeholder_text_single: c("Choose Stat")
          }),
          s.on("mouseenter", ".optimize-stat", function() {
              if (p.tooltip && f[t.stat]) {
                  var e = f[t.stat].stats(t.options);
                  if (e.length) {
                      var s = f[t.stat].name
                        , i = '<span class="d3-color-gold">' + c("Optimize {0} based on the following stats:").format(s) + "</span>";
                      e.forEach(function(t) {
                          i += '<br/><span class="tooltip-icon-bullet"></span>' + p.stats[t].name
                      }),
                      p.tooltip.showHtml(this, i)
                  }
              }
          }).on("mouseleave", ".optimize-stat", function() {
              p.tooltip && p.tooltip.hide()
          }),
          o
      }
      var i = $('<div class="optimize-dialog"><p><i>' + c("For best results, assign paragon, Caldesanns enchants and skills/passives before using the optimizer.") + "</i></p></div>");
      i.append('<div><label class="option-box"><input type="checkbox" class="option-unlock"></input>' + c("Unlock imported items") + "</label></div>"),
      i.find(".option-unlock").prop("checked", !!p.Optimizer.unlock).click(function() {
          p.Optimizer.unlock = !!$(this).prop("checked")
      }),
      i.append('<div><label class="option-box"><input type="checkbox" class="option-gift"></input>' + c("Use Ramaladni's Gift") + "</label></div>"),
      i.find(".option-gift").prop("checked", !!p.Optimizer.useGift).click(function() {
          p.Optimizer.useGift = !!$(this).prop("checked")
      }),
      i.append("<div>" + c("Set stat values to {0}%").format('<input class="option-perfection" type="number" min="0" max="100"></input>') + "</label></div>"),
      i.find(".option-perfection").val(Math.round(100 * p.Optimizer.perfection)).change(function() {
          var t = parseInt($(this).val()) || 0;
          t < 0 && (t = 0),
          t > 100 && (t = 100),
          $(this).val(t),
          p.Optimizer.perfection = .01 * t
      });
      var a = $('<div class="optimize-priority"><ul class="optimize-priority-list"></ul></div>');
      a.append('<div class="btn-add">' + c("Add stat") + "</div>"),
      i.append(a);
      var o = !1;
      return p.register("updateSkills", function() {
          a.find(".header select").each(function() {
              var t = $(this);
              e(t, t.val()),
              t.trigger("chosen:updated")
          })
      }),
      p.register("updateSlotItem", function() {
          o = !1;
          for (var t in p.itemSlots) {
              var s = p.getSlot(t);
              s && (s.imported && (o = !0))
          }
          $(".option-unlock").closest("div").toggle(o),
          a.find(".header select").each(function() {
              var t = $(this);
              e(t, t.val()),
              t.trigger("chosen:updated")
          })
      }),
      a.find(".btn-add").click(function() {
          var e = s({
              stat: "",
              options: {}
          });
          t(),
          setTimeout(function() {
              e.trigger("chosen:open")
          }, 0)
      }),
      a.on("click", ".btn-remove", function() {
          $(this).closest("li").remove(),
          t()
      }),
      a.find(".optimize-priority-list").sortable({
          handle: ".header",
          distance: 4,
          axis: "y",
          placeholder: "drop-ph",
          forcePlaceholderSize: !0,
          start: function() {
              a.find("select").trigger("chosen:close")
          },
          stop: function(e, s) {
              s.item.css({
                  position: "",
                  left: "",
                  top: ""
              }),
              setTimeout(t, 0)
          }
      }),
      p.Optimizer.updatePriority = function() {
          a.find(".optimize-priority-list").empty(),
          p.Optimizer.priority.forEach(s)
      }
      ,
      i
  }
}();
!function() {
  function a(a, l) {
      if ("custom" == l.id || "customwpn" == l.id) {
          var s = "offhand" === a ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[a].types;
          for (var e in s)
              if (!(s[e].classes && s[e].classes.indexOf(DiabloCalc.charClass) < 0) && ("customwpn" === l.id || !DiabloCalc.itemTypes[e].weapon) && ("customwpn" !== l.id || DiabloCalc.itemTypes[e].weapon))
                  return DiabloCalc.getItemIcon(DiabloCalc.itemTypes[e].generic)
      }
      return DiabloCalc.getItemIcon(l.id)
  }
  function l() {
      for (var a = $(".char-class").val(), l = DiabloCalc.getSkills(), s = 0; s < 6; ++s) {
          var e = l.skills[s];
          if (e) {
              i = DiabloCalc.skills[a][e[0]];
              c[s].removeClass("empty"),
              c[s].css("background-position", -42 * i.col + "px " + -84 * i.row + "px")
          } else
              c[s].addClass("empty")
      }
      for (s = 0; s < 4; ++s) {
          var o = l.passives[s];
          if (o) {
              var i = DiabloCalc.passives[a][o];
              n[s].removeClass("empty"),
              n[s].css("background-position", -42 * i.index + "px 0")
          } else
              n[s].addClass("empty")
      }
      for (var t in d)
          "extra" !== t || 22 === DiabloCalc.seasonal ? (d[t].show(),
          l.kanai[t] ? (d[t].removeClass("empty"),
          d[t].find(".icon").css("background-image", "url(" + DiabloCalc.getItemIcon(l.kanai[t]) + ")")) : d[t].addClass("empty")) : d[t].hide()
  }
  function s(a) {
      a.removeClass("empty-slot disabled-offhand");
      for (var l in DiabloCalc.qualities)
          a.removeClass("quality-" + l);
      return a
  }
  function e(l) {
      $(".char-class").val();
      var o = DiabloCalc.itemSlots[l]
        , i = DiabloCalc.getSlot(l);
      if (o.flourish && o.flourish.removeClass(),
      !i || !DiabloCalc.itemById[i.id])
          return s(o.dollFrame).addClass("doll-slot").addClass("slot-" + l).addClass("empty-slot"),
          o.dollImage.hide(),
          o.dollSockets && o.dollSockets.empty(),
          void (i || "offhand" != l || (i = DiabloCalc.getSlot("mainhand")) && DiabloCalc.itemById[i.id] && "twohand" == DiabloCalc.itemTypes[DiabloCalc.itemById[i.id].type].slot && (o.dollFrame.addClass("disabled-offhand"),
          o.dollImage.attr("src", a("mainhand", i)).show()));
      var t = DiabloCalc.itemById[i.id];
      if (s(o.dollFrame).addClass("doll-slot").addClass("slot-" + l).addClass("quality-" + t.quality),
      o.dollImage.attr("src", a(l, i)).show(),
      o.dollImage.toggleClass("ancient", !!i.ancient),
      o.flourish) {
          var c = null;
          for (var n in i.stats)
              if (DiabloCalc.stats[n].elemental) {
                  c = DiabloCalc.stats[n].elemental;
                  break
              }
          c && o.flourish.addClass("weapon-flourish").addClass(l + "-flourish").addClass("elemental-" + c)
      }
      if (o.dollSockets) {
          o.dollSockets.empty();
          for (var d = i.stats.sockets && i.stats.sockets[0] || 0, r = 0; r < d; ++r) {
              var p = $("<span></span>").addClass("socket");
              if (i.gems && r < i.gems.length) {
                  var C;
                  DiabloCalc.legendaryGems[i.gems[r][0]] ? C = DiabloCalc.getItemIcon(i.gems[r][0], "small") : DiabloCalc.gemQualities[i.gems[r][0]] && (C = DiabloCalc.getItemIcon(i.gems[r], "small")),
                  C && p.append($("<img></img>").attr("src", C))
              }
              o.dollSockets.append(p).append($("<br></br>"))
          }
      }
      "mainhand" == l && "twohand" == DiabloCalc.itemTypes[t.type].slot && e("offhand")
  }
  function o() {
      var a = $(".char-class").val();
      $(".paperdoll-background").parent().removeClass().addClass("paperdoll-container").addClass("class-" + a).addClass(DiabloCalc.gender || "female"),
      $(".paperdoll-background").removeClass().addClass("paperdoll-background").addClass(DiabloCalc.classes[a].follower ? "class-follower" : "class-character"),
      i.toggleClass("selected", "male" === DiabloCalc.gender),
      t.toggleClass("selected", "male" !== DiabloCalc.gender)
  }
  var i, t, c = [], n = [], d = {};
  DiabloCalc.getDollSkill = function(a) {
      return c[a]
  }
  ,
  DiabloCalc.getDollPassive = function(a) {
      return n[a]
  }
  ;
  var r = $(".paperdoll-background");
  DiabloCalc.itemSlots.mainhand.flourish = $('<span class="weapon-flourish mainhand-flourish"></span>'),
  DiabloCalc.itemSlots.offhand.flourish = $('<span class="weapon-flourish offhand-flourish"></span>'),
  r.append(DiabloCalc.itemSlots.mainhand.flourish).append(DiabloCalc.itemSlots.offhand.flourish);
  for (var p in DiabloCalc.itemSlots) {
      var C = DiabloCalc.itemSlots[p];
      if (C.dollFrame = $("<div></div>").addClass("doll-slot").addClass("slot-" + p).addClass("empty-slot").append('<span class="item-gradient"><span class="item-glow"></span></span>'),
      C.dollImage = $("<img></img>").hide(),
      C.dollFrame.append(C.dollImage),
      C.sockets) {
          var m = $("<span></span>").addClass("sockets-wrapper");
          C.dollSockets = $("<span></span>").addClass("sockets-align"),
          C.dollFrame.append(m.append(C.dollSockets))
      }
      !function(a) {
          C.dollFrame.hover(function() {
              DiabloCalc.tooltip && DiabloCalc.tooltip.showItem(this, a)
          }, function() {
              DiabloCalc.tooltip && DiabloCalc.tooltip.hide()
          })
      }(p),
      r.append(C.dollFrame)
  }
  for (var b = $("<div></div>").addClass("paperdoll-skills"), f = $("<div></div>").addClass("paperdoll-skills"), D = 0; D < 6; ++D) {
      (g = $("<span></span>").addClass("skill-icon").addClass("empty")).append('<span class="skill-frame"></span>'),
      g.css("left", 14 + (D < 2 ? 218 + 52 * D : 52 * (D - 2))),
      g.append('<span class="skill-text">' + [1, 2, 4, 9, 14, 19][D] + "</span>"),
      function(a) {
          g.hover(function() {
              if (DiabloCalc.getSkill && DiabloCalc.tooltip) {
                  var l = DiabloCalc.getSkill(a);
                  l && DiabloCalc.tooltip.showSkill(this, $(".char-class").val(), l[0], l[1])
              }
          }, function() {
              DiabloCalc.tooltip && DiabloCalc.tooltip.hide()
          }),
          g.click(function() {
              var l = DiabloCalc.getSkill(a);
              if (l && DiabloCalc.d3gl && DiabloCalc.d3gl.character && DiabloCalc.d3gl.enabled()) {
                  DiabloCalc.tooltip.hide();
                  var s = DiabloCalc.webglSkills && l && DiabloCalc.webglSkills[l[0]];
                  s && "object" == typeof s && "x"in s && (s = s[l[1]]),
                  s && DiabloCalc.d3gl.character.animate(s)
              } else
                  DiabloCalc.trigger("editSkill", a)
          })
      }(D),
      b.append(g),
      c.push(g)
  }
  for (D = 0; D < 4; ++D) {
      var g = $("<span></span>").addClass("passive-icon").addClass("empty");
      g.append('<span class="passive-frame fancy"></span>'),
      g.css("left", 50 + 66 * D),
      g.append('<span class="skill-text">' + [10, 20, 30, 70][D] + "</span>"),
      function(a) {
          g.hover(function() {
              if (DiabloCalc.getPassive && DiabloCalc.tooltip) {
                  var l = DiabloCalc.getPassive(a);
                  l && DiabloCalc.tooltip.showSkill(this, $(".char-class").val(), l)
              }
          }, function() {
              DiabloCalc.tooltip && DiabloCalc.tooltip.hide()
          }),
          g.click(function() {
              DiabloCalc.trigger("editPassive", a)
          })
      }(D),
      f.append(g),
      n.push(g)
  }
  r.parent().append(b).append(f);
  var u = $("<div></div>").addClass("paperdoll-cube");
  d.weapon = $('<span class="cube-item weapon empty"><span class="icon"></span></span>'),
  d.armor = $('<span class="cube-item armor empty"><span class="icon"></span></span>'),
  d.jewelry = $('<span class="cube-item jewelry empty"><span class="icon"></span></span>'),
  d.extra = $('<span class="cube-item extra empty"><span class="icon"></span></span>'),
  u.append(d.weapon, d.armor, d.jewelry, d.extra),
  r.parent().append(u),
  $.each(d, function(a, l) {
      l.hover(function() {
          if (DiabloCalc.getSkills) {
              var l = DiabloCalc.getSkills();
              l.kanai[a] && DiabloCalc.tooltip.showItem(this, l.kanai[a])
          }
      }, function() {
          DiabloCalc.tooltip.hide()
      }),
      l.click(function() {
          DiabloCalc.trigger("editKanai", a)
      })
  }),
  i = $('<span class="d3gl-button-male"></span>').click(function() {
      DiabloCalc.gender = "male",
      i.addClass("selected"),
      t.removeClass("selected"),
      DiabloCalc.updateClassIcon && DiabloCalc.updateClassIcon(),
      DiabloCalc.trigger("changeGender")
  }),
  t = $('<span class="d3gl-button-female selected"></span>').click(function() {
      DiabloCalc.gender = "female",
      i.removeClass("selected"),
      t.addClass("selected"),
      DiabloCalc.updateClassIcon && DiabloCalc.updateClassIcon(),
      DiabloCalc.trigger("changeGender")
  }),
  $(".paperdoll-container").append(i, t),
  DiabloCalc.register("changeClass", o),
  DiabloCalc.register("changeGender", function() {
      o();
      for (var a in DiabloCalc.itemSlots)
          e(a)
  }),
  o(),
  DiabloCalc.register("updateSlotStats", function(a) {
      DiabloCalc.tooltip && DiabloCalc.tooltip.getNode() == DiabloCalc.itemSlots[a].dollFrame[0] && DiabloCalc.tooltip.showItem(DiabloCalc.itemSlots[a].dollFrame[0], a)
  }),
  DiabloCalc.register("updateSlotItem", e),
  DiabloCalc.register("updateSkills", l),
  DiabloCalc.register("importEnd", function() {
      for (var a in DiabloCalc.itemSlots)
          e(a);
      l()
  })
}();
!function() {
  function t(t) {
      b.setSlot(t),
      DiabloCalc.tooltip.hide(),
      setTimeout(function() {
          var t = b.slot;
          if (DiabloCalc.itemSlots[t].item)
              b.itemBox.type.trigger("chosen:activate");
          else {
              var e, i = "offhand" === t ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[t].types, a = 0;
              for (var l in i)
                  i[l].classes && i[l].classes.indexOf(DiabloCalc.charClass) < 0 || "custom" !== l && (a += 1,
                  e = l);
              1 === a ? (b.itemBox.type.val(e),
              b.itemBox.type.trigger("chosen:updated"),
              b.itemBox.onChangeType(),
              setTimeout(function() {
                  b.itemBox.item.trigger("chosen:open")
              }, 0)) : b.itemBox.type.trigger("chosen:open")
          }
      }, 0)
  }
  function e(e) {
      var i = this;
      this.slot = e,
      this.slotData = DiabloCalc.itemSlots[e],
      this.accept = function(t) {
          if (!t || !DiabloCalc.itemById[t])
              return !1;
          if (this.inactive)
              return !1;
          var e = DiabloCalc.itemById[t].type
            , i = (this.slot ? DiabloCalc.itemSlots[this.slot].types : DiabloCalc.itemTypes)[e];
          if (!i)
              return !1;
          var a = !1
            , l = "offhand" === this.slot && !DiabloCalc.classes[DiabloCalc.charClass].dualwield;
          if ("offhand" === this.slot && "crusader" !== DiabloCalc.charClass && DiabloCalc.itemSlots.mainhand.item) {
              var o = DiabloCalc.itemById[DiabloCalc.itemSlots.mainhand.item.id]
                , s = o && o.type;
              DiabloCalc.itemTypes[s] && "twohand" == DiabloCalc.itemTypes[s].slot && (a = !0)
          }
          return (!a || "quiver" == e) && ((!l || "onehand" != i.slot || "handcrossbow" == e) && !(i.classes && i.classes.indexOf(DiabloCalc.charClass) < 0))
      }
      ,
      this.setItem = function(t, e) {
          if (!this.inactive) {
              if ("mainhand" === this.slot && t && DiabloCalc.itemById[t.id] && DiabloCalc.itemSlots.offhand.item && DiabloCalc.itemById[DiabloCalc.itemSlots.offhand.item.id]) {
                  var i = DiabloCalc.itemById[t.id].type
                    , a = DiabloCalc.itemById[DiabloCalc.itemSlots.offhand.item.id].type;
                  if (DiabloCalc.itemTypes[i] && "twohand" == DiabloCalc.itemTypes[i].slot && "crusader" != DiabloCalc.charClass && a && "quiver" != a && ("mainhand" !== b.slot && DiabloCalc.trigger("updateSlotItem", "offhand", "twohand"),
                  "stash" === e)) {
                      var l = s(DiabloCalc.itemSlots.offhand.item);
                      l && l.setItem(DiabloCalc.itemSlots.offhand.item)
                  }
              }
              b.slot === this.slot ? b.setItem(t) : (this.slotData.item = t,
              "mainhand" === this.slot && DiabloCalc.itemSlots.offhand.drop.updateTypes(),
              DiabloCalc.trigger("updateSlotItem", this.slot))
          }
      }
      ,
      this.getId = function() {
          return this.slotData.item ? this.slotData.item.id : void 0
      }
      ,
      this.getData = function() {
          return this.slotData.item
      }
      ,
      this.updateTypes = function(t, e) {
          this.inactive || (b.slot === this.slot ? b.itemBox.updateTypes(t) : DiabloCalc.itemSlots[this.slot].item && !DiabloCalc.isItemAllowed(this.slot, DiabloCalc.itemSlots[this.slot].item.id, e) && this.setItem(DiabloCalc.trimItem(this.slot, DiabloCalc.itemSlots[this.slot].item, e)))
      }
      ;
      var a = "clone";
      "neck" === e && (a = function() {
          return $('<img style="width: 52px; height: 52px;"></img>').attr("src", DiabloCalc.itemSlots.neck.dollImage.attr("src")).toggleClass("ancient", !(!DiabloCalc.itemSlots.neck.item || !DiabloCalc.itemSlots.neck.item.ancient))
      }
      ),
      this.slotData.dollImage.data("slot", this),
      this.reverting = !1,
      this.slotData.dollImage.draggable({
          zIndex: 100,
          cursor: "-webkit-grabbing",
          appendTo: "body",
          distance: 4,
          helper: a,
          start: function(t, e) {
              if (!i.slotData.item || $(".editframe").tabs("option", "active") !== DiabloCalc.TAB_EQUIPMENT)
                  return setTimeout(function() {
                      $("body").css("cursor", "")
                  }),
                  !1;
              u = i.slotData.dollImage,
              t.shiftKey || (i.slotData.dollImage.hide(),
              i.slotData.dollSockets && i.slotData.dollSockets.hide()),
              DiabloCalc.tooltip && DiabloCalc.tooltip.disable()
          },
          revert: function(t) {
              if (u = void 0,
              DiabloCalc.tooltip && DiabloCalc.tooltip.enable(),
              !t) {
                  if (!window.event)
                      return !0;
                  i.reverting = !0,
                  DiabloCalc.popupMenu(window.event, c.fixkey({
                      Delete: function() {
                          var t = i.slotData.dollImage.draggable("instance");
                          i.reverting = !1,
                          t && !1 !== t._trigger("stop", event) && t._clear(),
                          i.setItem()
                      }
                  }), function() {
                      var t = i.slotData.dollImage.draggable("instance");
                      i.reverting = !1,
                      t && $(t.helper).animate(t.originalPosition, parseInt(t.options.revertDuration, 10), function() {
                          !1 !== t._trigger("stop", event) && t._clear()
                      })
                  })
              }
              return !1
          },
          stop: function() {
              if (i.reverting)
                  return !1;
              setTimeout(function() {
                  i.slotData.item && (i.slotData.dollImage.show(),
                  i.slotData.dollSockets && i.slotData.dollSockets.show())
              }, 0)
          }
      }).draggable("instance")._adjustOffsetFromHelper = function() {
          this.offset.click.left = this.margins.left + this.helper.width() / 2,
          this.offset.click.top = this.margins.top + this.helper.height() / 2
      }
      ,
      i.slotData.dollFrame.droppable({
          hoverClass: "highlight",
          accept: function(t) {
              var e = t.data("slot");
              if (!e || e === i)
                  return !1;
              var a = e.getId();
              if (!i.accept(a))
                  return !1;
              if (DiabloCalc.shiftKey)
                  return !0;
              var l = i.getId();
              return !l || e.accept(l)
          },
          drop: function(t, e) {
              if (!i.inactive) {
                  var a = e.draggable.data("slot");
                  if (a && a !== i) {
                      var l = a.getData();
                      if (l && i.accept(l.id)) {
                          var o = i.getId();
                          if (t.shiftKey)
                              o ? DiabloCalc.popupMenu(t, c.fixkey({
                                  Replace: function() {
                                      i.setItem(l, "stash")
                                  },
                                  Cancel: function() {}
                              })) : i.setItem(l, "stash");
                          else {
                              if (o) {
                                  if (!a.accept(o))
                                      return;
                                  a.setItem(i.getData(), "stash")
                              } else
                                  a.setItem();
                              i.setItem(l, "stash")
                          }
                      }
                  }
              }
          }
      }),
      i.slotData.dollFrame.click(function() {
          $(".editframe").tabs("option", "active", DiabloCalc.TAB_EQUIPMENT),
          d.animate({
              scrollTop: 0
          }, "fast"),
          t(e)
      }),
      i.slotData.dollFrame.contextmenu(function(t) {
          if ($(".editframe").tabs("option", "active") === DiabloCalc.TAB_EQUIPMENT) {
              if (i.slotData.item) {
                  var e = {};
                  s() && (e[c("Unequip")] = function() {
                      var t = s();
                      i.slotData.item && t && (t.setItem(i.slotData.item),
                      i.setItem())
                  }
                  ),
                  e[c("Delete")] = function() {
                      i.setItem()
                  }
                  ,
                  DiabloCalc.tooltip.hide(),
                  DiabloCalc.popupMenu(t, e)
              }
              return !1
          }
      }),
      DiabloCalc.enableTouch(i.slotData.dollFrame)
  }
  function i(t) {
      this.setItem = function(t, i) {
          if (this.box.removeClass().addClass("stash-slot").addClass("ui-droppable"),
          B.slot === this && this.box.addClass("edit"),
          this.dollSlot || "loading" === i || f || (I.hide(),
          f = setTimeout(a, 5e3)),
          "editing" !== i && B.slot === e && B.setItem(t, i),
          !t || !t.id)
              return this.item = void 0,
              void this.box.addClass("empty-slot");
          var l = DiabloCalc.itemById[t.id] || DiabloCalc.itemById.custom
            , s = l.type
            , n = DiabloCalc.itemTypes[s].slot
            , c = l.id;
          if ("custom" === n && this.dollSlot) {
              var d = "offhand" === this.dollSlot ? DiabloCalc.getOffhandTypes() : DiabloCalc.itemSlots[this.dollSlot].types;
              for (var r in d)
                  if (!(d[r].classes && d[r].classes.indexOf(DiabloCalc.charClass) < 0)) {
                      n = DiabloCalc.itemTypes[r].slot,
                      c = DiabloCalc.itemTypes[r].generic;
                      break
                  }
          }
          this.item = t,
          this.box.addClass("quality-" + l.quality),
          this.icon.removeClass().addClass("stash-icon").addClass("slot-" + n),
          this.icon.css("background-image", "url(" + DiabloCalc.getItemIcon(c) + ")").show(),
          this.icon.toggleClass("ancient", !!t.ancient),
          DiabloCalc.tooltip && DiabloCalc.tooltip.getNode() == this.box[0] && DiabloCalc.tooltip.showItem(this.box[0], this.item),
          this.dollSlot || function() {
              if (100 == w.length)
                  return;
              for (var t = 0, e = 0; e < w.length; ++e)
                  w[e].item || ++t;
              t < 3 && o(5 * (Math.floor(w.length / 5) + 1))
          }()
      }
      ,
      this.accept = function(t) {
          return this.dollSlot ? DiabloCalc.itemSlots[this.dollSlot].drop && DiabloCalc.itemSlots[this.dollSlot].drop.accept(t) : !!t
      }
      ,
      this.getId = function() {
          return this.item && this.item.id
      }
      ,
      this.getData = function() {
          return this.item
      }
      ;
      var e = this;
      this.box = $('<div class="stash-slot empty-slot"></div>'),
      this.icon = $('<div class="stash-icon"></div>'),
      this.box.append('<div class="item-gradient"><div class="item-glow"></div></div><div class="hover-glow"></div>').append(this.icon),
      this.box.append('<div class="edit-border"><div class="edit-gradient"></div></div>'),
      this.box.droppable({
          hoverClass: "slot-hover",
          accept: function(t) {
              var i = t.data("slot");
              return !(!i || i === e) && (!!DiabloCalc.shiftKey || (!e.item || i.accept(e.item.id)))
          },
          drop: function(t, i) {
              var a = i.draggable.data("slot");
              if (a && a !== e) {
                  var l = a.getData();
                  if (l && e.accept(l.id))
                      if (t.shiftKey)
                          e.item ? DiabloCalc.popupMenu(t, c.fixkey({
                              Replace: function() {
                                  e.setItem(l, "stash")
                              },
                              Cancel: function() {}
                          })) : e.setItem(l, "stash");
                      else {
                          if (e.item) {
                              if (!a.accept(e.item.id))
                                  return;
                              a.setItem(e.item, "stash")
                          } else
                              a.setItem();
                          e.setItem(l, "stash")
                      }
              }
          }
      }),
      this.box.hover(function() {
          if (e.dollSlot)
              DiabloCalc.tooltip.showItem(this, e.dollSlot);
          else if (e.item && DiabloCalc.tooltip)
              if (DiabloCalc.itemById[e.item.id])
                  DiabloCalc.tooltip.showItem(this, e.item);
              else {
                  var t = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + c("Unknown Item") + '</span><br/><span class="d3-color-gray">' + e.item.id + "</span></p></div>";
                  DiabloCalc.tooltip.showHtml(this, t)
              }
      }, function() {
          DiabloCalc.tooltip && DiabloCalc.tooltip.hide()
      }).click(function() {
          e.dollSlot || B.setSlot(B.slot === e ? void 0 : e)
      }).contextmenu(function(t) {
          DiabloCalc.tooltip.hide();
          var i = {};
          return e.dollSlot || B.slot === e || e.item && !DiabloCalc.itemById[e.item] || (i[c("Edit")] = function() {
              B.setSlot(e)
          }
          ),
          e.item && (e.dollSlot ? s() && (i[c("Unequip")] = function() {
              var t = s();
              e.item && t && (t.setItem(e.item),
              e.setItem())
          }
          ) : $.each(DiabloCalc.itemSlots, function(t, a) {
              a.drop.accept(e.item.id) && (i[c("Equip {0}").format(a.name)] = function() {
                  if (a.drop.accept(e.item.id)) {
                      var t = a.drop.getData();
                      a.drop.setItem(e.item, "stash"),
                      e.setItem(t, "stash")
                  }
              }
              )
          }),
          i[c("Delete")] = function() {
              e.setItem()
          }
          ),
          DiabloCalc.popupMenu(t, i),
          !1
      }),
      this.icon.data("slot", this),
      this.reverting = !1,
      this.icon.draggable({
          zIndex: 100,
          appendTo: "body",
          cursor: "-webkit-grabbing",
          distance: 4,
          cursorAt: {},
          helper: function() {
              var t = $("<img></img>").attr("src", e.item ? DiabloCalc.getItemIcon(e.item.id) : "");
              return t.toggleClass("ancient", !(!e.item || !e.item.ancient)),
              e.item && DiabloCalc.itemById[e.item.id] && "amulet" === DiabloCalc.itemById[e.item.id].type && t.css("width", 52).css("height", 52),
              t
          },
          start: function() {
              if (!e.item)
                  return setTimeout(function() {
                      $("body").css("cursor", "")
                  }),
                  !1;
              u = e.icon,
              DiabloCalc.shiftKey || e.icon.hide(),
              DiabloCalc.tooltip && DiabloCalc.tooltip.disable()
          },
          revert: function(t) {
              if (u = void 0,
              DiabloCalc.tooltip && DiabloCalc.tooltip.enable(),
              !t) {
                  if (!window.event)
                      return !0;
                  e.reverting = !0,
                  DiabloCalc.popupMenu(window.event, c.fixkey({
                      Delete: function() {
                          var t = e.icon.draggable("instance");
                          e.reverting = !1,
                          t && !1 !== t._trigger("stop", event) && t._clear(),
                          e.setItem()
                      }
                  }), function() {
                      var t = e.icon.draggable("instance");
                      e.reverting = !1,
                      t && $(t.helper).animate(t.originalPosition, parseInt(t.options.revertDuration, 10), function() {
                          !1 !== t._trigger("stop", event) && t._clear()
                      })
                  })
              }
              return !1
          },
          stop: function() {
              if (e.reverting)
                  return !1;
              setTimeout(function() {
                  e.icon.show()
              }, 0)
          }
      }).draggable("instance")._adjustOffsetFromHelper = function() {
          var t = 40 - this.helper.width() / 2
            , e = 40 - this.helper.height() / 2;
          this.originalPosition.left += t,
          this.originalPosition.top += e,
          this.position.left += t,
          this.position.top += e,
          this.offset.click.left -= t,
          this.offset.click.top -= e
      }
      ,
      DiabloCalc.enableTouch(this.icon),
      this.line = t,
      t.append(this.box)
  }
  function a() {
      if (DiabloCalc.activity("stash"),
      clearTimeout(f),
      f = void 0,
      DiabloCalc.account.userName()) {
          I.addClass("loading").text(c("Saving...")).show();
          for (var t = [], e = 0; e < w.length; ++e)
              t.push(w[e].item || null);
          $.ajax({
              url: "savestash",
              data: JSON.stringify(t),
              type: "POST",
              global: !1,
              processData: !1,
              contentType: "application/json",
              dataType: "json",
              success: function(t) {
                  "OK" === t.code ? I.removeClass("loading").text(c("Saved.")) : t.errors && t.errors.length ? I.removeClass("loading").text(t.errors[0]) : I.removeClass("loading").text(c("Failed to save!"))
              },
              error: function(t) {
                  I.removeClass("loading").text(c("Failed to save!"))
              }
          })
      }
  }
  function l() {
      var t = !1;
      for (var e in DiabloCalc.itemSlots) {
          var i = DiabloCalc.getSlot(e);
          if (i && i.imported) {
              t = !0;
              break
          }
      }
      D.toggle(t)
  }
  function o(t) {
      for (; w.length < 50 && w.length < t; )
          w.length % 5 || (T.push($('<div class="stash-row"></div>')),
          x.append(T[T.length - 1])),
          w.push(new i(T[T.length - 1]))
  }
  function s(t) {
      for (var e = 0; e < w.length; ++e)
          if (!w[e].item)
              return w[e]
  }
  function n() {
      var t;
      $.each(DiabloCalc.itemSlots, function(e, i) {
          i.classes && i.classes.indexOf(DiabloCalc.charClass) < 0 ? (i.drop.inactive = !0,
          i.item && (i.item = void 0,
          DiabloCalc.trigger("updateSlotItem", e))) : (i.drop.inactive = !1,
          t || (t = e))
      }),
      !b.slot || DiabloCalc.itemSlots[b.slot].drop.inactive ? b.setSlot(t) : b.setSlot(b.slot);
      for (var e in DiabloCalc.itemSlots)
          DiabloCalc.itemSlots[e].drop.inactive || e === b.slot || DiabloCalc.itemSlots[e].drop.updateTypes(!0)
  }
  var c = DiabloCalc.locale("ui-equipment.js")
    , d = $("#tab-equipment")
    , r = $("<input></input>").attr("type", "checkbox").prop("checked", !1).change(function() {
      b.itemBox.updateWarning(),
      B.itemBox.updateWarning()
  });
  DiabloCalc.addOption("moreWarnings", function() {
      return r.prop("checked")
  }, function(t) {
      r.prop("checked", t),
      b.itemBox.updateWarning(),
      B.itemBox.updateWarning()
  });
  var p = $("<input></input>").attr("type", "checkbox").prop("checked", !0);
  DiabloCalc.addOption("limitStats", function() {
      return p.prop("checked")
  }, function(t) {
      p.prop("checked", t)
  });
  var m = $("<input></input>").attr("type", "checkbox").prop("checked", !0);
  DiabloCalc.addOption("hideCrossClass", function() {
      return m.prop("checked")
  }, function(t) {
      m.prop("checked", t),
      b.itemBox.populateItems(),
      B.itemBox.populateItems()
  });
  var h = $("<input></input>").attr("type", "checkbox").prop("checked", !0);
  DiabloCalc.addOption("hideLegacy", function() {
      return h.prop("checked")
  }, function(t) {
      h.prop("checked", t),
      b.itemBox.populateItems(),
      B.itemBox.populateItems()
  }),
  d.append($('<label class="option-box top-options"></label>').append(r).append(c("Show all warnings"))),
  d.append($('<label class="option-box top-options"></label>').append(m).append(c("Hide items for other classes"))),
  d.append($('<label class="option-box top-options"></label>').append(p).append(c("Only list class-specific stats"))),
  d.append($('<label class="option-box top-options"></label>').append(h).append(c("Hide legacy items"))),
  DiabloCalc.addTip(r, c("Show warnings for incomplete items and missing secondary stats.")),
  DiabloCalc.addTip(m, c("Do not list items with affixes that do not apply to your class.")),
  DiabloCalc.addTip(p, c("Only list stats useful to your class.")),
  DiabloCalc.addTip(h, c("Do not list legacy items."));
  var u;
  $("body").keydown(function(t) {
      16 == t.which && u && u.show()
  }).keyup(function(t) {
      16 == t.which && u && u.hide()
  });
  var b = new function() {
      this.div = $('<div class="current-slot"></div>'),
      d.append(this.div),
      this.slotBox = new i(this.div),
      this.prevSlot = $('<span class="left"></span>'),
      this.nextSlot = $('<span class="right"></span>'),
      this.slotName = $('<span class="current-slot chosen-noframe"></span>'),
      this.slotDrop = $('<select class="current-slot-name"></select>'),
      this.slotItem = $("<span></span>"),
      this.div.append($('<div class="current-header"><span class="current-tip">' + c("Click on a paperdoll slot to edit items.") + "</span></div>").append(this.slotName, "<br/>", this.slotItem));
      var e = this;
      this.slotName.append(this.prevSlot, this.slotDrop, this.nextSlot),
      this.listSlots = function(t) {
          this.slotDrop.empty();
          for (var e in DiabloCalc.itemSlots) {
              var i = DiabloCalc.itemSlots[e];
              i.drop && i.drop.inactive || this.slotDrop.append('<option value="' + e + (e === t ? '" selected="selected' : "") + '">' + i.name + "</option>")
          }
      }
      ,
      this.listSlots(),
      this.slotDrop.chosen({
          disable_search: !0,
          inherit_select_classes: !0
      }).change(function() {
          e.doSetSlot($(this).val())
      }),
      this.slotBox.veryOldSetItem = this.slotBox.setItem,
      this.slotBox.oldSetItem = function(t, i) {
          if (e.slotItem.removeClass(),
          t && DiabloCalc.itemById[t.id]) {
              var a = DiabloCalc.itemById[t.id];
              e.slotItem.addClass("quality-" + a.quality).text(a.name)
          } else
              e.slotItem.addClass("empty-slot").text(c("Empty Slot"));
          this.veryOldSetItem(t, i)
      }
      ,
      this.slotBox.setItem = function(t, i) {
          "editing" !== i && (e.itemBox.suppress = !0,
          e.itemBox.setItem(t),
          e.itemBox.suppress = !1),
          e.slotBox.oldSetItem(t, i),
          DiabloCalc.itemSlots[e.slot].item = t,
          DiabloCalc.trigger("updateSlotItem", e.slot)
      }
      ,
      this.setItem = function(t, e) {
          this.slotBox.setItem(t, e)
      }
      ,
      this.itemBox = new DiabloCalc.ItemBox(d,{
          onUpdate: function(t, i) {
              if (!DiabloCalc.itemSlots[e.slot].drop.inactive) {
                  var a = e.itemBox.getData();
                  e.slotBox.oldSetItem(a, "editing"),
                  DiabloCalc.itemSlots[e.slot].item = a,
                  DiabloCalc.trigger(t ? "updateSlotItem" : "updateSlotStats", e.slot, i)
              }
          }
      }),
      this.getPrevSlot = function() {
          var t = void 0;
          for (var e in DiabloCalc.itemSlots)
              if (!DiabloCalc.itemSlots[e].drop.inactive) {
                  if (e === this.slot)
                      break;
                  t = e
              }
          return t
      }
      ,
      this.getNextSlot = function() {
          var t = !1;
          for (var e in DiabloCalc.itemSlots)
              if (!DiabloCalc.itemSlots[e].drop.inactive)
                  if (e === this.slot)
                      t = !0;
                  else if (t)
                      return e
      }
      ,
      $(".editframe").on("tabsactivate", function() {
          e.slot && ($(".editframe").tabs("option", "active") !== DiabloCalc.TAB_EQUIPMENT ? DiabloCalc.itemSlots[e.slot].dollFrame.removeClass("editing") : DiabloCalc.itemSlots[e.slot].dollFrame.addClass("editing"))
      }),
      this.prevSlot.click(function() {
          var i = e.getPrevSlot();
          i && t(i)
      }),
      this.nextSlot.click(function() {
          var i = e.getNextSlot();
          i && t(i)
      }),
      this.setSlot = function(t) {
          this.listSlots(t),
          this.slotDrop.trigger("chosen:updated"),
          this.doSetSlot(t)
      }
      ,
      this.doSetSlot = function(t) {
          this.slot && DiabloCalc.itemSlots[this.slot].dollFrame.removeClass("editing"),
          this.slot = t,
          this.slot && $(".editframe").tabs("option", "active") === DiabloCalc.TAB_EQUIPMENT && DiabloCalc.itemSlots[this.slot].dollFrame.addClass("editing"),
          this.slotBox.dollSlot = t,
          this.getPrevSlot() ? this.prevSlot.removeClass("disabled") : this.prevSlot.addClass("disabled"),
          this.getNextSlot() ? this.nextSlot.removeClass("disabled") : this.nextSlot.addClass("disabled"),
          this.itemBox.suppress = !0;
          var i = DiabloCalc.itemSlots[t].item;
          this.itemBox.setClass(DiabloCalc.charClass, t),
          this.itemBox.setItem(i),
          this.itemBox.suppress = !1,
          i = this.itemBox.getData(),
          this.slotBox.oldSetItem(i, "editing"),
          DiabloCalc.itemSlots[e.slot].item = i,
          DiabloCalc.trigger("updateSlotItem", e.slot)
      }
      ,
      this.updateIcon = function() {
          this.slotBox.oldSetItem(this.itemBox.getData(), "editing")
      }
  }
  ;
  DiabloCalc.onHighlight = function(t) {
      b.slot && $(".editframe").tabs("option", "active") === DiabloCalc.TAB_EQUIPMENT && DiabloCalc.itemSlots[b.slot].dollFrame.toggleClass("editing", !t)
  }
  ;
  var f;
  window.onbeforeunload = function(t) {
      f && a()
  }
  ,
  d.append('<h3 class="skill-category collapse-header collapsed">' + c("Global equipment modifications") + "</h3>");
  var C = $("<ul></ul>");
  d.append(C);
  var v = '<select class="eqmod-ancient-type">';
  v += '<option value="false">' + c("Normal") + "</option>",
  v += '<option value="true">' + c("Ancient") + "</option>",
  v += '<option value="primal">' + c("Primal Ancient") + "</option>",
  v += "</select>";
  var D = $('<li><span class="link-like eqmod-unlock">' + c("Unlock imported items") + "</span></li>");
  C.append(D),
  C.append('<li><span class="link-like eqmod-ancient">' + c("Make all items {0}").format(v) + "</span></li>"),
  C.append('<li><span class="link-like eqmod-maxstat">' + c("Change all stats to {0}%").format('<input class="eqmod-maxstat-value" type="number" min="0" max="100" value="100"/>') + "</span></li>");
  var g = '<select class="eqmod-enchant-type">';
  for (var S in {
      str: !0,
      dex: !0,
      int: !0,
      vit: !0
  })
      g += '<option value="' + S + '">' + DiabloCalc.stats[S].name + "</option>";
  g += "</select>",
  C.append('<li><span class="link-like eqmod-enchant">' + c("Add level {0} {1} Caldessan's Despair").format('<input class="eqmod-enchant-level" type="number" min="0" max="200" value="100"/>', g) + "</span></li>"),
  DiabloCalc.register("changeClass", function() {
      $(".eqmod-enchant-type").val(DiabloCalc.classes[DiabloCalc.charClass].primary)
  }),
  $(".eqmod-enchant-type").val(DiabloCalc.classes[DiabloCalc.charClass].primary),
  d.append('<h3 class="skill-category collapse-header collapsed second">' + c("Stat priority") + "</h3>");
  var y = DiabloCalc.Optimizer.dialog();
  d.append(y),
  DiabloCalc.Optimizer.updatePriority(),
  y.append('<div><span class="link-like eqmod-optimize">' + c("Optimize stats") + "</span></div>"),
  d.append('<h3 class="skill-category collapse-header second">' + c("Kanai's Cube") + "</h3>"),
  DiabloCalc.equipmentKanai = $("<div></div>"),
  d.append(DiabloCalc.equipmentKanai),
  DiabloCalc.register("updateSlotItem", l),
  DiabloCalc.register("importEnd", l),
  $(".eqmod-unlock").click(function() {
      DiabloCalc.activity("modunlock"),
      DiabloCalc.importStart();
      for (var t in DiabloCalc.itemSlots) {
          var e = DiabloCalc.getSlot(t);
          e && (e.imported && (delete (e = $.extend(!0, {}, e)).enchant,
          delete e.imported,
          DiabloCalc.setSlot(t, e)))
      }
      DiabloCalc.importEnd("global")
  }),
  $(".eqmod-ancient").click(function() {
      DiabloCalc.activity("modancient"),
      DiabloCalc.importStart();
      var t = $(".eqmod-ancient-type").val();
      "true" === t ? t = !0 : "primal" !== t && (t = !1);
      for (var e in DiabloCalc.itemSlots) {
          var i = DiabloCalc.getSlot(e);
          i && ((i.ancient || !1) !== t && ((i = $.extend(!0, {}, i)).ancient = t,
          delete i.enchant,
          delete i.imported,
          DiabloCalc.trimStats(i),
          DiabloCalc.setSlot(e, i)))
      }
      DiabloCalc.importEnd("global")
  }),
  $(".eqmod-maxstat").click(function(t) {
      function e(t) {
          DiabloCalc.importStart();
          var e = .01 * (parseInt($(".eqmod-maxstat-value").val()) || 0);
          for (var i in DiabloCalc.itemSlots) {
              var a = DiabloCalc.getSlot(i);
              if (a) {
                  a = $.extend(!0, {}, a),
                  t && (delete a.enchant,
                  delete a.imported);
                  var l = DiabloCalc.getItemAffixesById(a.id, a.ancient, !0);
                  for (var o in a.stats)
                      if (l[o] && !(a.imported && a.enchant !== o || DiabloCalc.stats[o] && DiabloCalc.stats[o].caldesanns)) {
                          if (a.stats[o].length >= 1) {
                              var s = l[o].best || "max"
                                , n = "max" === s ? "min" : "max";
                              if (l[o].min && l[o].max && (a.stats[o][0] = l[o][n] + (l[o][s] - l[o][n]) * e,
                              "any" !== l[o].step)) {
                                  c = l[o].step || 1;
                                  a.stats[o][0] = Math.round(a.stats[o][0] / c) * c
                              }
                          }
                          if (a.stats[o].length >= 2 && l[o].min2 && l[o].max2 && (a.stats[o][1] = l[o].min2 + (l[o].max2 - l[o].min2) * e,
                          "any" !== l[o].step2)) {
                              var c = l[o].step2 || 1;
                              a.stats[o][1] = Math.round(a.stats[o][1] / c) * c
                          }
                      }
                  DiabloCalc.setSlot(i, a)
              }
          }
          DiabloCalc.importEnd("global")
      }
      DiabloCalc.activity("modmaxstat");
      var i = !1;
      for (var a in DiabloCalc.itemSlots) {
          var l = DiabloCalc.getSlot(a);
          if (l && l.imported) {
              i = !0;
              break
          }
      }
      i ? DiabloCalc.simpleDialog({
          title: c("Modify equipment"),
          text: c("Profile contains imported items. Only enchanted stats will be modified."),
          buttons: [c("Ok"), c("Unlock"), c("Cancel")],
          callback: function(t) {
              0 !== t && 1 !== t || e(t > 0)
          }
      }) : e(!0)
  }),
  $(".eqmod-enchant").click(function() {
      DiabloCalc.activity("modenchant"),
      DiabloCalc.importStart();
      var t = 5 * (parseInt($(".eqmod-enchant-level").val()) || 1)
        , e = "caldesanns_" + $(".eqmod-enchant-type").val();
      for (var i in DiabloCalc.itemSlots) {
          var a = DiabloCalc.getSlot(i);
          a && (t ? a.stats[e] && a.stats[e][0] === t || (delete (a = $.extend(!0, {}, a)).stats.caldesanns_str,
          delete a.stats.caldesanns_dex,
          delete a.stats.caldesanns_int,
          delete a.stats.caldesanns_vit,
          a.stats[e] = [t],
          DiabloCalc.setSlot(i, a)) : (a.stats.caldesanns_str || a.stats.caldesanns_dex || a.stats.caldesanns_int || a.stats.caldesanns_vit) && (delete (a = $.extend(!0, {}, a)).stats.caldesanns_str,
          delete a.stats.caldesanns_dex,
          delete a.stats.caldesanns_int,
          delete a.stats.caldesanns_vit,
          a.stats[e] = [t],
          DiabloCalc.setSlot(i, a)))
      }
      DiabloCalc.importEnd("global")
  }),
  $(".eqmod-optimize").click(function() {
      DiabloCalc.activity("modoptimize"),
      DiabloCalc.Optimizer.optimizeAll()
  }),
  $(".eqmod-ancient-type, .eqmod-maxstat-value, .eqmod-enchant-level, .eqmod-enchant-type").click(function(t) {
      t.stopPropagation()
  }),
  $(".eqmod-ancient-type").change(function() {
      $(".eqmod-ancient").click()
  }),
  $(".eqmod-maxstat-value").change(function() {
      var t = !1;
      for (var e in DiabloCalc.itemSlots) {
          var i = DiabloCalc.getSlot(e);
          if (i && i.imported) {
              t = !0;
              break
          }
      }
      t || $(".eqmod-maxstat").click()
  }),
  d.append('<h3 class="skill-category collapse-header collapsed second">' + c("Stash") + "</h3>");
  var x = $("<div></div>");
  d.append(x);
  var I = $('<span class="status"></span>').hide()
    , k = $('<div class="stash-header">' + c("Drag items between paperdoll and stash.<br/>Hold shift to clone items.") + "</div>");
  DiabloCalc.stashHeader = k,
  x.append(k.prepend(I)),
  k.append(DiabloCalc.account.makeLine(c(" to access your personal stash"), function(t) {
      t ? (I.addClass("loading").text(c("Loading...")).show(),
      $.ajax({
          url: "loadstash",
          data: {},
          type: "POST",
          dataType: "json",
          success: function(t) {
              for (I.hide(); t.length && !t[t.length - 1]; )
                  t.pop();
              o(t.length);
              for (var e = 0; e < t.length && e < w.length; ++e)
                  t[e] && DiabloCalc.itemById[t[e].id] && (t[e].id = DiabloCalc.itemById[t[e].id].id),
                  w[e].setItem(t[e], "loading")
          },
          error: function(t) {
              I.removeClass("loading").text(c("Failed to load!"))
          }
      }),
      this.hide()) : this.show()
  }));
  var B = {};
  B.line = $('<div class="stash-edit"><div class="top-left"></div><div class="top-right"></div><div class="bottom"></div></div>').hide(),
  B.line.append('<div class="left"></div><div class="right"></div>'),
  B.save = $("<button>" + c("Save") + "</button>").button({
      icons: {
          primary: "ui-icon-check"
      }
  }),
  B.del = $("<button>" + c("Delete") + "</button>").button({
      icons: {
          primary: "ui-icon-trash"
      }
  }),
  B.line.append(B.save).append(B.del),
  d.append(B.line),
  B.updateItem = function(t, e) {
      var i = B.itemBox.getData();
      B.slot && B.slot.setItem(i, "editing"),
      B.line.removeClass().addClass("stash-edit"),
      i && i.id && DiabloCalc.itemById[i.id] && B.line.addClass("quality-" + DiabloCalc.itemById[i.id].quality)
  }
  ,
  B.itemBox = new DiabloCalc.ItemBox(B.line,{
      onUpdate: B.updateItem
  }),
  B.itemBox.setClass(),
  B.setItem = function(t, e) {
      this.itemBox.setItem(t, e),
      this.line.removeClass().addClass("stash-edit"),
      t && t.id && DiabloCalc.itemById[t.id] && this.line.addClass("quality-" + DiabloCalc.itemById[t.id].quality)
  }
  ,
  B.setSlot = function(t) {
      if (t && t.item && !DiabloCalc.itemById[t.item.id] && (t = void 0),
      this.slot && this.slot.box.removeClass("edit"),
      t && t.box.addClass("edit"),
      this.slot = t,
      !t)
          return this.setItem(),
          this.line.hide(),
          void DiabloCalc.hidePopup(this);
      this.setItem(t.item),
      t.line.after(this.line);
      var e = t.box.index();
      this.line.find(".top-left").css("width", 21 + 84 * e),
      this.line.find(".top-right").css("left", 122 + 84 * e),
      this.line.show(),
      DiabloCalc.showPopup(this)
  }
  ,
  B.hide = function() {
      this.setSlot()
  }
  ,
  B.contains = function(t) {
      return !(!this.slot.box.is(t) && !this.slot.box.has(t).length) || !(!this.line.is(t) && !this.line.has(t).length)
  }
  ,
  B.save.click(function() {
      var t = B.itemBox.getData();
      B.slot && B.slot.setItem(t, "editing"),
      B.setSlot(),
      a()
  }),
  B.del.click(function(t) {
      DiabloCalc.popupMenu(t, c.fixkey({
          "Confirm delete?": function() {
              B.slot && B.slot.setItem(void 0, "editing"),
              B.setSlot()
          }
      }))
  });
  var w = []
    , T = [];
  o(25),
  $(".collapse-header").click(function() {
      $(this).toggleClass("collapsed"),
      $(this).hasClass("collapsed") ? $(this).next().slideUp() : $(this).next().slideDown()
  }).each(function() {
      $(this).hasClass("collapsed") && $(this).next().hide()
  });
  for (var q in DiabloCalc.itemSlots)
      DiabloCalc.itemSlots[q].drop = new e(q);
  DiabloCalc.getItemAffixes = function(t, e) {
      var i = DiabloCalc.itemSlots[t].item;
      return i ? DiabloCalc.getItemAffixesById(i.id, i.ancient, e) : {}
  }
  ,
  DiabloCalc.setSlot = function(t, e) {
      if (e)
          if (DiabloCalc.itemById[e.id]) {
              if (e.id = DiabloCalc.itemById[e.id].id,
              e.gems && e.gems.length) {
                  for (var i = 0; i < e.gems.length; ++i)
                      "number" == typeof e.gems[i][0] && e.gems[i][0] >= DiabloCalc.gemQualities.length && (e.gems[i][0] = DiabloCalc.oldGemQualities[e.gems[i][0]]);
                  (!e.stats.sockets || e.stats.sockets[0] < e.gems.length) && (e.stats.sockets = [e.gems.length])
              }
          } else
              e = void 0;
      DiabloCalc.itemSlots[t].drop.setItem(e)
  }
  ,
  DiabloCalc.getSlotId = function(t) {
      var e = DiabloCalc.itemSlots[t].item;
      return e ? e.id : void 0
  }
  ,
  DiabloCalc.getSlotData = function(t) {
      return DiabloCalc.itemSlots[t].item
  }
  ,
  DiabloCalc.register("changeClass", n),
  DiabloCalc.register("changeGender", function() {
      b.updateIcon()
  }),
  n()
}();
!function() {
  function e() {
      m && 3 === d.accordion("option", "active") && (g = !0,
      DiabloCalc.account.userName() ? (h.results.div.show(),
      h.results.search()) : h.results.div.hide())
  }
  function a() {
      g = !1,
      e()
  }
  function l(e, a) {
      var l = DiabloCalc.classMap[a.class] || a.class
        , t = {};
      t.class = l,
      0 === a.gender && (t.gender = "male"),
      1 === a.gender && (t.gender = "female"),
      t.gender,
      t.items = {};
      for (var o in a.items)
          t.items[DiabloCalc.slotMap[o] || o] = DiabloCalc.parseItemData(a.items[o], l);
      if (a.skills && a.skills.active) {
          var i = a.skills.active;
          t.skills = [];
          for (d = 0; d < i.length; ++d)
              if (i[d].skill) {
                  var s = i[d].skill.slug
                    , n = "x";
                  i[d].rune && (n = i[d].rune.type),
                  t.skills.push([DiabloCalc.skillById[l][s], n])
              } else
                  t.skills.push(null)
      }
      if (a.skills && a.skills.passive) {
          var r = a.skills.passive;
          t.passives = [];
          for (d = 0; d < r.length; ++d)
              if (r[d].skill) {
                  s = r[d].skill.slug;
                  t.passives.push(DiabloCalc.skillById[l][s])
              } else
                  t.passives.push(null)
      }
      if (t.paragon = {
          level: 0
      },
      a.paragonLevel && (t.paragon.level = a.paragonLevel,
      a.paragonLevel >= 800 && (t.paragon.data = [[0, 0, 0, 0], [50, 50, 50, 50], [50, 50, 50, 50], [50, 50, 50, 50]])),
      a.legendaryPowers)
          if (t.kanai = {},
          20 === DiabloCalc.seasonal)
              for (var p = ["weapon", "armor", "jewelry"], c = 0, d = 0; d < a.legendaryPowers.length; ++d) {
                  v = (u = a.legendaryPowers[d]) && p[c++];
                  u && v && (t.kanai[v] = u.id)
              }
          else
              for (d = 0; d < a.legendaryPowers.length; ++d) {
                  var u = a.legendaryPowers[d]
                    , v = u && DiabloCalc.getKanaiType(u.id);
                  u && v && (t.kanai[v] ? t.kanai.extra = u.id : t.kanai[v] = u.id)
              }
      DiabloCalc.setProfile(t, "import"),
      $(".editframe").tabs("option", "active", DiabloCalc.TAB_PARAGON)
  }
  function t(e, a, t, o) {
      var i = {
          region: e,
          tag: a,
          id: t
      };
      o && (i.dead = 1),
      $.ajax({
          url: "proxy",
          data: i,
          type: "POST",
          dataType: "json",
          success: function(e) {
              l(0, e)
          }
      })
  }
  function o(e, a, l, o, i) {
      DiabloCalc.activity("importchar"),
      DiabloCalc.isModified && DiabloCalc.isModified() ? DiabloCalc.popupMenu(e, u.fixkey({
          "Discard current profile?": function() {
              t(a, l, o, i)
          }
      })) : t(a, l, o, i)
  }
  function i(e, a) {
      DiabloCalc.activity("importprofile"),
      a = a.replace("#", "-"),
      v.results.empty(),
      $.ajax({
          url: "proxy",
          data: {
              region: e,
              tag: a
          },
          type: "POST",
          dataType: "json",
          success: function(l) {
              v.results.empty(),
              l.heroes || l.fallenHeroes || (l.reason ? v.results.text(l.reason) : v.results.text(u("Profile not found.")));
              for (var t = 0; t < 2; ++t) {
                  var i = t ? l.fallenHeroes : l.heroes;
                  if (i) {
                      t && v.results.append("<p>" + u("Fallen Heroes") + "</p>");
                      for (var s = 0; s < i.length; ++s) {
                          var n = i[s]
                            , r = $("<li></li>")
                            , p = DiabloCalc.classMap[n.class] || n.class
                            , c = "";
                          0 === n.gender && (c += " male"),
                          1 === n.gender && (c += " female"),
                          v.results.append(r),
                          r.append('<span class="class-icon class-' + p + c + '">&nbsp;</span>'),
                          r.click(function(l, t) {
                              return function(i) {
                                  o(i, e, a, l, t)
                              }
                          }(n.id, t));
                          var d = new Date(1e3 * (n.death ? n.death.time : n["last-updated"])).toLocaleDateString()
                            , f = ""
                            , b = ""
                            , h = "";
                          n.hardcore && (f = " hero-hardcore"),
                          n.seasonal && (b = ' <span class="hero-seasonal" title="' + u("Seasonal") + '">&nbsp;</span>'),
                          (n.dead || t) && (h = ' <span class="hero-dead">' + u("(Died {0})").format(d) + "</span>",
                          r.addClass("hero-dead")),
                          r.append('<span class="hero-name">' + n.name + "</span>"),
                          r.append(' <span class="hero-desc' + f + '">' + u("Level {0} {1}").format(n.level, DiabloCalc.classes[p].name) + "</span>" + b + h),
                          n.dead || r.append('  <span class="hero-updated">' + u("(updated {0})").format(d) + "</span>")
                      }
                  }
              }
          },
          error: function() {
              v.results.text(u("Profile not found."))
          }
      })
  }
  function s(e, l) {
      DiabloCalc.activity("saveprofile"),
      void 0 === l && (l = f.allsets.prop("checked"));
      var t, o = l ? DiabloCalc.getAllProfiles() : DiabloCalc.getProfile();
      e ? (o.id = e,
      t = h.response) : (o.name = f.name.val(),
      o.public = f.public.prop("checked"),
      t = f.response),
      t.hide(),
      void 0 !== e && (o.id = e),
      $.ajax({
          url: "save",
          data: JSON.stringify(o),
          type: "POST",
          processData: !1,
          contentType: "application/json",
          dataType: "json",
          success: function(e) {
              if (e.id) {
                  var l = location.protocol + "//" + location.hostname + DiabloCalc.relPath + e.id;
                  DiabloCalc.session.profile = e.id,
                  window.history && window.history.replaceState && window.history.replaceState({}, "", l),
                  t.val(l),
                  o.name ? document.title = o.name + " - " + DiabloCalc.pageTitle : document.title = DiabloCalc.pageTitle,
                  a()
              } else
                  e.errors && e.errors.length ? t.val(e.errors[0]) : t.val(u("Failed to save profile."));
              t.slideDown()
          },
          error: function(e) {
              t.val(u("Failed to save profile.")),
              t.slideDown()
          }
      })
  }
  function n(e, a, l) {
      for (var t in e)
          if (e.hasOwnProperty(t)) {
              var o = (a ? a + "." : "") + t;
              if ("string" == typeof e[t]) {
                  if (l && o.match(l))
                      continue;
                  e[t] = e[t].replace(/[^a-zA-Z0-9_\-+\. ]/g, "")
              } else
                  "object" == typeof e[t] && n(e[t], o, l)
          }
  }
  function r(e, a, l) {
      function t(e) {
          var a = $('<div class="errorBox"><div><h3>Failed to load profile</h3><p>' + e + "</p></div></div>");
          a.click(function() {
              a.remove()
          }),
          $("body").append(a)
      }
      a || (Math.random() > .99 && $.ajax({
          url: "touch",
          data: {
              id: e
          },
          type: "POST"
      }),
      $.ajax({
          url: "load/" + e,
          type: "POST",
          dataType: "json",
          success: function(o) {
              if (o.error)
                  return t(u(o.error));
              DiabloCalc.session.profile = e,
              window.history && window.history.replaceState && window.history.replaceState({}, "", location.protocol + "//" + location.hostname + DiabloCalc.relPath + (a ? "e" : "") + e),
              o.name ? document.title = o.name + " - " + DiabloCalc.pageTitle : document.title = DiabloCalc.pageTitle,
              n(o, "", /^(?:profiles\.[0-9]+\.)?(?:name|buildinfo\.(?:video|text))$/),
              DiabloCalc.setAllProfiles(o, "load", l),
              $(".editframe").tabs("option", "active", DiabloCalc.buildinfo ? DiabloCalc.TAB_BUILDINFO : DiabloCalc.TAB_EQUIPMENT)
          },
          error: function(e) {
              t(u("Unknown error"))
          }
      }))
  }
  function p(e, a, l, t) {
      DiabloCalc.activity("loadprofile"),
      e && DiabloCalc.isModified && DiabloCalc.isModified() ? DiabloCalc.popupMenu(e, u.fixkey({
          "Discard current profile?": function() {
              r(a, l, t)
          }
      })) : r(a, l, t)
  }
  function c(e, l) {
      var t = l.id
        , o = $("<li></li>");
      return l.views && o.attr("title", u("{0} recent views").format(l.views)),
      o.append('<span class="class-icon class-' + l.class + (l.gender ? " " + l.gender : "") + '">&nbsp;</span>'),
      o.click(function(e) {
          p(e, t)
      }),
      o.append('<span class="profile-name' + (l.value ? "" : " unnamed") + '">' + (l.value || u("Unnamed profile")) + "</span>"),
      l.author && l.value && o.find(".profile-name").append('<span class="profile-author">' + u(" by {0}").format(l.author) + "</span>"),
      e.user && (o.append($('<span class="profile-overwrite" title="' + u("Update profile") + '"></span>').click(function(e) {
          e.stopPropagation(),
          DiabloCalc.popupMenu(e, u.fixkey({
              "Save current set": function() {
                  s(t, !1)
              },
              "Save all sets and settings": function() {
                  s(t, !0)
              }
          }))
      })),
      o.append($('<span class="profile-delete" title="' + u("Delete profile") + '"></span>').click(function(e) {
          e.stopPropagation(),
          DiabloCalc.popupMenu(e, u.fixkey({
              "Confirm delete?": function() {
                  $.ajax({
                      url: "delete",
                      data: {
                          id: t
                      },
                      type: "POST",
                      dataType: "json",
                      success: function(e) {
                          "OK" === e.code ? (h.response.val(u("Deleted.")),
                          a()) : e.errors && e.errors.length ? h.response.val(e.errors[0]) : h.response.val(u("Failed to delete profile.")),
                          h.response.slideDown()
                      },
                      error: function(e) {
                          h.response.val(u("Failed to delete profile.")),
                          h.response.slideDown()
                      }
                  })
              }
          }))
      }))),
      o.append('<span class="date-saved"><span>' + new Date(1e3 * l.date).toLocaleString() + "</span></span>"),
      o
  }
  var d, u = DiabloCalc.locale("ui-import.js"), v = {}, f = {}, b = {}, h = {}, g = !1, m = !1, C = $("#tab-import");
  (d = C).append("<h3>" + u("Import") + "</h3>");
  var D = $("<div></div>");
  d.append(D),
  D.append("<p>" + u("BNImportNotice") + "</p>"),
  v.region = $("<select></select>").addClass("import-region"),
  v.region.append('<option value="eu">EU</option>'),
  v.region.append('<option value="us">US</option>'),
  v.region.append('<option value="tw">TW</option>'),
  v.region.append('<option value="kr">KR</option>'),
  v.region.append('<option value="cn">CN</option>'),
  v.battletag = $("<input></input>").addClass("import-battletag").addClass("tooltip-active").val("Tag#1234").attr("name", "battletag"),
  v.button = $("<input></input>").attr("type", "submit").val(u("Search")).click(function() {
      var e = v.region.val()
        , a = v.battletag.val();
      if (!v.battletag.hasClass("tooltip-active")) {
          var l = DiabloCalc.getStorage("battletag") || {};
          l[e] || (l[e] = []),
          l[e].indexOf(a) < 0 && l[e].push(a),
          DiabloCalc.setStorage("region", e),
          DiabloCalc.setStorage("battletag", l),
          i(e, a)
      }
  }),
  v.battletag.focus(function() {
      $(this).hasClass("tooltip-active") && ($(this).removeClass("tooltip-active"),
      $(this).val("")),
      $(this).autocomplete("search")
  }).blur(function() {
      "" === $(this).val() && ($(this).addClass("tooltip-active"),
      $(this).val("Tag#1234"))
  }).autocomplete({
      delay: 0,
      minLength: 0,
      select: function(e, a) {
          i(v.region.val(), a.item.value)
      },
      source: function(e, a) {
          var l = v.region.val()
            , t = (DiabloCalc.getStorage("battletag") || {})[l] || [];
          t.sort();
          var o = new RegExp($.ui.autocomplete.escapeRegex(e.term.toLowerCase()));
          a($.grep(t, function(e) {
              return e && o.test(e.toLowerCase())
          }))
      }
  }).keypress(function(e) {
      13 == e.which && ($(this).blur(),
      v.button.click())
  }),
  v.region.val(DiabloCalc.getStorage("region") || "us"),
  D.append(v.region).append(v.battletag).append(v.button),
  v.results = $('<ul class="import-results"></ul>'),
  D.append(v.results),
  d.append("<h3>" + u("Save") + "</h3>");
  var y = $("<div></div>");
  d.append(y),
  y.append("<p>" + u("Enter a name or a short description for your profile. Unnamed profiles do not come up in search results.") + "</p>"),
  f.public = $('<input type="checkbox"></input>'),
  f.allsets = $('<input type="checkbox"></input>');
  var w = $('<label title="' + u("This profile will come up in search results, and might appear in future Popular Builds listings.") + '">' + u("Public profile") + "</label>").prepend(f.public).css("margin-bottom", -6);
  y.append(w),
  y.append($("<label>" + u("Save all sets and settings") + "</label>").prepend(f.allsets)),
  f.name = $('<input class="import-savename"></input>'),
  f.button = $('<input type="button" value="' + u("Save") + '"></input>').click(function() {
      s()
  }),
  f.response = $('<input class="import-saveresult" readonly="readonly"></input>').focus(function() {
      this.select()
  }).mouseup(function(e) {
      e.preventDefault()
  }).hide(),
  y.append(f.name, "<br/>", f.button, f.response),
  d.append("<h3>" + u("Popular Profiles") + "</h3>");
  var k = $("<div></div>");
  d.append(k),
  b.cls = $('<select class="import-loadclass"><option value="">' + u("Any Class") + "</option></select>");
  for (var S in DiabloCalc.classes)
      DiabloCalc.classes[S].follower || b.cls.append('<option value="' + S + '">' + DiabloCalc.classes[S].name + "</option>");
  b.mainset = $('<select class="import-mainset"><option value="">' + u("Any Set") + "</option></select>"),
  b.button = $('<input type="button" value="' + u("Search") + '"></input>').click(function() {
      DiabloCalc.activity("search"),
      b.results.search({
          cls: b.cls.val(),
          mainset: b.mainset.val(),
          order: "popularity"
      })
  }),
  b.results = new DiabloCalc.SearchResults("search",c),
  k.append($('<div class="searchrow searchrow-1"></div>').append(b.cls, b.mainset, b.button), b.results.div),
  b.cls.change(function() {
      b.mainset.val();
      b.mainset.empty(),
      b.mainset.append('<option value="">' + u("Any Set") + "</option>"),
      b.mainset.append('<option value="none">' + u("None ({0})").format(DiabloCalc.itemSets.nightmares.name) + "</option>");
      var e = b.cls.val();
      for (var a in DiabloCalc.itemSets) {
          var l = DiabloCalc.itemSets[a];
          l.class !== e && l.tclass !== e || !l.bonuses[6] || b.mainset.append('<option value="' + a + '">' + l.name + "</option>")
      }
  }),
  DiabloCalc.register("changeClass", function() {
      b.cls.val(DiabloCalc.charClass).change()
  }),
  b.cls.val(DiabloCalc.charClass).change(),
  d.append("<h3>" + u("My Profiles") + "</h3>");
  var P = $("<div></div>");
  d.append(P),
  h.results = new DiabloCalc.SearchResults("search",c),
  h.response = $('<input class="import-saveresult" readonly="readonly"></input>').focus(function() {
      this.select()
  }).mouseup(function(e) {
      e.preventDefault()
  }).hide(),
  P.append(h.results.div, h.response),
  P.prepend(DiabloCalc.account.makeLine(u(" to track your saved profiles"), function(e) {
      a(),
      this.toggle(!e)
  })),
  d.accordion({
      collapsible: !0,
      heightStyle: "content",
      activate: function(a, l) {
          l.newPanel.removeClass("sliding"),
          l.oldPanel.removeClass("sliding"),
          e()
      },
      beforeActivate: function(e, a) {
          a.newPanel.addClass("sliding"),
          a.oldPanel.addClass("sliding")
      }
  }),
  m = !0,
  DiabloCalc.loadProfile = p
}();
!function() {
  function a(a) {
      var t = parseInt(a.input.val()) || 0;
      a.limit && t >= a.limit ? a.line.addClass("paragon-capped") : a.line.removeClass("paragon-capped"),
      a.tipvalue.text("+" + DiabloCalc.formatNumber(t * a.amount, a.decimal, 1e3) + (a.percent ? "%" : ""))
  }
  function t() {
      for (var a = 0, t = 0; t < v.length; ++t)
          a += v[t].spent;
      0 == a ? c.hide() : c.show()
  }
  function n(a, t, n) {
      v[a].unspent.text(m("{0} unspent points").format(t)),
      t ? v[a].header.removeClass("paragon-spent") : v[a].header.addClass("paragon-spent"),
      0 == n ? v[a].reset.hide() : v[a].reset.show(),
      v[a].spent = n
  }
  function e(a, t) {
      return Math.floor((Math.min(a, 800) - t + 3) / 4) + (0 == t ? Math.max(0, a - 800) : 0)
  }
  function s(s) {
      for (var i = parseInt(p.val()) || 0, r = 0; r < v.length; ++r) {
          var l = e(i, r)
            , o = 0;
          if (!s && r > 0 && l >= 50 * v[r].stats.length) {
              for (var c = 0, m = 0; m < v[r].stats.length; ++m) {
                  (g = parseInt(v[r].stats[m].input.val()) || 0) < 50 && (c += 50 - g,
                  v[r].stats[m].input.val(50),
                  a(v[r].stats[m])),
                  o += 50
              }
              c && (u = void 0,
              d = void 0,
              DiabloCalc.trigger("updateParagon"))
          } else {
              for (m = 0; m < v[r].stats.length; ++m)
                  o += parseInt(v[r].stats[m].input.val()) || 0;
              if (l < o) {
                  for (m = v[r].stats.length - 1; m >= 0; --m) {
                      var g = parseInt(v[r].stats[m].input.val()) || 0
                        , c = Math.min(g, o - l);
                      v[r].stats[m].input.val(g - c),
                      o -= c,
                      a(v[r].stats[m])
                  }
                  u = void 0,
                  d = void 0,
                  DiabloCalc.trigger("updateParagon")
              }
          }
          n(r, l - o, o)
      }
      t()
  }
  function i(t) {
      if (void 0 === t)
          for (var n = 0; n < v.length; ++n)
              for (e = 0; e < v[n].stats.length; ++e)
                  v[n].stats[e].input.val(0),
                  a(v[n].stats[e]);
      else
          for (var e = 0; e < v[t].stats.length; ++e)
              v[t].stats[e].input.val(0),
              a(v[t].stats[e]);
      s(),
      DiabloCalc.trigger("updateParagon")
  }
  function r(i, r) {
      for (var l = v[i].stats[r], o = 0, c = 0; c < v[i].stats.length; ++c)
          o += parseInt(v[i].stats[c].input.val()) || 0;
      var m = e(parseInt(p.val()) || 0, i);
      o > m ? (i > 0 && o > 200 ? l.input.val(Math.max(0, (parseInt(l.input.val()) || 0) - (o - m))) : p.val(function(a, t) {
          return a <= 200 ? 4 * a + t - 3 : a + 600
      }(o, i)),
      s()) : (n(i, m - o, o),
      t()),
      a(l),
      u = void 0,
      d = void 0,
      DiabloCalc.trigger("updateParagon")
  }
  function l(s, i, r) {
      for (var l = v[s].stats[i], o = 0, c = 0; c < v[s].stats.length; ++c)
          o += parseInt(v[s].stats[c].input.val()) || 0;
      var m = e(parseInt(p.val()) || 0, s)
        , g = parseInt(l.input.val()) || 0
        , f = Math.min(r, m - o);
      l.limit && (f = Math.min(f, l.limit - g)),
      l.input.val(g + f),
      n(s, m - o - f, o + f),
      t(),
      a(l),
      u = void 0,
      d = void 0,
      DiabloCalc.trigger("updateParagon")
  }
  function o() {
      for (var t = $(".char-class").val(), n = 0; n < v.length; ++n)
          for (var e = 0; e < v[n].stats.length; ++e) {
              var s = v[n].stats[e];
              if (s.stats)
                  for (var i = 0; i < s.stats.length; ++i) {
                      var r = s.stats[i];
                      if (!DiabloCalc.stats[r].classes || DiabloCalc.stats[r].classes.indexOf(t) >= 0) {
                          s.stat = r,
                          s.icons && (s.icon = s.icons[i]),
                          s.tipicon.css("background-position", 24 * -s.icon + "px 0"),
                          s.tipname.text(DiabloCalc.stats[r].name),
                          s.amounts && (s.amount = s.amounts[i]),
                          a(s);
                          break
                      }
                  }
          }
      u = void 0,
      d = void 0,
      DiabloCalc.trigger("updateParagon")
  }
  var p, c, u, m = DiabloCalc.locale("ui-paragon.js"), v = [{
      name: m("Core"),
      stats: [{
          stats: ["int", "str", "dex"],
          icons: [2, 0, 1],
          amount: 5
      }, {
          stat: "vit",
          icon: 3,
          amount: 5
      }, {
          stat: "ms",
          icon: 4,
          amount: .5,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stats: ["maxap", "maxhatred", "maxfury", "maxmana", "maxspirit", "maxwrath", "maxessence"],
          icons: [9, 7, 6, 5, 8, 10, 5],
          amounts: [.5, .5, 1, 4, 1, .5, 1],
          decimal: 2,
          limit: 50
      }]
  }, {
      name: m("Offense"),
      stats: [{
          stat: "ias",
          icon: 11,
          amount: .2,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "cdr",
          icon: 12,
          amount: .2,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "chc",
          icon: 13,
          amount: .1,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "chd",
          icon: 14,
          amount: 1,
          decimal: 2,
          limit: 50,
          percent: !0
      }]
  }, {
      name: m("Defense"),
      stats: [{
          stat: "life",
          icon: 15,
          amount: .5,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "armor_percent",
          icon: 16,
          amount: .5,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "resall",
          icon: 17,
          amount: 5,
          limit: 50
      }, {
          stat: "regen",
          icon: 18,
          amount: 214.5684,
          decimal: 1,
          limit: 50
      }]
  }, {
      name: m("Utility"),
      stats: [{
          stat: "area",
          icon: 19,
          amount: 1,
          limit: 50,
          decimal: 2,
          percent: !0
      }, {
          stat: "rcr",
          icon: 20,
          amount: .2,
          decimal: 2,
          limit: 50,
          percent: !0
      }, {
          stat: "lph",
          icon: 21,
          amount: 160.926,
          decimal: 1,
          limit: 50
      }, {
          stat: DiabloCalc.ptr ? "pickup" : "gf",
          icon: 22,
          amount: 1,
          decimal: 2,
          limit: 50,
          percent: !0
      }]
  }];
  DiabloCalc.getParagon = function() {
      if (void 0 !== u)
          return u;
      u = {};
      for (var a = 0; a < v.length; ++a)
          for (var t = 0; t < v[a].stats.length; ++t) {
              var n = v[a].stats[t];
              u[n.stat] = [n.amount * (parseInt(n.input.val()) || 0)]
          }
      return u
  }
  ;
  var d;
  DiabloCalc.getParagonLevels = function() {
      if (void 0 !== d)
          return d;
      for (var a = {
          level: parseInt(p.val()) || 0,
          data: []
      }, t = 0; t < v.length; ++t) {
          for (var n = [], e = 0; e < v[t].stats.length; ++e) {
              var s = v[t].stats[e];
              n.push(parseInt(s.input.val()) || 0)
          }
          a.data.push(n)
      }
      return d = a,
      a
  }
  ,
  DiabloCalc.setParagon = function(t) {
      p.val(t.level);
      for (var n = 0; n < v.length; ++n)
          for (var e = 0; e < v[n].stats.length; ++e) {
              var i = v[n].stats[e];
              i.input.val(t.data ? t.data[n][e] : 0),
              a(i)
          }
      s(!0),
      u = void 0,
      d = void 0,
      DiabloCalc.trigger("updateParagon")
  }
  ;
  var g = $("#tab-paragon");
  (c = $('<span class="reset-link reset-all">' + m("Reset all") + "</span>").hide()).click(function() {
      i()
  });
  var f = $('<div class="paragon-header"></div>')
    , h = $('<span class="paragon-level"></span>').text(m("Paragon level"));
  (p = $("<input></input>").attr("type", "number").attr("min", "0").val(0)).blur(DiabloCalc.validateNumber).change(function() {
      s()
  }),
  h.append(p),
  f.append(c).append(h),
  g.append(f);
  for (var b = 0; b < v.length; ++b) {
      v[b].header = $("<h3></h3>").text(v[b].name + " ").addClass("paragon-spent"),
      v[b].unspent = $('<span class="paragon-unspent"></span>').text(m("{0} unspent points").format(0)),
      v[b].reset = $('<span class="reset-link reset-tab">' + m("(reset)") + "</span>").hide(),
      g.append(v[b].header.append(v[b].reset).append(v[b].unspent)),
      v[b].category = $("<ul></ul>"),
      g.append(v[b].category),
      v[b].reset.click(function(a) {
          return function() {
              i(a)
          }
      }(b));
      for (var C = 0; C < v[b].stats.length; ++C) {
          var x = v[b].stats[C];
          x.stats && (x.stat = x.stats[0]),
          x.icons && (x.icon = x.icons[0]),
          x.amounts && (x.amount = x.amounts[0]),
          x.line = $("<li></li>"),
          x.tipicon = $('<span class="icon"></span>').css("background-position", 24 * -x.icon + "px 0"),
          x.tipname = $("<span></span>").text(DiabloCalc.stats[x.stat].name),
          x.tipvalue = $('<span class="paragon-effect"></span>').text(0),
          x.add = $('<span class="paragon-add">&nbsp;</span>'),
          x.input = $('<input type="number" min="0"></input>').val(0),
          x.percent && x.tipvalue.addClass("paragon-percent"),
          x.limit && x.input.attr("max", x.limit),
          x.input.blur(DiabloCalc.validateNumber),
          x.input.on("input", function(a, t) {
              return function() {
                  r(a, t)
              }
          }(b, C)),
          x.add.click(function(a, t) {
              return function(n) {
                  n.preventDefault(),
                  n.stopPropagation(),
                  l(a, t, n.ctrlKey ? 100 : n.shiftKey ? 10 : 1)
              }
          }(b, C)),
          x.line.append(x.tipicon, x.tipname, x.input, x.add, x.tipvalue),
          v[b].category.append(x.line),
          a(x)
      }
  }
  DiabloCalc.register("changeClass", o),
  o()
}();
!function() {
  function a(a, l, e) {
      var s = e.getValue(l.stat);
      return a = a.replace(/{([^};]*)(?:;(\+)?([0-9])?(\%)?(x)?)?}/g, function(a, l, t, i, o, n) {
          return l = l.replace(/\$([1-9])/g, function(a, l) {
              return "number" == typeof s ? s : s[["min", "max"][parseInt(l) - 1]]
          }),
          l = e.execString(l),
          l = "number" == typeof l ? DiabloCalc.formatNumber(l, i, 1e3) : DiabloCalc.formatNumber(l.min, i, 1e3) + "-" + DiabloCalc.formatNumber(l.max, i, 1e3),
          '<span class="d3-color-green">' + (t || "") + l + (o || "") + (n || "") + "</span>"
      }),
      (a = a.replace(/\$([1-9])/g, function(a, e) {
          return '<span class="d3-color-green">' + (l.plus ? "+" : "") + DiabloCalc.formatNumber("number" == typeof s ? s : s[["min", "max"][parseInt(e) - 1]], l.decimal, 1e3) + (l.percent ? "%" : "") + "</span>"
      })).replace(/<\/span>-<span class="d3-color-green">/g, "-")
  }
  function l(l, e) {
      function s(a) {
          return DiabloCalc.formatNumber(a, f, 1e3) + d
      }
      function t(a) {
          return '<span class="d3-color-' + (a >= 0 ? "green" : "red") + '">' + s(a) + "</span>"
      }
      var o = a(l.tooltip, l, e)
        , n = "</span>";
      o = o.replace(/\n( ?\* )?/g, function(a, l) {
          var e = n + '<br/><span class="tooltip-icon-' + (l ? "bullet" : "nobullet") + '"></span>';
          return n = "",
          e
      }),
      l.suffix && (o += n + '<br/><span class="tooltip-icon-bullet"></span>' + a(l.suffix, l, e),
      n = "");
      var c = l.sourcestat || l.stat;
      if (DiabloCalc.stats[c]) {
          var r = {}
            , p = {};
          if ("damage" != c && (!DiabloCalc.stats[c].classes || DiabloCalc.stats[c].classes.indexOf(DiabloCalc.charClass) >= 0) && DiabloCalc.getItemAffixes)
              for (var u in DiabloCalc.itemSlots) {
                  (m = DiabloCalc.getItemAffixes(u, !0)) && m[c] && m[c].min && m[c].max && (r[u] = 0,
                  p[u] = m[c])
              }
          if (DiabloCalc.stats[c] && DiabloCalc.stats[c].resist && e.sources.resall) {
              r = $.extend(r, e.sources.resall);
              for (var u in e.sources.resall)
                  if (DiabloCalc.itemSlots[u] && DiabloCalc.getItemAffixes) {
                      var m = DiabloCalc.getItemAffixes(u, !0);
                      m && m.resall && m.resall.min && m.resall.max && (p[u] = m.resall)
                  }
          }
          e.sources[c] && (r = $.extend(r, e.sources[c]));
          var b = [];
          if (DiabloCalc.stats[c] && DiabloCalc.stats[c].special && (b = e.getSpecial(c, null, !1, null)),
          !$.isEmptyObject(r) || !$.isEmptyObject(b)) {
              o += n,
              o += '<br/><span class="tooltip-icon-bullet"></span>' + (l.sourcename || i("Increased by")) + ":",
              n = "";
              var f = void 0 === l.sourcedecimal ? l.decimal : l.sourcedecimal
                , d = (void 0 === l.sourcepercent ? l.percent : l.sourcepercent) ? "%" : "";
              for (var C in r)
                  DiabloCalc.sourceNames[C] && (o += '<br/><span class="tooltip-icon-nobullet"></span><span class="d3-color-' + (r[C] ? "gold" : "gray") + '">' + DiabloCalc.sourceNames[C] + "</span>: ",
                  r[C] ? (o += t(r[C]),
                  p[C] && (o += ' <span class="d3-color-gray">(' + s(p[C].min) + "-" + s(p[C].max) + ")</span>")) : p[C] && (o += '<span class="d3-color-gray">' + s(p[C].min) + "-" + s(p[C].max) + "</span>"));
              for (var h = 0; h < b.length; ++h)
                  o += '<br/><span class="tooltip-icon-nobullet"></span><span class="d3-color-gold">' + b[h][0] + "</span>: ",
                  o += t(b[h][1])
          }
      }
      return '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + o + n + "</p></div>"
  }
  function e(a, l) {
      var e = l.sources[a] || {};
      DiabloCalc.onHighlight && DiabloCalc.onHighlight(!0),
      DiabloCalc.stats[a] && DiabloCalc.stats[a].resist && l.sources.resall && (e = $.extend(e, l.sources.resall));
      for (var s in DiabloCalc.itemSlots)
          (e[s] || DiabloCalc.itemSlots[s].item && e[DiabloCalc.itemSlots[s].item.id]) && DiabloCalc.itemSlots[s].dollFrame.addClass("highlight")
  }
  function s() {
      DiabloCalc.onHighlight && DiabloCalc.onHighlight(!1);
      for (var a in DiabloCalc.itemSlots)
          DiabloCalc.itemSlots[a].dollFrame && DiabloCalc.itemSlots[a].dollFrame.removeClass("highlight")
  }
  function t() {
      for (var a = r.find("input").val().toLowerCase(), l = DiabloCalc.getStats(), e = $(".char-class").val(), s = 0; s < o.length; ++s)
          for (var t = 0; t < o[s].stats.length; ++t) {
              var i = o[s].stats[t];
              if (i.line && !i.separator)
                  if (i.classes && i.classes.indexOf(e) < 0)
                      i.line.hide();
                  else if (a && i.name.toLowerCase().indexOf(a) < 0)
                      i.line.hide();
                  else {
                      var n = l.getValue(i.stat);
                      !i.collapse || n ? ("number" == typeof n ? (i.line.toggleClass("zero", !n),
                      n = DiabloCalc.formatNumber(n, i.decimal, 1e3)) : (i.line.toggleClass("zero", !n.min && !n.max),
                      n = DiabloCalc.formatNumber(n.min, i.decimal, 1e3) + "-" + DiabloCalc.formatNumber(n.max, i.decimal, 1e3)),
                      i.value.text((i.plus ? "+" : "") + n + (i.percent ? "%" : "")),
                      i.line.show()) : i.line.hide()
                  }
          }
  }
  var i = DiabloCalc.locale("ui-stats.js")
    , o = DiabloCalc.localeTable.uiStats
    , n = $(".col.statsframe .statsframe-list")
    , c = $(".col.statsframe")
    , r = $('<div class="statsframe-search empty"><input placeholder="' + i("Search") + '"></input><span class="clear"></span></div>');
  c.prepend(DiabloCalc.account.makeLine(), r),
  r.find("input").focus(function() {
      $(this).attr("placeholder", "")
  }).blur(function() {
      $(this).attr("placeholder", i("Search"))
  }).on("input", function() {
      t(),
      n.toggleClass("search", $(this).val().length > 0),
      r.toggleClass("empty", 0 === $(this).val().length)
  }),
  r.find(".clear").click(function() {
      r.find("input").val("").trigger("input")
  });
  for (var p = o[1].stats, u = 0; u < p.length && !p[u].separator; )
      u++;
  for (var m in DiabloCalc.stats)
      DiabloCalc.stats[m].skill && p.splice(u, 0, {
          name: i("{0} Damage Increase").format(DiabloCalc.stats[m].skill),
          stat: m,
          decimal: 2,
          percent: !0,
          classes: DiabloCalc.stats[m].classes,
          collapse: !0,
          tooltip: i("{0} Damage Increase: $1\n* Increases Damage dealt by this skill.").format(DiabloCalc.stats[m].skill)
      });
  var b = $('<div class="col-container"></div>');
  n.append(b);
  var f = $('<div class="column"></div>');
  b.append(f);
  for (var d = {}, C = 0; C < o.length; ++C) {
      var h = $('<div class="stat-section"></div>');
      f.append(h),
      h.append("<h3>" + o[C].name + "</h3>");
      var g = $('<ul class="flex"></ul>');
      h.append(g);
      for (var v = 0; v < o[C].stats.length; ++v) {
          var D = o[C].stats[v];
          (!D.stat || D.name || DiabloCalc.stats[D.stat]) && (D.line = $("<li></li>"),
          d[D.stat] = D,
          g.append(D.line),
          D.separator ? D.line.addClass("stat-separator") : (D.name || (D.name = DiabloCalc.stats[D.stat].name),
          D.line.append("<span>" + D.name + "</span>"),
          D.value = $("<span></span>"),
          D.line.append(D.value),
          D.line.hover(function(a) {
              return function() {
                  if (DiabloCalc.getStats && DiabloCalc.tooltip) {
                      var s = DiabloCalc.getStats();
                      DiabloCalc.tooltip.showHtml(this, l(a, s), "left");
                      e(a.sourcestat || a.stat, s)
                  }
              }
          }(D), function() {
              DiabloCalc.tooltip && (DiabloCalc.tooltip.hide(),
              s())
          })))
      }
  }
  var x = $('<div class="stat-section export"><h3>' + i("Export") + "</h3><ul></ul></div>");
  f.append(x);
  var S = document.createElement("a");
  x.find("ul").append($('<li><span class="link-like">' + i("Export CSV") + "</span></li>").on("click", "span", function() {
      for (var a = DiabloCalc.getProfile(), l = [], e = [DiabloCalc.classes[a.class].name], s = [i("LMB"), i("RMB"), "1", "2", "3", "4"], t = DiabloCalc.locale("ui-skills.js")("No rune"), o = 0; o < a.skills.length; ++o) {
          c = (n = a.skills[o]) && DiabloCalc.skills[a.class][n[0]];
          n && c && l.push(s[o] + "," + c.name + "," + ("x" === n[1] ? t : c.runes[n[1]]))
      }
      l.length && (e.push(l.join("\n")),
      l.length = 0);
      for (o = 0; o < a.passives.length; ++o) {
          var n = a.passives[o]
            , c = n && DiabloCalc.passives[DiabloCalc.charClass][n];
          n && c && l.push(c.name)
      }
      l.length && (e.push(l.join("\n")),
      l.length = 0);
      var r = DiabloCalc.locale("ui-equipment.js");
      for (var o in a.items) {
          var p = [DiabloCalc.itemSlots[o].name]
            , c = (g = a.items[o]) && DiabloCalc.itemById[g.id];
          if (g && c) {
              p.push(c.name),
              p.push(g.ancient ? r("Ancient") : "");
              for (var u in g.stats) {
                  var m = "custom" === u && c.required && c.required.custom && c.required.custom.name || DiabloCalc.stats[u] && DiabloCalc.stats[u].name;
                  m && p.push(g.stats[u].join("-") + " " + m)
              }
          } else
              p.push(r("Empty slot"));
          if (l.push(p.join(",")),
          g && g.gems)
              for (var b = 0; b < g.gems.length; ++b) {
                  if ((C = g.gems[b]) && C instanceof Array) {
                      var f = DiabloCalc.legendaryGems[C[0]]
                        , d = DiabloCalc.gemColors[C[1]];
                      f ? l.push("," + f.name + "," + C[1]) : d && l.push("," + d.names[C[0]])
                  }
              }
      }
      l.length && (e.push(l.join("\n")),
      l.length = 0);
      for (var C in a.kanai) {
          var h = a.kanai[C]
            , g = h && DiabloCalc.itemById[h];
          g && l.push(g.name)
      }
      l.length && (l.unshift(DiabloCalc.locale("ui-skills.js")("Kanai's Cube")),
      e.push(l.join("\n")),
      l.length = 0);
      var v = window.URL.createObjectURL(new Blob([e.join("\n\n")],{
          type: "text/csv"
      }));
      S.href = v,
      S.download = "profile.csv",
      document.body.appendChild(S),
      S.click(),
      setTimeout(function() {
          document.body.removeChild(S),
          window.URL.revokeObjectURL(v)
      }, 100)
  })),
  DiabloCalc.isKnownStat = function(a) {
      return !!d[a]
  }
  ,
  DiabloCalc.showStatTip = function(a, e) {
      d[e] && DiabloCalc.tooltip.showHtml(a, l(d[e], DiabloCalc.getStats()))
  }
  ;
  var y = $('<div class="column"></div>');
  b.append(y),
  b.find(".column").sortable({
      containment: b,
      connectWith: ".col.statsframe .column",
      items: ".stat-section",
      handle: "h3",
      distance: 4,
      placeholder: "drop-ph",
      forcePlaceholderSize: !0,
      start: function() {
          c.addClass("two-column")
      },
      stop: function() {
          setTimeout(function() {
              y.is(":empty") && c.removeClass("two-column")
          }, 0)
      }
  }),
  $(".col.statsframe h3").click(function() {
      $(this).next().slideToggle()
  }),
  DiabloCalc.register("updateStats", t)
}();
!function() {
  function i() {
      S.hide(),
      y.hide(),
      g = c.scrollTop();
      var i = DiabloCalc.charClass;
      u.empty(),
      u.removeClass().addClass("class-" + i),
      k = [],
      D = [];
      for (var s in DiabloCalc.legendaryGems)
          delete DiabloCalc.legendaryGems[s].line;
      for (var l in DiabloCalc.itemaffixes)
          delete DiabloCalc.itemaffixes[l].line;
      for (a = 0; a < 6; ++a)
          k.push(new DiabloCalc.SkillBox.skill(u,a)),
          k[a].header.click(function(i) {
              return function(s) {
                  S.show(i, s)
              }
          }(k[a])).contextmenu(function(i) {
              return function() {
                  return i.setSkill(),
                  DiabloCalc.trigger("updateSkills", !0),
                  !1
              }
          }(k[a]));
      u.append('<h3 class="skill-category">' + n("Passives") + "</h3>");
      for (var a = 0; a < 4; ++a)
          D.push(new DiabloCalc.SkillBox.passive(u,a)),
          D[a].header.click(function(i) {
              return function(s) {
                  y.show(i, s)
              }
          }(D[a])).contextmenu(function(i) {
              return function() {
                  return i.setPassive(),
                  DiabloCalc.trigger("updateSkills", !0),
                  !1
              }
          }(D[a]));
      var e = $('<div><h3 class="skill-category" style="margin-top: 10px">' + n("Granted by Hellfire Amulet") + "</h3></div>").hide();
      u.append(e),
      (b = new DiabloCalc.SkillBox.passive(e,-1)).section = e,
      v = $('<div><h3 class="skill-category">' + n("Legendary Gems") + "</h3></div>").hide(),
      u.append(v),
      C = $('<div><h3 class="skill-category">' + n("Item Effects") + "</h3></div>").hide(),
      u.append(C),
      d.empty(),
      m = {
          weapon: new DiabloCalc.SkillBox.kanai(d,"weapon"),
          armor: new DiabloCalc.SkillBox.kanai(d,"armor"),
          jewelry: new DiabloCalc.SkillBox.kanai(d,"jewelry"),
          extra: new DiabloCalc.SkillBox.kanai(d,"extra")
      },
      S.setClass(i),
      y.setClass(i),
      DiabloCalc.trigger("updateSkills")
  }
  function s(i) {
      if (!i || DiabloCalc.skills[DiabloCalc.charClass][i[0]])
          return i;
      var s = DiabloCalc.skills[DiabloCalc.charClass];
      for (var l in s)
          if (s[l].oldid === i[0])
              return [l, i[1]]
  }
  function l(i) {
      if (!i || DiabloCalc.passives[DiabloCalc.charClass][i])
          return i;
      var s = DiabloCalc.passives[DiabloCalc.charClass];
      for (var l in s)
          if (s[l].oldid === i)
              return l
  }
  function a(i, s, l) {
      if (i)
          for (var a in i)
              s.add(a, i[a], 1, l)
  }
  function e(i) {
      if ("followers" !== i.type && "shrines" !== i.type) {
          var s = DiabloCalc.partybuffs[i.index].class;
          for (var l in DiabloCalc.classes)
              i.header.toggleClass("class-" + l, l === s),
              i.tab.toggleClass("class-" + l, l === s);
          if (i.header.toggleClass("class-icon", !!s),
          i.header.toggleClass("icon-coop", !s),
          i.tab.children().detach(),
          i.class) {
              if (i.tab.append(i.class, i.clsChosen),
              !DiabloCalc.noChosen) {
                  var a = i.clsChosen.find("span").first();
                  for (var l in DiabloCalc.classes)
                      a.toggleClass("class-" + l, l === s);
                  a.toggleClass("class-icon", !!s)
              }
              i.class.val(s),
              i.class.trigger("chosen:updated")
          } else {
              i.class = $('<select class="buff-class"><option value="">' + (DiabloCalc.noChosen ? n("Select Class") : "") + "</option></select>");
              for (var l in DiabloCalc.classes)
                  DiabloCalc.classes[l].follower || i.class.append('<option value="' + l + '" class="class-icon class-' + l + '">' + DiabloCalc.classes[l].name + "</option>");
              i.tab.append(i.class),
              i.class.chosen({
                  allow_single_deselect: !0,
                  disable_search: !0,
                  inherit_select_classes: !0,
                  placeholder_text_single: n("Select Class")
              }).change(function() {
                  var s = i.class.val();
                  if (!DiabloCalc.noChosen) {
                      var l = i.clsChosen.find("span").first();
                      for (var a in DiabloCalc.classes)
                          l.toggleClass("class-" + a, a === s);
                      l.toggleClass("class-icon", !!s)
                  }
                  DiabloCalc.partybuffs[i.index].class = s,
                  e(i),
                  DiabloCalc.trigger("updateSkills", !0)
              }),
              DiabloCalc.noChosen || (i.clsChosen = i.class.next())
          }
          $.each(DiabloCalc.partybuffs[i.index].items, function(l, a) {
              (!a.classes || a.classes.indexOf(s) >= 0) && (a.skillbox ? i.tab.append(a.skillbox.line) : a.skillbox = new DiabloCalc.SkillBox.buff(i.tab,a),
              a.skillbox.updateBoxes())
          }),
          s && $.each(DiabloCalc.partybuffs[i.index][s], function(s, l) {
              l.skillbox ? i.tab.append(l.skillbox.line) : l.skillbox = new DiabloCalc.SkillBox.buff(i.tab,l),
              l.skillbox.updateBoxes()
          })
      } else {
          var t;
          $.each("followers" === i.type ? DiabloCalc.followerbuffs : DiabloCalc.shrinebuffs, function(s, l) {
              l.skillbox || (t != l.category && (t = l.category,
              i.tab.append("<h3>" + t + "</h3>")),
              l.skillbox = new DiabloCalc.SkillBox.buff(i.tab,l)),
              l.skillbox.updateBoxes()
          })
      }
  }
  function t() {
      for (var i = 0; i < x.length; ++i)
          e(x[i])
  }
  function o(i, s) {
      if (i.deltaY || i.deltaFactor) {
          var l = $(this)
            , a = l.scrollTop() - i.deltaY * i.deltaFactor;
          if (this.scrollHeight <= l.outerHeight() + 1 || a > this.scrollHeight - l.outerHeight())
              return;
          if (c.is(this) && a < 0)
              return;
          return l.scrollTop(a),
          i.stopPropagation(),
          !1
      }
  }
  var n = DiabloCalc.locale("ui-skills.js")
    , c = $("#tab-skills")
    , r = $("<input></input>").attr("type", "checkbox").change(function() {
      h.toggle(!!this.checked),
      DiabloCalc.trigger("updateStats")
  })
    , p = $("<input></input>").attr("type", "checkbox").change(function() {
      DiabloCalc.trigger("updateStats")
  })
    , f = $("<select></select>");
  f.append('<option value="">' + n("Generic") + "</option>"),
  f.append('<option value="demons">' + n("Demon") + "</option>"),
  f.append('<option value="beasts">' + n("Beast") + "</option>"),
  f.append('<option value="humans">' + n("Human") + "</option>"),
  f.append('<option value="undead">' + n("Undead") + "</option>");
  var h = $('<label style="margin-left: 8px">' + n("Boss") + "</label>").prepend(p).hide();
  DiabloCalc.addOption("showElites", function() {
      return r.prop("checked")
  }, function(i) {
      r.prop("checked", i),
      h.toggle(!!i)
  }),
  DiabloCalc.addOption("targetBoss", function() {
      return p.prop("checked")
  }, function(i) {
      p.prop("checked", i),
      DiabloCalc.trigger("updateStats")
  }),
  DiabloCalc.addOption("targetType", function() {
      return f.val()
  }, function(i) {
      f.val(i),
      f.trigger("chosen:updated"),
      DiabloCalc.trigger("updateStats")
  }),
  c.append($('<span class="option-box">' + n("Target: ") + "</span>").append(f, $('<label style="margin-left: 8px">' + n("Elite") + "</label>").prepend(r), h)),
  f.change(function() {
      DiabloCalc.trigger("updateStats")
  });
  var u, d, b, v, C, g, k = [], D = [], x = [], m = {}, S = new function() {
      this.enable = function(i, s) {
          var l = DiabloCalc.skills[DiabloCalc.charClass][i];
          this.skills[i].css("background-position", -42 * l.col + "px " + (-84 * l.row - (s ? 0 : 42)) + "px")
      }
      ,
      this.selectRune = function(i) {
          this.rune && this.runes[this.rune].removeClass("selected"),
          this.selRune = i,
          this.rune && this.runes[this.rune].addClass("selected")
      }
      ,
      this.onRuneClicked = function(i) {
          this.slot && this.rune !== i && (this.slot.setSkill([this.skill, i]),
          DiabloCalc.trigger("updateSkills", !0)),
          this.hide()
      }
      ,
      this.selectSkill = function(i) {
          if (this.popup.toggleClass("expanded", !!i),
          this.skill && (this.skills[this.skill].removeClass("selected"),
          this.enable(this.skill, !0)),
          this.skill = i,
          this.skill && (this.skills[this.skill].addClass("selected"),
          this.enable(this.skill, !1)),
          this.runeList && (this.selectRune(),
          this.runeList.empty(),
          this.runes = {},
          i)) {
              var s = this
                , l = DiabloCalc.skills[DiabloCalc.charClass][i];
              this.runes.x = $('<span class="skill-popup-rune-line"><span class="skill-popup-rune-x"></span>' + n("No Rune") + "</span>"),
              this.runes.x.hover(function() {
                  DiabloCalc.tooltip.showSkill(this, DiabloCalc.charClass, i)
              }, function() {
                  DiabloCalc.tooltip.hide()
              }).click(function() {
                  s.onRuneClicked("x")
              }),
              this.runeList.append(this.runes.x),
              $.each(l.runes, function(l, a) {
                  s.runes[l] = $('<span class="skill-popup-rune-line"><span class="skill-popup-rune-' + l + '"></span>' + a + "</span>"),
                  s.runes[l].hover(function() {
                      DiabloCalc.tooltip.showSkill(this, DiabloCalc.charClass, i, l, !0)
                  }, function() {
                      DiabloCalc.tooltip.hide()
                  }).click(function() {
                      s.onRuneClicked(l)
                  }),
                  s.runeList.append(s.runes[l])
              }),
              s.selectRune("x")
          }
      }
      ,
      this.onSkillClicked = function(i) {
          this.skill != i && this.slot && !this.disabled[i] && (this.selectSkill(i),
          this.slot.setSkill([this.skill, "x"]),
          DiabloCalc.trigger("updateSkills", !0))
      }
      ,
      this.hide = function() {
          this.selectSkill(),
          this.slot && (this.slot.line.removeClass("selected"),
          this.prevSlot = this.slot,
          setTimeout(function(i) {
              setTimeout(function(i) {
                  i.prevSlot = void 0
              }, 0, i)
          }, 0, this)),
          this.slot = void 0,
          this.popup.removeClass("expanded"),
          this.popup.hide(),
          DiabloCalc.tooltip.hide(),
          DiabloCalc.hidePopup(this)
      }
      ,
      this.show = function(i, s) {
          if (i !== this.prevSlot) {
              if (this.hide(),
              this.slot = i,
              i.line.addClass("selected"),
              s)
                  this.popup.css("left", s.pageX + 20),
                  this.popup.css("top", Math.max(60, s.pageY - 300));
              else {
                  var l = i.header.offset();
                  this.popup.css("left", l.left + i.header.width() - 250),
                  this.popup.css("top", Math.max(60, l.top + i.header.height() - 300))
              }
              this.disabled = {};
              for (var a = {}, e = 0; e < k.length; ++e)
                  k[e] !== i && k[e].skill && (this.disabled[k[e].skill[0]] = !0,
                  (o = DiabloCalc.skills[DiabloCalc.charClass][k[e].skill[0]]) && o.exclusive && (a[o.exclusive] = k[e].skill[0]));
              for (var t in this.skills) {
                  var o = DiabloCalc.skills[DiabloCalc.charClass][t];
                  i === k[0] && o && o.nolmb && (this.disabled[t] = !0),
                  o && o.exclusive && a[o.exclusive] && a[o.exclusive] !== t && (this.disabled[t] = !0),
                  this.enable(t, !this.disabled[t])
              }
              i.skill && (this.selectSkill(i.skill[0]),
              this.selectRune(i.skill[1])),
              this.popup.show(),
              this.popup.focus(),
              DiabloCalc.showPopup(this, !0)
          } else
              this.hide()
      }
      ,
      this.setClass = function(i) {
          this.popup.empty(),
          this.skills = {},
          this.popup.removeClass().addClass("skill-popup class-" + i);
          var s = this;
          $.each(DiabloCalc.skills[i], function(l, a) {
              s.skills[l] = $('<span class="skill-icon skill-button"><span class="skill-frame"></span></span>').css({
                  "background-position": -42 * a.col + "px " + -84 * a.row + "px",
                  left: 10 + 48 * a.col,
                  top: 10 + 48 * a.row
              }).click(function() {
                  s.onSkillClicked(l)
              }).hover(function() {
                  DiabloCalc.tooltip.showSkill(this, i, l)
              }, function() {
                  DiabloCalc.tooltip.hide()
              }),
              DiabloCalc.enableTouch(s.skills[l]),
              s.popup.append(s.skills[l])
          }),
          this.runeList = $('<div class="rune-list"></div>'),
          this.popup.append(this.runeList)
      }
      ,
      this.contains = function(i) {
          return !(!this.popup.is(i) && !this.popup.has(i).length)
      }
      ,
      this.popup = $('<div class="skill-popup" tabIndex="-1"></div>').hide(),
      this.skills = {},
      this.disabled = {},
      this.runes = {},
      $("body").append(this.popup)
  }
  , y = new function() {
      this.hide = function() {
          this.slot && (this.slot.line.removeClass("selected"),
          this.prevSlot = this.slot,
          setTimeout(function(i) {
              setTimeout(function(i) {
                  i.prevSlot = void 0
              }, 0, i)
          }, 0, this)),
          this.slot = void 0,
          this.popup.hide(),
          DiabloCalc.tooltip.hide(),
          DiabloCalc.hidePopup(this)
      }
      ,
      this.show = function(i, s) {
          if (i !== this.prevSlot) {
              if (this.hide(),
              this.slot = i,
              i.line.addClass("selected"),
              s)
                  this.popup.css("left", s.pageX + 20),
                  this.popup.css("top", Math.max(60, s.pageY - this.height));
              else {
                  var l = i.header.offset();
                  this.popup.css("left", l.left + i.header.width() - 185),
                  this.popup.css("top", Math.max(60, l.top + i.header.height() - this.height))
              }
              this.disabled = {};
              for (var a = 0; a < D.length; ++a)
                  D[a].passive && (this.disabled[D[a].passive] = !0);
              for (var e in this.passives) {
                  var t = -42 * DiabloCalc.passives[DiabloCalc.charClass][e].index;
                  this.passives[e].toggleClass("selected", !!this.disabled[e]),
                  this.passives[e].css("background-position", t + "px " + (this.disabled[e] ? -42 : 0) + "px")
              }
              this.popup.show(),
              this.popup.focus(),
              DiabloCalc.showPopup(this, !0)
          } else
              this.hide()
      }
      ,
      this.onClick = function(i) {
          this.slot && !this.disabled[i] && (this.slot.setPassive(i),
          DiabloCalc.trigger("updateSkills", !0),
          this.hide())
      }
      ,
      this.setClass = function(i) {
          this.popup.empty(),
          this.passives = {},
          this.popup.removeClass().addClass("passive-popup class-" + i);
          var s = Object.keys(DiabloCalc.passives[i]).length;
          this.height = 59 * Math.ceil(s / 3) + 12,
          this.popup.css("height", this.height);
          var l = this;
          $.each(DiabloCalc.passives[i], function(a, e) {
              var t = $('<span class="passive-icon passive-button"><span class="passive-frame"></span></span>').css("background-position", -42 * e.index + "px 0");
              e.index >= 3 * Math.floor(s / 3) ? 1 == s % 3 ? t.css("left", 74) : t.css("left", 45 + e.index % 3 * 59) : t.css("left", 15 + e.index % 3 * 59),
              t.css("top", 15 + 59 * Math.floor(e.index / 3)),
              t.click(function() {
                  l.onClick(a)
              }).hover(function() {
                  DiabloCalc.tooltip.showSkill(this, i, a)
              }, function() {
                  DiabloCalc.tooltip.hide()
              }),
              l.passives[a] = t,
              DiabloCalc.enableTouch(t),
              l.popup.append(t)
          })
      }
      ,
      this.contains = function(i) {
          return !(!this.popup.is(i) && !this.popup.has(i).length)
      }
      ,
      this.popup = $('<div class="passive-popup" tabIndex="-1"></div>').hide(),
      this.passives = {},
      this.disabled = {},
      $("body").append(this.popup)
  }
  ;
  DiabloCalc.register("editSkill", function(i) {
      $(".editframe").tabs("option", "active", DiabloCalc.TAB_SKILLS),
      k[i].line.get(0).scrollIntoView(),
      setTimeout(function() {
          S.show(k[i])
      }, 0)
  }),
  DiabloCalc.register("editPassive", function(i) {
      $(".editframe").tabs("option", "active", DiabloCalc.TAB_SKILLS),
      D[i].line.get(0).scrollIntoView(),
      setTimeout(function() {
          y.show(D[i])
      }, 0)
  }),
  DiabloCalc.register("editKanai", function(i) {
      var s = $(".editframe").tabs("option", "active");
      s !== DiabloCalc.TAB_EQUIPMENT && s !== DiabloCalc.TAB_SKILLS && $(".editframe").tabs("option", "active", DiabloCalc.TAB_SKILLS),
      m[i].line.get(0).scrollIntoView(),
      setTimeout(function() {
          m[i].namebox.trigger("chosen:open")
      }, 0)
  }),
  DiabloCalc.setSkill = function(i, l) {
      i >= 0 && i < k.length && (k[i].setSkill(s(l)),
      DiabloCalc.trigger("updateSkills"))
  }
  ,
  DiabloCalc.getSkill = function(i) {
      return i >= 0 && i < k.length ? k[i].skill : null
  }
  ,
  DiabloCalc.setPassive = function(i, s) {
      i >= 0 && i < D.length && (D[i].setPassive(l(s)),
      DiabloCalc.trigger("updateSkills"))
  }
  ,
  DiabloCalc.getPassive = function(i) {
      return i >= 0 && i < D.length ? D[i].passive : null
  }
  ,
  DiabloCalc.getSkills = function() {
      var i = {};
      i.skills = [];
      for (s = 0; s < k.length; ++s)
          i.skills.push(k[s].skill);
      i.passives = [];
      for (var s = 0; s < D.length; ++s)
          i.passives.push(D[s].passive);
      i.kanai = {};
      for (var l in m)
          if (m[l].valid()) {
              var a = m[l].getItemPair();
              a && (i.kanai[l] = a)
          }
      return i
  }
  ,
  DiabloCalc.setSkills = function(i) {
      if (i.skills) {
          for (a = 0; a < k.length && a < i.skills.length; ++a)
              k[a].setSkill(s(i.skills[a]));
          for (a = i.skills.length; a < k.length; ++a)
              k[a].setSkill()
      }
      if (i.passives) {
          for (a = 0; a < D.length && a < i.passives.length; ++a)
              D[a].setPassive(l(i.passives[a]));
          for (var a = i.passives.length; a < D.length; ++a)
              D[a].setPassive()
      }
      if (i.kanai)
          for (var e in i.kanai)
              m[e] && m[e].setItemPair(i.kanai[e])
  }
  ,
  DiabloCalc.isSkillActive = function(i) {
      for (s = 0; s < k.length; s++)
          if (k[s].skill && k[s].skill[0] === i)
              return DiabloCalc.skills[DiabloCalc.charClass][i].active;
      for (var s = 0; s < D.length; s++)
          if (i === D[s].passive)
              return !1 !== DiabloCalc.passives[DiabloCalc.charClass][i].active;
      return i === b.passive && !1 !== DiabloCalc.passives[DiabloCalc.charClass][i].active
  }
  ,
  DiabloCalc.addSkillList = function(i) {
      for (s = 0; s < k.length; s++)
          k[s].skill && (i.skills[k[s].skill[0]] = k[s].skill[1]);
      for (var s = 0; s < D.length; s++)
          D[s].passive && (i.passives[D[s].passive] = !0);
      i.extra_passive && DiabloCalc.passives[DiabloCalc.charClass][i.extra_passive] && (i.passives[i.extra_passive] = !0)
  }
  ,
  DiabloCalc.addExtraAffixes = function(i) {
      for (var s in m)
          if (m[s].valid()) {
              var l = m[s].getItemAffix();
              l && (i[l] = m[s].getItemAffixValue())
          }
  }
  ,
  DiabloCalc.addSkillBonuses = function(i) {
      DiabloCalc.addSkillList(i);
      for (var s = ["mantraofsalvation", "mantraofretribution", "mantraofhealing", "mantraofconviction"], l = 0; l < k.length; ++l)
          k[l].skill && (DiabloCalc.skills[DiabloCalc.charClass][k[l].skill[0]].active && a(DiabloCalc.getSkillBonus(k[l].skill, i), i, k[l].skill[0]),
          s.indexOf(k[l].skill[0]) < 0 && a(DiabloCalc.getSkillBonus(k[l].skill, i, "passive"), i, k[l].skill[0]));
      for (var e = {}, l = 0; l < D.length; ++l)
          D[l].passive && !1 !== DiabloCalc.passives[DiabloCalc.charClass][D[l].passive].active && (e[D[l].passive] = !0,
          a(DiabloCalc.getPassiveBonus(D[l].passive, i), i, D[l].passive));
      if ("monk" == DiabloCalc.charClass)
          for (var t = 0; t < 4; t++) {
              var o = s[t];
              !i.skills[o] && i.set_inna_4pc && (i.skills[o] = "x"),
              i.skills[o] && a(DiabloCalc.getSkillBonus([o, i.skills[o]], i, "passive"), i, o)
          }
      i.extra_passive && !e[i.extra_passive] && DiabloCalc.passives[DiabloCalc.charClass][i.extra_passive] && !1 !== DiabloCalc.passives[DiabloCalc.charClass][i.extra_passive].active && a(DiabloCalc.getPassiveBonus(i.extra_passive, i), i, i.extra_passive);
      var n = []
        , c = [];
      for (var r in m)
          if (m[r].valid()) {
              if (f = m[r].getItemAffix()) {
                  var p = m[r].getItemAffixValue();
                  i.affixes[f] = {
                      kanai: r,
                      value: [p]
                  };
                  if (h = m[r].getInfo()) {
                      if (h[u = "buffs"] && !1 !== h.active || (u = "inactive"),
                      u) {
                          if ("function" == typeof h[u]) {
                              d = function(s, l, e, t) {
                                  return function() {
                                      var o = [];
                                      void 0 !== s && o.push(s);
                                      a(e.call(l, o, i), i, t)
                                  }
                              }(p, h, h[u], m[r].getItemPair());
                              h.last ? c.push(d) : d()
                          } else
                              a(h[u], i, m[r].getItemPair());
                          n.push(f)
                      }
                  }
              }
          }
      for (var f in i.affixes)
          if (!(n.indexOf(f) >= 0)) {
              var h = DiabloCalc.itemaffixes[f];
              if (h) {
                  var u = "buffs";
                  if (h[u] && !1 !== h.active || (u = "inactive"),
                  u) {
                      if ("function" == typeof h[u]) {
                          var d = function(s, l, e) {
                              return function() {
                                  a(l.call(s, i.affixes[e].value, i), i, i.getAffixSource(e))
                              }
                          }(h, h[u], f);
                          h.last ? c.push(d) : d()
                      } else
                          a(h[u], i, i.getAffixSource(f))
                  }
              }
          }
      DiabloCalc.addPartyBuffs(i);
      for (l = 0; l < c.length; ++l)
          c[l]()
  }
  ,
  DiabloCalc.addPartyBuffs = function(i) {
      function s(s, l) {
          if (!1 !== l.active || l.multiple) {
              a(l.buffs(i), i, s)
          }
      }
      for (var l = 0; l < DiabloCalc.partybuffs.length; ++l)
          $.each(DiabloCalc.partybuffs[l].items, s),
          DiabloCalc.partybuffs[l].class && $.each(DiabloCalc.partybuffs[l][DiabloCalc.partybuffs[l].class], s);
      $.each(DiabloCalc.followerbuffs, s),
      $.each(DiabloCalc.shrinebuffs, s)
  }
  ,
  DiabloCalc.isGemActive = function(i) {
      return !1 !== DiabloCalc.legendaryGems[i].active
  }
  ,
  u = $("<div></div>"),
  c.append(u),
  d = $("<div></div>"),
  DiabloCalc.equipmentKanai.append(d);
  var w = $('<h3 class="skill-category">' + n("Kanai's Cube") + "</h3>");
  c.append(w),
  $(".editframe").on("tabsactivate", function(i, s) {
      var l = s.newPanel.attr("id");
      "tab-skills-container" == l ? w.after(d) : "tab-equipment-container" == l && DiabloCalc.equipmentKanai.append(d)
  }),
  c.append('<h3 class="skill-category" style="margin-bottom: 5px">' + n("Group Buffs") + "</h3>"),
  c.append('<p class="change-note"><i>' + n("The calculator does not check for correct buff stacking.") + "</i></p>");
  var B = $('<div class="buff-tabs ui-helper-clearfix"></div>');
  c.append(B);
  var P = $("<ul></ul>");
  B.append(P);
  for (T = 0; T < DiabloCalc.partybuffs.length; ++T) {
      I = $('<a href="#buff-' + T + '" class="icon-coop"></a>');
      P.append($("<li></li>").append(I));
      _ = $('<div id="buff-' + T + '"></div>');
      B.append(_),
      x.push({
          index: T,
          header: I,
          tab: _,
          type: "party"
      })
  }
  I = $('<a href="#buff-followers" class="icon-followers"></a>');
  P.append($("<li></li>").append(I));
  _ = $('<div id="buff-followers" class="class-miscbuffs"></div>');
  B.append(_),
  x.push({
      header: I,
      tab: _,
      type: "followers"
  });
  var I = $('<a href="#buff-shrines" class="icon-shrines"></a>');
  P.append($("<li></li>").append(I));
  var _ = $('<div id="buff-shrines" class="class-miscbuffs"></div>');
  B.append(_),
  x.push({
      header: I,
      tab: _,
      type: "shrines"
  }),
  B.tabs(),
  B.find("li").removeClass("ui-corner-top").addClass("ui-corner-left"),
  B.find(".ui-tabs-panel"),
  t(),
  i(),
  c.mwheelIntent(o);
  for (var T = 0; T < x.length; ++T)
      x[T].tab.mwheelIntent(o);
  DiabloCalc.register("changeClass", i),
  DiabloCalc.register("updateStats", function() {
      function i(i) {
          var s = i.getInfo();
          if (i.skillData && s) {
              var l = {
                  data: {}
              };
              t[s.name] = l;
              for (var a in i.skillData)
                  "number" == typeof i.skillData[a].value && (l.data[a] = i.skillData[a].value);
              return l
          }
      }
      function s(i) {
          if (r.indexOf(i) >= 0)
              return !1;
          if (!a.affixes.hasOwnProperty(i))
              return !1;
          var s = DiabloCalc.itemaffixes[i];
          if (!s.info && void 0 === s.active && !s.params)
              return !1;
          if (!s.check)
              return !0;
          if ("function" == typeof s.info) {
              if (s.info(a.affixes[i].value, a))
                  return !0
          } else if (s.info)
              return !0;
          if (void 0 !== s.active || s.params)
              if ("function" == typeof s.buffs) {
                  if (s.buffs(a.affixes[i].value, a))
                      return !0
              } else if (s.buffs)
                  return !0;
          return !1
      }
      for (var l, a = DiabloCalc.getStats(), e = DiabloCalc.charClass, t = {}, o = 0; o < k.length; ++o)
          k[o].update(),
          k[o].skill && (l = i(k[o])) && (l.skill = k[o].skill);
      for (o = 0; o < D.length; ++o)
          D[o].update(),
          (l = i(D[o])) && (l.passive = D[o].passive);
      var n = DiabloCalc.getStats().extra_passive;
      if (n && !DiabloCalc.passives[e][n] && (n = null),
      n)
          for (o = 0; o < D.length; o++)
              if (n == D[o].passive) {
                  n = null;
                  break
              }
      b.setPassive(n),
      b.section.toggle(!!n),
      b.update(),
      (l = i(b)) && (l.passive = b.passive);
      var r = [];
      for (var p in m)
          m[p].valid() ? (m[p].line.show(),
          m[p].update(),
          r.push(m[p].getItemAffix()),
          (l = i(m[p])) && (l.kanai = m[p].getItemAffix())) : m[p].line.hide();
      for (var f in DiabloCalc.legendaryGems)
          DiabloCalc.legendaryGems[f].line && !a.gems.hasOwnProperty(f) && (DiabloCalc.legendaryGems[f].line.line.remove(),
          delete DiabloCalc.legendaryGems[f].line);
      for (var h in a.gems)
          (f = DiabloCalc.legendaryGems[h]).line || (f.line = new DiabloCalc.SkillBox.gem(v,h)),
          f.line.update(),
          (l = i(f.line)) && (l.gem = h);
      v.toggle(!$.isEmptyObject(a.gems));
      for (var u in DiabloCalc.itemaffixes)
          DiabloCalc.itemaffixes[u].line && !s(u) && (DiabloCalc.itemaffixes[u].line.line.remove(),
          delete DiabloCalc.itemaffixes[u].line);
      var d = !1;
      for (var h in a.affixes)
          (u = DiabloCalc.itemaffixes[h]) && (u.kanai || (!u.line && s(h) && (u.line = new DiabloCalc.SkillBox.affix(C,h)),
          u.line && (d = !0,
          u.line.update(),
          (l = i(u.line)) && (l.gem = h))));
      C.toggle(d),
      DiabloCalc.trigger("skillData", t),
      void 0 !== g && (c.scrollTop(g),
      g = void 0)
  }),
  DiabloCalc.register("updateParams", t),
  DiabloCalc.register("importEnd", t),
  DiabloCalc.register("updateSlotItem", function(i) {
      "mainhand" === i && (k.length >= 1 && !k[0].skill && k[0].setSkill(),
      k.length >= 2 && !k[1].skill && k[1].setSkill())
  })
}();
!function() {
  function t(t, s) {
      var a = {};
      if (t)
          for (var e in u)
              a[e] = u[e].stat ? Math.floor(t.getValue(u[e].stat)) : s && s[e] || 0;
      else
          for (var e in u)
              a[e] = s && s[e] || 0;
      return a
  }
  function s(s, a) {
      return {
          label: s,
          values: t(null, a && a.values)
      }
  }
  function a(s, a, e, i) {
      return {
          slot: s,
          label: p("Change {0}").format(DiabloCalc.itemSlots[s].name),
          pre: a,
          offhand: e,
          undo: function() {
              this.post = DiabloCalc.getSlot(this.slot),
              DiabloCalc.setSlot(this.slot, this.pre),
              this.offhand && DiabloCalc.setSlot("offhand", this.offhand)
          },
          redo: function() {
              "mainhand" == this.slot ? (this.offhand = DiabloCalc.getSlot("offhand"),
              DiabloCalc.setSlot(this.slot, this.post),
              DiabloCalc.getSlot("offhand") && (this.offhand = void 0)) : DiabloCalc.setSlot(this.slot, this.post)
          },
          values: t(DiabloCalc.getStats(), i && i.values)
      }
  }
  function e(t, a, e) {
      var i = {
          index: t,
          name: p("Set {0}").format(t + 1),
          line: $('<li class="profiles-set"></li>'),
          icon: $('<span class="class-icon"></span>'),
          label: $('<span class="label"></span>'),
          value: $('<span class="value"></span>'),
          edit: $('<span class="edit"></span>').attr("title", p("Rename")),
          del: $('<span class="delete"></span>').attr("title", p("Delete")),
          pos: 0,
          points: [s(a, e)]
      };
      return i.label.text(i.name),
      i.line.append(i.icon, i.label, i.del, i.edit, i.value),
      i.line.attr("tabIndex", -1),
      i.rename = function(t) {
          i.name = t,
          i.label && i.label.text(i.name)
      }
      ,
      i.startedit = function() {
          i.label && (i.input = $("<input></input>"),
          i.input.val(i.name),
          i.label.replaceWith(i.input),
          i.label = null,
          i.input.focus().select(),
          i.input.focusout(function(t) {
              var s = i.input.val();
              s.length && (i.name = s),
              i.label = $("<span></span>").addClass("label").text(i.name),
              i.input.replaceWith(i.label),
              i.input = null
          }),
          i.input.click(function(t) {
              t.stopPropagation()
          }),
          i.input.keyup(function(t) {
              if (13 == t.keyCode || 27 == t.keyCode) {
                  var s = i.input.val();
                  13 == t.keyCode && s.length && (i.name = s),
                  i.label = $("<span></span>").addClass("label").text(i.name),
                  i.input.replaceWith(i.label),
                  i.input = null
              }
          }))
      }
      ,
      i.line.click(function() {
          d.changeset(i.index),
          i.line.focus()
      }),
      i.edit.click(function() {
          return i.startedit(),
          !1
      }),
      i.del.click(function(t) {
          return $(this).hasClass("disabled") || DiabloCalc.popupMenu(t, p.fixkey({
              "Confirm delete?": function() {
                  d.delset(i.index)
              }
          })),
          !1
      }),
      i
  }
  function i(t, s) {
      if (t === s)
          return !0;
      if (!(t instanceof Object && s instanceof Object))
          return !1;
      for (var a in t) {
          if (t.hasOwnProperty(a) !== s.hasOwnProperty(a))
              return !1;
          if (typeof t[a] != typeof s[a])
              return !1
      }
      for (var a in s) {
          if (t.hasOwnProperty(a) !== s.hasOwnProperty(a))
              return !1;
          if (typeof t[a] != typeof s[a])
              return !1;
          if (t[a]instanceof Object) {
              if (!i(t[a], s[a]))
                  return !1
          } else if (t[a] !== s[a])
              return !1
      }
      return !0
  }
  function l(t, s) {
      var e = b[t];
      if (e || (e = null),
      b[t] = DiabloCalc.getSlot(t),
      (e || b[t]) && !i(e, b[t])) {
          var l = d.last();
          "twohand" == s && e ? d.add(a("mainhand", void 0, e, l)) : "offhand" === t && l.offhand && !b[t] || (l.slot !== t ? d.add(a(t, e, void 0, l)) : void 0 === l.pre && (l.pre = e))
      }
  }
  var o, n, r, c, h, p = DiabloCalc.locale("ui-timeline.js"), u = DiabloCalc.localeTable.statList, d = {
      dataOptionsLight: {
          strokeColor: "#66d",
          pointColor: "#66d",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#66d",
          disabledColor: "#bbb"
      },
      dataOptionsDark: {
          strokeColor: "#aaf",
          pointColor: "#aaf",
          pointStrokeColor: "#121212",
          pointHighlightFill: "#121212",
          pointHighlightStroke: "#aaf",
          disabledColor: "#222"
      },
      setTheme: function() {
          if (this.dataOptions = this.dataOptionsLight,
          $("body").hasClass("theme-light") || (this.dataOptions = this.dataOptionsDark),
          this.line) {
              for (var t in this.dataOptions)
                  this.line.datasets[0][t] = this.dataOptions[t];
              for (var s = 0; s < this.line.datasets[0].points.length; ++s)
                  this.line.datasets[0].points[s].strokeColor = this.dataOptions.pointStrokeColor,
                  this.line.datasets[0].points[s].highlightFill = this.dataOptions.pointHighlightFill,
                  s <= this.curset.pos ? (this.line.datasets[0].points[s].fillColor = this.dataOptions.pointColor,
                  this.line.datasets[0].points[s].highlightStroke = this.dataOptions.pointHighlightStroke) : (this.line.datasets[0].points[s].fillColor = this.dataOptions.disabledColor,
                  this.line.datasets[0].points[s].highlightStroke = this.dataOptions.disabledColor);
              this.line.update()
          }
      },
      globalOptions: {
          showScale: !1,
          scaleShowLabels: !1,
          datasetFill: !1,
          responsive: !0,
          maintainAspectRatio: !1,
          pointHitDetectionRadius: 15,
          customTooltips: function(t) {
              if (t) {
                  var s = d.line.getIndexAtPoint(t.x, t.y);
                  if (s.length > 0) {
                      s = s[0];
                      var a = d.curset.points[s].label;
                      if (d.curstatEx && d.curset.points[s].skillData) {
                          var e = d.curstatEx.split("$")
                            , t = d.curset.points[s].skillData[e[0]]
                            , i = e[0] + " &mdash; " + e[1] + ': <span class="d3-color-green">' + DiabloCalc.formatNumber(t && t.data[e[1]] || 0, 0, 1e3) + "</span>";
                          if (s != d.curset.pos) {
                              var l = t && t.data[e[1]] || 0
                                , o = d.curset.points[d.curset.pos].skillData[e[0]];
                              if ((n = o && o.data[e[1]] || 0) > 1) {
                                  i += ' (<span class="d3-color-green">' + ((r = (l - n) / n * 100) >= 0 ? "+" : "") + DiabloCalc.formatNumber(r, 2) + "%</span>)"
                              }
                          }
                      } else {
                          i = u[d.curstat].name + ': <span class="d3-color-green">' + DiabloCalc[u[d.curstat].func || "formatNumber"](d.curset.points[s].values[d.curstat], 0, 1e3) + "</span>";
                          if (s != d.curset.pos) {
                              var l = d.curset.points[s].values[d.curstat]
                                , n = d.curset.points[d.curset.pos].values[d.curstat];
                              if (n > 1) {
                                  var r = (l - n) / n * 100;
                                  i += ' (<span class="d3-color-green">' + (r >= 0 ? "+" : "") + DiabloCalc.formatNumber(r, 2) + "%</span>)"
                              }
                          }
                      }
                      var c = '<div xmlns="http://www.w3.org/1999/xhtml" class="profile-tooltip"><p><span class="d3-color-gold">' + a + "</span><br/>" + i;
                      s < d.curset.pos ? c += '<br/><span class="d3-color-gray">' + p("Click to undo") + "</span>" : s > d.curset.pos && (c += '<br/><span class="d3-color-gray">' + p("Click to redo") + "</span>"),
                      c += "</p></div>",
                      DiabloCalc.tooltip.showHtml(d.parent[0], c, t.x, t.y)
                  }
              } else
                  DiabloCalc.tooltip.hide()
          }
      },
      update: function() {
          this.line && this.line.destroy();
          var t = []
            , s = [];
          this.parent.width(50 * (this.curset.points.length - 1) + 10),
          c.scrollLeft(c.get(0).scrollWidth);
          for (a = 0; a < this.curset.points.length; ++a)
              t.push(this.curset.points[a].values[this.curstat]),
              s.push(this.curset.points[a].label);
          this.line = this.chart.Line({
              labels: s,
              datasets: [$.extend({
                  data: t
              }, this.dataOptions)]
          }, this.globalOptions);
          for (a = 0; a < this.curset.points.length; ++a)
              this.line.datasets[0].points[a].index = a;
          for (var a = this.curset.pos + 1; a < this.curset.points.length; ++a)
              this.line.datasets[0].points[a].fillColor = this.dataOptions.disabledColor,
              this.line.datasets[0].points[a].highlightStroke = this.dataOptions.disabledColor;
          this.line.update()
      },
      init: function(t, s) {
          this.setTheme(),
          this.parent = t,
          this.canvas = $("<canvas></canvas>"),
          t.append(this.canvas),
          this.datasets = [e(0, p("New Profile"))],
          r.before(this.datasets[0].line.addClass("selected")),
          this.datasets[0].del.addClass("disabled"),
          this.curset = this.datasets[0],
          this.curstat = s,
          this.ctx = this.canvas.get(0).getContext("2d"),
          this.chart = new Chart(this.ctx),
          this.update();
          var a = this;
          t.click(function(t) {
              var s = a.line.getIndexAtEvent(t);
              s.length && a.undo(s[0])
          })
      },
      add: function(t) {
          this.curset.pos < this.curset.points.length - 1 && (this.curset.points = this.curset.points.slice(0, this.curset.pos + 1),
          this.update()),
          this.curset.pos = this.curset.points.length,
          this.curset.points.push(t),
          this.line.addData([t.values[this.curstat]], t.label),
          this.line.datasets[0].points[this.curset.pos].index = this.curset.pos,
          this.parent.width(50 * (this.curset.points.length - 1) + 10),
          c.scrollLeft(c.get(0).scrollWidth),
          this.line.resize(this.line.render, !0)
      },
      addset: function(s, a) {
          var i = e(this.datasets.length, s, this.last());
          r.before(i.line),
          a && (i.profile = {
              items: {},
              skills: [],
              passives: [],
              paragon: {
                  level: 0
              }
          },
          i.points[0].values = t(DiabloCalc.getStats())),
          this.datasets.push(i);
          for (var l = 0; l < this.datasets.length; ++l)
              this.datasets[l].del.removeClass("disabled");
          this.changeset(i.index),
          setTimeout(this.curset.startedit, 0)
      },
      delset: function(t) {
          if (!(t < 0 || t >= this.datasets.length || this.datasets.length <= 1)) {
              this.curset == this.datasets[t] && (t < this.datasets.length - 1 ? this.changeset(t + 1) : this.changeset(t - 1)),
              this.datasets[t].line.remove(),
              this.datasets.splice(t, 1);
              for (var s = t; s < this.datasets.length; ++s)
                  this.datasets[s].index = s;
              1 == this.datasets.length && this.datasets[0].del.addClass("disabled")
          }
      },
      clear: function() {
          for (var t = 0; t < this.datasets.length; ++t)
              this.datasets[t] !== this.curset && this.datasets[t].line.remove();
          this.datasets = [this.curset],
          this.curset.del.addClass("disabled")
      },
      addprofile: function(t) {
          var s = e(this.datasets.length, p("Load Profile"), t);
          r.before(s.line),
          s.profile = t,
          s.values = t.values,
          s.rename(t.name),
          s.icon.removeClass().addClass("class-icon class-" + t.class + " " + (t.gender || "female")),
          s.value.text((u[this.curstat].shortName || u[this.curstat].name) + ": " + DiabloCalc[u[this.curstat].func || "formatNumber"](s.values[this.curstat] || 0, 0, 1e3)),
          this.datasets.push(s);
          for (var a = 0; a < this.datasets.length; ++a)
              this.datasets[a].del.removeClass("disabled");
          return s
      },
      changeset: function(t) {
          this.curset != this.datasets[t] && (this.curset.line.removeClass("selected"),
          this.curset.profile = $.extend(!0, {}, DiabloCalc.getProfile()),
          this.curset = this.datasets[t],
          this.curset.line.addClass("selected"),
          this.curset.profile && (DiabloCalc.setProfile(this.curset.profile, "set"),
          this.curset.profile = void 0),
          this.update(),
          this.fixval())
      },
      changestat: function(t) {
          var s = t;
          u[t] ? this.curstat = t : (this.curstatEx = t,
          t = this.curstat);
          for (var a = 0; a < this.datasets.length; ++a)
              this.datasets[a].values && this.datasets[a].value.text((u[t].shortName || u[t].name) + ": " + DiabloCalc[u[t].func || "formatNumber"](this.datasets[a].values[t], 0, 1e3));
          if (this.update(),
          !u[s]) {
              var e = s.split("$");
              if (2 === e.length)
                  return e[0] + " &mdash; " + e[1]
          }
      },
      fixval: function() {
          var s = this.curset.pos;
          this.curset.points[s].values = this.curset.values = t(DiabloCalc.getStats(), this.curset.points[s].values);
          var a = this.curset.values[this.curstat];
          this.curset.icon.removeClass().addClass("class-icon class-" + DiabloCalc.charClass + " " + (DiabloCalc.gender || "female")),
          this.curset.value.text((u[this.curstat].shortName || u[this.curstat].name) + ": " + DiabloCalc[u[this.curstat].func || "formatNumber"](a || 0, 0, 1e3)),
          !this.curstatEx && this.line.datasets[0].points[s] && (this.line.datasets[0].points[s].value = a,
          this.line.update())
      },
      fixdata: function(t) {
          var s = this.curset.pos;
          if (this.curset.points[s].skillData = t,
          this.curstatEx) {
              var a = this.curstatEx.split("$");
              2 === a.length && t[a[0]] && a[1]in t[a[0]].data ? (this.line.datasets[0].points[s].value = t[a[0]].data[a[1]],
              this.line.update()) : (delete this.curstatEx,
              this.fixval())
          }
      },
      generateList: function(t) {
          var s = t.val();
          t.empty();
          for (var a in u)
              t.append('<option value="' + a + (s === a ? '" selected="selected' : "") + '">' + u[a].name + "</option>");
          var e = this.last().skillData;
          if (e)
              for (var i in e)
                  if (!$.isEmptyObject(e[i].data)) {
                      var l = '<optgroup label="' + i + '">';
                      for (var o in e[i].data)
                          l += '<option value="' + i + "$" + o + (s === i + "$" + o ? '" selected="selected' : "") + '">' + o + "</option>";
                      t.append(l + "</optgroup>")
                  }
      },
      last: function() {
          return this.curset.points[this.curset.pos]
      },
      reset: function(t, a) {
          this.curset.points = [s(t, {
              values: a
          })],
          this.curset.values = a,
          this.curset.pos = 0,
          this.update()
      },
      undo: function(t) {
          for (DiabloCalc.importStart(),
          this.line.update(); this.curset.pos > t; )
              this.curset.points[this.curset.pos].undo(),
              this.line.datasets[0].points[this.curset.pos].fillColor = this.dataOptions.disabledColor,
              this.line.datasets[0].points[this.curset.pos]._saved.fillColor = this.dataOptions.disabledColor,
              this.line.datasets[0].points[this.curset.pos].highlightStroke = this.dataOptions.disabledColor,
              --this.curset.pos;
          for (; this.curset.pos < t; )
              ++this.curset.pos,
              this.curset.points[this.curset.pos].redo(),
              this.line.datasets[0].points[this.curset.pos].fillColor = this.dataOptions.pointColor,
              this.line.datasets[0].points[this.curset.pos]._saved.fillColor = this.dataOptions.pointColor,
              this.line.datasets[0].points[this.curset.pos].highlightStroke = this.dataOptions.pointHighlightStroke;
          this.line.update(),
          DiabloCalc.importEnd("undo", this.curset.points[this.curset.pos].values)
      },
      getProfiles: function() {
          var t = []
            , s = $.extend([], this.datasets);
          s.sort(function(t, s) {
              return t.line.index() - s.line.index()
          });
          for (var a = 0; a < s.length; ++a)
              if (s[a] === this.curset || s[a].profile) {
                  var e = {
                      name: s[a].name
                  };
                  (e = s[a] === this.curset ? $.extend(e, DiabloCalc.getProfile()) : $.extend(e, s[a].profile)).values = s[a].values,
                  t.push(e)
              }
          return t
      }
  };
  DiabloCalc.getAllProfiles = function() {
      var t = {};
      return t.profiles = d.getProfiles(),
      t.profiles.length ? (t.curstat = d.curstat,
      t.class = t.profiles[0].class,
      t.mainset = t.profiles[0].mainset,
      t.active = DiabloCalc.getActive("global"),
      t) : DiabloCalc.getProfile()
  }
  ,
  DiabloCalc.setAllProfiles = function(t, s, a) {
      if (t.profiles) {
          if (DiabloCalc.importStart(),
          d.clear(),
          t.curstat && (h.val(t.curstat),
          h.trigger("chosen:updated"),
          d.curstat = t.curstat),
          t.active) {
              DiabloCalc.setActive("global", t.active);
              for (l = 0; l < t.profiles.length; ++l)
                  if (!t.profiles[l].active) {
                      t.profiles[l].active = {};
                      for (var e in t.active)
                          0 === e.indexOf("buff") && (t.active[e]instanceof Object ? t.profiles[l].active[e] = $.extend([], t.active[e]) : t.profiles[l].active[e] = t.active[e])
                  }
          }
          d.curset.rename(t.profiles[0].name),
          DiabloCalc.setProfile(t.profiles[0], s);
          for (var i = null, l = 1; l < t.profiles.length; ++l) {
              var o = d.addprofile(t.profiles[l]);
              a && o.name === a && (i = o.index)
          }
          i && d.changeset(i),
          DiabloCalc.importEnd(t, s)
      } else
          DiabloCalc.setProfile(t, s)
  }
  ,
  DiabloCalc.isModified = function() {
      return d.curset.pos > 0
  }
  ,
  DiabloCalc.recordDPS = function(t) {
      d.last().values.simdps = t,
      d.fixval()
  }
  ,
  DiabloCalc.register("changeGender", function() {
      d.fixval()
  }),
  DiabloCalc.register("changeClass", function() {
      d.fixval()
  });
  var f, v, b = {}, g = $(".profiles-frame");
  o = $('<ul class="profiles-list"></ul>'),
  g.append(o),
  n = $(".timeline-frame"),
  g.resizable({
      handles: "n",
      minHeight: 120,
      maxHeight: 400,
      resize: function(t, s) {
          g.css("top", "")
      }
  }),
  (r = $('<li class="profiles-set newset"><b>' + p("New set") + "</b></li>")).click(function(t) {
      DiabloCalc.popupMenu(t, p.fixkey({
          "Blank set": function() {
              d.addset(p("New Set"), !0)
          },
          "Clone current set": function() {
              d.addset(p("New Set"))
          }
      }))
  }),
  o.append(r),
  o.sortable({
      items: "li:not(.newset)",
      distance: 4,
      containment: "parent",
      axis: "y"
  }),
  h = $("<select></select>").addClass("timeline-stat");
  for (var C in u)
      h.append('<option value="' + C + '">' + u[C].name + "</option>");
  n.append(h),
  h.chosen({
      disable_search: !0,
      inherit_select_classes: !0,
      populate_func: function() {
          d.generateList(h)
      }
  }).change(function() {
      var t = d.changestat($(this).val());
      t && h.next().find(".chosen-single span").html(t)
  }),
  c = $("<div></div>").addClass("canvas-frame"),
  n.append(c);
  var m = $("<div></div>").addClass("canvas-container");
  c.append(m),
  d.init(m, "damage"),
  DiabloCalc.register("updateStats", function() {
      d.fixval()
  }),
  DiabloCalc.register("skillData", function(t) {
      d.fixdata(t)
  }),
  DiabloCalc.register("importEnd", function(s, a) {
      var e = b;
      b = {};
      for (var i in DiabloCalc.itemSlots)
          b[i] = DiabloCalc.getSlot(i);
      switch (f = DiabloCalc.getSkills(),
      v = DiabloCalc.getParagonLevels(),
      s) {
      case "import":
          d.reset(p("Import Profile"), a);
          break;
      case "class":
          d.reset(p("Change Class"));
          break;
      case "load":
          d.reset(p("Load Profile"), a);
          break;
      case "global":
          d.add(function(s, a) {
              return {
                  label: p("Global operation"),
                  pre: s,
                  undo: function() {
                      this.post = {};
                      for (var t in DiabloCalc.itemSlots)
                          this.post[t] = DiabloCalc.getSlot(t),
                          DiabloCalc.setSlot(t, this.pre[t])
                  },
                  redo: function() {
                      this.pre = {};
                      for (var t in DiabloCalc.itemSlots)
                          this.pre[t] = DiabloCalc.getSlot(t),
                          DiabloCalc.setSlot(t, this.post[t])
                  },
                  values: t(DiabloCalc.getStats(), a && a.values)
              }
          }(e, d.last()))
      }
  }),
  DiabloCalc.register("updateSlotItem", l),
  DiabloCalc.register("updateSlotStats", l),
  DiabloCalc.register("updateSkills", function(s) {
      if (s) {
          var a = f;
          f = DiabloCalc.getSkills();
          var e = d.last();
          !0 !== e.skills && d.add(function(s, a) {
              return {
                  skills: !0,
                  label: p("Change Skills"),
                  pre: s,
                  undo: function() {
                      this.post = DiabloCalc.getSkills(),
                      DiabloCalc.setSkills(this.pre)
                  },
                  redo: function() {
                      this.pre = DiabloCalc.getSkills(),
                      DiabloCalc.setSkills(this.post)
                  },
                  values: t(DiabloCalc.getStats(), a && a.values)
              }
          }(a, e))
      }
  }),
  DiabloCalc.register("updateParagon", function() {
      var s = v;
      v = DiabloCalc.getParagonLevels();
      var a = d.last();
      !0 !== a.paragon && d.add(function(s, a) {
          return {
              paragon: !0,
              label: p("Change Paragon"),
              pre: s,
              undo: function() {
                  this.post = DiabloCalc.getParagonLevels(),
                  DiabloCalc.setParagon(this.pre)
              },
              redo: function() {
                  this.pre = DiabloCalc.getParagonLevels(),
                  DiabloCalc.setParagon(this.post)
              },
              values: t(DiabloCalc.getStats(), a && a.values)
          }
      }(s, a))
  }),
  DiabloCalc.register("changeTheme", function() {
      d.setTheme()
  }),
  DiabloCalc.tipStatList = u
}();
!function() {
  function e(e) {
      if (2 === (e = e.split(".")).length && p.skills[e[0]]) {
          var n = p.skills[e[0]][e[1]];
          if (n || (n = p.extraskills && p.extraskills[e[0]] && p.extraskills[e[0]][e[1]]),
          n)
              return [e[0], e[1], n]
      }
  }
  function n(e) {
      if (2 === (e = e.split(".")).length && p.passives[e[0]]) {
          var n = p.passives[e[0]][e[1]];
          if (n)
              return [e[0], e[1], n]
      }
  }
  function i(e) {
      return p.relPath + "webgl/icons/" + e
  }
  function a(e) {
      return e.replace(/[^\w ]/g, "").replace(/ /g, "-").toLowerCase()
  }
  function s(e) {
      return "https://eu.diablo3.com/en/item/" + a(e.name) + "-" + e.id
  }
  function t(e) {
      return g.setOptions({
          breaks: !0
      }),
      g.use({
          renderer: h
      }),
      g(e)
  }
  function l(e) {
      p.buildinfo || (p.buildinfo = {}),
      p.buildinfo.ratings = Object.assign(p.buildinfo.ratings || {}, e)
  }
  function o() {
      return p.session.user_level && p.session.user_level >= c
  }
  function r() {
      if (d.empty(),
      o()) {
          var e = $('<textarea class="build-text"/>');
          d.append($('<div class="build-text-container"/>').append(e));
          var n = new SimpleMDE({
              element: e[0],
              previewRender: t,
              promptItems: function(e) {
                  m(function(n, i) {
                      setTimeout(function() {
                          e(["[" + n + "](" + i + ")", ""])
                      }, 0)
                  })
              }
          });
          n.codemirror.on("change", function() {
              !function(e) {
                  e.length ? (p.buildinfo || (p.buildinfo = {}),
                  p.buildinfo.text = e) : p.buildinfo && (p.buildinfo.ratings ? delete p.buildinfo.text : delete p.buildinfo)
              }(n.value())
          }),
          p.buildinfo && n.value(p.buildinfo.text || "");
          var i = $('<input type="checkbox"></input>');
          d.append($("<div></div>").append($("<label>" + _L("Show ratings") + "</label>").prepend(i), k.widget)),
          i.change(function() {
              var e = $(this).prop("checked");
              l({
                  show: e
              }),
              k.widget.toggle(e)
          }),
          p.buildinfo && p.buildinfo.ratings && (k.setValues(p.buildinfo.ratings),
          i.prop("checked", !!p.buildinfo.ratings.show)),
          i.change(),
          k.widget.addClass("editable"),
          u.show()
      } else if (p.buildinfo && (p.buildinfo.text || p.buildinfo.ratings && p.buildinfo.ratings.show)) {
          var a = t(p.buildinfo.text)
            , s = $('<div class="preview"/>').html(a);
          p.buildinfo.ratings && p.buildinfo.ratings.show && (k.setValues(p.buildinfo.ratings),
          k.widget.removeClass("editable").show(),
          s.prepend(k.widget)),
          d.append(s),
          u.show()
      } else
          u.hide(),
          $(".editframe").tabs("option", "active") === p.TAB_BUILDINFO && $(".editframe").tabs("option", "active", p.TAB_EQUIPMENT)
  }
  var p = DiabloCalc
    , c = 3
    , d = $("#tab-buildinfo")
    , u = $("#tab-buildinfo-header")
    , f = new RegExp(/https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/)
    , m = function() {
      function a(e, n) {
          p.chosenTips(e, n),
          p.addTip(e, function() {
              n.call(this, e.val())
          })
      }
      function s(n, i) {
          var s = $("<div></div>")
            , t = $('<select class="link-item-data link-item-skill"></select>');
          r.append(s.append(t));
          for (var l in p.skills)
              if (p.classes[l]) {
                  c = $('<optgroup label="' + p.classes[l].name + '"></optgroup>');
                  for (var o in p.skills[l])
                      c.append('<option value="' + l + "." + o + '">' + p.skills[l][o].name + "</option>");
                  if (!n && p.extraskills && p.extraskills[l])
                      for (var o in p.extraskills[l])
                          c.append('<option value="' + l + "." + o + '">' + p.extraskills[l][o].name + "</option>");
                  t.append(c)
              }
          if (!n) {
              var c = $('<optgroup label="' + _L("Attack") + '"></optgroup>');
              for (var o in p.skills.attack)
                  c.append('<option value="attack.' + o + '">' + p.skills.attack[o].name + "</option>");
              t.append(c)
          }
          if (t.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0
          }),
          p.chosen_addIcons(t, function(n) {
              var i = e(n);
              if (i) {
                  if ("attack" === i[0])
                      return '<span class="skill-icon-attack ' + i[2].id + '"></span>';
                  var a = "necromancer" === i[0] ? 100 : 120;
                  return '<span style="background: url(' + p.relPath + "css/images/class-" + i[0] + ".png) " + -24 * i[2].col + "px " + -48 * i[2].row + "px / " + a + 'px no-repeat"></span>'
              }
          }),
          p.chosenTips(t, function(n) {
              var i = e(n);
              i && p.tooltip.showSkill(this, i[0], i[1])
          }),
          p.addTip(t, function() {
              var i = e(t.val());
              if (i) {
                  var a = n ? m.val() : void 0;
                  p.tooltip.showSkill(this, i[0], i[1], a)
              }
          }),
          n) {
              var f = $("<div></div>")
                , m = $('<select class="link-item-data link-item-rune"></select>');
              r.append(f.append(m));
              m.chosen({
                  disable_search: !0,
                  inherit_select_classes: !0
              }),
              a(m, function(n) {
                  var i = e(t.val());
                  i && p.tooltip.showSkill(this, i[0], i[1], n, !0)
              }),
              t.change(function() {
                  m.empty();
                  var e = t.val().split(".");
                  if (2 === e.length && p.skills[e[0]] && p.skills[e[0]][e[1]]) {
                      var n = p.skills[e[0]][e[1]];
                      for (var i in n.runes)
                          m.append('<option class="skill-rune-option rune-' + i + '" value="' + i + '">' + n.runes[i] + "</option>");
                      m.trigger("chosen:updated")
                  }
              }).change()
          }
          u = function() {
              var a = e(t.val());
              if (a)
                  if (n) {
                      var s = m.val();
                      if (!a[2].runes[s])
                          return;
                      i ? d(a[2].runes[s], "rune." + t.val() + "." + s) : d(a[2].name + " " + a[2].runes[s], "skill-rune." + t.val() + "." + s)
                  } else
                      d(a[2].name, "skill." + t.val())
          }
      }
      function t() {
          u && d && u(),
          l.dialog("close")
      }
      var l = $('<div class="link-item-dialog" title="Add Item"></div>')
        , o = $('<select class="link-item-type"></select>');
      l.append(o),
      o.append('<option value="item">Item (Equipment)</option>'),
      o.append('<option value="itemmisc">Item (Other)</option>'),
      o.append('<option value="gem">Gem</option>'),
      o.append('<option value="skill">Skill</option>'),
      o.append('<option value="rune">Rune</option>'),
      o.append('<option value="skill-rune">Skill + Rune</option>'),
      o.append('<option value="passive">Passive</option>'),
      o.append('<option value="buff">Buff</option>'),
      o.append('<option value="follower">Follower Skill</option>'),
      o.chosen({
          disable_search: !0,
          inherit_select_classes: !0
      });
      var r = $("<div></div>");
      l.append(r);
      var c = {}
        , d = null
        , u = null;
      return c.item = function() {
          function e() {
              var e = n.val();
              n.empty();
              var i = {};
              $.each(p.items, function(e, n) {
                  n.suffix !== _L("Legacy") && (i[n.type] || (i[n.type] = []),
                  i[n.type].push(n))
              });
              for (var a in i) {
                  var s = '<optgroup label="' + p.itemTypes[a].name + '">';
                  i[a].sort(function(e, n) {
                      return e.name.localeCompare(n.name)
                  });
                  for (var t = 0; t < i[a].length; ++t) {
                      var l = i[a][t]
                        , o = "";
                      l.id === e && (o = '" selected="selected'),
                      s += '<option class="item-info-icon quality-' + (l.quality || "rare") + '" value="' + l.id + o + '">' + l.name + (l.suffix ? " (" + l.suffix + ")" : "") + "</option>"
                  }
                  n.append(s + "</optgroup")
              }
          }
          var n = $('<select class="link-item-data link-item-item"></select>');
          r.append(n),
          e(),
          n.chosen({
              inherit_select_classes: !0,
              search_contains: !0,
              populate_func: e
          }),
          a(n, function(e) {
              p.itemById[e] && p.tooltip.showItem(this, e)
          }),
          p.chosen_addIcons(n, function(e) {
              var n = p.itemById[e];
              if (n) {
                  var i = p.itemIcons
                    , a = i ? i[e] : void 0;
                  return void 0 !== a ? '<span style="background: url(' + p.relPath + "css/items/" + n.type + ".png) 0 -" + 24 * a[0] + 'px no-repeat"></span>' : void 0
              }
          }),
          u = function() {
              var e = n.val();
              p.itemById[e] && d(p.itemById[e].name, "item." + e)
          }
      }
      ,
      c.itemmisc = function() {
          function e() {
              var e = n.val();
              n.empty();
              var i = {};
              $.each(p.potions, function(e, n) {
                  i[n.type] || (i[n.type] = []),
                  i[n.type].push(n)
              }),
              $.each(p.extraItems, function(e, n) {
                  i[n.type] || (i[n.type] = []),
                  i[n.type].push(n)
              });
              for (var a in i) {
                  var s = '<optgroup label="' + (a ? p.extraTypes[a] : _L("Misc")) + '">';
                  i[a].sort(function(e, n) {
                      return e.name.localeCompare(n.name)
                  });
                  for (var t = 0; t < i[a].length; ++t) {
                      var l = i[a][t]
                        , o = "";
                      l.id === e && (o = '" selected="selected'),
                      s += '<option class="item-info-icon quality-' + (l.quality || "normal") + '" value="' + l.id + o + '">' + l.name + "</option>"
                  }
                  n.append(s + "</optgroup")
              }
          }
          var n = $('<select class="link-item-data link-item-item"></select>');
          r.append(n),
          e(),
          n.chosen({
              inherit_select_classes: !0,
              search_contains: !0,
              populate_func: e
          }),
          a(n, function(e) {
              p.itemById[e] && p.tooltip.showItem(this, e)
          }),
          p.chosen_addIcons(n, function(e) {
              var n = p.itemById[e];
              if (n) {
                  if (n.icon)
                      return '<span style="background: url(' + i(n.icon) + ') center / auto 24px no-repeat"></span>';
                  var a = p.itemIcons
                    , s = a ? a[e] : void 0;
                  return void 0 !== s ? '<span style="background: url(' + p.relPath + "css/items/" + n.type + ".png) 0 -" + 24 * s[0] + 'px no-repeat"></span>' : void 0
              }
          }),
          u = function() {
              var e = n.val();
              p.itemById[e] && d(p.itemById[e].name, "item." + e)
          }
      }
      ,
      c.gem = function() {
          var e = $("<div></div>")
            , n = $('<select class="link-item-data link-item-gem-type"></select>');
          e.append(n);
          var i = $("<div></div>")
            , s = $('<select class="link-item-data link-item-gem-color"></select>');
          i.append(s),
          r.append(e, i);
          var t = '<optgroup label="' + _L("Legendary Gems") + '">';
          for (var o in p.legendaryGems)
              t += '<option class="quality-legendary" value="' + o + '">' + p.legendaryGems[o].name + "</option>";
          t += '</optgroup><optgroup label="' + _L("Normal Gems") + '">';
          for (var c = p.gemQualities.length - 1; c >= 0; --c)
              t += '<option value="' + c + '">' + p.gemQualities[c] + "</option>";
          n.append(t + "</optgroup>");
          for (var o in p.gemColors)
              s.append('<option value="' + o + '">' + p.gemColors[o].name + "</option>");
          n.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0
          }).change(function() {
              var e = n.val();
              !p.legendaryGems[e] && p.gemQualities[e] ? (i.show(),
              l.dialog({
                  height: 185
              })) : (i.hide(),
              l.dialog({
                  height: 155
              }))
          }).change(),
          a(n, function(e) {
              p.tooltip && p.legendaryGems[e] && p.tooltip.showGem(this, e)
          }),
          p.chosen_addIcons(n, function(e) {
              if (isNaN(e)) {
                  var n = p.legendaryGems[e];
                  if (n && n.id in p.itemIcons)
                      return '<span style="background: url(' + DiabloCalc.relPath + "css/items/gemleg.png) 0 -" + 24 * p.itemIcons[n.id][0] + 'px no-repeat"></span>'
              } else if ((e = parseInt(e)) >= 0 && e < p.gemQualities.length)
                  return '<span style="background: url(' + DiabloCalc.relPath + "css/items/gems.png) -" + 24 * e + 'px -120px no-repeat"></span>'
          }),
          s.chosen({
              disable_search: !0,
              inherit_select_classes: !0
          }),
          a(s, function(e) {
              p.tooltip && p.gemColors[e] && p.tooltip.showGem(this, [parseInt(n.val()), e])
          }),
          p.chosen_addIcons(s, function(e) {
              var i = p.gemColors[e];
              if (i && i.id in p.itemIcons) {
                  var a = parseInt(n.val());
                  return '<span style="background: url(' + DiabloCalc.relPath + "css/items/gems.png) -" + 24 * a + "px -" + 24 * p.itemIcons[i.id][0] + 'px no-repeat"></span>'
              }
          }),
          u = function() {
              var e = n.val();
              if (p.legendaryGems[e] && d(p.legendaryGems[e].name, "item." + p.legendaryGems[e].id),
              p.gemQualities[e]) {
                  var i = s.val();
                  p.gemColors[i] && d(p.gemColors[i].names[e], "item." + p.gemColors[i].id + function(e) {
                      return e < 10 ? "0" + e : e.toString()
                  }(parseInt(e) + 1))
              }
          }
      }
      ,
      c.skill = function() {
          s(!1, !1)
      }
      ,
      c.rune = function() {
          s(!0, !0)
      }
      ,
      c["skill-rune"] = function() {
          s(!0, !1)
      }
      ,
      c.passive = function() {
          var e = $('<select class="link-item-data link-item-skill"></select>');
          r.append(e);
          for (var i in p.passives)
              if (p.classes[i]) {
                  var s = $('<optgroup label="' + p.classes[i].name + '"></optgroup>');
                  for (var t in p.passives[i])
                      s.append('<option value="' + i + "." + t + '">' + p.passives[i][t].name + "</option>");
                  e.append(s)
              }
          e.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0
          }),
          p.chosen_addIcons(e, function(e) {
              var i = n(e);
              if (i)
                  return '<span style="background: url(' + p.relPath + "css/images/class-" + i[0] + "-passive.png) " + -24 * i[2].index + 'px 0 / auto 48px no-repeat"></span>'
          }),
          a(e, function(e) {
              var i = n(e);
              i && p.tooltip.showSkill(this, i[0], i[1])
          }),
          u = function() {
              var i = n(e.val());
              i && d(i[2].name, "passive." + e.val())
          }
      }
      ,
      c.follower = function() {
          var e = $('<select class="link-item-data link-item-skill"></select>');
          r.append(e);
          for (var n in p.classes)
              if (p.classes[n].follower) {
                  var s = [];
                  for (var t in p.followerSkills)
                      p.followerSkills[t].class === n && s.push(t);
                  if (s.length) {
                      s.sort(function(e, n) {
                          var i = p.followerSkills[e]
                            , a = p.followerSkills[n];
                          return i.level !== a.level ? i.level - a.level : i.name.localeCompare(a.name)
                      });
                      for (var l = $('<optgroup label="' + p.classes[n].name + '"></optgroup>'), o = 0; o < s.length; ++o) {
                          t = s[o];
                          l.append('<option value="' + t + '">' + p.followerSkills[t].name + "</option>")
                      }
                      e.append(l)
                  }
              }
          e.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0
          }),
          p.chosen_addIcons(e, function(e) {
              var n = p.followerSkills[e];
              if (n)
                  return '<span style="background: url(' + i(n.icon) + ') 0 / 24px no-repeat"></span>'
          }),
          a(e, function(e) {
              p.tooltip.showFollowerSkill(this, e)
          }),
          u = function() {
              var n = e.val();
              p.followerSkills[n] && d(p.followerSkills[n].name, "follower." + n)
          }
      }
      ,
      c.buff = function() {
          var e = $('<select class="link-item-data link-item-skill"></select>');
          r.append(e);
          for (var n = 0; n < 2; ++n) {
              var s = $('<optgroup label="' + (n ? "Pylons" : "Shrines") + '"></optgroup>');
              for (var t in p.shrineBuffs)
                  (0 !== n || t.match(/^shrine_/)) && (1 !== n || t.match(/^pylon_/)) && s.append('<option value="' + t + '">' + p.shrineBuffs[t].name + "</option>");
              e.append(s)
          }
          e.chosen({
              disable_search_threshold: 10,
              inherit_select_classes: !0,
              search_contains: !0
          }),
          p.chosen_addIcons(e, function(e) {
              var n = p.shrineBuffs[e];
              if (n)
                  return '<span style="background: url(' + i(n.icon) + ') 0 / 24px no-repeat"></span>'
          }),
          a(e, function(e) {
              p.tooltip.showShrineBuff(this, e)
          }),
          u = function() {
              var n = e.val();
              p.shrineBuffs[n] && d(p.shrineBuffs[n].name, "buff." + n)
          }
      }
      ,
      o.change(function() {
          var e = $(this).val();
          r.empty(),
          u = null,
          c[e] && c[e](),
          l.dialog({
              height: ["rune", "skill-rune"].indexOf(e) >= 0 ? 185 : 155
          })
      }),
      l.dialog({
          autoOpen: !1,
          height: 155,
          width: 350,
          resizable: !1,
          modal: !0,
          buttons: {
              Insert: t,
              Cancel: function() {
                  l.dialog("close")
              }
          },
          close: function() {
              r.empty(),
              d = null,
              u = null
          }
      }),
      l.on("keydown", function(e) {
          13 === e.which ? t() : 27 === e.which && l.dialog("close")
      }),
      l.parent().addClass("dialog-overflow"),
      function(e) {
          d = e,
          o.change(),
          l.dialog("open")
      }
  }()
    , v = new RegExp(/^(item|skill|rune|skill-rune|passive|follower|buff)\.([\w\.]+)$/)
    , h = {
      link: function(t, l, o) {
          function r(e, n, a) {
              if (a)
                  return '<span class="d3md-icon-wrap"><span class="d3md-icon d3md-icon-special" style="background-image: url(' + i(a) + ')"></span></span>';
              var s = p.itemIcons && p.itemIcons[n];
              return s ? '<span class="d3md-icon-wrap"><span class="d3md-icon" style="background: url(' + p.relPath + "css/items/" + e + ".png) 0 -" + 1.2 * s[0] + 'em no-repeat"></span></span>' : ""
          }
          if (o === t) {
              if ((c = t.match(f)) && c[1].length)
                  return '<iframe type="text/html" width="530" height="300" frameborder="0" src="https://www.youtube.com/embed/' + c[1] + '"/>'
          } else {
              var c = t.match(v);
              if (c) {
                  if ("item" === c[1] && p.itemById[c[2]]) {
                      return '<span class="d3md-item item-' + (u = p.itemById[c[2]]).quality + '" data-item="' + u.id + '">' + r(u.type, u.id, u.icon) + '<a href="' + s(u) + '" target="_blank" rel="noopener noreferrer">' + o + "</a></span>"
                  }
                  if ("item" === c[1] && p.gemById[c[2]]) {
                      var d = p.gemById[c[2]];
                      if (p.legendaryGems[d[0]]) {
                          var u = p.legendaryGems[d[0]];
                          return '<span class="d3md-item item-legendary" data-item="' + c[2] + '">' + r("gemleg", u.id) + '<a href="' + s(u) + '" target="_blank" rel="noopener noreferrer">' + o + "</a></span>"
                      }
                      if (p.gemColors[d[1]])
                          return '<span class="d3md-item item-magic" data-item="' + c[2] + '">' + function(e, n) {
                              var i = p.itemIcons && p.itemIcons[p.gemColors[n].id];
                              return i ? '<span class="d3md-icon-gem" style="background: url(' + p.relPath + "css/items/gems.png) -" + 1.3 * e + "em -" + 1.3 * i[0] + 'em no-repeat"></span>' : ""
                          }(d[0], d[1]) + '<a href="' + function(e) {
                              return "https://eu.diablo3.com/en/artisan/jeweler/recipe/" + a(e)
                          }(p.gemColors[d[1]].names[d[0]]) + '" target="_blank" rel="noopener noreferrer">' + o + "</a></span>"
                  } else {
                      if ("skill" === c[1] || "rune" === c[1] || "skill-rune" === c[1]) {
                          var m = c[2];
                          if ("skill" !== c[1]) {
                              if (3 !== (m = m.split(".")).length)
                                  return !1;
                              var h = m[2];
                              m = m.slice(0, 2).join(".")
                          }
                          if (!(I = e(m)))
                              return !1;
                          if (h && !I[2].runes[h])
                              return !1;
                          var g = p.skilltips[I[0]] && p.skilltips[I[0]][I[1]].elements[h || "x"] || "phy"
                            , k = o
                            , b = o;
                          if ("skill-rune" === c[1]) {
                              k = I[2].name,
                              b = I[2].runes[h];
                              var y = o.match(new RegExp(k + "(.*)" + b))
                                , w = y ? y[1] : " "
                          }
                          var _ = '<span class="d3md-' + c[1] + ' d3md-build" data-skill="' + c[2] + '">';
                          return "skill" !== c[1] && "skill-rune" !== c[1] || (p.classes[I[0]] ? (_ += '<span class="class-' + I[0] + '">',
                          _ += '<span class="skill-icon" style="background-position: ' + -1.3 * I[2].col + "em " + -2.6 * I[2].row + 'em"></span></span>',
                          _ += '<a href="' + function(e, n) {
                              return "http://eu.diablo3.com/en/class/" + a(p.classes[e].name) + "/active/" + a(n)
                          }(I[0], I[2].name) + '" target="_blank" rel="noopener noreferrer">' + k + "</a>") : (_ += '<span class="skill-icon skill-icon-attack ' + I[2].id + '"></span>',
                          _ += '<span class="d3md-skill-name">' + k + "</span>")),
                          "skill-rune" === c[1] && (_ += w),
                          "rune" !== c[1] && "skill-rune" !== c[1] || (_ += '<span class="rune-icon rune-' + h + '"></span>',
                          _ += '<span class="rune-name rune-' + g + '">' + b + "</span>"),
                          _ + "</span>"
                      }
                      if ("passive" === c[1]) {
                          return !!(I = n(c[2])) && '<span class="d3md-passive d3md-build" data-skill="' + c[2] + '"><span class="class-' + I[0] + '"><span class="passive-icon" style="background-position: -' + 1.3 * I[2].index + 'em 0"></span></span><a href="' + function(e, n) {
                              return "http://eu.diablo3.com/en/class/" + a(p.classes[e].name) + "/passive/" + a(n)
                          }(I[0], I[2].name) + '" target="_blank" rel="noopener noreferrer">' + o + "</a></span>"
                      }
                      if ("follower" === c[1]) {
                          var I = p.followerSkills[c[2]];
                          return !!I && '<span class="d3md-follower d3md-build" data-skill="' + c[2] + '"><span class="d3md-icon-skill" style="background: url(' + i(I.icon) + ') no-repeat"></span><a href="' + function(e, n) {
                              return "http://eu.diablo3.com/en/follower/" + e + "/skill/" + a(n)
                          }(I.class, I.name) + '" target="_blank" rel="noopener noreferrer">' + o + "</a></span>"
                      }
                      if ("buff" === c[1]) {
                          var $ = p.shrineBuffs[c[2]];
                          return !!$ && '<span class="d3md-buff" data-buff="' + c[2] + '"><span class="d3md-icon-skill" style="background: url(' + i($.icon) + ') no-repeat"></span><span class="buff-name">' + o + "</span></span>"
                      }
                  }
              }
          }
          return !1
      }
  }
    , g = SimpleMDE.marked
    , k = {
      widget: $('<div class="ratings-widget"></div>'),
      scales: {}
  };
  $.each({
      damage: _L("Damage"),
      toughness: _L("Toughness"),
      speed: _L("Speed"),
      difficulty: _L("Difficulty"),
      viability: _L("Viability")
  }, function(e, n) {
      var i = k.scales[e] = {
          div: $('<div class="stat ' + e + '"></div>'),
          bars: []
      }
        , a = $('<div class="stat-bars"></div>');
      i.div.append('<div class="stat-icon">', $('<div class="stat-data"></div>').append('<div class="stat-name">' + n + "</div>", a)),
      k.widget.append(i.div);
      for (var s = 0; s < 10; ++s) {
          var t = $('<div class="bar filled"></div>');
          i.bars.push(t),
          a.append(t),
          t[0].addEventListener("click", function(n) {
              return function() {
                  if (o()) {
                      var a = {};
                      a[e] = n,
                      l(a),
                      i.setValue(n)
                  }
              }
          }(s + 1))
      }
      i.setValue = function(e) {
          for (var n = 0; n < 10; ++n)
              i.bars[n].toggleClass("filled", n < e)
      }
  }),
  k.setValues = function(e) {
      for (var n in this.scales)
          this.scales[n].setValue(e[n] || 10)
  }
  ,
  d.on("mouseover", ".d3md-item a", function() {
      var e = $(this).parent().attr("data-item");
      p.itemById[e] ? p.tooltip.showItem(this, e) : p.gemById[e] && (p.legendaryGems[p.gemById[e][0]] ? p.tooltip.showGem(this, p.gemById[e][0]) : p.tooltip.showGem(this, p.gemById[e]))
  }),
  d.on("mouseover", ".d3md-skill a, .d3md-skill-rune a, .d3md-skill .d3md-skill-name", function() {
      var n = $(this).parent()
        , i = n.attr("data-skill");
      if (n.hasClass("d3md-skill-rune")) {
          if (3 !== (i = i.split(".")).length)
              return;
          var a = i[2];
          i = i.slice(0, 2).join(".")
      }
      var s = e(i);
      s && (a && !s[2].runes[a] || p.tooltip.showSkill(this, s[0], s[1], a))
  }),
  d.on("mouseover", ".d3md-skill-rune .rune-name, .d3md-rune .rune-name", function() {
      var n = $(this).parent().attr("data-skill");
      if (3 === (n = n.split(".")).length) {
          var i = n[2]
            , a = e(n = n.slice(0, 2).join("."));
          a && a[2].runes[i] && p.tooltip.showSkill(this, a[0], a[1], i, !0)
      }
  }),
  d.on("mouseover", ".d3md-passive a", function() {
      var e = n($(this).parent().attr("data-skill"));
      e && p.tooltip.showSkill(this, e[0], e[1])
  }),
  d.on("mouseover", ".d3md-follower a", function() {
      var e = $(this).parent().attr("data-skill");
      p.tooltip.showFollowerSkill(this, e)
  }),
  d.on("mouseover", ".d3md-buff .buff-name", function() {
      var e = $(this).parent().attr("data-buff");
      p.tooltip.showShrineBuff(this, e)
  }),
  d.on("mouseleave", ".d3md-item a, .d3md-skill a, .d3md-skill-rune a, .d3md-skill .d3md-skill-name, .d3md-rune .rune-name, .d3md-skill-rune .rune-name, .d3md-passive a, .d3md-follower a, .d3md-buff .buff-name", function() {
      p.tooltip.hide()
  }),
  p.register("login", function() {
      r()
  }),
  p.register("importEnd", function() {
      r()
  })
}();
DiabloCalc.onLoaded();
