<?php require 'locals/detect.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styles.css">
    <title>Gulp With PHP</title>

    <?php include_once './view/utils/head.php'; ?>
</head>

<body>

<?php include_once './view/components/TopNav.php'; ?>
<h1><?= __('Home') ?></h1>

<?php if($_SESSION['lang'] === 'en') { ?>
    <p><strong>This is text on English</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam facilis fuga omnis quibusdam vel. Animi consequuntur cum deleniti eius explicabo incidunt iste, mollitia necessitatibus nesciunt, nulla officiis quaerat reiciendis?</p>
<?php } ?>

<?php if($_SESSION['lang'] === 'fr') { ?>
    <p><strong>Ceci est un texte en français</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam facilis fuga omnis quibusdam vel. Animi consequuntur cum deleniti eius explicabo incidunt iste, mollitia necessitatibus nesciunt, nulla officiis quaerat reiciendis?</p>
<?php } ?>

<?php include_once './view/utils/general-scripts.php'; ?>
</body>

</html>
