<?php
require_once "../config/database.php";
Database::setCorsHeaders();

$database = new Database();
$db = $database->getConnection();

$id = isset($_GET['id']) ? trim($_GET['id']) : null;
$category = isset($_GET['category']) ? trim($_GET['category']) : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : null;

// If MySQL is active
if ($db) {
    try {
        if ($id) {
            $stmt = $db->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $id]);
            $product = $stmt->fetch();

            if ($product) {
                echo json_encode(["success" => true, "data" => $product]);
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Product not found"]);
            }
            exit();
        }

        $query = "SELECT * FROM products WHERE 1=1";
        $params = [];

        if ($category && $category !== "all") {
            $query .= " AND category = :category";
            $params[':category'] = $category;
        }

        if ($search) {
            $query .= " AND product_name LIKE :search";
            $params[':search'] = "%" . $search . "%";
        }

        $stmt = $db->prepare($query);
        $stmt->execute($params);
        $products = $stmt->fetchAll();

        echo json_encode(["success" => true, "count" => count($products), "data" => $products]);
        exit();

    } catch (PDOException $e) {
        // Fallback response
    }
}

// Static Fallback if Database offline
$fallbackProducts = json_decode(file_get_contents("../data/products.json"), true) ?? [];
echo json_encode(["success" => true, "count" => count($fallbackProducts), "data" => $fallbackProducts]);
?>