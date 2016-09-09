<?php

// Load function
//	this functions check if the files exists in the Child Theme's folder first.
//------------------------------------------------------->
if ( ! function_exists( 'vito_require_file' ) ) :
	function vito_require_file($file, $parent_path, $child_path) {
		if (file_exists($child_path . $file)) {
		    require_once ($child_path . $file);
		} else {
		    require_once ($parent_path . $file);
		}	
	}    
endif;// if function_exists




/* Load the Theme class. */
require_once (get_template_directory() . '/framework/Theme.php');

//Theme Information
$vito_theme_info = include(get_template_directory() . '/framework/info.php');

//Instance of the Theme
$vito_Theme = new vito_Theme($vito_theme_info);


// Load jQuery------------------------------------------------------->
if ( ! function_exists( 'vito_jquery_script' ) ) :
	function vito_jquery_script() {
		wp_enqueue_script( 'jquery' );
	}    
endif;// if function_exists
add_action('wp_enqueue_scripts', 'vito_jquery_script');
// Load jQuery-------------------------------------------------------<
	






//You can start adding your code below
//==================================================================



?>