CKEDITOR.dialog.add( 'wrapDialolg', function( editor ) {   
    var wr_lang  = editor.config.wrap_lang;
    var icon_path =  DOKU_BASE + 'lib/plugins/wrap/images/';  
    var toolbar_path =  icon_path + 'toolbar/';
    var icons16_path =  icon_path +  'note/16/';   
    
    var cols = wr_lang['column'] || 'columns';
    var box = wr_lang['box'] || 'simple centered box';
    var info_box = wr_lang['info'] || 'info box';
     var tip_box = wr_lang['tip'] || 'tip box';
     var important_box = wr_lang['important'] || 'important box';     
     var alert_box = wr_lang['alert'] || 'alert box';
     var help_box = wr_lang['help'] || 'help box';     
     var download_box = wr_lang['download'] || 'download box';     
     var todo_box = wr_lang['todo'] || 'todo box';          
     var clear_floats = wr_lang['clear'] || 'todo box';               
     var emphasized = wr_lang['em'] || 'especially emphasised';                    
     var highlighted = wr_lang['hi'] || 'highlighted';                         
     var less_significant = wr_lang['lo'] || 'less significant';                              
    var Columns = '<img src= "' + toolbar_path + 'column.png" title="' +cols+'">';
    var Box = '<img src= "' + toolbar_path + 'box.png" title="' +box + '">';
    var InfoBox = '<img src= "' +  icons16_path + 'info.png" title="'+info_box+'">';
    var TipBox = '<img src= "' +  icons16_path + 'tip.png" title="'+tip_box+'">';
    var ImportantBox = '<img src= "' +  icons16_path + 'important.png" title="'+important_box+'">';
    var AlertBox='<img src= "' +  icons16_path + 'alert.png" title="'+alert_box+'">';
    var HelpBox='<img src= "' +  icons16_path + 'help.png" title="'+help_box+'">';
    var DownloadBox='<img src= "' +  icons16_path + 'download.png" title="'+download_box+'">';
    var ToDoBox='<img src= "' +  icons16_path + 'todo.png" title="'+todo_box+'">';
    var Clear ='<img src= "' +  toolbar_path + 'clear.png" title="'+clear_floats+'">';
    var Emphasis ='<img src= "' +  toolbar_path + 'em.png" title="'+emphasized+'">';
    var Hi ='<img src= "' +  toolbar_path + 'hi.png" title="'+highlighted+'">';
    var Lo ='<img src= "' +  toolbar_path + 'lo.png" title="'+less_significant+'">';
    return {
        title: 'wrap Properties',
        minWidth: 460,
        minHeight: 200,
        contents: [
			{
                id: 'tab-basic',
                label: 'Basic wrap',
                elements: [
                    {
						type: 'radio',
						id: 'div_types',
                        label: editor.lang.wrap.boxes_title||'Box types:',
						//label: editor.lang.wrap.selectOption,
						items: [ [Box, 'box' ] , [ InfoBox, 'info' ] ,[TipBox,'tip'],[ImportantBox,'important'],[AlertBox,'alert'],
                                       [HelpBox ,'help box'],[DownloadBox,'download'],[ ToDoBox,'todo']],
						style: 'color: black',
						'default': '',
					},
                    {
					    type: 'radio',
						id: 'specials',
                       label: editor.lang.wrap.specials_title || 'Special types and Styles',
						//label: editor.lang.wrap.selectOption,
						items: [[ Columns, 'column' ], [Clear,'clear floats'],[Emphasis,'em'],[Hi,'hi'],[Lo,'lo']],
						style: 'color: black',
						'default': '',
					},
					{
                        type: 'text',
                        id: 'wrap',
                        label: editor.lang.wrap.content || 'Content (optional):',
              			'default': ''
                    }
                ]
            }
        ],
		// Invoked when the dialog is loaded.
		onShow: function() {
			// Get the selection from the editor.    
		    var text = editor.getSelection().getSelectedText();            
            if(text) {                          
                this.getContentElement( 'tab-basic', 'wrap').disable();
                this.setValueOf( 'tab-basic', 'wrap',text);
            }    
               else this.text = false;
		},       
        
        onOk: function() {
            var dialog = this;
            var syntaxDiv = 'WRAP';
           var syntaxSpan = 'wrap';
            var open = "";
            var close = "";
            
			var TypeValue = dialog.getValueOf( 'tab-basic', 'div_types' );
            if(!TypeValue) TypeValue = dialog.getValueOf( 'tab-basic', 'specials' );
                               
             switch (TypeValue) {
                        case 'column':                    
                            open   =  '<'+syntaxDiv+' group>\n<'+syntaxDiv+' half column>\n';
                            close =  '\n</'+syntaxDiv+'>\n\n<'+syntaxDiv+' half column>\n\n</'+syntaxDiv+'>\n</'+syntaxDiv+'>\n';
                            break;
                        case 'box':                    
                           open   = '<'+syntaxDiv+' center round box 60%>\n';
                           close =   '\n</'+syntaxDiv+'>\n';
                           break;                    
                        case 'info':
                            open =   '<'+syntaxDiv+' center round info 60%>\n';
                            close =   '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'tip': 
                            open =  '<'+syntaxDiv+' center round tip 60%>\n';
                            close =   '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'important':                    
                            open =   '<'+syntaxDiv+' center round important 60%>\n';
                            close =  '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'alert':
                            open  =  '<'+syntaxDiv+' center round alert 60%>\n';
                            close =  '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'help':
                            open  =  '<'+syntaxDiv+' center round help 60%>\n';
                            close =  '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'download' :
                            open =    '<'+syntaxDiv+' center round download 60%>\n';
                            close =   '\n</'+syntaxDiv+'>\n';
                            break;
                        case 'todo':
                            open =    '<'+syntaxDiv+' center round todo 60%>\n';
                            close =   '\n</'+syntaxDiv+'>\n';
                            break;                    
                        case 'clear':
                            open =  '<'+syntaxDiv+' clear/>\n';
                            close = "";
                            break;
                        case 'em':
                            open =    '<'+syntaxSpan+' em>';
                            close =   '</'+syntaxSpan+'>';
                            break;
                        case 'hi':                        
                          open =    '<'+syntaxSpan+' hi>';
                          close =   '</'+syntaxSpan+'>';
                          break;
                        case 'lo':
                            open =    '<'+syntaxSpan+' lo>';
                            close =   '</'+syntaxSpan+'>';
                            break;
                }
		
			var wrapText = this.text ? this.text: dialog.getValueOf( 'tab-basic', 'wrap' );
			editor.insertText ( open + wrapText + close);

        }
    };
});