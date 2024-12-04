<?php
require_once("../../conexao.php");  // Certifique-se de que o caminho está correto

// Configura o cabeçalho para retornar dados no formato JSON
header('Content-Type: application/json');

// Consulta para pegar as questões
$query = "SELECT id, question, option_1, option_2, option_3, option_4, correct_option, dica1, dica2, dica3 FROM questions";
$stmt = $pdo->query($query);  // Use $pdo aqui ao invés de $conexao

// Cria um array para armazenar as questões
$questoes = [];

// Loop para processar as questões retornadas pela consulta
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Prepara a questão no formato desejado
    $question = [
        "question" => $row['question'],  // A questão (em formato texto)
        "answers" => [
            ["option" => $row['option_1'], "correct" => ($row['correct_option'] == 1)],
            ["option" => $row['option_2'], "correct" => ($row['correct_option'] == 2)],
            ["option" => $row['option_3'], "correct" => ($row['correct_option'] == 3)],
            ["option" => $row['option_4'], "correct" => ($row['correct_option'] == 4)]
        ],
        "dicas" => [  
            "dica1" => $row['dica1'],
            "dica2" => $row['dica2'],
            "dica3" => $row['dica3']
        ]
    ];

    // Adiciona a questão no array de questões
    $questoes[] = $question;
}

// Converte o array de questões para o formato JSON
echo json_encode($questoes, JSON_PRETTY_PRINT);
?>
