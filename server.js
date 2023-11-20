const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const cors = require('cors'); // 导入 cors 模块

const app = express();
const port = 3000;

// 解析请求体中的 JSON 数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 允许来自特定域的请求
app.use(cors({
    origin: 'http://localhost:8080', // 将此处替换为您的前端域
    credentials: true // 允许发送凭据（例如 cookies、授权头等）
}));

// POST 请求处理程序
app.post('/send-email', (req, res) => {
    // 从请求中获取相关信息
    const { custName, phoneNo, companyName, demand } = req.body;

    // 邮件配置
    // 创建发送邮件的 transporter
    const transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '807255901@qq.com', // 您的 QQ 邮箱地址
            pass: '' // 您的 QQ 邮箱授权码（注意：不是QQ登录密码）
        }
    });

    // 邮件内容
    const mailOptions = {
        from: '807255901@qq.com',
        to: 'codemaker123@126.com;herongchang@raymutech.com;raymutechbd@163.com',
        subject: '官网客户需求邮件',
        text: `
      姓名: ${custName}
      电话: ${phoneNo}
      单位名称: ${companyName}
      服务需求: ${demand}
    `
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('邮件发送失败');
        } else {
            console.log('邮件已发送：' + info.response);
            res.status(200).send('邮件已发送');
        }
    });
});

// 监听端口
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
