const generateEmailTemplate = ({
    subject,
    message,
    userName,
    portalLink,
    servicesLink,
}) => {
    return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<title>Smart City</title>

<style>

body{
margin:0;
padding:0;
background:#eef3f8;
font-family:Arial,Helvetica,sans-serif;
}

table{
border-spacing:0;
border-collapse:collapse;
}

img{
display:block;
border:0;
outline:none;
}

.button{
display:inline-block;
padding:15px 34px;
background:#ffffff;
color:#111827 !important;
font-size:16px;
font-weight:700;
border-radius:999px;
text-decoration:none;
}

.darkButton{
display:inline-block;
padding:13px 30px;
background:#111827;
color:#ffffff !important;
font-size:15px;
font-weight:600;
border-radius:999px;
text-decoration:none;
}

.subject{

font-size:34px;
font-weight:700;
color:#111827;
margin-bottom:18px;

}

.message{

font-size:18px;
line-height:1.8;
color:#374151;
white-space:pre-line;

}

</style>

</head>

<body>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td align="center">

<table
width="800"
style="max-width:800px;background:white;"
>

<tr>

<td style="padding:0;">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<!-- ========================= -->
<!-- TOP IMAGE -->
<!-- ========================= -->

<tr>

<td
style="
background:#ffffff;
padding:28px 42px;
font-family:Arial,Helvetica,sans-serif;
">

<h2
style="
margin:0 0 16px;
font-size:24px;
font-weight:700;
color:#111827;
line-height:1.35;
">

${subject}

</h2>

<p
style="
margin:0;
font-size:15px;
line-height:1.7;
color:#4b5563;
white-space:pre-line;
">

${message}

</p>

<table
role="presentation"
cellpadding="0"
cellspacing="0"
border="0"
style="margin-top:24px;"
>

<tr>

<td>

<a
href="${portalLink}"
class="darkButton">

VIEW IN PORTAL →

</a>

</td>

</tr>

</table>

</td>

</tr>

<!-- ========================= -->
<!-- BOTTOM IMAGE -->
<!-- ========================= -->

<tr>

<td>

<img
src="https://smart-city-backend-pax7.onrender.com/email-assets/part3_bottom_footer.png"
width="800"
style="display:block;width:100%;max-width:800px;height:auto;border:0;"
alt="Smart City Footer">

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

module.exports = generateEmailTemplate;