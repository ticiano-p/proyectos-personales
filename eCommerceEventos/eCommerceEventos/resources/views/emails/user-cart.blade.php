<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmacion de compra de articulos de fiestas</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center;">🎉 ¡Gracias por tu compra!</h2>
        <p style="text-align: center; color: #555;">Tu pedido fue procesado con éxito. A continuación encontrarás el detalle de tu compra:</p>

        <h3 style="color: #444; margin-top: 30px;">🛍️ Detalle de productos:</h3>
        <table width="100%" style="border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f2f2f2; color: #333;">
                    <th style="padding: 10px; text-align: left;">Producto</th>
                    <th style="padding: 10px; text-align: center;">Cantidad</th>
                    <th style="padding: 10px; text-align: right;">Precio</th>
                </tr>
            </thead>
            <tbody>
                @php $total = 0; @endphp
                @foreach($products as $product)
                    @php $subtotal = $product['price'] * $product['quantity']; $total += $subtotal; @endphp
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ $product['name'] }}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{{ $product['quantity'] }}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${{ number_format($subtotal, 2) }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">${{ number_format($total, 2) }}</td>
                </tr>
            </tbody>
        </table>

        <p style="margin-top: 30px; color: #555;">Este correo es tu comprobante de compra. Conservá este mensaje para cualquier consulta futura.</p>

        <div style="margin-top: 40px; text-align: center;">
            <p style="color: #999;">Saludos cordiales,</p>
            <p style="font-weight: bold; color: #333;">El equipo de Eventos 360</p>
        </div>
    </div>
</body>

</html>