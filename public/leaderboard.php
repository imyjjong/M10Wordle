<?php
    include_once '../source/database.php';
    $connection = database_connect();
    $sql = "SELECT * FROM scores";
    $statement = $connection->prepare($sql);
    $statement->execute();
    $results = $statement->get_result();

    $rows = [];

    if($results->num_rows > 0){
        while($row = $results->fetch_assoc()){
            array_push($rows, $row);
        }
    }
    $response = ["scores" => $rows];
    header('Content-Type: application/json; charset=urf-8');
    echo json_encode($response);
?>