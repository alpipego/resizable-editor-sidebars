<?php

/*
 * Plugin Name: Resizable Editor Sidebars
 * Description: Enables functionality to make the Gutenberg sidebar width resizable
 * Version: 1.0.1
 * Requires at least: 6.7
 * Requires PHP: 7.4
 * Author: Alex Goller
 * Author URI: https://alpipego.com/
 * Additional Authors: David Foreman, Aaron Jones
 * GitHub Plugin URI: alpipego/resizable-editor-sidebars
 * Primary Branch: stable
 * Release Asset: true
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

add_action('enqueue_block_editor_assets', static function () {
	$url       = plugin_dir_url(__FILE__) . 'assets/';
	$srcOrDist = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) || in_array(wp_get_environment_type(), ['local', 'development'], true) ? 'src' : 'dist';
	$url .= $srcOrDist;
	$version   = '1.0.0';

	wp_enqueue_script('resizable_script', $url . '/resizable-editor-sidebars.js', ['jquery-ui-resizable'], $version, true);
	wp_enqueue_style('resizable_style', $url . '/resizable-editor-sidebars.css', [], $version);
});
