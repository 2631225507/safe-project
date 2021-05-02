/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */


CKEDITOR.editorConfig = function (config) {
	config.extraPlugins = 'exportpdf';
	config.toolbar_Cms =
		[
			['Source', '-'],
			['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-'],
			['Undo', 'Redo', '-', 'Find', 'Replace', 'RemoveFormat'], ['Link', 'Unlink', 'Anchor'],
			['Image', 'Flash', 'Table', 'HorizontalRule', '-'], ['Maximize'],
			['Bold', 'Italic', 'Underline', 'Strike', '-'],
			['FontSize'], ['TextColor', 'BGColor'],
			['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'pre'],
			['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
			['PageBreak', 'Page']
		];
	
};