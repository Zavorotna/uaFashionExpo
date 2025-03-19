<?php 
    try {
        $userPhone = $_POST["userPhone"];
        $userName = $_POST["userName"];
        $nameCompany = $_POST["company"];
        $email = $_POST["email"];
        $city = $_POST["city"];
        $code = $_POST["code"];
        $sertificat = $_POST["sertificat"];
        $products = $_POST["products"];
        $ploshcha = $_POST["ploshcha"];
        $fop = $_POST["fop"];
        $stend = $_POST["stend"];
        $approve = $_POST["approve"];
    } catch (\Throwable $th) {
        $userPhone = "ERROR IN MESSAGE";
        $userName = "ERROR IN MESSAGE";
        $nameCompany = "ERROR IN MESSAGE";
        $email = "ERROR IN MESSAGE";
        $fop = "ERROR IN MESSAGE";
        $city = "ERROR IN MESSAGE";
        $code = "ERROR IN MESSAGE";
        $products = "ERROR IN MESSAGE";
        $ploshcha = "ERROR IN MESSAGE";
        $stend = "ERROR IN MESSAGE";
        $sertificat = "ERROR IN MESSAGE";
        $approve = "ERROR IN MESSAGE";
    }
    $token = "7934196878:AAEH5zA-ksHdQZgdqQY9sRHnypLO0zODzXo"; // api телеграм бота
    $chat_id = "-1002648016776";
    // $token = "6502486274:AAFqSGBvtvutHB8be-wTlsK3ETbssmLSEWo"; // api телеграм бота
    // $chat_id = "1066741091";

    $userPhone = urlencode("$userPhone");
    $userName = urlencode("$userName");
    $nameCompany = urlencode("$nameCompany");
    $code = urlencode("$code");
    $products = urlencode("$products");
    $ploshcha = urlencode("$ploshcha");
    $stend = urlencode("$stend");
    $fop = urlencode("$fop");
    $sertificat = urlencode("$sertificat");
    $email = urlencode("$email");
    $city = urlencode("$city");
    $approve = urlencode("$approve");
    

    $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" .
        "***<b>Форма - забронювати стенд</b>***%0A" . "%0A%0A" .
        "Назва компанії: <b>$nameCompany</b>%0A" .
        "Контактна особа: <b>$userName</b>%0A" .
        "Країна/місто*: <b>$city</b>%0A" .
        "Телефон: <b>$userPhone</b>%0A" .
        "ФОП: <b>$fop</b>%0A" .
        "Емейл: <b>$email</b>%0A" .
        "Код ЄДРПОУ: <b>$code</b>%0A" .
        "Номер свідоцтва платника податку: <b>$sertificat</b>%0A" .
        "Продукція, яка буде представлена: <b>$products</b>%0A" .
        "Тип площі: <b>$ploshcha</b>%0A" .
        "Бажана квадратура стенду м2: <b>$stend</b>%0A" . "%0A%0A" .
        "<b>$approve</b>%0A" . "%0A";

    $urlQuery .= "&parse_mode=HTML";

    $result = file_get_contents($urlQuery);

    header("Location: index.html");
    exit();

?>