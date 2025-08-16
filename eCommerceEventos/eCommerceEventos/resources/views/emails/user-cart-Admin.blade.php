<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmacion de compra de articulos de fiestas</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 640px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #444; text-align: center;">📦 Nuevo Pedido para Preparar</h2>
        
        <p style="color: #555;">Se ha realizado una nueva compra desde el sitio <strong>articulos360.com.ar</strong>. A continuación se detallan los artículos que deben ser preparados:</p>

        <h3 style="color: #333; margin-top: 25px;">🛒 Detalle del pedido:</h3>
        <table width="100%" style="border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f0f0f0;">
                    <th style="padding: 10px; text-align: left;">Producto</th>
                    <th style="padding: 10px; text-align: center;">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                @foreach($products as $product)
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">{{ $product['name'] }}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">{{ $product['quantity'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <h3 style="margin-top: 30px; color: #333;">🧍‍♂️ Cliente:</h3>
        <ul style="color: #555; padding-left: 20px;">
            <li><strong>Nombre:</strong> {{ $user->name }}</li>
            <li><strong>Email:</strong> {{ $user->email }}</li>
            <li><strong>Direccion:</strong> {{ $user->address }}</li>
            <li><strong>Teléfono:</strong> {{ $user->phone }}</li>
            
        </ul>

        <p style="margin-top: 30px; color: #333;"><strong>Total del pedido:</strong> ${{ number_format($total, 2) }}</p>

        <p style="margin-top: 30px; color: #555;">Por favor, proceda a preparar este pedido lo antes posible. Una vez listo, informe al área de logística para coordinar la entrega.</p>

        <p style="margin-top: 30px; text-align: center; color: #999;">Correo generado automáticamente por el sistema de Artículos 360.</p>
    </div>
</body>

</html>