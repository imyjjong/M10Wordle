<?php
    function database_connect(){
        $connection = new mysqli('localhost', 'root', '', 'scoreboard');
        return $connection;
    }