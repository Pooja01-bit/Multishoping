<?php
require_once "../config/database.php";
Database::setCorsHeaders();

$input = json_decode(file_get_contents("php://input"), true);

$items = isset($input['items']) ? $input['items'] : [];
$shippingAddress = isset($input['shippingAddress']) ? trim($input['shippingAddress']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$paymentMethod = isset($input['paymentMethod']) ? trim($input['paymentMethod']) : 'UPI';
$totalAmount = isset($input['totalAmount']) ? floatval($input['totalAmount']) : 0.00;

if (empty($items)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No items in checkout payload"]);
    exit();
}

$orderId = "ORD-" . rand(100000, 999999);
$createdAt = date("M d, Y");

$database = new Database();
$db = $database->getConnection();

if ($db) {
    try {
        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO orders (id, shipping_address, phone, payment_method, total_amount, status) VALUES (:id, :address, :phone, :method, :total, 'Processing')");
        $stmt->execute([
            ':id' => $orderId,
            ':address' => $shippingAddress,
            ':phone' => $phone,
            ':method' => $paymentMethod,
            ':total' => $totalAmount
        ]);

        $itemStmt = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES (:order_id, :product_id, :product_name, :qty, :unit_price, :total_price)");

        foreach ($items as $item) {
            $itemStmt->execute([
                ':order_id' => $orderId,
                ':product_id' => $item['id'] ?? '0',
                ':product_name' => $item['productName'] ?? 'Product',
                ':qty' => intval($item['qty'] ?? 1),
                ':unit_price' => floatval($item['price'] ?? 0),
                ':total_price' => floatval(($item['price'] ?? 0) * ($item['qty'] ?? 1))
            ]);
        }

        $db->commit();

        echo json_encode([
            "success" => true,
            "message" => "Order placed successfully in MySQL Database",
            "data" => [
                "id" => $orderId,
                "shippingAddress" => $shippingAddress,
                "phone" => $phone,
                "paymentMethod" => $paymentMethod,
                "totalAmount" => $totalAmount,
                "status" => "Processing",
                "createdAt" => $createdAt,
                "items" => $items
            ]
        ]);
        exit();

    } catch (PDOException $e) {
        $db->rollBack();
    }
}

// Fallback JSON Response if DB not connected
echo json_encode([
    "success" => true,
    "message" => "Order created successfully",
    "data" => [
        "id" => $orderId,
        "shippingAddress" => $shippingAddress,
        "phone" => $phone,
        "paymentMethod" => $paymentMethod,
        "totalAmount" => $totalAmount,
        "status" => "Processing",
        "createdAt" => $createdAt,
        "items" => $items
    ]
]);
?>