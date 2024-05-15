/*Ext.define('MyApp.view.main.MSFieldFileImageContainer', {
  extend: 'Ext.container.Container',
  alias: 'widget.msFieldFileImageContainer',
  // controller: 'form-fileuploads',
    
    
    width: 600,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    defaults: {
        xtype: 'form',
        layout: 'anchor',
        bodyPadding: 10,
        style: {
            'margin-bottom': '20px'
        },
        
        defaults: {
            anchor: '100%'
        }
    },
    
    items: [{
        items: [{
            xtype: 'component',
            html: [
                '<h3>Basic File Field</h3>',
                '<p>A typical file upload field with Ext style. Direct editing ',
                'of the text field cannot be done in a consistent, cross-browser way, ',
                'so it is always read-only. The file path reported by the ',
                '<code>getValue</code> method will depend on the browser and cannot ',
                'be controlled by Ext JS.'
            ]
        }, {
            xtype: 'filefield',
            hideLabel: true,
            reference: 'basicFile'
        }, {
            xtype: 'button',
            text: 'Get File Path',
            handler: 'getFilePath'
        }]
    }, {
        items: [{
            xtype: 'component',
            html: [
                '<h3>Button Only</h3>',
                '<p>You can also render the file input as a button without ',
                'the text field, with access to the field\'s value via the ',
                'standard <tt>Ext.form.field.Field</tt> interface or by handling ',
                'the <tt>change</tt> event (as in this example).',
                '</p>'
            ]
        }, {
            xtype: 'fileuploadfield', // Same as filefield above
            buttonOnly: true,
            hideLabel: true,
            listeners: {
                change: 'buttonOnlyChange'
            }
        }]
    }, {
        title: 'File Upload Form',
        frame: true,
        bodyPadding: '10 10 0',
        reference: 'firstForm',
        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 50
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        }, {
            xtype: 'filefield',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonText: '',
            buttonConfig: {
                iconCls: 'file-uploads-image-add'
            }
        }],
        buttons: [{
            text: 'Save',
            handler: 'firstFormSave'
        }, {
            text: 'Reset',
            handler: 'firstFormReset'
        }]
    }, {
        title: 'Upload error test',
        frame: true,
        bodyPadding: '10 10 0',
        reference: 'secondForm',
        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 70
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        }, {
            xtype: 'filefield',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonConfig: {
                text : '',
                iconCls: 'file-uploads-image-add'
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: 'HTTP status',
            value: 200,
            minValue: 200,
            maxValue: 599,
            name: 'returnResponse'
        }],
        buttons: [{
            text: 'Save',
            handler: 'secondFormSubmit'
        }, {
            text: 'Reset',
            handler: 'secondFormReset'
        }]
    }]
});
*/
Ext.define("MyApp.view.main.MSFieldFileImageContainer", {
  extend: "Ext.form.FieldContainer",
  alias: "widget.msFieldFileImageContainer",
  imageWidth: 300,
  notice: "",
  layout: "fit",
  border: false,
  items: [
    {
      xtype: "form",
      reference: "uploadForm",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      bodyPadding: 10,
      items: [
        {
          xtype: "box",
          flex: 1,
          //width: 300,
          //maxWidth: 300,
          reference: "imageShow",
          autoEl: {
            tag: "img",
            //style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);'
            //src: MoenSun.moensun.constant.Image.noPicture,
            // onerror:"javascript:this.src='"+MoenSun.moensun.constant.Image.noPicture+"'"
          },
        },
        {
          xtype: "filefield",
          //flex:1,
          height: 50,
          width: 80,
          buttonText: "",
          buttonOnly: false,
          //buttonText: '选择图片',
          listeners: {
            change: function (fileFiled, value, eOpts) {
              var me = this;
              var image = me.up().down("box").getEl().dom;
              var hidden = me.up().down("hiddenfield");
              var file = fileFiled.fileInputEl.dom.files.item(0);
              var fileReader = new FileReader(value);
              fileReader.readAsDataURL(file);
              fileReader.onload = function (e) {
                image.src = e.target.result;
                hidden.setValue(e.target.result);
              };
              me.value = "";
            },
          },
        },
        /*,
				{
					xtype: 'component',
					hight: 70,
					border: 1,
					html: ' me.notice'
				},
				{
					xtype: 'hiddenfield',
					//	name: me.name
				}*/
      ],
      buttons: [
        {
          text: "上传",
          handler: "btnUploadFormSave",
        },
        {
          text: "放弃",
          icon: "images/close.gif",
          handler: "btnUploadFormCancel",
        },
      ],
    },
  ],
});
