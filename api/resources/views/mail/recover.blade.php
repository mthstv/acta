<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <style>
            .button {
                text-decoration: none;
                color: white !important;
                background-color: #3a3b45;
                padding: 6px 6px 6px 6px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
      <div id="app"></div>
        <div class="container">
        <p>Olá <strong>{{ ucwords($name) }}</strong>,</p>
        <p class="main-body">Este é um email automático de recuperação de senha, acesse o sistema pelo botão abaixo para gerar uma nova senha.</p>
        <p><a class="button" href="{{$recoverLink}}">Continuar</a></p>
    </div>
    </body>
</html>
