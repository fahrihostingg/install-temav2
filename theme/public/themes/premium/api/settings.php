<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$settingsFile = __DIR__ . '/settings.json';

// Default configuration settings
$defaultSettings = [
    'primary_color' => '#6366f1',
    'primary_glow' => 'rgba(99, 102, 241, 0.45)',
    'theme_mode' => 'dark',
    'dashboard_bg' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    'login_bg' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    'bg_overlay_opacity' => '0.75',
    'login_logo' => '',
    'navbar_logo' => '',
    'logo_height' => '50',
    'logo_glow' => true,
    'card_blur' => '16',
    'card_opacity' => '0.85',
    'animated_bg' => true,
    'card_tilt' => true,
    'glow_effects' => true,
    'announcement_enabled' => true,
    'announcement_text' => '🔥 <b>Selamat Datang!</b> Panel Cloud & Game Server siap digunakan 24/7. Hubungi admin untuk bantuan teknis.',
    'announcement_type' => 'gradient',
    'announcement_marquee' => true,
    'custom_css' => '',
    'allow_user_customizer' => true
];

// Ensure settings file exists
if (!file_exists($settingsFile)) {
    @file_put_contents($settingsFile, json_encode($defaultSettings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

// GET Request: Retrieve current settings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($settingsFile)) {
        $content = @file_get_contents($settingsFile);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            // Merge with defaults in case new keys exist
            $merged = array_merge($defaultSettings, $decoded);
            echo json_encode(['success' => true, 'settings' => $merged], JSON_UNESCAPED_SLASHES);
            exit;
        }
    }
    echo json_encode(['success' => true, 'settings' => $defaultSettings], JSON_UNESCAPED_SLASHES);
    exit;
}

// POST Request: Save new settings
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input && !empty($_POST)) {
        $input = $_POST;
    }

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format data tidak valid (Invalid JSON payload).']);
        exit;
    }

    // Load existing settings
    $currentSettings = $defaultSettings;
    if (file_exists($settingsFile)) {
        $existing = json_decode(@file_get_contents($settingsFile), true);
        if (is_array($existing)) {
            $currentSettings = array_merge($defaultSettings, $existing);
        }
    }

    // Sanitize & Update
    $updatableKeys = [
        'primary_color', 'primary_glow', 'theme_mode', 'dashboard_bg', 'login_bg',
        'bg_overlay_opacity', 'login_logo', 'navbar_logo', 'logo_height', 'logo_glow',
        'card_blur', 'card_opacity', 'animated_bg', 'card_tilt', 'glow_effects',
        'announcement_enabled', 'announcement_text', 'announcement_type',
        'announcement_marquee', 'custom_css', 'allow_user_customizer'
    ];

    foreach ($updatableKeys as $key) {
        if (isset($input[$key])) {
            $val = $input[$key];
            if (is_string($val)) {
                // Keep safe HTML for announcement text, trim others
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

    // Attempt to write to file
    $saved = @file_put_contents($settingsFile, json_encode($currentSettings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    if ($saved === false) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan pengaturan ke settings.json. Periksa permission folder/file (chmod 777 settings.json).'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Pengaturan tema berhasil diperbarui!',
        'settings' => $currentSettings
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak diizinkan.']);
exit;
