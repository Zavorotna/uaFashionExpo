<?php 
    try {
        $userPhone = $_POST["userPhone"];
        $userName = $_POST["userName"];
        $usersurName = $_POST["surname"];
        $email = $_POST["email"];
        $city = $_POST["city"];
        $approve = $_POST["approve"];
    } catch (\Throwable $th) {
        $userPhone = "ERROR IN MESSAGE";
        $userName = "ERROR IN MESSAGE";
        $usersurName = "ERROR IN MESSAGE";
        $email = "ERROR IN MESSAGE";
        $city = "ERROR IN MESSAGE";
        $approve = "ERROR IN MESSAGE";
    }
    $token = "7934196878:AAEH5zA-ksHdQZgdqQY9sRHnypLO0zODzXo"; // api телеграм бота
    $chat_id = "-1002648016776";
    // $token = "6502486274:AAFqSGBvtvutHB8be-wTlsK3ETbssmLSEWo"; // api телеграм бота
    // $chat_id = "1066741091";

    $userPhone = urlencode("$userPhone");
    $userName = urlencode("$userName");
    $usersurName = urlencode("$usersurName");
    $email = urlencode("$email");
    $city = urlencode("$city");
    $approve = urlencode("$approve");
    

    $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" .
        "***<b>Форма - Відвідати виставку</b>***%0A" . "%0A%0A" .
        "Ім'я замовника: <b>$userName</b>%0A" . "%0A" .
        "Прізвище: <b>$usersurName</b>%0A" . "%0A" .
        "Телефон: <b>$userPhone</b>%0A" . "%0A" .
        "Емейл: <b>$email</b>%0A" . "%0A" .
        "Місто/селище: <b>$city</b>%0A" . "%0A%0A" .
        "<b>$approve</b>%0A" . "%0A";

    $urlQuery .= "&parse_mode=HTML";

    $result = file_get_contents($urlQuery);

    header("Location: index.html");
    exit();

?>