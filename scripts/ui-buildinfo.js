(function() {
  var minUserLevel = 3;

  var tab = $("#tab-buildinfo");
  var tabHeader = $("#tab-buildinfo-header");
  var converter = new showdown.Converter();
  var ytRegex = new RegExp(/https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/);

  function updateText(text) {
    if (text.length) {
      if (!DiabloCalc.buildinfo) DiabloCalc.buildinfo = {};
      DiabloCalc.buildinfo.text = text;
    } else if (DiabloCalc.buildinfo) {
      if (DiabloCalc.buildinfo.video) {
        delete DiabloCalc.buildinfo.text;
      } else {
        delete DiabloCalc.buildinfo;
      }
    }
  }
  function updateVideo(link) {
    var m = link.match(ytRegex);
    if (!m) {
      m = link.match(/$([\w\-\_]*)^/);
    }
    if (m && m[1].length) {
      if (!DiabloCalc.buildinfo) DiabloCalc.buildinfo = {};
      DiabloCalc.buildinfo.video = m[1];
      return m[1];
    } else if (DiabloCalc.buildinfo) {
      if (DiabloCalc.buildinfo.text) {
        delete DiabloCalc.buildinfo.video;
      } else {
        delete DiabloCalc.buildinfo;
      }
    }
  }

  function updateVisibility() {
    tab.empty();
    if (DiabloCalc.session.user_level && DiabloCalc.session.user_level >= minUserLevel) {
      var textArea = $("<textarea class=\"build-text\"/>");
      //var preview = $("<div class=\"preview\"/>");
      tab.append($("<div class=\"build-text-container\"/>").append(textArea));
      var mde = new SimpleMDE({ element: textArea[0] });
      mde.codemirror.on("change", function() {
        updateText(mde.value());
      });
      if (DiabloCalc.buildinfo) {
        mde.value(DiabloCalc.buildinfo.text || "");
      }

      var ytLink = $("<input type=\"text\"/>");
      tab.append($("<label>YouTube link:</label>").append(ytLink));
      var embed = $("<iframe type=\"text/html\" width=\"530\" height=\"300\" frameborder=\"0\"/>");

      ytLink.on("input", function() {
        var id = updateVideo($(this).val());
        if (id) {
          embed.attr("src", "https://www.youtube.com/embed/" + id);
          tab.append(embed);
        } else {
          embed.remove();
        }
      });
      if (DiabloCalc.buildinfo) {
        ytLink.val(DiabloCalc.buildinfo.video || "");
        if (DiabloCalc.buildinfo.video) {
          embed.attr("src", "https://www.youtube.com/embed/" + DiabloCalc.buildinfo.video);
          tab.append(embed);
        }
      }

      tabHeader.show();
    } else if (DiabloCalc.buildinfo) {
      if (DiabloCalc.buildinfo.text) {
        var html = converter.makeHtml(DiabloCalc.buildinfo.text);
        var div = $("<div class=\"preview\"/>").html(html);
        tab.append(div);
      }
      if (DiabloCalc.buildinfo.video) {
        var embed = $("<iframe type=\"text/html\" width=\"530\" height=\"300\" frameborder=\"0\"/>");
        embed.attr("src", "https://www.youtube.com/embed/" + DiabloCalc.buildinfo.video);
        tab.append(embed);
      }
      tabHeader.show();
    } else {
      tabHeader.hide();
      if ($(".editframe").tabs("option", "active") === DiabloCalc.TAB_BUILDINFO) {
        $(".editframe").tabs("option", "active", DiabloCalc.TAB_EQUIPMENT);
      }
    }
  }

  DiabloCalc.register("login", function() {
    updateVisibility();
  });
  DiabloCalc.register("importEnd", function() {
    updateVisibility();
  });
})();
