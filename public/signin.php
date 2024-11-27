<?php
    include_once '../source/database.php';
    $connection = database_connect();
    $signin = $_GET['signin'];
    $score = $_GET['score'];
    $plays = 1;

    $sql = "SELECT score, plays FROM scores WHERE name = ?;";
    $statement = $connection->prepare($sql);
    $statement->bind_param('s', $signin);
    $statement->execute();
    $results = $statement->get_result();

    if($results->num_rows > 0){
        $row = $results->fetch_assoc();
        $updateScore = $row["score"] + $score;
        $updatePlays = $row["plays"] + $plays;

        $updatesql = "UPDATE scores SET plays = ?, score = ? WHERE name=?;";
        $updatestmt = $connection->prepare($updatesql);
        $updatestmt->bind_param('iis', 
            $updatePlays,
            $updateScore,
            $signin
        );
        $results = $updatestmt->execute();
    }
    else{
        $q = "INSERT INTO scores (name, score, plays) VALUES (?, ?, ?);";
        $stmt = $connection->prepare($q);
        $stmt->bind_param('sii',
            $signin,
            $score,
            $plays
        );
        $results = $stmt->execute();
    }
?>