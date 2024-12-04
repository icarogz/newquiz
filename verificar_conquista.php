<?php
require_once("../../conexao.php");  // Certifique-se de que a conexão está correta

// Recebe os dados enviados via POST (pontuação)
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se a pontuação foi recebida
if (isset($data['pontos'])) {
    $pontos = $data['pontos'];

    // Consulta para buscar a conquista baseada na pontuação
    $query = "SELECT * FROM conquista WHERE pontos <= :pontos ORDER BY pontos DESC LIMIT 1";
    $stmt = $conexao->prepare($query);
    $stmt->bindValue(':pontos', $pontos, PDO::PARAM_INT);
    $stmt->execute();

    // Verifica se encontrou alguma conquista
    if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Retorna a conquista encontrada
        echo json_encode(['conquista' => $row]);
    } else {
        // Caso não tenha nenhuma conquista
        echo json_encode(['conquista' => null]);
    }
} else {
    echo json_encode(['error' => 'Pontuação não fornecida.']);
}
?>
