<?php
    include_once "../source/database.php";
    $connection = database_connect();
    $id = $_GET["id"];
    $rank = $_GET["rank"] + 1;
    $sql = "SELECT * FROM scores WHERE idScores=?;";
    $statement = $connection->prepare($sql);
    $statement->bind_param('i', $id);
    $statement->execute();
    $results = $statement->get_result();

    $data = [];

    if($results->num_rows > 0){
        while($result = $results->fetch_assoc()){
            array_push($data, $result);
        }
    }

    $response = ["player" => $data, "rank" => $rank];
    header('Content-Type: application/json; charset=urf-8');
    echo json_encode($response);
?>