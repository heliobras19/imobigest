import axios from 'axios';
import { api } from '../../../services/api';
import { RSC_MODULE_TYPES } from 'next/dist/shared/lib/constants';

export default async function handler(req, res) {
  
  const { token } = req.body;

  // Verifica o reCAPTCHA
  const isRecaptchaValid = await verifyRecaptcha(token);

  if (!isRecaptchaValid) {
    // A resposta do reCAPTCHA não é válida, tome as medidas adequadas (ex: retorne um erro, bloqueie o acesso, etc.)
    return res.status(400).json({ success: false });
  } else {
    // A resposta do reCAPTCHA é válida, prossiga com o processamento do formulário

    const responseSac = await sendSacToBackend(req.body);
    if (responseSac == true) return res.status(200).json({ success: true });
    return res.status(500).json({ success: false });
  }
}

async function sendSacToBackend(data) {

    console.log("body", data);

    const res = await api.post('/sac', data);
    console.log(res.status);

    if (res.status == 200) {
        return true;
    }
    return false;
}


async function verifyRecaptcha(response) {
    const secretKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`;

    try {
        const { data } = await axios.post(url);
        const { success } = data;
        
        return success; // Retorna true se a resposta é válida, caso contrário, retorna false
    } catch (error) {
        console.error('Erro ao verificar o reCAPTCHA:', error);
        return false;
    }
}