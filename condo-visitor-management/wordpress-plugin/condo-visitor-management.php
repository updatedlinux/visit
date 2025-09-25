<?php
/**
 * Plugin Name: Gestión de Visitantes del Condominio
 * Plugin URI: https://yourwebsite.com/condo-visitor-management
 * Description: Sistema de gestión de visitantes para condominios con paneles para residentes y seguridad.
 * Version: 1.0.0
 * Author: Administración del Condominio
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Salir si se accede directamente
if (!defined('ABSPATH')) {
    exit;
}

class CondoVisitorManagement {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_shortcode('condo_resident_visitor_form', array($this, 'resident_visitor_form_shortcode'));
        add_shortcode('condo_security_dashboard', array($this, 'security_dashboard_shortcode'));
    }
    
    public function init() {
        // Encolar estilos y scripts
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('condo-visitor-css', plugin_dir_url(__FILE__) . 'assets/css/style.css');
        wp_enqueue_script('condo-visitor-js', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0.0', true);
        
        // Localizar script con URL de la API
        wp_localize_script('condo-visitor-js', 'condo_visitor_ajax', array(
            'api_url' => 'https://api.bonaventurecclub.com/visit',
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('condo_visitor_nonce')
        ));
    }
    
    public function resident_visitor_form_shortcode($atts) {
        // Verificar si el usuario ha iniciado sesión
        if (!is_user_logged_in()) {
            return '<p>Debe iniciar sesión para registrar visitantes.</p>';
        }
        
        $current_user = wp_get_current_user();
        ob_start();
        include plugin_dir_path(__FILE__) . 'templates/resident-form.php';
        return ob_get_clean();
    }
    
    public function security_dashboard_shortcode($atts) {
        // Verificar capacidades del usuario (ajustar según sea necesario)
        if (!current_user_can('manage_options')) {
            return '<p>Acceso denegado.</p>';
        }
        
        ob_start();
        include plugin_dir_path(__FILE__) . 'templates/security-dashboard.php';
        return ob_get_clean();
    }
}

new CondoVisitorManagement();