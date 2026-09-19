<?php
/**
 * FAKRULDEV & FAHRI HOSTING - THEME API SETTINGS (v3.5 PRO)
 * Zero-Block, Persistent Storage, No Cache
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$baseDir = dirname(__DIR__);
$apiSettingsFile = __DIR__ . '/settings.json';
$dataDir = $baseDir . '/data';
$dataSettingsFile = $dataDir . '/settings.json';
$secretFile = $dataDir . '/.secret';

// Ensure data folder exists with full write permissions
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0777, true);
}

// Create default .secret so old scripts never throw error
if (!file_exists($secretFile)) {
    @file_put_contents($secretFile, "fakruldev");
    @chmod($secretFile, 0666);
}

// Consistent default settings
$defaultSettings = [
    'primary_color' => '#6366f1',
    'secondary_color' => '#06b6d4',
    'primary_glow' => 'rgba(99, 102, 241, 0.45)',
    'theme_mode' => 'dark',
    'dashboard_bg' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    'login_bg' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    'bg_overlay_opacity' => '0.50',
    'login_logo' => '',
    'navbar_logo' => '',
    'logo_height' => '150',
    'logo_glow' => true,
    'card_blur' => '12',
    'card_opacity' => '0.38',
    'animations_enabled' => true,
    'announcement_enabled' => true,
    'announcement_text' => '🔥 <b>Selamat Datang!</b> Panel Cloud & Game Server siap digunakan 24/7. Hubungi admin untuk bantuan teknis.',
    'announcement_type' => 'gradient',
    'announcement_marquee' => false,
    'custom_css' => '',
    'allow_user_customizer' => true
];

// Helper to read settings
function readSettings($file, $defaults) {
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        if ($raw) {
            $data = json_decode($raw, true);
            if (is_array($data)) {
                return array_merge($defaults, $data);
            }
        }
    }
    return null;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check dataSettingsFile first, then apiSettingsFile
    $settings = readSettings($dataSettingsFile, $defaultSettings);
    if (!$settings) {
        $settings = readSettings($apiSettingsFile, $defaultSettings);
    }
    if (!$settings) {
        $settings = $defaultSettings;
    }

    echo json_encode(['success' => true, 'settings' => $settings], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input && !empty($_POST)) {
        $input = $_POST;
    }

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format data tidak sah.']);
        exit;
    }

    // Load existing settings
    $currentSettings = readSettings($dataSettingsFile, $defaultSettings) ?: (readSettings($apiSettingsFile, $defaultSettings) ?: $defaultSettings);

    $updatableKeys = [
        'primary_color', 'secondary_color', 'primary_glow', 'theme_mode', 'dashboard_bg', 'login_bg',
        'bg_overlay_opacity', 'login_logo', 'navbar_logo', 'logo_height', 'logo_glow',
        'card_blur', 'card_opacity', 'animations_enabled',
        'announcement_enabled', 'announcement_text', 'announcement_type',
        'announcement_marquee', 'custom_css', 'allow_user_customizer'
    ];

    foreach ($updatableKeys as $key) {
        if (array_key_exists($key, $input)) {
            $val = $input[$key];
            if (is_string($val)) {
                if ($key === 'announcement_text' || $key === 'custom_css') {
                    $currentSettings[$key] = trim($val);
                } else {
                    $currentSettings[$key] = strip_tags(trim($val));
                }
            } elseif (is_bool($val) || is_numeric($val)) {
                $currentSettings[$key] = $val;
            }
        }
    }

    $jsonOutput = json_encode($currentSettings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    // Save to both locations
    @file_put_contents($apiSettingsFile, $jsonOutput);
    @chmod($apiSettingsFile, 0666);

    @file_put_contents($dataSettingsFile, $jsonOutput);
    @chmod($dataSettingsFile, 0666);

    echo json_encode([
        'success' => true,
        'message' => 'Pengaturan tema berjaya disimpan!',
        'settings' => $currentSettings
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Kaedah tidak dibenarkan.']);
exit;
