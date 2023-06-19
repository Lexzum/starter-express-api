const { default: axios } = require('axios');
const cheerio = require("cheerio");

require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50',
  'Cookie': '_gcl_au=1.1.892358180.1683902129; _ga=GA1.1.531105444.1683902130; __stripe_mid=cf8650a8-ab01-4c14-bddd-d13a2d9cb07e2a5d70; __stripe_sid=58155553-47dc-47d1-b8a7-ceccfa7a2f7f897aa3; _ga_JPX1B65FL2=GS1.1.1684699213.5.1.1684699270.3.0.0; aALhR4tuUVeRqxN2f85SGQOH3sbs8B1Dms8aAX1I=eyJpdiI6ImZJNFk0VUszUVc3aUFyY1FqUUt0NFE9PSIsInZhbHVlIjoiSldHUWEyTnRncUtpNDBSZGtMc1hoa1QrZVcyQW8zbzJWbHQzVjFaa1NPYk9FL1NqWFRaeFBGTzU1bk1qVkRXdVVRY3gwc01UZ0x0bEo5SkFybU5pazdrSHplQ2xHSHA4TTJYRFI3dmZVMDRYdmNmSzJiUUEweS9jUXFvcWw2WG02Z0hxNVorZDBVYXJJK0xuT253bUlkN1pKb2grb3ZvWWxTYVZkb2NuOVJaUFVKcEl3b281MmlFV1dyVjY5T0lBN2xyZ2dteUhDa09VS0kwaGtyS21PWXFTb1hHTDg3VG1HNWFYRXVrcm0vVTRZWEZDVUVmQkVxdlR2MFNCWXdpMFZKVjVpdDIxcGdzRW52T0dWekJvbkJsQnRRc2JEQzJldFJVSDdBSld5K1BEaHVkeS9pMkJKUFV3ZjE3YWVRdG45dHFLazdjUWt0SWJ2alc1Szhrcyt5NXRTWlIvZHQxclZCUnYvSzlUS3BiMmhlbWR6V1JBZ3hTUzQ5c3h0Y2I3MDdacnZ1dThjd2FjUnR1SjFPUmdSamIybis3MWxaNjJES1V4QTZVc0ZESTY1c3g5MDl4MGNYbi82V2xRU2htVWQva21JaGE3YWpYbE1Ld20xTGdvSkR4elduaE1jclhMS2s4WWlZNzQxYWkwLzRlam9BL3hsTk9jRUFPRi9jR3FKVS9DWFowelh5M20raUw1b2Jsd2hHNEFLVkZSd1VjWnRVbE80NG8vVTNNPSIsIm1hYyI6IjFmY2E0MTlhOTk3YzZjYzlkOTFhMjMwYTA5YjI5NWIwYzUyNzMyZjY3YThmZWU4MTdkODM2MjY5NGM5ODk1M2UiLCJ0YWciOiIifQ==; XSRF-TOKEN=eyJpdiI6IlVCV0VaTnI1SXEyaVhVL0F0VmdROVE9PSIsInZhbHVlIjoiM3lSY1lFREM4aEcydC9SZ0ZqYzQzR3FkTjg0WXZjTm16aEV1M2RRZVFPTGZ6aWhHWkFFV1VROHF0YTRpeUs3a3NrVEI4ZkNvbHdoeHluQUNMdlFDTU1NV2g1OTBrQ1VVN1V0K3BzYVp3RWJXZ1I5MFUrNGd2c1VvcW1oL2ttbisiLCJtYWMiOiJhMWQ0Nzc0NzZjZGU4ZDA2NGRiMjVhMDk2ZTA1NWU4YTc4ZWRiZjZiNDcxZjYzN2E4NmNmMjZmMjZkMjY4MmE5IiwidGFnIjoiIn0=; kick_session=eyJpdiI6IjFnL2ZFYTkxZHp3N2w5M1h0RGlaYUE9PSIsInZhbHVlIjoiUEdTTStlT0IxNUlScGExeXZINmtGL0grR3JKRHZ5amNvdWlPdTBVNUYzd1BveDg5N05mcEordXNpMG94djZmMjBGVmw3SUYvK3U1cVZUVWlncWxxWktjYmZuQ0oxZEdWd09vNHFoVldlMTNjeERkYmxOTW8vVWJFcmFrWWw3MnMiLCJtYWMiOiI2ZTY2YmEyNTUxZWY5MzRjZjlhNTZhNmVhMDkwYzE2NTZlMzc2MzlhMDhmYTNhYWExOGVlZTU0NDk4ZjdmMzU1IiwidGFnIjoiIn0=; __cf_bm=B4Cu9Qpohf1yWfw0NOb1PO0_gV6nC1DG8grUSuxhdeo-1684700111-0-ATwo1G4yCzNHKXYHVohceP5HVLI3CCXaOejGohuunFu22XDnbXfY/Aq9X3AV5y3RIWKRRB2t0p2HGoAU7OFK/S3P4+0ciAOpfUn42A7ABoB70WmXkl7HbHpf23ERRr9MQrV2kqpqE0dtqqjHFaG+fD4=',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-encoding': 'es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'Authorization': 'Bearer eyJpdiI6IlNJZWZISE5UWVpPdEJzdlNrZzl4OVE9PSIsInZhbHVlIjoiVlBSYUpOQVh1SGl6dk9aQ0t6TG9QZ1d4b1d3Vm5YMFlCUmtWa3NBVHQzQzZ3a2N4N2FJbWdVdFNqTENoUklSeWk0OXRPMnFwN3N3dW0wdlNJMzF6bFg3VzBjZTgvdmJlMXBEenlwYnBrNVdIUlFVY0dWUUdMWmc4SDVrd29XV3UiLCJtYWMiOiJlMjIzOTJiODFkMGJiMTllMDI3N2Y4Yzc4NzJjN2Q1MDFjMGUyOTFhZGM3YzdlM2Y3YTBhOWQ5YzRjNmZhNjU0IiwidGFnIjoiIn0=',

};


const image = './src/images/vivi.jpg';
const uploadOptions = {
  folder: 'Alina Rose', // Especifica el folder de destino
};

(async function run() {

  try {
    const response = await axios.get('https://www.twitch.tv/elglogloking');

  const $ = cheerio.load(response.data);

  console.log($('h1').html());
    
  } catch (error) {
    console.error(error);
  }

  

  /* const result = await cloudinary.uploader.upload(
    image,
    uploadOptions
    );
  console.log(result); */

})();

