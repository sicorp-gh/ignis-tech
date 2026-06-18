<?php
require_once 'db.php';

use Firebase\JWT\JWT;

$request_uri = $_SERVER['REQUEST_URI'];
// Remove the base path /ignis-tech/api from the URI
$base_path = '/ignis-tech/api';
$path = str_replace($base_path, '', $request_uri);
$path = explode('?', $path)[0];
$path = rtrim($path, '/');
$method = $_SERVER['REQUEST_METHOD'];

// Helper to get JSON input
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

// Routing
switch ($path) {
    case '/auth/login':
        if ($method === 'POST') {
            $data = getJsonInput();
            $username = $data['username'] ?? $_POST['username'] ?? '';
            $password = $data['password'] ?? $_POST['password'] ?? '';

            if (empty($username) || empty($password)) {
                 http_response_code(400);
                 echo json_encode(['status' => 'error', 'message' => 'Missing username or password']);
                 break;
            }

            $stmt = $pdo->prepare("SELECT * FROM admin WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $payload = [
                    'iss' => 'ignis-tech',
                    'aud' => 'ignis-tech-frontend',
                    'iat' => time(),
                    'exp' => time() + (60 * 60 * 24), // 24 hours
                    'data' => [
                        'username' => $username
                    ]
                ];
                $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'token' => $jwt,
                    'user' => ['username' => $username]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
            }
        }
        break;

    case '/auth/check':
        if ($method === 'GET') {
            $decoded = authenticate();
            echo json_encode(['status' => 'success', 'user' => ['username' => $decoded->data->username]]);
        }
        break;

    case '/content':
        if ($method === 'GET') {
            $data = [];
            $data['services'] = $pdo->query("SELECT * FROM services")->fetchAll();
            $data['projects'] = $pdo->query("SELECT * FROM projects")->fetchAll();
            $data['team'] = $pdo->query("SELECT * FROM team")->fetchAll();
            $data['faqs'] = $pdo->query("SELECT * FROM faqs")->fetchAll();
            $data['partners'] = $pdo->query("SELECT * FROM partners")->fetchAll();
            $data['testimonials'] = $pdo->query("SELECT * FROM testimonials")->fetchAll();
            $data['core_values'] = $pdo->query("SELECT * FROM core_values")->fetchAll();
            
            $innovation_divisions = $pdo->query("SELECT * FROM innovation_divisions")->fetchAll();
            foreach ($innovation_divisions as &$idiv) {
                $idiv['details'] = json_decode($idiv['details']);
            }
            $data['innovation_divisions'] = $innovation_divisions;

            $settings = $pdo->query("SELECT * FROM site_settings WHERE id = 1")->fetch();
            if ($settings) {
                $data['settings'] = [
                    'site_name' => $settings['site_name'],
                    'site_abbreviation' => $settings['site_abbreviation'],
                    'contact_email' => $settings['contact_email'],
                    'contact_phone' => $settings['contact_phone'],
                    'address' => $settings['address'],
                    'p_o_box' => $settings['p_o_box'],
                    'founding_year' => $settings['founding_year'],
                    'staff_strength' => $settings['staff_strength'],
                    'vision' => $settings['vision'],
                    'mission' => $settings['mission'],
                    'primary_color' => $settings['primary_color'],
                    'secondary_color' => $settings['secondary_color'],
                    'hero_title' => $settings['hero_title'],
                    'hero_description' => $settings['hero_description'],
                    'about_summary' => $settings['about_summary'],
                    'ceo_quote' => $settings['ceo_quote'],
                    'cta_title' => $settings['cta_title'],
                    'cta_tagline' => $settings['cta_tagline'],
                    'hero_video_text' => $settings['hero_video_text'],
                    'hero_video_subtext' => $settings['hero_video_subtext'],
                    'why_choose_us' => json_decode($settings['why_choose_us']),
                    'stats' => json_decode($settings['stats']),
                    'social_links' => [
                        'linkedin' => $settings['linkedin'],
                        'twitter' => $settings['twitter'],
                        'facebook' => $settings['facebook'],
                        'instagram' => $settings['instagram']
                    ]
                ];
            }
            echo json_encode($data);
        }
        break;

    case '/cms/data':
        authenticate();
        $type = $_GET['type'] ?? '';
        if ($method === 'GET') {
            if ($type === 'settings') {
                $settings = $pdo->query("SELECT * FROM site_settings WHERE id = 1")->fetch();
                if ($settings) {
                    $formatted = [
                        'site_name' => $settings['site_name'],
                        'site_abbreviation' => $settings['site_abbreviation'],
                        'contact_email' => $settings['contact_email'],
                        'contact_phone' => $settings['contact_phone'],
                        'address' => $settings['address'],
                        'p_o_box' => $settings['p_o_box'],
                        'founding_year' => $settings['founding_year'],
                        'staff_strength' => $settings['staff_strength'],
                        'vision' => $settings['vision'],
                        'mission' => $settings['mission'],
                        'primary_color' => $settings['primary_color'],
                        'secondary_color' => $settings['secondary_color'],
                        'hero_title' => $settings['hero_title'],
                        'hero_description' => $settings['hero_description'],
                        'about_summary' => $settings['about_summary'],
                        'ceo_quote' => $settings['ceo_quote'],
                        'cta_title' => $settings['cta_title'],
                        'cta_tagline' => $settings['cta_tagline'],
                        'social_links' => [
                            'linkedin' => $settings['linkedin'],
                            'twitter' => $settings['twitter'],
                            'facebook' => $settings['facebook'],
                            'instagram' => $settings['instagram']
                        ]
                    ];
                    echo json_encode(['status' => 'success', 'data' => $formatted]);
                }
            } elseif ($type === 'content') {
                // Return full content object
                $content = [];
                $content['services'] = $pdo->query("SELECT * FROM services")->fetchAll();
                $content['projects'] = $pdo->query("SELECT * FROM projects")->fetchAll();
                $content['team'] = $pdo->query("SELECT * FROM team")->fetchAll();
                $content['faqs'] = $pdo->query("SELECT * FROM faqs")->fetchAll();
                $content['partners'] = $pdo->query("SELECT * FROM partners")->fetchAll();
                $content['testimonials'] = $pdo->query("SELECT * FROM testimonials")->fetchAll();
                $content['core_values'] = $pdo->query("SELECT * FROM core_values")->fetchAll();
                
                $innovation_divisions = $pdo->query("SELECT * FROM innovation_divisions")->fetchAll();
                foreach ($innovation_divisions as &$idiv) {
                    $idiv['details'] = json_decode($idiv['details']);
                }
                $content['innovation_divisions'] = $innovation_divisions;
                echo json_encode(['status' => 'success', 'data' => $content]);
            } elseif ($type === 'messages') {
                $messages = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC")->fetchAll();
                echo json_encode(['status' => 'success', 'data' => $messages]);
            }
        } elseif ($method === 'POST') {
            $data = getJsonInput();
            if ($type === 'settings') {
                $stmt = $pdo->prepare("UPDATE site_settings SET site_name=?, site_abbreviation=?, contact_email=?, contact_phone=?, address=?, p_o_box=?, founding_year=?, staff_strength=?, vision=?, mission=?, primary_color=?, secondary_color=?, linkedin=?, twitter=?, facebook=?, instagram=?, hero_title=?, hero_description=?, about_summary=?, ceo_quote=?, cta_title=?, cta_tagline=? WHERE id=1");
                $stmt->execute([
                    $data['site_name'],
                    $data['site_abbreviation'],
                    $data['contact_email'],
                    $data['contact_phone'],
                    $data['address'],
                    $data['p_o_box'],
                    $data['founding_year'],
                    $data['staff_strength'],
                    $data['vision'],
                    $data['mission'],
                    $data['primary_color'],
                    $data['secondary_color'],
                    $data['social_links']['linkedin'],
                    $data['social_links']['twitter'],
                    $data['social_links']['facebook'],
                    $data['social_links']['instagram'],
                    $data['hero_title'],
                    $data['hero_description'],
                    $data['about_summary'],
                    $data['ceo_quote'],
                    $data['cta_title'],
                    $data['cta_tagline']
                ]);
                echo json_encode(['status' => 'success', 'message' => 'Settings updated']);
            } elseif ($type === 'content') {
                // The frontend sends the ENTIRE content object to save
                // This is a bit inefficient for MySQL, but to keep it compatible:
                // We'd have to truncate and re-insert or update.
                // For simplicity, let's assume specific category saves if possible, 
                // but the original code saved the whole content.json.
                // Let's implement a "sync" approach.
                $pdo->beginTransaction();
                try {
                    // This is complex to do generically. Let's see if the frontend sends a specific category.
                    // Looking at server/index.js, it just saves the whole body to content.json.
                    // We'll need to handle each category.
                    
                    if (isset($data['services'])) {
                        $pdo->exec("DELETE FROM services");
                        foreach ($data['services'] as $s) {
                            $pdo->prepare("INSERT INTO services (id, title, description, icon, image) VALUES (?, ?, ?, ?, ?)")
                                ->execute([$s['id'], $s['title'], $s['description'], $s['icon'], $s['image']]);
                        }
                    }
                    // Repeat for others... (omitted for brevity in this thought, will implement all)
                    if (isset($data['projects'])) {
                        $pdo->exec("DELETE FROM projects");
                        foreach ($data['projects'] as $p) {
                            $pdo->prepare("INSERT INTO projects (id, title, category, description, image) VALUES (?, ?, ?, ?, ?)")
                                ->execute([$p['id'], $p['title'], $p['category'], $p['description'], $p['image']]);
                        }
                    }
                    if (isset($data['team'])) {
                        $pdo->exec("DELETE FROM team");
                        foreach ($data['team'] as $t) {
                            $pdo->prepare("INSERT INTO team (id, name, role, bio, image) VALUES (?, ?, ?, ?, ?)")
                                ->execute([$t['id'], $t['name'], $t['role'], $t['bio'], $t['image']]);
                        }
                    }
                    if (isset($data['faqs'])) {
                        $pdo->exec("DELETE FROM faqs");
                        foreach ($data['faqs'] as $f) {
                            $pdo->prepare("INSERT INTO faqs (id, question, answer) VALUES (?, ?, ?)")
                                ->execute([$f['id'], $f['question'], $f['answer']]);
                        }
                    }
                    if (isset($data['partners'])) {
                        $pdo->exec("DELETE FROM partners");
                        foreach ($data['partners'] as $p) {
                            $pdo->prepare("INSERT INTO partners (id, name) VALUES (?, ?)")
                                ->execute([$p['id'], $p['name']]);
                        }
                    }
                    if (isset($data['testimonials'])) {
                        $pdo->exec("DELETE FROM testimonials");
                        foreach ($data['testimonials'] as $t) {
                            $pdo->prepare("INSERT INTO testimonials (id, content, author, company) VALUES (?, ?, ?, ?)")
                                ->execute([$t['id'], $t['content'], $t['author'], $t['company']]);
                        }
                    }
                    if (isset($data['core_values'])) {
                        $pdo->exec("DELETE FROM core_values");
                        foreach ($data['core_values'] as $c) {
                            $pdo->prepare("INSERT INTO core_values (id, title, tagline, description, icon, detail) VALUES (?, ?, ?, ?, ?, ?)")
                                ->execute([$c['id'], $c['title'], $c['tagline'], $c['description'], $c['icon'], $c['detail']]);
                        }
                    }
                    if (isset($data['innovation_divisions'])) {
                        $pdo->exec("DELETE FROM innovation_divisions");
                        foreach ($data['innovation_divisions'] as $i) {
                            $pdo->prepare("INSERT INTO innovation_divisions (id, title, icon, description, details) VALUES (?, ?, ?, ?, ?)")
                                ->execute([$i['id'], $i['title'], $i['icon'], $i['description'], json_encode($i['details'])]);
                        }
                    }
                    $pdo->commit();
                    echo json_encode(['status' => 'success', 'message' => 'Content updated']);
                } catch (Exception $e) {
                    $pdo->rollBack();
                    http_response_code(500);
                    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
                }
            }
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? '';
            $category = $_GET['category'] ?? '';
            if ($type === 'content' && $category) {
                // Delete image if exists
                $stmt = $pdo->prepare("SELECT image FROM $category WHERE id = ?");
                $stmt->execute([$id]);
                $item = $stmt->fetch();
                if ($item && $item['image']) {
                    $filePath = '../' . $item['image'];
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                $stmt = $pdo->prepare("DELETE FROM $category WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['status' => 'success', 'message' => 'Item deleted']);
            } elseif ($type === 'messages') {
                $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['status' => 'success', 'message' => 'Message deleted']);
            }
        }
        break;

    case '/messages/send':
        if ($method === 'POST') {
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO messages (id, name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                round(microtime(true) * 1000),
                $data['name'],
                $data['email'],
                $data['subject'] ?? 'No Subject',
                $data['message'],
                date('Y-m-d H:i:s')
            ]);
            echo json_encode(['status' => 'success', 'message' => 'Message sent']);
        }
        break;

    case '/newsletter/subscribe':
        if ($method === 'POST') {
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO newsletter (id, email, subscribed_at) VALUES (?, ?, ?)");
            $stmt->execute([
                round(microtime(true) * 1000),
                $data['email'],
                date('Y-m-d H:i:s')
            ]);
            echo json_encode(['status' => 'success', 'message' => 'Subscribed successfully']);
        }
        break;

    case '/cms/upload':
        if ($method === 'POST') {
            authenticate();
            $type = $_POST['type'] ?? 'general';
            $target_dir = "../uploads/" . $type . "/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            
            $file = $_FILES['file'];
            $cleanName = preg_replace("/[^a-zA-Z0-9._-]/", "", str_replace(" ", "_", $file['name']));
            $filename = time() . "_" . $cleanName;
            $target_file = $target_dir . $filename;

            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'File uploaded',
                    'url' => "uploads/$type/$filename"
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Upload failed']);
            }
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Route not found: ' . $path]);
        break;
}
?>
