<?php

/*
 * Plugin Name: Resizable Editor Sidebars
 * Description: Enables functionality to make the Gutenberg sidebar width resizable
 * Version: 1.0.0
 * Requires at least: 6.7
 * Requires PHP: 7.4
 * Author: Alex Goller
 * Author URI: https://alpipego.com/
 * GitHub Plugin URI: alpipego/resizable-editor-sidebars
 * Primary Branch: stable
 * Release Asset: true
 * Licence: GPLv2 or later
 */

add_action('enqueue_block_editor_assets', static function () {
	$url = plugin_dir_url(__FILE__);

	wp_enqueue_script('resizable_script', $url . 'script.js', ['jquery-ui-resizable'], '1.0.0', true);
	wp_enqueue_style('resizable_style', $url . 'style.css');
});
