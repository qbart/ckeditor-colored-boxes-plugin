CKEDITOR.plugins.add('coloredboxes', {
  init: function(editor)
  {
    //specify plugin name as command
    var pluginName = 'coloredboxes';
    var iconPath = this.path + 'images/toolbar_icon.png';

    editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));

    editor.ui.addButton(pluginName, {
      label: 'Colored box',
      command: pluginName,
      icon: iconPath
    });

    //add context menu if available
    if (editor.contextMenu) {
      editor.addMenuGroup('ColoredBoxGroup');
      editor.addMenuItem('miColoredBox', {
        label: 'Edit colored box',
        icon: iconPath,
        command: pluginName,
        group: 'ColoredBoxGroup'
      });

      //add context menu listener to the closest box
      editor.contextMenu.addListener(function(element) {
        if (element) {
          var div = element.getAscendant('div', true);
          //if div exists and has class of our box
          if (div && div.hasClass('coloredbox')) {
            element = div;

            //if editable and not fake
            if (!element.isReadOnly() && !element.data('cke-realelement')) {
              return {miColoredBox: CKEDITOR.TRISTATE_OFF};
            }
          }
        }

        return null;
      });
    }
  }
});

CKEDITOR.dialog.add('coloredboxes', function(editor) {
  var regexColor = /^(#)([0-9a-fA-F]){6}$/;

  return {
    title: 'Choose box color',
    minWidth : 440,
    minHeight : 260,
    resizable: CKEDITOR.DIALOG_RESIZE_NONE,

    contents: [
      {
        id: 'main',
        label: 'Options',
        elements: [
          {
            type: 'vbox',
            children: [
              {
                type: 'hbox',
                children: [
                  {
                    id: 'fgcolor',
                    type: 'text',
                    label: 'Text color',
                    required : true,
                    validate : CKEDITOR.dialog.validate.regex(regexColor, "Text color is not valid"),
                    setup: function(element) {
                      if (element) {
                        this.setValue( element.data('fgcolor') );
                        try {
                          $.farbtastic('#ckeditor_colorbox_fg').setColor( element.data('fgcolor') );
                        } catch(ex) {
                          if (console && console.error) {
                            console.error(ex);
                          }
                        }
                      }
                    },
                    commit: function(element) {
                      if (element) {
                        var newColor = this.getValue();
                        element.setStyle('color', newColor);
                      }
                    }
                  },
                  {
                    id: 'bgcolor',
                    type: 'text',
                    label: 'Box color',
                    required : true,
                    validate : CKEDITOR.dialog.validate.regex(regexColor, "Box color is not valid"),
                    setup: function(element) {
                      if (element) {
                        this.setValue( element.data('bgcolor') );
                        try {
                          $.farbtastic('#ckeditor_colorbox_bg').setColor( element.data('bgcolor') );
                        } catch(ex) {
                          if (console && console.error) {
                            console.error(ex);
                          }
                        }
                      }
                    },
                    commit: function(element) {
                      if (element) {
                        var newColor = this.getValue();
                        element.setStyle('background-color', newColor);
                      }
                    }
                  }
                ]
              },
              {
                type: 'hbox',
                children: [
                  {
                    type: 'html',
                    html: '<div id="ckeditor_colorbox_fg"></div>'
                  },
                  {
                    type: 'html',
                    html: '<div id="ckeditor_colorbox_bg"></div>'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    onLoad: function() {
      try {
        $('#ckeditor_colorbox_fg').farbtastic('#' + this.getContentElement('main', 'fgcolor').domId + ' input:text');
        $('#ckeditor_colorbox_bg').farbtastic('#' + this.getContentElement('main', 'bgcolor').domId + ' input:text');
      } catch(ex) {
        console && console.error && console.error(ex);
      }
    },

    onShow: function() {
      var element = null;
      var selection = editor.getSelection();

      this.insertMode = true;

      if (selection) {
        element = selection.getStartElement();

        if (element) {
          element = element.getAscendant('div', true);
        }

        //if div exists with class of box and not fake
        if (element && element.getName() == 'div' && !element.data('cke-realelement') && element.hasClass('coloredbox')) {
          this.insertMode = false;
        } else {
          element = editor.document.createElement('div');
          element.addClass('coloredbox');

          //put default colors
          element.data('fgcolor', '#3A87AD');
          element.data('bgcolor', '#BCE8F1');
        }

        var seedText = "put your text here...";

        if (this.insertMode) {
          switch (selection.getType()) {
            case CKEDITOR.SELECTION_TEXT: //if text we simply wrap text
              var txt = selection.getSelectedText();
              if (txt != null && txt.length == 0) {
                txt = seedText;
              }
              element.setText(txt);
              break;

            case CKEDITOR.SELECTION_ELEMENT: //if element we want to clone its html data
              element.setHtml(selection.getSelectedElement().getOuterHtml());
              break;

            case CKEDITOR.SELECTION_NONE: //if none we always want to put some seed to make box visible to user
              element.setText(seedText);
              break;
          }
        }

      }

      this.element = element;
      this.setupContent(element);
    },

    onOk: function() {
      var dlg = this;
      var box = this.element;

      //would be better to use styles in css
      box.setStyles({
        "margin-bottom": "1px",
        "padding": "6px 15px 6px 15px",
        "-webkit-border-radius": "4px",
        "-moz-border-radius": "4px",
        "border-radius": "4px"
      });

      if (this.insertMode) {
        editor.insertElement(box);
      }

      this.commitContent(box);
    }
  };
});
