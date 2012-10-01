/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

  config.toolbar = 'Sample';
  config.extraPlugins = 'coloredboxes';

  config.toolbar_Sample =
  [
    // { name: 'document', items : [ 'Source' ] },
    // { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
    // { name: 'editing', items : [ 'Find','Replace','-','SelectAll' ] },
    // { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    // { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv', '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    // { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
    // { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
    // { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
    // { name: 'colors', items : [ 'TextColor','BGColor' ] },
    // { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] },
    // '/',
    // { name: 'custom', items : [ 'coloredboxes' ] }

    { name: 'document', items : [ 'Source' ] },
    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript'] },
    { name: 'paragraph', items : [ 'coloredboxes'] }
    // { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
    // { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
    // { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
    // { name: 'colors', items : [ 'TextColor','BGColor' ] },
    // { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] },
    // '/',
    // { name: 'custom', items : [  ] }
  ];
};
