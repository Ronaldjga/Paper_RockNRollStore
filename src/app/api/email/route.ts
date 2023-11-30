import { ICart } from '@/providers/data';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { moneyFomat } from '../../../../utils/operations';

interface reqBody {
    email: string,
    name: string,
    message: string,
    adress: string,
    cart: ICart[],
    total: string
}

export async function POST(request: NextRequest) {
    const { email, name, message, adress,cart, total } = await request.json() as reqBody;

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  
    const mailOptions: Mail.Options = {
        from: process.env.APP_EMAIL,
        to: 'ronaldalmeida20022003@gmail.com',
        subject: `Rock N Roll Store: name: ${name}, Email: (${email})`,
        text: message,
        html: `
            <h2 style="font-size: 3rem; color: #F20F38; background-color: #110B10; padding: 50px; text-align: center;">Rock N Roll Store</h2>
            <ul>
                <li><span style=" color: #110B10;">Name:</span> <span>${name}</span></li>
                <li><span style=" color: #110B10;">Email:</span> <span>${email}</span></li>
                <li><span style=" color: #110B10;">Message:</span> <span>${message}</span></li>
                <li><span style=" color: #110B10;">Endereço:</span> <span>${adress}</span></li>
            </ul>
            <h3>Carrinho de compras: ${total}</h3>
            <table style="border-collapse: collapse; width: 100%; border-spacing: unset;">
                <thead style="background-color: #110B10; color: #F20F38;">
                    <tr style="border: 1px solid #F20F38;">
                        <th style="border: none; padding: 8px; text-align: left;">Id</th>
                        <th style="border: none; padding: 8px; text-align: left;">Nome</th>
                        <th style="border: none; padding: 8px; text-align: left;">Cor</th>
                        <th style="border: none; padding: 8px; text-align: left;">Tamanho</th>
                        <th style="border: none; padding: 8px; text-align: left;">Preço</th>
                        <th style="border: none; padding: 8px; text-align: left;">Quantidade</th>
                        <th style="border: none; padding: 8px; text-align: left;">Total</th>
                    </tr>
                </thead>
                <tbody style="background-color: #E8F0EB;">
                    ${cart.map(item => `
                    <tr style="border: 1px solid #490511;">
                        <td style="border: none; padding: 8px;">${item.id}</td>
                        <td style="border: none; padding: 8px;">${item.band}</td>
                        <td style="border: none; padding: 8px;">${item.color}</td>
                        <td style="border: none; padding: 8px;">${item.size}</td>
                        <td style="border: none; padding: 8px;">${moneyFomat(item.price)}</td>
                        <td style="border: none; padding: 8px;">${item.quantity}</td>
                        <td style="border: none; padding: 8px;">${moneyFomat(item.totalPrice)}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        `
    };
  
    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve('Email sent');
          } else {
            reject(err.message);
          }
        });
      });
  
    try {
      await sendMailPromise();
      return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
}