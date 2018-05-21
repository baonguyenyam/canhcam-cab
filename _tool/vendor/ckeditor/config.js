/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	// The toolbar groups arrangement, optimized for a single toolbar row.

	config.toolbarGroups = [
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'forms', groups: ['forms'] },
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		'/',
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'] },
		{ name: 'styles', groups: ['styles'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'others', groups: ['others'] },
		{ name: 'about', groups: ['about'] }
	];

	config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,HiddenField,Button,ImageButton,Select,Textarea,TextField,Radio,RemoveFormat,CopyFormatting,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Smiley,PageBreak,Iframe,ShowBlocks,About,Styles';

	config.tabSpaces = 4;
	config.allowedContent = true;

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.contentsCss = '/framework/css/bootstrap.min.css';
	config.language = 'vi';
	config.uiColor = '#48a4bc';

	// Dialog windows are also simplified.
	// config.removeDialogTabs = 'link:advanced';
};
